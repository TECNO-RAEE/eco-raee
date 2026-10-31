import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { CompanyPage } from '@/components/portal/CompanyPage';
import { CompanyPointEditor } from '@/components/portal/CompanyPointEditor';
import { portalStyles as s } from '@/components/portal/PortalUI';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';

export default function CompanyGreenPointScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { refresh } = useCompanyPortal();
  return (
    <CompanyPage title="Punto verde" back="/company/points" ownerOnly>
      {(data) => {
        const point = data.points.find((p) => p.id === id);
        return point ? (
          <CompanyPointEditor
            key={point.id}
            data={data}
            point={point}
            onSaved={async () => {
              await refresh();
              if (router.canGoBack()) router.back();
              else router.replace('/company/points');
            }}
          />
        ) : (
          <Text style={s.body}>No encontramos este punto verde en tu organización.</Text>
        );
      }}
    </CompanyPage>
  );
}
