import { Stack } from 'expo-router';
import { CompanyPortalProvider } from '@/providers/CompanyPortalProvider';
export default function CompanyLayout() {
  return (
    <CompanyPortalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CompanyPortalProvider>
  );
}
