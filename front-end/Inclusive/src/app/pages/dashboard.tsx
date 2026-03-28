import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MessageSquare, TrendingUp, GraduationCap, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function Dashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('pendingFeedbacks'),
      value: '3',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('upcomingTraining'),
      value: '2',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('careerGoals'),
      value: '5',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const recentFeedbacks = [
    {
      id: 1,
      from: 'Maria Silva',
      type: t('positive'),
      date: '2 ' + t('days') + ' ' + t('ago'),
      preview: t('feedbackPreview1'),
    },
    {
      id: 2,
      from: 'João Santos',
      type: t('development'),
      date: '5 ' + t('days') + ' ' + t('ago'),
      preview: t('feedbackPreview2'),
    },
    {
      id: 3,
      from: 'Ana Costa',
      type: t('recognition'),
      date: '1 ' + t('week') + ' ' + t('ago'),
      preview: t('feedbackPreview3'),
    },
  ];

  const careerProgress = [
    { skill: t('leadership'), progress: 75 },
    { skill: t('communication'), progress: 85 },
    { skill: t('projectManagement'), progress: 60 },
    { skill: t('teamwork'), progress: 90 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('welcome')}, Pedro!</h1>
        <p className="text-muted-foreground mt-1">{t('welcomeMessage')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} dark:bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color} dark:brightness-125`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedbacks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('recentFeedbacks')}</CardTitle>
              <Link to="/feedback">
                <Button variant="ghost" size="sm">
                  {t('viewAll')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{feedback.from}</p>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                    </div>
                    <Badge variant="outline">{feedback.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.preview}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('myProgress')}</CardTitle>
              <Link to="/career">
                <Button variant="ghost" size="sm">
                  {t('viewAll')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <CardDescription>{t('competencies')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {careerProgress.map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.skill}</span>
                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActionsEmployee')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/feedback">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <MessageSquare className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('newFeedback')}</div>
                  <div className="text-xs text-muted-foreground">{t('giveOrReceiveFeedback')}</div>
                </div>
              </Button>
            </Link>
            <Link to="/training">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <GraduationCap className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('training')}</div>
                  <div className="text-xs text-muted-foreground">{t('continueTraining')}</div>
                </div>
              </Button>
            </Link>
            <Link to="/career">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <TrendingUp className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{t('careerPlan')}</div>
                  <div className="text-xs text-muted-foreground">{t('viewMyPlan')}</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}