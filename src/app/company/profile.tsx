import { useState } from 'react';
import { Text } from 'react-native';
import { ActionButton } from '@/components/ui/ActionButton';
import { CompanyPage } from '@/components/portal/CompanyPage';
import { PortalFeedback, PortalField, portalStyles as s } from '@/components/portal/PortalUI';
import { brand } from '@/config/brand';
import { usePortalAction } from '@/hooks/usePortalData';
import type { CompanyPortalData } from '@/models/Portal';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';
import { portalCommand } from '@/services/portal.service';

export default function CompanyProfileScreen() {
  return (
    <CompanyPage title="Datos" ownerOnly>
      {(data) => <CompanyProfile data={data} />}
    </CompanyPage>
  );
}
function CompanyProfile({ data }: Readonly<{ data: CompanyPortalData }>) {
  const { refresh } = useCompanyPortal();
  const [name, setName] = useState(data.company.name),
    [phone, setPhone] = useState(data.details?.phone ?? ''),
    [address, setAddress] = useState(data.details?.address ?? '');
  const [website, setWebsite] = useState(data.details?.website ?? ''),
    [description, setDescription] = useState(data.details?.description ?? '');
  const action = usePortalAction();
  return (
    <>
      {data.details && (
        <Text style={s.body}>
          {data.details.legalName} · CUIT {data.details.taxId}
        </Text>
      )}
      <Text style={s.hint}>Para corregir datos legales, contactá al equipo de {brand.name}.</Text>
      <PortalField
        label="Nombre comercial"
        value={name}
        onChangeText={setName}
        editable={!action.busy}
      />
      <PortalField label="Teléfono" value={phone} onChangeText={setPhone} editable={!action.busy} />
      <PortalField
        label="Dirección"
        value={address}
        onChangeText={setAddress}
        editable={!action.busy}
      />
      <PortalField
        label="Sitio web"
        value={website}
        onChangeText={setWebsite}
        editable={!action.busy}
      />
      <PortalField
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        editable={!action.busy}
      />
      <PortalFeedback error={action.error} notice={action.notice} />
      <ActionButton
        title="Guardar cambios"
        loading={action.busy}
        onPress={() =>
          void action.run(async () => {
            await portalCommand('save_company', {
              companyId: data.company.id,
              name,
              phone,
              address,
              website,
              description,
            });
            await refresh();
          })
        }
      />
    </>
  );
}
