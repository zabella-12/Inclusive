import { RouterProvider } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/auth-context';
import { ThemeProvider } from './components/theme-provider';
import i18n from './i18n';
import { router } from './routes';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}