import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { GraduationCap, Clock, BarChart, Search, Play, CheckCircle2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export function Training() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const enrolledTrainings = [
    {
      id: 1,
      title: t('advancedReactTypeScript'),
      description: t('advancedReactTypeScriptDesc'),
      progress: 65,
      duration: '12 horas',
      level: 'advanced',
      modules: 15,
      completedModules: 10,
      instructor: 'Eng. Roberto Silva',
      category: t('technology'),
    },
    {
      id: 2,
      title: t('nonVerbalCommunication'),
      description: t('nonVerbalCommunicationDesc'),
      progress: 40,
      duration: '6 horas',
      level: 'beginner',
      modules: 8,
      completedModules: 3,
      instructor: 'Prof. Mariana Costa',
      category: t('behavioralSkillsCategory'),
    },
  ];

  const availableTrainings = [
    // Habilidades Técnicas
    {
      id: 3,
      title: t('pythonDataAnalysis'),
      description: t('pythonDataAnalysisDesc'),
      duration: '16 horas',
      level: 'intermediate',
      modules: 12,
      instructor: 'Dr. Lucas Ferreira',
      category: t('technology'),
      enrolled: false,
    },
    {
      id: 4,
      title: t('accessibleUXDesign'),
      description: t('accessibleUXDesignDesc'),
      duration: '10 horas',
      level: 'intermediate',
      modules: 10,
      instructor: 'Des. Julia Santos',
      category: t('technology'),
      enrolled: false,
    },
    {
      id: 5,
      title: t('advancedExcelPowerBI'),
      description: t('advancedExcelPowerBIDesc'),
      duration: '14 horas',
      level: 'intermediate',
      modules: 11,
      instructor: 'Esp. Carlos Mendes',
      category: t('technology'),
      enrolled: false,
    },
    {
      id: 6,
      title: t('sqlDatabases'),
      description: t('sqlDatabasesDesc'),
      duration: '12 horas',
      level: 'beginner',
      modules: 10,
      instructor: 'Eng. Ana Paula',
      category: t('technology'),
      enrolled: false,
    },
    {
      id: 7,
      title: t('gitVersionControl'),
      description: t('gitVersionControlDesc'),
      duration: '8 horas',
      level: 'beginner',
      modules: 8,
      instructor: 'Dev. Pedro Alves',
      category: t('technology'),
      enrolled: false,
    },
    // Habilidades Comportamentais
    {
      id: 8,
      title: t('inclusiveLeadership'),
      description: t('inclusiveLeadershipDesc'),
      duration: '8 horas',
      level: 'intermediate',
      modules: 9,
      instructor: 'Coach Laura Freitas',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 9,
      title: t('emotionalIntelligence'),
      description: t('emotionalIntelligenceDesc'),
      duration: '6 horas',
      level: 'beginner',
      modules: 7,
      instructor: 'Psic. Renata Lima',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 10,
      title: t('conflictResolution'),
      description: t('conflictResolutionDesc'),
      duration: '5 horas',
      level: 'beginner',
      modules: 6,
      instructor: 'Med. Ricardo Santos',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 11,
      title: t('collaborativeTeamwork'),
      description: t('collaborativeTeamworkDesc'),
      duration: '6 horas',
      level: 'beginner',
      modules: 7,
      instructor: 'Fac. Beatriz Oliveira',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 12,
      title: t('timeManagement'),
      description: t('timeManagementDesc'),
      duration: '5 horas',
      level: 'beginner',
      modules: 6,
      instructor: 'Coach Fernando Costa',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 13,
      title: t('assertiveCommunication'),
      description: t('assertiveCommunicationDesc'),
      duration: '6 horas',
      level: 'beginner',
      modules: 7,
      instructor: 'Prof. Patrícia Gomes',
      category: t('behavioralSkillsCategory'),
      enrolled: false,
    },
    {
      id: 14,
      title: t('creativityInnovation'),
      description: t('creativityInnovationDesc'),
      duration: '7 horas',
      level: 'intermediate',
      modules: 8,
      instructor: 'Inov. Marcos Vieira',
      category: 'Habilidades Comportamentais',
      enrolled: false,
    },
  ];

  const completedTrainings = [
    {
      id: 15,
      title: t('librasBasic'),
      description: t('librasBasicDesc'),
      completedDate: '2024-02-15',
      certificate: true,
      duration: '20 horas',
      instructor: 'Prof. Sandra Lima',
      category: t('accessibility'),
    },
    {
      id: 16,
      title: t('diversityInclusion'),
      description: t('diversityInclusionDesc'),
      completedDate: '2024-01-20',
      certificate: true,
      duration: '5 horas',
      instructor: 'Dra. Camila Rocha',
      category: t('behavioralSkillsCategory'),
    },
    {
      id: 17,
      title: t('javaScriptFundamentals'),
      description: t('javaScriptFundamentalsDesc'),
      completedDate: '2023-12-10',
      certificate: true,
      duration: '10 horas',
      instructor: 'Dev. Felipe Souza',
      category: t('technology'),
    },
  ];

  const handleEnroll = (trainingTitle: string) => {
    toast.success(`Inscrição realizada: ${trainingTitle}`);
  };

  const getLevelBadge = (level: string) => {
    const levels: { [key: string]: { label: string; variant: string } } = {
      beginner: { label: t('beginner'), variant: 'bg-green-100 text-green-700' },
      intermediate: { label: t('intermediate'), variant: 'bg-yellow-100 text-yellow-700' },
      advanced: { label: t('advanced'), variant: 'bg-red-100 text-red-700' },
    };
    const levelInfo = levels[level] || levels.beginner;
    return <Badge className={levelInfo.variant}>{levelInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('trainingPrograms')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('developSkills')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('ongoing')}</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{enrolledTrainings.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('completed')}</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTrainings.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('totalHours')}</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">42h</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList>
          <TabsTrigger value="enrolled">{t('enrolledTrainings')}</TabsTrigger>
          <TabsTrigger value="available">{t('availableTrainings')}</TabsTrigger>
          <TabsTrigger value="completed">{t('completedTrainings')}</TabsTrigger>
        </TabsList>

        {/* Enrolled Tab */}
        <TabsContent value="enrolled" className="space-y-4 mt-6">
          {enrolledTrainings.map((training) => (
            <Card key={training.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{training.category}</Badge>
                      {getLevelBadge(training.level)}
                    </div>
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription className="mt-2">{training.description}</CardDescription>
                  </div>
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {training.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    {training.completedModules}/{training.modules} {t('modules')}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BarChart className="w-4 h-4" />
                    {training.progress}%
                  </div>
                  <div className="text-muted-foreground">
                    {t('instructorLabel')} {training.instructor}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{t('progress')}</span>
                  <span className="text-sm text-muted-foreground">{training.progress}%</span>
                </div>
                <Progress value={training.progress} />
                <Button className="w-full md:w-auto gap-2">
                  <Play className="w-4 h-4" />
                  {t('continue')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Available Tab */}
        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('search') + '...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTrainings.map((training) => (
              <Card key={training.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{training.category}</Badge>
                    {getLevelBadge(training.level)}
                  </div>
                  <CardTitle className="text-lg">{training.title}</CardTitle>
                  <CardDescription>{training.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {training.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      {training.modules} {t('modules')}
                    </div>
                    <div className="text-muted-foreground">
                      {t('instructorLabel')} {training.instructor}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEnroll(training.title)}
                    className="w-full gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    {t('enroll')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedTrainings.map((training) => (
            <Card key={training.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{training.category}</Badge>
                      <Badge className="bg-green-100 text-green-700 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('completed')}
                      </Badge>
                    </div>
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription className="mt-2">{training.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {training.duration}
                  </div>
                  <div>
                    {t('completedOn')}: {new Date(training.completedDate).toLocaleDateString('pt-BR')}
                  </div>
                  <div>
                    {training.instructor}
                  </div>
                </div>
                {training.certificate && (
                  <Button variant="outline" className="gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {t('viewCertificate')}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}