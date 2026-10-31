import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { ActionButton } from '@/components/ui/ActionButton';
import { brand } from '@/config/brand';
import {
  OrganizationCard,
  PortalLoading,
  PortalMenuItem,
  PortalPage,
  PortalSelect,
} from '@/components/portal/PortalUI';
import { activeMemberships } from '@/models/Access';
import { useAuth } from '@/providers/AuthProvider';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';
import { colors } from '@/theme';

export default function CompanyScreen() {
  const { company, access, selectCompany } = useAuth();
  const { data, loading, error, refresh, owner } = useCompanyPortal();
  const memberships = activeMemberships(access);
  return (
    <PortalPage
      title="Mi empresa"
      back="/"
      onRefresh={() => void refresh()}
      action={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Configuraciones"
          onPress={() => router.push('/settings')}
          style={({ pressed }) => ({
            minWidth: 44,
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </Pressable>
      }
    >
      <OrganizationCard
        name={data?.company.name ?? company?.companyName ?? 'Empresa'}
        role={owner ? 'Responsable' : 'Trabajador'}
      />
      {memberships.length > 1 && company && (
        <PortalSelect
          label="Organización"
          value={company.companyId}
          options={memberships.map((m) => ({ value: m.companyId, label: m.companyName }))}
          onChange={selectCompany}
        />
      )}
      <ActionButton
        title="Recibir entrega o validar premio"
        icon={<Ionicons name="scan-outline" size={22} color={colors.textOnPrimary} />}
        onPress={() => router.push('/company/scanner')}
      />
      <View style={{ gap: 12 }}>
        <PortalMenuItem
          title="Historial de entregas"
          icon="document-text-outline"
          onPress={() => router.push('/company/deliveries')}
        />
        {owner && (
          <>
            <PortalMenuItem
              title="Puntos verdes"
              icon="location-outline"
              onPress={() => router.push('/company/points')}
            />
            <PortalMenuItem
              title="Premios de tu empresa"
              icon="gift-outline"
              onPress={() => router.push('/company/rewards')}
            />
            <PortalMenuItem
              title="Datos"
              icon="business-outline"
              onPress={() => router.push('/company/profile')}
            />
            <PortalMenuItem
              title="Puntos por categoría"
              icon="layers-outline"
              onPress={() => router.push('/company/category-points')}
            />
            <PortalMenuItem
              title="Equipo"
              icon="people-outline"
              onPress={() => router.push('/company/team')}
            />
            {data?.points.length === 0 && (
              <PortalMenuItem
                title="Sumá un punto verde"
                description={`Coordiná el alta con el equipo de ${brand.name}.`}
                icon="leaf-outline"
                onPress={() => router.push('/contact?topic=point')}
              />
            )}
          </>
        )}
      </View>
      <PortalLoading loading={loading && !data} error={error} retry={() => void refresh()} />
    </PortalPage>
  );
}
