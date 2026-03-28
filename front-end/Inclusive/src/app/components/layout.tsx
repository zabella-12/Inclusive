import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  GraduationCap,
  Briefcase,
  User,
  Menu,
  X,
  Languages,
  Ear,
  LogOut,
  Users,
  BarChart3,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth } from '../context/auth-context';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, userType, logout } = useAuth();

  // Navigation based on user type
  const employeeNavigation = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('feedback'), href: '/feedback', icon: MessageSquare },
    { name: t('career'), href: '/career', icon: TrendingUp },
    { name: t('training'), href: '/training', icon: GraduationCap },
    { name: t('assessments'), href: '/assessments', icon: ClipboardCheck },
    { name: t('jobs'), href: '/jobs', icon: Briefcase },
    { name: t('profile'), href: '/profile', icon: User },
  ];

  const companyNavigation = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('team'), href: '/company/team', icon: Users },
    { name: t('feedback'), href: '/feedback', icon: MessageSquare },
    { name: t('reports'), href: '/company/reports', icon: BarChart3 },
    { name: t('training'), href: '/training', icon: GraduationCap },
    { name: t('internalJobs'), href: '/company/jobs', icon: Briefcase },
    { name: t('profile'), href: '/profile', icon: User },
  ];

  const navigation = userType === 'company' ? companyNavigation : employeeNavigation;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 ${
                  userType === 'company' ? 'bg-purple-600' : 'bg-blue-600'
                } rounded-lg flex items-center justify-center`}
              >
                <Ear className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">InclusiveFB</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${
                  userType === 'company' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-blue-100 dark:bg-blue-900'
                } flex items-center justify-center`}
              >
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userType === 'company' ? t('manager') : user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? userType === 'company'
                        ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language selector and Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Languages className="w-4 h-4" />
                  {i18n.language === 'pt'
                    ? 'Português'
                    : i18n.language === 'en'
                    ? 'English'
                    : 'Español'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => changeLanguage('pt')}>
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 ${
                userType === 'company' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              } rounded-full text-sm flex items-center gap-1`}
            >
              <Ear className="w-4 h-4" />
              {t('accessibility')}
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}