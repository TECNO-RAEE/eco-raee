import type { Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { CompanyPortalData } from '@/models/Portal';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';
import { PortalLoading, PortalPage, portalStyles as s } from './PortalUI';

// Inner company screen: shared header, load/error states and the owner-only guard.
export function CompanyPage({
  title,
  back = '/company',
  ownerOnly = false,
  action,
  children,
}: Readonly<{
  title: string;
  back?: Href;
  ownerOnly?: boolean;
  action?: ReactNode;
  children: (data: CompanyPortalData) => ReactNode;
}>) {
  const { data, loading, error, refresh, owner } = useCompanyPortal();
  return (
    <PortalPage title={title} back={back} action={action} onRefresh={() => void refresh()}>
      {!data && <PortalLoading loading={loading} error={error} retry={() => void refresh()} />}
      {data && ownerOnly && !owner && (
        <Text style={s.body}>
          Esta sección corresponde al responsable de la organización. Tu acceso permite recibir
          entregas y validar premios.
        </Text>
      )}
      {data && (!ownerOnly || owner) && (
        <View key={data.company.id} style={s.stack}>
          {children(data)}
        </View>
      )}
    </PortalPage>
  );
}
