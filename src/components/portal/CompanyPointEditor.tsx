import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ActionButton } from '@/components/ui/ActionButton';
import {
  PortalChoice,
  PortalField,
  PortalToggle,
  PortalFeedback,
  PortalLink,
  PortalSelect,
  portalFieldStyle,
  portalStyles as s,
} from './PortalUI';
import { usePortalAction } from '@/hooks/usePortalData';
import type { CompanyPortalData, ManagedPoint, PointInput } from '@/models/Portal';
import {
  formatTimeInput,
  groupScheduleText,
  groupedDays,
  parseSchedules,
  scheduleGroups,
  scheduleText,
  weekdays,
  type ScheduleRange,
} from '@/models/PointSchedule';
import { portalCommand } from '@/services/portal.service';
import { AddressField } from './AddressField';
import { LocationPicker } from './LocationPicker';
import { joinPointAddress, splitPointAddress } from '@/models/PointAddress';
import { colors } from '@/theme';

export function CompanyPointEditor({
  data,
  point,
  onSaved,
  onCancel,
  savePoint = (input) => portalCommand('save_point', input),
}: Readonly<{
  data: CompanyPortalData;
  point: ManagedPoint | null;
  onSaved: () => Promise<void>;
  onCancel?: () => void;
  savePoint?: (input: PointInput) => Promise<unknown>;
}>) {
  const initialAddress = splitPointAddress(point?.address ?? '');
  const [name, setName] = useState(point?.name ?? ''),
    [address, setAddress] = useState(initialAddress.address);
  const [crossStreets, setCrossStreets] = useState(initialAddress.crossStreets);
  const [manualCoordinates, setManualCoordinates] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [more, setMore] = useState(false);
  const [editingAddress, setEditingAddress] = useState(!point?.address);
  const [latitude, setLatitude] = useState(point ? String(point.latitude) : ''),
    [longitude, setLongitude] = useState(point ? String(point.longitude) : '');
  const [phone, setPhone] = useState(point?.phone ?? data.details?.phone ?? ''),
    [description, setDescription] = useState(point?.description ?? '');
  const [timeZone, setTimeZone] = useState(point?.timeZone ?? 'America/Argentina/Buenos_Aires');
  const [active, setActive] = useState(point?.active ?? false),
    [pickupEnabled, setPickupEnabled] = useState(point?.pickupEnabled ?? false);
  const [categories, setCategories] = useState<string[]>(point?.categories ?? []);
  const [days, setDays] = useState(scheduleText(point?.schedules ?? []));
  const [ranges, setRanges] = useState(groupScheduleText(days));
  const action = usePortalAction();
  const lat = Number(latitude.replace(',', '.')),
    lng = Number(longitude.replace(',', '.'));
  const coordinate = useMemo(
    () =>
      latitude.trim() &&
      longitude.trim() &&
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180
        ? { latitude: lat, longitude: lng }
        : null,
    [latitude, longitude, lat, lng]
  );
  return (
    <View style={s.stack}>
      <PortalField
        label="Nombre del punto verde"
        labelStyle={s.label}
        value={name}
        onChangeText={setName}
        editable={!action.busy}
      />
      <Text style={s.label}>Ubicación</Text>
      <LocationPicker
        value={coordinate}
        onChange={(value) => {
          setLatitude(String(value.latitude));
          setLongitude(String(value.longitude));
        }}
        disabled={action.busy}
      />
      <Text style={s.hint}>
        {coordinate
          ? 'Ubicación marcada. Arrastrá el marcador o tocá el mapa para ajustar la entrada.'
          : 'Tocá el mapa para marcar la ubicación antes de guardar.'}
      </Text>
      {editingAddress ? (
        <>
          <AddressField
            value={address}
            onChange={(value) => {
              setAddress(value);
              setLatitude('');
              setLongitude('');
            }}
            onSelect={(value) => {
              setAddress(value.address);
              setLatitude(String(value.latitude));
              setLongitude(String(value.longitude));
            }}
            disabled={action.busy}
          />
          <PortalField
            label="Entre calles (opcional)"
            value={crossStreets}
            onChangeText={setCrossStreets}
            maxLength={200}
            editable={!action.busy}
          />
          <Text style={s.hint}>
            La dirección y las entrecalles serán visibles para los usuarios.
          </Text>
        </>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            borderRadius: 12,
            backgroundColor: colors.surfaceSoft,
          }}
        >
          <Ionicons name="location" size={24} color={colors.text} />
          <Text style={[s.body, { flex: 1 }]}>{joinPointAddress(address, crossStreets)}</Text>
        </View>
      )}
      {!editingAddress && (
        <PortalLink
          title="Cambiar dirección"
          disabled={action.busy}
          onPress={() => setEditingAddress(true)}
        />
      )}
      <Text style={s.label}>Horarios de atención</Text>
      {ranges ? (
        <>
          <ScheduleGrid ranges={ranges} onChange={setRanges} disabled={action.busy} />
          <Text style={s.hint}>
            Dejá vacío el horario de los días en que el punto está cerrado.
          </Text>
          <PortalLink
            title="Configurar cada día por separado"
            disabled={action.busy}
            onPress={() => {
              setDays(groupedDays(ranges, false));
              setRanges(null);
            }}
          />
        </>
      ) : (
        <>
          <Text style={s.hint}>
            Usá 09:00-18:00. Para horario cortado: 09:00-13:00, 15:00-19:00. Dejá vacío si está
            cerrado. Un cierre anterior a la apertura corresponde al día siguiente.
          </Text>
          {weekdays.map((day, i) => (
            <PortalField
              key={day}
              label={day}
              value={days[i]}
              placeholder="Cerrado"
              editable={!action.busy}
              onChangeText={(value) => setDays(days.map((d, j) => (i === j ? value : d)))}
            />
          ))}
          {groupScheduleText(days) && (
            <PortalLink
              title="Usar horario de lunes a viernes"
              disabled={action.busy}
              onPress={() => setRanges(groupScheduleText(days))}
            />
          )}
        </>
      )}
      <Text style={s.label}>Categorías aceptadas</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 24 }}>
        {data.categories.map((c) => (
          <PortalChoice
            key={c.id}
            label={c.name}
            selected={categories.includes(c.id)}
            disabled={action.busy}
            onPress={() =>
              setCategories(
                categories.includes(c.id)
                  ? categories.filter((id) => id !== c.id)
                  : [...categories, c.id]
              )
            }
          />
        ))}
      </View>
      <PortalLink
        title={more ? 'Ocultar más opciones' : 'Más opciones'}
        disabled={action.busy}
        onPress={() => setMore(!more)}
      />
      {more && (
        <>
          <PortalLink
            title={manualCoordinates ? 'Ocultar coordenadas' : 'Ingresar coordenadas manualmente'}
            onPress={() => setManualCoordinates(!manualCoordinates)}
            disabled={action.busy}
          />
          {manualCoordinates && (
            <>
              <PortalField
                label="Latitud"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numbers-and-punctuation"
                editable={!action.busy}
              />
              <PortalField
                label="Longitud"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numbers-and-punctuation"
                editable={!action.busy}
              />
            </>
          )}
          <PortalField
            label="Teléfono de contacto"
            value={phone}
            onChangeText={setPhone}
            editable={!action.busy}
          />
          <PortalField
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
            editable={!action.busy}
          />
          <PortalLink
            title={advanced ? 'Ocultar zona horaria' : 'Cambiar zona horaria'}
            onPress={() => setAdvanced(!advanced)}
            disabled={action.busy}
          />
          {advanced && (
            <PortalField
              label="Zona horaria"
              value={timeZone}
              onChangeText={setTimeZone}
              editable={!action.busy}
            />
          )}
          <PortalToggle
            label="Ofrece retiros"
            value={pickupEnabled}
            onChange={setPickupEnabled}
            disabled={action.busy}
          />
        </>
      )}
      <PortalSelect
        label="Estado"
        compact
        value={active ? 'published' : 'draft'}
        options={[
          { value: 'published', label: 'Publicado' },
          { value: 'draft', label: 'Borrador' },
        ]}
        onChange={(value) => setActive(value === 'published')}
        disabled={action.busy}
      />
      <Text style={s.hint}>
        Los puntos publicados aparecen en Puntos verdes; los borradores sólo los ve tu equipo.
      </Text>
      <PortalFeedback error={action.error} />
      <ActionButton
        title="Guardar cambios"
        loading={action.busy}
        onPress={() =>
          void action.run(async () => {
            const lat = Number(latitude.replace(',', '.')),
              lon = Number(longitude.replace(',', '.'));
            if (
              !latitude.trim() ||
              !longitude.trim() ||
              !Number.isFinite(lat) ||
              !Number.isFinite(lon) ||
              lat < -90 ||
              lat > 90 ||
              lon < -180 ||
              lon > 180
            )
              throw new Error('Ingresá coordenadas válidas para ubicar el punto en el mapa.');
            await savePoint({
              id: point?.id,
              companyId: data.company.id,
              name,
              address: joinPointAddress(address, crossStreets),
              latitude: lat,
              longitude: lon,
              phone,
              description,
              timeZone,
              active,
              pickupEnabled,
              categories,
              schedules: parseSchedules(ranges ? groupedDays(ranges) : days),
            });
            await onSaved();
          })
        }
      />
      {onCancel && (
        <PortalLink title="Cancelar edición" disabled={action.busy} onPress={onCancel} />
      )}
    </View>
  );
}
function ScheduleGrid({
  ranges,
  onChange,
  disabled,
}: Readonly<{
  ranges: ScheduleRange[];
  onChange: (ranges: ScheduleRange[]) => void;
  disabled: boolean;
}>) {
  const set = (i: number, key: keyof ScheduleRange, value: string) =>
    onChange(ranges.map((r, j) => (i === j ? { ...r, [key]: formatTimeInput(value) } : r)));
  const input = (i: number, key: keyof ScheduleRange, label: string) => (
    <TextInput
      accessibilityLabel={`${scheduleGroups[i].label}, ${label}`}
      value={ranges[i][key]}
      onChangeText={(value) => set(i, key, value)}
      placeholder="--:--"
      placeholderTextColor={s.hint.color}
      keyboardType="number-pad"
      maxLength={5}
      editable={!disabled}
      style={[portalFieldStyle, { width: 84, textAlign: 'center' }]}
    />
  );
  return (
    <View style={{ gap: 8 }}>
      {scheduleGroups.map(({ label }, i) => (
        <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={[s.body, { flex: 1 }]}>{label}</Text>
          {input(i, 'opens', 'apertura')}
          <Text style={s.hint}>a</Text>
          {input(i, 'closes', 'cierre')}
        </View>
      ))}
    </View>
  );
}
