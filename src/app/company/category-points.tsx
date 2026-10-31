import { useState } from 'react';
import { View } from 'react-native';
import { ActionButton } from '@/components/ui/ActionButton';
import { InfoNote } from '@/components/rewards/RewardsUI';
import { CompanyPage } from '@/components/portal/CompanyPage';
import { PortalFeedback, PortalField, portalStyles as s } from '@/components/portal/PortalUI';
import { usePortalAction } from '@/hooks/usePortalData';
import type { CompanyPortalData } from '@/models/Portal';
import { useCompanyPortal } from '@/providers/CompanyPortalProvider';
import { portalCommand } from '@/services/portal.service';
import { colors } from '@/theme';

export default function CategoryPointsScreen() {
  return (
    <CompanyPage title="Puntos por categoría" ownerOnly>
      {(data) => <CategoryPoints data={data} />}
    </CompanyPage>
  );
}
function CategoryPoints({ data }: Readonly<{ data: CompanyPortalData }>) {
  const { refresh } = useCompanyPortal();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      data.categories.map((c) => [
        c.id,
        String(data.categoryPoints.find((p) => p.id === c.id)?.points ?? 0),
      ])
    )
  );
  const action = usePortalAction();
  return (
    <>
      <InfoNote>
        Se acreditan al confirmar lo recibido y se suman al saldo global de cada ciudadano.
      </InfoNote>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          backgroundColor: colors.surface,
        }}
      >
        {data.categories.map((c, i) => (
          <View
            key={c.id}
            style={{
              padding: 12,
              borderTopWidth: i ? 1 : 0,
              borderTopColor: colors.border,
            }}
          >
            <PortalField
              label={c.name}
              labelStyle={s.label}
              compact
              suffix="puntos por unidad"
              keyboardType="number-pad"
              value={values[c.id]}
              editable={!action.busy}
              onChangeText={(value) => setValues({ ...values, [c.id]: value.replace(/\D/g, '') })}
            />
          </View>
        ))}
      </View>
      <PortalFeedback error={action.error} notice={action.notice} />
      <ActionButton
        title="Guardar cambios"
        loading={action.busy}
        onPress={() =>
          void action.run(async () => {
            const categories = data.categories.map((c) => ({
              id: c.id,
              points: Number(values[c.id]),
            }));
            if (
              categories.some(
                (c) =>
                  !values[c.id].trim() ||
                  !Number.isSafeInteger(c.points) ||
                  c.points < 0 ||
                  c.points > 1000000
              )
            )
              throw new Error('Usá puntos enteros entre 0 y 1.000.000.');
            await portalCommand('save_points', { companyId: data.company.id, categories });
            await refresh();
          })
        }
      />
    </>
  );
}
