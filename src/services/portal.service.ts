import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '@/config/supabase';
import type {
  AdminPortalData,
  AuditEntry,
  CompanyApplication,
  CompanyInvitation,
  CompanyLimitRequest,
  CompanyPortalData,
  ManagedPoint,
  PortalCompany,
} from '@/models/Portal';

type Row = Record<string, unknown>;
const str = (r: Row, key: string) => String(r[key] ?? '');
const nullable = (r: Row, key: string) => (r[key] == null ? null : String(r[key]));
function company(r: Row): PortalCompany {
  return {
    id: str(r, 'id'),
    name: str(r, 'name'),
    status: r.status as PortalCompany['status'],
    workerLimit: Number(r.worker_limit),
  };
}
export function mapApplication(r: Row): CompanyApplication {
  return {
    id: str(r, 'id'),
    applicantId: str(r, 'applicant_id'),
    businessName: str(r, 'business_name'),
    legalName: str(r, 'legal_name'),
    taxId: str(r, 'tax_id'),
    corporateEmail: str(r, 'corporate_email'),
    phone: str(r, 'phone'),
    responsible: str(r, 'responsible'),
    address: str(r, 'address'),
    activity: str(r, 'activity'),
    website: str(r, 'website'),
    description: str(r, 'description'),
    documentPath: str(r, 'document_path'),
    status: r.status as CompanyApplication['status'],
    reviewNote: nullable(r, 'review_note'),
    companyId: nullable(r, 'company_id'),
    createdAt: str(r, 'created_at'),
  };
}
function invitation(r: Row): CompanyInvitation {
  return {
    id: str(r, 'id'),
    companyId: str(r, 'company_id'),
    companyName: str((r.companies ?? {}) as Row, 'name'),
    email: str(r, 'email'),
    role: r.role as CompanyInvitation['role'],
    status: r.status as CompanyInvitation['status'],
    acceptedBy: nullable(r, 'accepted_by'),
  };
}
function limit(r: Row): CompanyLimitRequest {
  return {
    id: str(r, 'id'),
    companyId: str(r, 'company_id'),
    companyName: str((r.companies ?? {}) as Row, 'name'),
    requestedLimit: Number(r.requested_limit),
    reason: str(r, 'reason'),
    status: r.status as CompanyLimitRequest['status'],
    reviewNote: nullable(r, 'review_note'),
  };
}
function category(r: Row) {
  return {
    id: str(r, 'id'),
    name: str(r, 'name'),
    slug: str(r, 'slug'),
  };
}
export async function portalCommand(
  operation: string,
  payload: object = {}
): Promise<{ id?: string; companyId?: string; invitationId?: string }> {
  const { data, error } = await supabase.rpc('portal_command', { operation, payload });
  if (error)
    throw new Error(
      error.code === '23505'
        ? 'Ya existe una solicitud o invitación pendiente con estos datos.'
        : error.message
    );
  return data;
}
export async function getApplications(): Promise<CompanyApplication[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) return [];
  const { data, error } = await supabase
    .from('company_applications')
    .select('*')
    .eq('applicant_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapApplication);
}
export async function getMyInvitations(): Promise<CompanyInvitation[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user?.email) return [];
  const { data, error } = await supabase
    .from('company_invitations')
    .select('*, companies(name)')
    .eq('email', user.email.toLowerCase())
    .eq('status', 'INVITED');
  if (error) throw error;
  return (data ?? []).map(invitation);
}
export async function getCompanyPortal(companyId: string): Promise<CompanyPortalData> {
  const results = await Promise.all([
    supabase.from('companies').select('*').eq('id', companyId).single(),
    supabase.from('company_details').select('*').eq('company_id', companyId).maybeSingle(),
    supabase
      .from('green_points')
      .select('*, green_point_schedules(*), green_point_device_categories(device_category_id)')
      .eq('company_id', companyId)
      .order('name'),
    supabase.from('device_categories').select('*').eq('active', true).order('sort_order'),
    supabase.from('company_device_points').select('*').eq('company_id', companyId),
    supabase
      .from('company_memberships')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at'),
    supabase
      .from('company_invitations')
      .select('*, companies(name)')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false }),
    supabase
      .from('company_limit_requests')
      .select('*, companies(name)')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false }),
  ]);
  for (const result of results) if (result.error) throw result.error;
  const d = results[1].data;
  return {
    company: company(results[0].data!),
    details: d
      ? {
          legalName: d.legal_name,
          taxId: d.tax_id,
          corporateEmail: d.corporate_email,
          phone: d.phone,
          responsible: d.responsible,
          address: d.address,
          activity: d.activity,
          website: d.website ?? '',
          description: d.description ?? '',
        }
      : null,
    points: (results[2].data ?? []).map((p): ManagedPoint => ({
      id: p.id,
      name: p.name,
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      phone: p.phone ?? '',
      description: p.description ?? '',
      timeZone: p.time_zone,
      active: p.active,
      pickupEnabled: p.pickup_enabled,
      categories: p.green_point_device_categories.map(
        (c: { device_category_id: string }) => c.device_category_id
      ),
      schedules: p.green_point_schedules.map(
        (s: { weekday: number; opens_minute: number; closes_minute: number }) => ({
          weekday: s.weekday,
          opensMinute: s.opens_minute,
          closesMinute: s.closes_minute,
        })
      ),
    })),
    categories: (results[3].data ?? []).map(category),
    categoryPoints: (results[4].data ?? []).map((p) => ({
      id: p.device_category_id,
      points: p.points,
    })),
    members: (results[5].data ?? []).map((m) => ({
      id: m.id,
      userId: m.user_id,
      role: m.role,
      status: m.status,
    })),
    invitations: (results[6].data ?? []).map(invitation),
    limitRequests: (results[7].data ?? []).map(limit),
  };
}
export async function getAdminPortal(): Promise<AdminPortalData> {
  const results = await Promise.all([
    supabase.from('companies').select('*').order('name'),
    supabase
      .from('company_limit_requests')
      .select('*, companies(name)')
      .order('created_at', { ascending: false }),
  ]);
  for (const result of results) if (result.error) throw result.error;
  return {
    companies: (results[0].data ?? []).map(company),
    limitRequests: (results[1].data ?? []).map(limit),
  };
}
export interface AdminPointSummary {
  id: string;
  name: string;
  address: string;
  companyId: string;
  active: boolean;
}
export async function getAdminPoints(): Promise<AdminPointSummary[]> {
  const points: AdminPointSummary[] = [];
  for (let start = 0; ; start += 500) {
    const { data, error } = await supabase
      .from('green_points')
      .select('id,name,address,company_id,active')
      .order('name')
      .order('id')
      .range(start, start + 499);
    if (error) throw error;
    points.push(
      ...(data ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        address: p.address,
        companyId: p.company_id,
        active: p.active,
      }))
    );
    if (!data || data.length < 500) return points;
  }
}
export async function getNewPointData(): Promise<CompanyPortalData> {
  const { data, error } = await supabase
    .from('device_categories')
    .select('*')
    .eq('active', true)
    .order('sort_order');
  if (error) throw error;
  return {
    company: { id: '', name: '', status: 'ACTIVE', workerLimit: 20 },
    details: null,
    points: [],
    categories: (data ?? []).map(category),
    categoryPoints: [],
    members: [],
    invitations: [],
    limitRequests: [],
  };
}
export async function pickCompanyDocument(
  userId: string
): Promise<{ path: string; name: string } | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/png', 'image/jpeg'],
    copyToCacheDirectory: true,
  });
  if (result.canceled) return null;
  const asset = result.assets[0];
  if (asset.size && asset.size > 8388608) throw new Error('El archivo puede pesar hasta 8 MB.');
  const bytes = await (await fetch(asset.uri)).arrayBuffer();
  if (bytes.byteLength > 8388608) throw new Error('El archivo puede pesar hasta 8 MB.');
  const suffix =
    asset.mimeType === 'application/pdf' ? 'pdf' : asset.mimeType === 'image/png' ? 'png' : 'jpg';
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${suffix}`;
  const { error } = await supabase.storage
    .from('company-documents')
    .upload(path, bytes, { contentType: asset.mimeType ?? 'application/pdf', upsert: false });
  if (error) throw error;
  return { path, name: asset.name };
}
export async function companyDocumentUrl(path: string, auditAccess = false): Promise<string> {
  const { data, error } = await supabase.storage
    .from('company-documents')
    .createSignedUrl(path, 120);
  if (error) throw error;
  if (auditAccess) {
    const { error: auditError } = await supabase.rpc('admin_document_access', {
      document_path: path,
    });
    if (auditError) throw auditError;
  }
  return data.signedUrl;
}
export async function getChangelog(
  offset: number,
  search: string,
  adminsOnly: boolean
): Promise<{ entries: AuditEntry[]; hasMore: boolean }> {
  const { data, error } = await supabase.rpc('admin_changelog', {
    page_offset: offset,
    search_text: search,
    admins_only: adminsOnly,
  });
  if (error) throw error;
  const rows = (data ?? []) as Row[];
  return {
    hasMore: rows.length > 25,
    entries: rows.slice(0, 25).map((a) => ({
      id: str(a, 'id'),
      action: str(a, 'action'),
      actorId: nullable(a, 'actor_id'),
      targetId: nullable(a, 'target_id'),
      createdAt: str(a, 'created_at'),
      actorName: str(a, 'actor_name'),
      actorEmail: str(a, 'actor_email'),
      companyName: nullable(a, 'company_name'),
      note: nullable((a.details ?? {}) as Row, 'note'),
      details: (a.details ?? {}) as Row,
    })),
  };
}
export async function sendCompanyInvitation(invitationId: string, name?: string) {
  const { error } = await supabase.functions.invoke('company-invitation', {
    body: { invitationId, name: name?.trim() || undefined },
  });
  if (error)
    throw new Error(
      'El acceso quedó reservado, pero el email no pudo enviarse. Podés reintentarlo desde Invitaciones.'
    );
}
