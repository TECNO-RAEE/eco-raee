import { CompanyPage } from '@/components/portal/CompanyPage';
import { CompanyRewards } from '@/components/portal/CompanyRewards';

export default function CompanyRewardsScreen() {
  return (
    <CompanyPage title="Premios de tu empresa" ownerOnly>
      {(data) => <CompanyRewards companyId={data.company.id} />}
    </CompanyPage>
  );
}
