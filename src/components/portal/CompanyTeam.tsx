import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { InfoNote } from '@/components/rewards/RewardsUI';
import { ActionButton } from '@/components/ui/ActionButton';
import { CodePill, InfoCard } from '@/components/ui/InfoCard';
import { brand } from '@/config/brand';
import { usePortalAction } from '@/hooks/usePortalData';
import type { CompanyPortalData } from '@/models/Portal';
import { useAuth } from '@/providers/AuthProvider';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';
import { portalCommand, sendCompanyInvitation } from '@/services/portal.service';
import { colors } from '@/theme';
import {
  OrganizationCard,
  PortalFeedback,
  PortalField,
  PortalLink,
  PortalSelect,
  portalStyles as s,
} from './PortalUI';

const formCard = {
  gap: 16,
  padding: 16,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  backgroundColor: colors.surface,
} as const;

export function CompanyTeam({ data }: Readonly<{ data: CompanyPortalData }>) {
  const { user, profile } = useAuth();
  const { refresh } = useCompanyPortal();
  const [name, setName] = useState(''),
    [email, setEmail] = useState('');
  const [limit, setLimit] = useState(String(data.company.workerLimit + 10)),
    [reason, setReason] = useState('');
  const action = usePortalAction(),
    invite = usePortalAction(),
    request = usePortalAction();
  const used =
    data.members.filter((m) => m.role === 'company_worker' && m.status !== 'DISABLED').length +
    data.invitations.filter((i) => i.role === 'company_worker' && i.status === 'INVITED').length;
  async function command(operation: string, payload: object) {
    await portalCommand(operation, payload);
    await refresh();
  }
  return (
    <>
      <OrganizationCard name={data.company.name} role="Responsable" />
      <Text accessibilityRole="header" style={s.heading}>
        Miembros del equipo
      </Text>
      {data.members.map((m) => (
        <InfoCard
          key={m.id}
          icon={<Ionicons name="person-outline" size={26} color={colors.text} />}
          title={
            m.userId === user?.id
              ? profile?.fullName || 'Mi cuenta'
              : (data.invitations.find((i) => i.acceptedBy === m.userId)?.email ??
                (m.role === 'company_owner' ? 'Responsable de empresa' : 'Trabajador del equipo'))
          }
          subtitle={`${m.role === 'company_owner' ? 'Responsable' : 'Trabajador'} · ${
            m.status === 'ACTIVE'
              ? 'Activo'
              : m.status === 'DISABLED'
                ? 'Deshabilitado'
                : 'Invitado'
          }`}
          right={m.userId === user?.id ? <CodePill code="Tú" /> : undefined}
        >
          {m.role === 'company_worker' && (
            <PortalLink
              title={m.status === 'DISABLED' ? 'Reactivar acceso' : 'Deshabilitar acceso'}
              disabled={action.busy}
              onPress={() =>
                void action.run(() =>
                  command('set_member_status', {
                    id: m.id,
                    status: m.status === 'DISABLED' ? 'ACTIVE' : 'DISABLED',
                  })
                )
              }
            />
          )}
        </InfoCard>
      ))}
      {data.invitations
        .filter((i) => i.status === 'INVITED')
        .map((i) => (
          <InfoCard
            key={i.id}
            icon={<Ionicons name="mail-outline" size={26} color={colors.text} />}
            title={i.email}
            subtitle="Invitación pendiente · reserva un cupo"
          >
            <View style={s.actions}>
              <PortalLink
                title="Reenviar email"
                disabled={action.busy}
                onPress={() => void action.run(() => sendCompanyInvitation(i.id), 'Email enviado.')}
              />
              {i.role === 'company_worker' && (
                <PortalLink
                  title="Cancelar invitación"
                  disabled={action.busy}
                  onPress={() => void action.run(() => command('cancel_invitation', { id: i.id }))}
                />
              )}
            </View>
          </InfoCard>
        ))}
      <PortalFeedback error={action.error} notice={action.notice} />
      <Text accessibilityRole="header" style={s.heading}>
        Invitar nuevo miembro
      </Text>
      <View style={formCard}>
        <PortalField
          label="Nombre"
          labelStyle={s.label}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          maxLength={120}
          editable={!invite.busy}
        />
        <PortalField
          label="Correo electrónico"
          labelStyle={s.label}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          editable={!invite.busy}
        />
        <PortalSelect
          label="Rol en la organización"
          value="company_worker"
          options={[{ value: 'company_worker', label: 'Trabajador' }]}
          onChange={() => undefined}
          disabled
        />
        <Text style={s.hint}>
          Los trabajadores reciben entregas y validan premios. Para sumar otro responsable, contactá
          al equipo de {brand.name}.
        </Text>
        <PortalFeedback error={invite.error} notice={invite.notice} />
        <ActionButton
          title="Invitar al equipo"
          loading={invite.busy}
          onPress={() =>
            void invite.run(async () => {
              const result = await portalCommand('invite_worker', {
                companyId: data.company.id,
                email,
              });
              setName('');
              setEmail('');
              await refresh();
              await sendCompanyInvitation(result.invitationId!, name);
            }, 'Invitación enviada.')
          }
        />
      </View>
      <InfoNote>El acceso se limita a esta organización.</InfoNote>
      <View style={s.section}>
        <Text accessibilityRole="header" style={s.heading}>
          Cupos del equipo
        </Text>
        <Text style={s.body}>
          {used} de {data.company.workerLimit} cupos de trabajadores en uso. Las invitaciones
          pendientes reservan un cupo.
        </Text>
        {data.limitRequests.map((r) => (
          <View key={r.id} style={s.row}>
            <Text style={s.body}>
              {r.requestedLimit} cupos ·{' '}
              {r.status === 'SUBMITTED'
                ? 'En revisión'
                : r.status === 'APPROVED'
                  ? 'Aprobada'
                  : 'Rechazada'}
            </Text>
            {r.reviewNote && <Text style={s.hint}>{r.reviewNote}</Text>}
          </View>
        ))}
        {!data.limitRequests.some((r) => r.status === 'SUBMITTED') && (
          <>
            <PortalField
              label="Límite solicitado"
              value={limit}
              onChangeText={setLimit}
              keyboardType="number-pad"
              editable={!request.busy}
            />
            <PortalField
              label="Motivo de la ampliación"
              value={reason}
              onChangeText={setReason}
              multiline
              editable={!request.busy}
            />
            <PortalFeedback error={request.error} notice={request.notice} />
            <ActionButton
              title="Enviar solicitud de ampliación"
              secondary
              loading={request.busy}
              onPress={() =>
                void request.run(
                  () =>
                    command('request_limit', {
                      companyId: data.company.id,
                      limit: Number(limit),
                      reason,
                    }),
                  'Solicitud enviada al administrador.'
                )
              }
            />
          </>
        )}
      </View>
    </>
  );
}
