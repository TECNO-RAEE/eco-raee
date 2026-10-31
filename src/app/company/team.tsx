import { CompanyPage } from '@/components/portal/CompanyPage';
import { CompanyTeam } from '@/components/portal/CompanyTeam';

export default function CompanyTeamScreen() {
  return (
    <CompanyPage title="Equipo" ownerOnly>
      {(data) => <CompanyTeam data={data} />}
    </CompanyPage>
  );
}
