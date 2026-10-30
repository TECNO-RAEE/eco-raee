import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type TextInputInstance,
  View,
} from 'react-native';

import { AuthTextField } from '@/components/auth/AuthTextField';
import { ActionButton } from '@/components/ui/ActionButton';
import { authRoute, parseAuthIntent } from '@/models/AuthFlow';
import { useAuth } from '@/providers/AuthProvider';
import { login } from '@/services/auth.service';
import { colors, fonts } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

function getAuthErrorCode(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return typeof error.code === 'string' ? error.code : undefined;
  }

  return undefined;
}

function getAuthErrorStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return typeof error.status === 'number' ? error.status : undefined;
  }

  return undefined;
}

function getLoginErrorMessage(error: unknown) {
  const code = getAuthErrorCode(error);
  const status = getAuthErrorStatus(error);

  if (code === 'email_not_confirmed') {
    return 'Todavía no confirmaste tu correo. Revisá tu bandeja de entrada y confirmá la cuenta para ingresar.';
  }

  if (
    code === 'over_request_rate_limit' ||
    code === 'over_email_send_rate_limit' ||
    status === 429
  ) {
    return 'Hiciste demasiados intentos. Esperá unos minutos e intentá nuevamente.';
  }

  if (
    (status !== undefined && status >= 500) ||
    status === 0 ||
    (error instanceof Error && error.name === 'AuthRetryableFetchError')
  ) {
    return 'No pudimos conectarnos con el servicio. Intentá de nuevo en unos minutos.';
  }

  return 'No pudimos iniciar sesión. Intentá nuevamente.';
}

export default function LoginScreen() {
  const params = useLocalSearchParams<{ intent?: string; confirm?: string }>();
  const intent = parseAuthIntent(params.intent);
  const { prepareAuth } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [authErrorVisible, setAuthErrorVisible] = useState(false);
  const passwordInputRef = useRef<TextInputInstance>(null);
  const restorePasswordFocusOnDismiss = useRef(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword]= useState(false);
  const [loading, setLoading] = useState(false);

  function closeAuthError(restoreFocus: boolean) {
    setAuthErrorVisible(false);

    if (!restoreFocus) return;

    if (Platform.OS === 'android') {
      // En Android el Modal no dispara onDismiss
      requestAnimationFrame(() => passwordInputRef.current?.focus());
    } else {
      restorePasswordFocusOnDismiss.current = true;
    }
  }

  async function handleLogin() {
    if (loading) return;
    setFormError(null);
    if (!email.trim() || !password) {
      setFormError('Ingresá tu correo y contraseña.');
      return;
    }

    try {
      setLoading(true);
      prepareAuth(intent);

      await login(email, password);

      router.replace('/');
    } catch (error) {
      prepareAuth(null);
      Keyboard.dismiss();
      if (getAuthErrorCode(error) === 'invalid_credentials') {
        setAuthErrorVisible(true);
      } else {
        setFormError(getLoginErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <Text style={styles.subtitle}>Accedé a tu cuenta</Text>

          {/* Correo */}
          <View style={styles.emailField}>
            <AuthTextField
              label="Correo electrónico"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="Ingresá tu correo"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              editable={!loading}
            />
          </View>

          {/* Contraseña */}
          <View style={styles.passwordField}>
            <AuthTextField
              label="Contraseña"
              iconName="lock-closed-outline"
              inputRef={passwordInputRef}
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresá tu contraseña"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              editable={!loading}
              onSubmitEditing={handleLogin}
              trailing={
  <Pressable onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
      size={22}
      color={colors.text}
    />
  </Pressable>
}
            />
          </View>

          {/* Olvidaste contraseña */}
          <Pressable
            accessibilityRole="button"
            style={styles.forgotPassword}
            onPress={() => router.push('/forgot-password')}
            disabled={loading}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          {/* Iniciar sesión */}
          <ActionButton
            title="Iniciar sesión"
            onPress={() => void handleLogin()}
            loading={loading}
          />

          {formError && (
            <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>
              {formError}
            </Text>
          )}

          {params.confirm === '1' && !formError && (
            <Text accessibilityLiveRegion="polite" style={styles.feedback}>
              Revisá tu correo y confirmá la cuenta. Después iniciá sesión para continuar.
            </Text>
          )}

          {/* Crear cuenta */}
          <View style={styles.createAccountSection}>
            <Text style={styles.createAccountLabel}>¿Todavía no tenés una cuenta?</Text>

            <ActionButton
              title="Crear cuenta"
              secondary
              onPress={() => router.push(authRoute('/register', intent))}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={authErrorVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => {
          closeAuthError(true);
        }}
        onDismiss={() => {
          if (restorePasswordFocusOnDismiss.current) {
            restorePasswordFocusOnDismiss.current = false;
            passwordInputRef.current?.focus();
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View
            accessibilityViewIsModal
            accessibilityRole="alert"
            style={styles.modalCard}
          >
            <View style={styles.modalIconCircle}>
              <Text style={styles.modalIcon}>!</Text>
            </View>
            <Text style={styles.modalTitle}>No pudimos iniciar sesión</Text>
            <Text style={styles.modalMessage}>
              El correo o la contraseña no son correctos. Revisá los datos e intentá nuevamente.
            </Text>

            <View style={styles.modalActions}>
              <ActionButton title="Reintentar" onPress={() => closeAuthError(true)} />
              <ActionButton
                title="Recuperar contraseña"
                secondary
                onPress={() => {
                  closeAuthError(false);
                  router.push('/forgot-password');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, padding: 24, paddingBottom: 32 },
  screen: { width: '100%', maxWidth: 420, alignSelf: 'center', gap: 18 },
  error: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.danger },

  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  emailField: { width: '100%' },
  passwordField: { width: '100%' },
  forgotPassword: { minHeight: 44, alignSelf: 'flex-end', justifyContent: 'center' },
  forgotPasswordText: { fontFamily: fonts.regular, fontSize: 14, color: colors.primaryDark },
  feedback: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  createAccountSection: { gap: 12, marginTop: 24 },
  createAccountLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'center',
    color: colors.text,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(16, 40, 44, 0.55)',
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalIconCircle: {
    width: 52,
    height: 52,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: colors.primarySoft,
  },
  modalIcon: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 32,
    color: colors.primary,
  },
  modalTitle: {
    marginBottom: 10,
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: colors.brandDark,
  },
  modalMessage: {
    marginBottom: 22,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  modalActions: { width: '100%', gap: 8 },
});
s