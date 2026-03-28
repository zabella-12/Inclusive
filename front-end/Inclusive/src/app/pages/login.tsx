import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { 
  Ear, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  TrendingUp, 
  Accessibility,
  Building2,
  User,
  Languages,
  Mail,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { ThemeToggle } from '../components/theme-toggle';

export function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'employee' | 'company'>('employee');
  const [showPassword, setShowPassword] = useState(false);
  
  // Employee form
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  
  // Company form
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeEmail || !employeePassword) {
      toast.error(t('fillAllFields'));
      return;
    }
    login(employeeEmail, employeePassword, 'employee');
    toast.success(t('loginSuccess'));
    navigate('/');
  };

  const handleCompanyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyEmail || !companyPassword) {
      toast.error(t('fillAllFields'));
      return;
    }
    login(companyEmail, companyPassword, 'company');
    toast.success(t('loginSuccess'));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Language Selector and Theme Toggle - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <Languages className="w-4 h-4" />
              {i18n.language === 'pt' ? 'PT' : i18n.language === 'en' ? 'EN' : 'ES'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLanguage('pt')}>
              Português (PT)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('en')}>
              English (EN)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage('es')}>
              Español (ES)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-5xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Ear className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Inclusive</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('platformSubtitle')}
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{t('welcomeBack')}</CardTitle>
            <CardDescription>
              {t('chooseAccessType')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'employee' | 'company')}>
              <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger 
                  value="employee" 
                  className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=inactive]:bg-gray-700 dark:data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:bg-blue-50 dark:data-[state=inactive]:hover:bg-blue-900/30"
                >
                  <User className="w-4 h-4" />
                  {t('employee')}
                </TabsTrigger>
                <TabsTrigger 
                  value="company" 
                  className="gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-600 dark:data-[state=inactive]:bg-gray-700 dark:data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:bg-purple-50 dark:data-[state=inactive]:hover:bg-purple-900/30"
                >
                  <Building2 className="w-4 h-4" />
                  {t('company')}
                </TabsTrigger>
              </TabsList>

              {/* Employee Login */}
              <TabsContent value="employee">
                <form onSubmit={handleEmployeeLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Ear className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            {t('accessibleAccessEmployee')}
                          </p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            {t('adaptedInterfaceEmployee')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employee-email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('email')}
                      </Label>
                      <Input
                        id="employee-email"
                        type="email"
                        placeholder={t('emailPlaceholderEmployee')}
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employee-password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {t('password')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="employee-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={employeePassword}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-muted-foreground">{t('rememberMe')}</span>
                      </label>
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {t('forgotPassword')}
                      </a>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base">
                    {t('loginAsEmployee')}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {t('noAccount')}{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      {t('requestAccess')}
                    </a>
                  </p>
                </form>
              </TabsContent>

              {/* Company Login */}
              <TabsContent value="company">
                <form onSubmit={handleCompanyLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                            {t('accessibleAccessCompany')}
                          </p>
                          <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                            {t('manageFeedbacksAndTraining')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('corporateEmail')}
                      </Label>
                      <Input
                        id="company-email"
                        type="email"
                        placeholder={t('emailPlaceholderCompany')}
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {t('password')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="company-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={companyPassword}
                          onChange={(e) => setCompanyPassword(e.target.value)}
                          required
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-muted-foreground">{t('rememberMe')}</span>
                      </label>
                      <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                        {t('forgotPassword')}
                      </a>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white">
                    {t('loginAsCompany')}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {t('wantUseInCompany')}{' '}
                    <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                      {t('requestDemo')}
                    </a>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Ear className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{t('accessibleFeatureTitle')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{t('accessibleFeatureDesc')}</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{t('feedbackFeatureTitle')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{t('feedbackFeatureDesc')}</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{t('growthFeatureTitle')}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{t('growthFeatureDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}