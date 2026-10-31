import { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ActionButton } from '@/components/ui/ActionButton';
import { InfoCard } from '@/components/ui/InfoCard';
import { colors, fonts } from '@/theme';
import { useScrollReset } from '@/hooks/useScrollReset';

export const portalStyles = StyleSheet.create({
  title: { fontFamily: fonts.bold, fontSize: 28, lineHeight: 36, color: colors.text },
  subtitle: { fontFamily: fonts.semiBold, fontSize: 20, lineHeight: 28, color: colors.brandDark },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.text },
  hint: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.textSecondary },
  label: { fontFamily: fonts.semiBold, fontSize: 14, lineHeight: 20, color: colors.text },
  heading: { fontFamily: fonts.semiBold, fontSize: 16, lineHeight: 22, color: colors.text },
  section: { gap: 16, paddingVertical: 24, borderTopWidth: 1, borderTopColor: colors.border },
  row: {
    gap: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  stack: { gap: 16 },
  link: { fontFamily: fonts.semiBold, color: colors.primary, fontSize: 15 },
  error: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: colors.danger },
});
export function PortalPage({
  title,
  subtitle,
  children,
  back,
  action,
  onRefresh,
}: Readonly<{
  title: string;
  subtitle?: string;
  children: ReactNode;
  back?: Href;
  action?: ReactNode;
  onRefresh?: () => void;
}>) {
  const scroll = useScrollReset();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title={title} back={back} action={action} />
      <ScrollView
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          onRefresh && (
            <RefreshControl refreshing={false} onRefresh={onRefresh} tintColor={colors.primary} />
          )
        }
        contentContainerStyle={{
          padding: 24,
          width: '100%',
          maxWidth: 960,
          alignSelf: 'center',
          gap: 24,
          flexGrow: 1,
        }}
      >
        {subtitle && <Text style={portalStyles.body}>{subtitle}</Text>}
        {children}
      </ScrollView>
    </View>
  );
}
export function PortalLink({
  title,
  onPress,
  disabled = false,
}: Readonly<{ title: string; onPress: () => void; disabled?: boolean }>) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        justifyContent: 'center',
        opacity: pressed || disabled ? 0.6 : 1,
      })}
    >
      <Text style={portalStyles.link}>{title}</Text>
    </Pressable>
  );
}
export function PortalMenuItem({
  title,
  description,
  icon,
  onPress,
}: Readonly<{
  title: string;
  description?: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={description}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: pressed ? colors.primarySoft : colors.surface,
        minHeight: 56,
      })}
    >
      <Ionicons name={icon} size={24} color={colors.text} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={portalStyles.body}>{title}</Text>
        {description && <Text style={portalStyles.hint}>{description}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text} />
    </Pressable>
  );
}
export function OrganizationCard({ name, role }: Readonly<{ name: string; role: string }>) {
  return (
    <InfoCard
      style={{ backgroundColor: colors.surfaceSoft, padding: 20 }}
      icon={
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primarySoft,
          }}
        >
          <Ionicons name="business" size={28} color={colors.primary} />
        </View>
      }
      title={<Text style={[portalStyles.subtitle, { color: colors.text }]}>{name}</Text>}
      subtitle={role}
    />
  );
}
export const portalFieldStyle = {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 8,
  backgroundColor: colors.surface,
  minHeight: 48,
  padding: 12,
  fontFamily: fonts.regular,
  fontSize: 15,
  color: colors.text,
} as const;
export function PortalField({
  label,
  compact = false,
  suffix,
  labelStyle,
  ...props
}: TextInputProps & {
  label: string;
  compact?: boolean;
  suffix?: string;
  labelStyle?: TextInputProps['style'];
}) {
  const input = (
    <TextInput
      accessibilityLabel={suffix ? `${label}, ${suffix}` : label}
      autoCapitalize="none"
      placeholderTextColor={colors.textSecondary}
      {...props}
      style={[
        portalFieldStyle,
        props.multiline && { minHeight: 90, textAlignVertical: 'top' },
        compact && { width: suffix ? 64 : 96, textAlign: suffix ? 'left' : 'right' },
        suffix && { borderWidth: 0, borderRadius: 0 },
        props.style,
      ]}
    />
  );
  return (
    <View
      style={{
        gap: compact ? 16 : 8,
        flexDirection: compact ? 'row' : 'column',
        alignItems: compact ? 'center' : undefined,
      }}
    >
      <Text style={[portalStyles.body, compact && { flex: 1 }, labelStyle]}>{label}</Text>
      {suffix ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: colors.surfaceSoft,
          }}
        >
          {input}
          <Text style={[portalStyles.hint, { paddingHorizontal: 10 }]}>{suffix}</Text>
        </View>
      ) : (
        input
      )}
    </View>
  );
}
export function PortalSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  compact = false,
  disabled = false,
}: Readonly<{
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  compact?: boolean;
  disabled?: boolean;
}>) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === value);
  return (
    <View
      style={{
        gap: compact ? 16 : 8,
        flexDirection: compact ? 'row' : 'column',
        alignItems: compact ? 'flex-start' : undefined,
      }}
    >
      <Text style={[portalStyles.label, compact && { minHeight: 48, paddingTop: 14 }]}>
        {label}
      </Text>
      <View style={{ gap: 4, flex: compact ? 1 : undefined }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label}: ${current?.label ?? ''}`}
          accessibilityState={{ expanded: open, disabled }}
          disabled={disabled}
          onPress={() => setOpen(!open)}
          style={[
            portalFieldStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: disabled ? 0.7 : 1,
            },
          ]}
        >
          <Text style={portalStyles.body}>{current?.label}</Text>
          <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.text} />
        </Pressable>
        {open && (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              backgroundColor: colors.surface,
              overflow: 'hidden',
            }}
          >
            {options.map((option) => (
              <Pressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityState={{ checked: option.value === value }}
                onPress={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor:
                    pressed || option.value === value ? colors.primarySoft : colors.surface,
                })}
              >
                <Text style={portalStyles.body}>{option.label}</Text>
                {option.value === value && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
export function PortalToggle({
  label,
  value,
  onChange,
  disabled = false,
}: Readonly<{
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        minHeight: 44,
      }}
    >
      <Text style={[portalStyles.body, { flex: 1 }]}>{label}</Text>
      <Switch
        accessibilityLabel={label}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: colors.primary }}
      />
    </View>
  );
}
export function PortalChoice({
  label,
  selected,
  onPress,
  disabled = false,
}: Readonly<{ label: string; selected: boolean; onPress: () => void; disabled?: boolean }>) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 44 }}
    >
      <Ionicons
        name={selected ? 'checkbox' : 'square-outline'}
        size={24}
        color={selected ? colors.primary : colors.textSecondary}
      />
      <Text style={portalStyles.body}>{label}</Text>
    </Pressable>
  );
}
export function PortalFeedback({
  error,
  notice,
}: Readonly<{ error?: string | null; notice?: string | null }>) {
  return (
    <>
      {error && (
        <Text accessibilityRole="alert" style={portalStyles.error}>
          {error}
        </Text>
      )}
      {notice && (
        <Text accessibilityLiveRegion="polite" style={portalStyles.body}>
          {notice}
        </Text>
      )}
    </>
  );
}
export function PortalLoading({
  loading,
  error,
  retry,
}: Readonly<{ loading: boolean; error: string | null; retry: () => void }>) {
  return (
    <>
      {loading && <ActivityIndicator color={colors.primary} accessibilityLabel="Cargando datos" />}
      {error && (
        <View style={portalStyles.stack}>
          <PortalFeedback error={error} />
          <ActionButton secondary title="Reintentar" onPress={retry} />
        </View>
      )}
    </>
  );
}
export function PortalNav({
  items,
  selected,
  onSelect,
}: Readonly<{ items: readonly string[]; selected: string; onSelect: (item: string) => void }>) {
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const positions = useRef<Record<string, number>>({});
  useEffect(() => {
    scroll.current?.scrollTo({
      x: Math.max(0, (positions.current[selected] ?? 0) - 24),
      animated: false,
    });
  }, [selected]);
  return (
    <ScrollView
      ref={scroll}
      onLayout={() =>
        scroll.current?.scrollTo({
          x: Math.max(0, (positions.current[selected] ?? 0) - 24),
          animated: false,
        })
      }
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ flexGrow: 1 }}
      accessibilityRole="tablist"
    >
      <View
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          gap: 24,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        {items.map((item) => (
          <Pressable
            key={item}
            onLayout={(event) => {
              positions.current[item] = event.nativeEvent.layout.x;
              if (item === selected)
                scroll.current?.scrollTo({
                  x: Math.max(0, event.nativeEvent.layout.x - 24),
                  animated: false,
                });
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: item === selected }}
            onPress={() => onSelect(item)}
            style={{
              minHeight: 48,
              justifyContent: 'center',
              borderBottomWidth: item === selected ? 2 : 0,
              borderBottomColor: colors.primary,
            }}
          >
            <Text
              style={[
                portalStyles.link,
                { color: item === selected ? colors.primary : colors.brandDark },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
