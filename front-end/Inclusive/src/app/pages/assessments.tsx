import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  ClipboardCheck, 
  TrendingUp, 
  Award, 
  Target, 
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function Assessments() {
  const { t } = useTranslation();

  const skillsOverview = [
    {
      category: t('technicalSkillsCategory'),
      level: 72,
      assessments: 5,
      lastUpdate: '2024-03-18',
      color: 'blue',
    },
    {
      category: t('behavioralSkillsCategory'),
      level: 85,
      assessments: 4,
      lastUpdate: '2024-03-15',
      color: 'green',
    },
    {
      category: t('communicationCategory'),
      level: 90,
      assessments: 3,
      lastUpdate: '2024-03-10',
      color: 'purple',
    },
    {
      category: t('leadershipCategory'),
      level: 65,
      assessments: 2,
      lastUpdate: '2024-03-05',
      color: 'orange',
    },
  ];

  const availableAssessments = [
    {
      id: 1,
      title: t('advancedJavaScriptAssessment'),
      category: t('technology'),
      duration: '45 min',
      questions: 30,
      difficulty: 'advanced',
      description: t('advancedJavaScriptAssessmentDesc'),
      icon: '💻',
    },
    {
      id: 2,
      title: t('assertiveCommunicationAssessment'),
      category: t('behavioralSkillsCategory'),
      duration: '30 min',
      questions: 20,
      difficulty: 'intermediate',
      description: t('assertiveCommunicationAssessmentDesc'),
      icon: '💬',
    },
    {
      id: 3,
      title: t('timeManagementAssessment'),
      category: t('behavioralSkillsCategory'),
      duration: '25 min',
      questions: 15,
      difficulty: 'beginner',
      description: t('timeManagementAssessmentDesc'),
      icon: '⏰',
    },
    {
      id: 4,
      title: t('reactTypeScriptAssessment'),
      category: t('technology'),
      duration: '50 min',
      questions: 35,
      difficulty: 'advanced',
      description: t('reactTypeScriptAssessmentDesc'),
      icon: '⚛️',
    },
    {
      id: 5,
      title: t('teamworkAssessment'),
      category: t('behavioralSkillsCategory'),
      duration: '20 min',
      questions: 12,
      difficulty: 'beginner',
      description: t('teamworkAssessmentDesc'),
      icon: '🤝',
    },
    {
      id: 6,
      title: t('sqlAssessment'),
      category: t('technology'),
      duration: '40 min',
      questions: 25,
      difficulty: 'intermediate',
      description: t('sqlAssessmentDesc'),
      icon: '🗄️',
    },
  ];

  const completedAssessments = [
    {
      id: 1,
      title: t('pythonFundamentalsResult'),
      category: t('technology'),
      completedDate: '2024-03-18',
      score: 85,
      level: t('intermediateLevel'),
      recommendations: [t('pythonDataAnalysis'), 'Programação Orientada a Objetos'],
    },
    {
      id: 2,
      title: t('emotionalIntelligenceResult'),
      category: t('behavioralSkillsCategory'),
      completedDate: '2024-03-15',
      score: 92,
      level: t('advancedLevel'),
      recommendations: [t('inclusiveLeadership'), 'Coaching e Mentoria'],
    },
    {
      id: 3,
      title: t('designThinkingResult'),
      category: t('innovationCategory'),
      completedDate: '2024-03-10',
      score: 78,
      level: t('intermediateLevel'),
      recommendations: [t('creativityInnovation'), 'UX Design'],
    },
  ];

  const handleStartAssessment = (title: string) => {
    toast.success(`Iniciando avaliação: ${title}`);
  };

  const handleViewResults = (title: string) => {
    toast.info(`Visualizando resultados: ${title}`);
  };

  const getLevelBadge = (level: string) => {
    const levels: { [key: string]: { label: string; variant: string } } = {
      beginner: { label: t('beginner'), variant: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
      intermediate: { label: t('intermediate'), variant: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
      advanced: { label: t('advanced'), variant: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    };
    const levelInfo = levels[level] || levels.beginner;
    return <Badge className={levelInfo.variant}>{levelInfo.label}</Badge>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-600 dark:bg-green-500';
    if (level >= 60) return 'bg-yellow-600 dark:bg-yellow-500';
    return 'bg-orange-600 dark:bg-orange-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('assessments')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('assessYourSkills')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('completedAssessments')}</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{completedAssessments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('overallAverage')}</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">85%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('certificates')}</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">2</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('nextLevel')}</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">78%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('skillsOverview')}</CardTitle>
          <CardDescription>{t('currentLevelCategories')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillsOverview.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{skill.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {skill.assessments} {t('assessmentsCount')} • {t('lastUpdate')}{' '}
                      {new Date(skill.lastUpdate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(skill.level)}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={skill.level} className="h-3" />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full ${getLevelColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="available" className="w-full">
        <TabsList>
          <TabsTrigger value="available">{t('availableAssessments')}</TabsTrigger>
          <TabsTrigger value="completed">{t('completedTab')}</TabsTrigger>
        </TabsList>

        {/* Available Assessments Tab */}
        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableAssessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-3xl">{assessment.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{assessment.category}</Badge>
                          {getLevelBadge(assessment.difficulty)}
                        </div>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {assessment.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClipboardCheck className="w-4 h-4" />
                      {assessment.questions} {t('questions')}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleStartAssessment(assessment.title)}
                    className="w-full gap-2"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    {t('startAssessment')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Assessments Tab */}
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{assessment.category}</Badge>
                      <Badge className="bg-green-100 text-green-700 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('completedStatus')}
                      </Badge>
                    </div>
                    <CardTitle>{assessment.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {t('completedDate')} {new Date(assessment.completedDate).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(assessment.score)}`}>
                      {assessment.score}%
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t('levelLabel')} {assessment.level}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {t('recommendedTrainings')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.recommendations.map((rec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {rec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleViewResults(assessment.title)}
                    className="flex-1 gap-2"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    {t('viewDetailedResults')}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Award className="w-4 h-4" />
                    {t('certificateLabel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-700 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-blue-900 dark:text-blue-200">{t('personalizedRecommendations')}</CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-400 mt-1">
                {t('recommendationsIntro')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-blue-900 dark:text-blue-200">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{t('recommendationLeadership')}</strong> {t('recommendationLeadershipDesc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-blue-900 dark:text-blue-200">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{t('recommendationTech')}</strong> {t('recommendationTechDesc')}
              </span>
            </li>
            <li className="flex items-start gap-2 text-blue-900 dark:text-blue-200">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{t('recommendationUpdate')}</strong> {t('recommendationUpdateDesc')}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}