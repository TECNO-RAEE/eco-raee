import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '@/theme';

export function ActionButton({
  title,
  onPress,
  secondary = false,
  loading = false,
  disabled = false,
  icon,
}: Readonly<{
  title: string;
  onPress: () => void;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}>) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={loading || disabled}
      accessibilityState={{ disabled: loading || disabled, busy: loading }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        icon != null && styles.withIcon,
        secondary && styles.secondary,
        (pressed || loading || disabled) && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? colors.primary : colors.textOnPrimary} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withIcon: { flexDirection: 'row', gap: 12 },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  secondaryText: { color: colors.primary },
  pressed: { opacity: 0.7 },
});
