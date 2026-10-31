import { CompanyPage } from '@/components/portal/CompanyPage';
import { DeliveryHistory } from '@/components/delivery/DeliveryHistory';

export default function CompanyDeliveriesScreen() {
  return (
    <CompanyPage title="Historial de entregas">
      {(data) => <DeliveryHistory key={data.company.id} companyId={data.company.id} />}
    </CompanyPage>
  );
}
