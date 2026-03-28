import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout';
import { DashboardRouter } from './components/dashboard-router';
import { ProtectedRoute } from './components/protected-route';
import { Feedback } from './pages/feedback';
import { VideoFeedback } from './pages/video-feedback';
import { Career } from './pages/career';
import { Training } from './pages/training';
import { Jobs } from './pages/jobs';
import { Profile } from './pages/profile';
import { Login } from './pages/login';
import { CompanyJobsManagement } from './pages/company-jobs-management';
import { Assessments } from './pages/assessments';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardRouter },
      { path: 'feedback', Component: Feedback },
      { path: 'video-feedback', Component: VideoFeedback },
      { path: 'career', Component: Career },
      { path: 'training', Component: Training },
      { path: 'assessments', Component: Assessments },
      { path: 'jobs', Component: Jobs },
      { path: 'profile', Component: Profile },
      { path: 'company/team', element: <div className="text-center py-12"><h2 className="text-2xl font-bold">Gestão de Equipe</h2><p className="text-gray-600 mt-2">Em breve</p></div> },
      { path: 'company/reports', element: <div className="text-center py-12"><h2 className="text-2xl font-bold">Relatórios</h2><p className="text-gray-600 mt-2">Em breve</p></div> },
      { path: 'company/jobs', Component: CompanyJobsManagement },
    ],
  },
]);