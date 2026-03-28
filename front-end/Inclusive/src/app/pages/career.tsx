import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TrendingUp, Target, CheckCircle2, Circle, Clock, BookOpen } from 'lucide-react';

export function Career() {
  const { t } = useTranslation();

  const currentPosition = {
    title: t('systemsAnalyst'),
    department: t('technology'),
    level: t('mid'),
    since: '2022',
  };

  const nextGoal = {
    title: t('seniorSystemsAnalyst'),
    estimatedTime: '12-18 ' + t('monthsShort'),
    progress: 65,
  };

  const competencies = [
    { name: t('teamLeadership'), current: 75, required: 85, status: 'inProgress' },
    { name: t('softwareArchitecture'), current: 60, required: 80, status: 'inProgress' },
    { name: t('communication'), current: 90, required: 85, status: 'completed' },
    { name: t('projectManagement'), current: 55, required: 75, status: 'notStarted' },
    { name: t('mentoring'), current: 40, required: 70, status: 'notStarted' },
  ];

  const milestones = [
    {
      id: 1,
      title: t('milestone1Title'),
      description: t('milestone1Desc'),
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: t('milestone2Title'),
      description: t('milestone2Desc'),
      status: 'inProgress',
      date: '2024-06-30',
    },
    {
      id: 3,
      title: t('milestone3Title'),
      description: t('milestone3Desc'),
      status: 'inProgress',
      date: '2024-08-30',
    },
    {
      id: 4,
      title: t('milestone4Title'),
      description: t('milestone4Desc'),
      status: 'notStarted',
      date: '2024-10-30',
    },
  ];

  const developmentPlan = [
    {
      area: t('technical'),
      actions: [
        t('action1Tech'),
        t('action2Tech'),
        t('action3Tech'),
      ],
    },
    {
      area: t('leadershipArea'),
      actions: [
        t('action1Leadership'),
        t('action2Leadership'),
        t('action3Leadership'),
      ],
    },
    {
      area: t('communicationArea'),
      actions: [
        t('action1Comm'),
        t('action2Comm'),
        t('action3Comm'),
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">{t('completed')}</Badge>;
      case 'inProgress':
        return <Badge className="bg-blue-100 text-blue-700">{t('inProgress')}</Badge>;
      default:
        return <Badge variant="outline">{t('notStarted')}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('careerPlan')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('trackYourDevelopment')}
        </p>
      </div>

      {/* Current Position & Next Goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {t('currentPosition')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentPosition.title}</p>
              <p className="text-muted-foreground">{currentPosition.department}</p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Badge variant="outline">{currentPosition.level}</Badge>
              <span className="text-sm text-muted-foreground">{t('since')} {currentPosition.since}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              {t('nextGoal')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{nextGoal.title}</p>
              <p className="text-muted-foreground text-sm mt-1">
                {t('estimatedTime')}: {nextGoal.estimatedTime}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t('progressLabel')}</span>
                <span className="text-sm text-muted-foreground">{nextGoal.progress}%</span>
              </div>
              <Progress value={nextGoal.progress} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="competencies" className="w-full">
        <TabsList>
          <TabsTrigger value="competencies">{t('competencies')}</TabsTrigger>
          <TabsTrigger value="milestones">{t('milestones')}</TabsTrigger>
          <TabsTrigger value="development">{t('developmentPlan')}</TabsTrigger>
        </TabsList>

        {/* Competencies Tab */}
        <TabsContent value="competencies" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('skillsNeeded')}</CardTitle>
              <CardDescription>
                {t('skillsNeededDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {competencies.map((competency) => (
                <div key={competency.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(competency.status)}
                      <span className="font-medium">{competency.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {competency.current}% / {competency.required}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={competency.current} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{t('currentLevel')}</span>
                      <span>{t('requiredLevel')}: {competency.required}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('milestones')}</CardTitle>
              <CardDescription>
                {t('milestonesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col items-center">
                      {getStatusIcon(milestone.status)}
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        </div>
                        {getStatusBadge(milestone.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('deadline')}: {new Date(milestone.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Development Plan Tab */}
        <TabsContent value="development" className="space-y-4 mt-6">
          {developmentPlan.map((plan) => (
            <Card key={plan.area}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  {plan.area}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2" />
                      <span className="text-gray-700 dark:text-gray-200">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}