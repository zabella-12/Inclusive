import { useAuth } from '../context/auth-context';
import { Dashboard } from '../pages/dashboard';
import { CompanyDashboard } from '../pages/company-dashboard';

export function DashboardRouter() {
  const { userType } = useAuth();
  
  if (userType === 'company') {
    return <CompanyDashboard />;
  }
  
  return <Dashboard />;
}
