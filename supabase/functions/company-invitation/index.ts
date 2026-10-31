import { createClient } from 'npm:@supabase/supabase-js@2.116.0';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const respond = (status: number, body: object) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });

// Optional display name typed by the owner; it only seeds the profile of a newly created account.
const inviteeName = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, 120) : null;

// Gateway JWT verification is disabled for modern signing keys. Every request is verified with Auth.getUser,
// and the caller-scoped RPC authorizes the invitation in PostgreSQL before any privileged email operation.
Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (request.method !== 'POST') return respond(405, { error: 'Método no permitido.' });
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) return respond(401, { error: 'Iniciá sesión.' });
  const url = Deno.env.get('SUPABASE_URL')!;
  const caller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const {
    data: { user },
    error: authError,
  } = await caller.auth.getUser(authorization.slice(7));
  if (authError || !user) return respond(401, { error: 'Sesión inválida.' });
  try {
    const body = await request.json();
    if (typeof body.invitationId !== 'string' || !/^[0-9a-f-]{36}$/i.test(body.invitationId))
      return respond(400, { error: 'Invitación inválida.' });
    const { data: recipient, error } = await caller.rpc('invitation_recipient', {
      invitation_id: body.invitationId,
    });
    if (error || !recipient) return respond(403, { error: 'No podés enviar esta invitación.' });
    const redirectTo =
      Deno.env.get('COMPANY_INVITE_REDIRECT_URL') ?? 'http://localhost:8081/company-invitations';
    const backend = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const sent = recipient.exists
      ? await backend.auth.signInWithOtp({
          email: recipient.email,
          options: { shouldCreateUser: false, emailRedirectTo: redirectTo },
        })
      : await backend.auth.admin.inviteUserByEmail(recipient.email, {
          redirectTo,
          data: { full_name: inviteeName(body.name) ?? recipient.email.split('@')[0] },
        });
    const { error: auditError } = await backend.from('audit_log').insert({
      actor_id: user.id,
      action: sent.error ? 'invitation_email_failed' : 'invitation_email_sent',
      target_id: body.invitationId,
      details: { email: recipient.email },
    });
    if (auditError)
      return respond(500, {
        error: 'No se pudo registrar el resultado del envío en el historial.',
        sent: !sent.error,
      });
    if (sent.error)
      return respond(502, {
        error: 'No se pudo enviar el email. Revisá el servicio de correo y reintentá.',
      });
    return respond(200, { sent: true });
  } catch {
    return respond(400, { error: 'No se pudo procesar la invitación.' });
  }
});
