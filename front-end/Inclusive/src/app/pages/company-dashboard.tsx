import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Users, MessageSquare, TrendingUp, Briefcase, UserCheck, AlertCircle, Award } from 'lucide-react';
import { Link } from 'react-router';

export function CompanyDashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('totalEmployees'),
      value: '248',
      change: '+12',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('pendingFeedbacksShort'),
      value: '18',
      change: '-5',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: t('openJobsCount'),
      value: '7',
      change: '+2',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('inclusionRate'),
      value: '94%',
      change: '+3%',
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const teamMetrics = [
    {
      department: t('technology'),
      employees: 85,
      feedbacksCompleted: 92,
      avgSatisfaction: 4.5,
      trend: 'up',
    },
    {
      department: t('humanResources'),
      employees: 24,
      feedbacksCompleted: 100,
      avgSatisfaction: 4.8,
      trend: 'up',
    },
    {
      department: t('sales'),
      employees: 67,
      feedbacksCompleted: 88,
      avgSatisfaction: 4.3,
      trend: 'up',
    },
    {
      department: t('marketing'),
      employees: 42,
      feedbacksCompleted: 95,
      avgSatisfaction: 4.6,
      trend: 'up',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'feedback',
      message: 'Maria Silva deu feedback para João Santos',
      department: t('technology'),
      time: `15 ${t('minutesAgoShort')}`,
      icon: MessageSquare,
      color: 'text-blue-600',
    },
    {
      id: 2,
      type: 'training',
      message: `12 ${t('collaborators')} concluíram "Comunicação Acessível"`,
      department: 'Geral',
      time: `1 ${t('hoursAgoShort')}`,
      icon: Award,
      color: 'text-green-600',
    },
    {
      id: 3,
      type: 'job',
      message: 'Nova candidatura recebida para "Desenvolvedor Full Stack"',
      department: t('technology'),
      time: `2 ${t('hoursAgoShort')}`,
      icon: Briefcase,
      color: 'text-purple-600',
    },
    {
      id: 4,
      type: 'alert',
      message: '5 feedbacks 1:1 precisam ser agendados esta semana',
      department: 'RH',
      time: `3 ${t('hoursAgoShort')}`,
      icon: AlertCircle,
      color: 'text-orange-600',
    },
  ];

  const accessibilityStats = [
    { need: t('hearingImpairment'), count: 18, percentage: 7.3 },
    { need: t('muteness'), count: 8, percentage: 3.2 },
    { need: t('both'), count: 5, percentage: 2.0 },
    { need: t('others'), count: 12, percentage: 4.8 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('companyDashboard')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('companyOverview')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} dark:bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color} dark:brightness-125`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>{t('departmentMetrics')}</CardTitle>
            <CardDescription>{t('performanceAndSatisfaction')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMetrics.map((dept) => (
                <div key={dept.department} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{dept.department}</p>
                      <p className="text-sm text-muted-foreground">{dept.employees} {t('collaborators')}</p>
                    </div>
                    <TrendingUp className={`w-5 h-5 ${dept.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Feedbacks</p>
                      <p className="font-semibold">{dept.feedbacksCompleted}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('avgSatisfaction')}</p>
                      <p className="font-semibold">{dept.avgSatisfaction}/5.0</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivities')}</CardTitle>
            <CardDescription>{t('latestUpdates')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.department}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            {t('accessibilityOverview')}
          </CardTitle>
          <CardDescription>
            {t('employeesWithNeeds')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessibilityStats.map((stat) => (
              <div key={stat.need} className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{stat.need}</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">{stat.count}</p>
                <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">{stat.percentage}% do total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/company/team">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <Users className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('manageTeam')}</div>
                  <div className="text-xs text-muted-foreground">{t('viewAllEmployees')}</div>
                </div>
              </Button>
            </Link>
            <Link to="/company/reports">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <TrendingUp className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('viewReports')}</div>
                  <div className="text-xs text-gray-500">{t('analysisAndMetrics')}</div>
                </div>
              </Button>
            </Link>
            <Link to="/company/jobs">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <Briefcase className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('manageJobs')}</div>
                  <div className="text-xs text-gray-500">{t('createAndPublish')}</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}