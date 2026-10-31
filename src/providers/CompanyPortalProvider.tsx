import { createContext, useCallback, useContext, type ReactNode } from 'react';
import { usePortalData } from '@/hooks/usePortalData';
import { canManageCompany } from '@/models/Access';
import type { CompanyPortalData } from '@/models/Portal';
import { useAuth } from '@/providers/AuthProvider';
import { getCompanyPortal } from '@/services/portal.service';

type CompanyPortal = {
  data: CompanyPortalData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  owner: boolean;
};
const CompanyPortalContext = createContext<CompanyPortal | null>(null);

// Loads the selected company once for every /company screen, so a save on one screen updates the rest.
export function CompanyPortalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { company, role } = useAuth();
  const companyId = company?.companyId;
  const loader = useCallback(() => {
    if (!companyId) throw new Error('Seleccioná una empresa activa.');
    return getCompanyPortal(companyId);
  }, [companyId]);
  const portal = usePortalData(loader);
  return (
    <CompanyPortalContext.Provider value={{ ...portal, owner: canManageCompany(role) }}>
      {children}
    </CompanyPortalContext.Provider>
  );
}
export function useCompanyPortal() {
  const portal = useContext(CompanyPortalContext);
  if (!portal) throw new Error('useCompanyPortal requiere CompanyPortalProvider.');
  return portal;
}
