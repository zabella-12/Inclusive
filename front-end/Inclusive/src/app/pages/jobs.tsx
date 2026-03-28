import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Briefcase, MapPin, Clock, Building, Search, DollarSign, Accessibility } from 'lucide-react';
import { toast } from 'sonner';

export function Jobs() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: t('systemsAnalystMid'),
      department: t('technology'),
      location: 'São Paulo, SP',
      type: 'fullTime',
      workModel: 'hybrid',
      salary: 'R$ 8.000 - R$ 11.000',
      description: t('systemsAnalystMidDesc'),
      requirements: ['Java', 'Spring Boot', '3+ anos de experiência'],
      accessible: true,
      posted: '2024-03-18',
      isInternal: true,
    },
    {
      id: 2,
      title: t('seniorUXDesigner'),
      department: t('design'),
      location: 'Remoto',
      type: 'fullTime',
      workModel: 'remote',
      salary: 'R$ 9.000 - R$ 13.000',
      description: t('seniorUXDesignerDesc'),
      requirements: ['Figma', 'Design System', 'Acessibilidade WCAG'],
      accessible: true,
      posted: '2024-03-17',
      isInternal: true,
    },
    {
      id: 3,
      title: t('projectCoordinator'),
      department: t('management'),
      location: 'Rio de Janeiro, RJ',
      type: 'fullTime',
      workModel: 'hybrid',
      salary: 'R$ 10.000 - R$ 14.000',
      description: t('projectCoordinatorDesc'),
      requirements: ['PMP ou CAPM', 'Metodologias Ágeis', 'Gestão de Equipes'],
      accessible: true,
      posted: '2024-03-16',
      isInternal: true,
    },
    {
      id: 4,
      title: t('dataSpecialist'),
      department: t('technology'),
      location: 'São Paulo, SP',
      type: 'fullTime',
      workModel: 'hybrid',
      salary: 'R$ 10.000 - R$ 15.000',
      description: t('dataSpecialistDesc'),
      requirements: ['SQL', 'Python', 'Power BI', 'Tableau'],
      accessible: true,
      posted: '2024-03-15',
      isInternal: true,
    },
    {
      id: 5,
      title: t('hrAnalystDiversity'),
      department: t('humanResources'),
      location: 'Belo Horizonte, MG',
      type: 'fullTime',
      workModel: 'hybrid',
      salary: 'R$ 6.500 - R$ 9.000',
      description: t('hrAnalystDiversityDesc'),
      requirements: ['Gestão de Pessoas', 'Programas de D&I', 'Comunicação'],
      accessible: true,
      posted: '2024-03-14',
      isInternal: true,
    },
    {
      id: 6,
      title: t('techLeadFrontend'),
      department: t('technology'),
      location: 'Remoto',
      type: 'fullTime',
      workModel: 'remote',
      salary: 'R$ 14.000 - R$ 20.000',
      description: t('techLeadFrontendDesc'),
      requirements: ['React', 'TypeScript', 'Liderança Técnica', '5+ anos'],
      accessible: true,
      posted: '2024-03-13',
      isInternal: true,
    },
    {
      id: 7,
      title: t('digitalMarketingAnalyst'),
      department: t('marketing'),
      location: 'São Paulo, SP',
      type: 'fullTime',
      workModel: 'hybrid',
      salary: 'R$ 5.500 - R$ 8.000',
      description: t('digitalMarketingAnalystDesc'),
      requirements: ['Marketing Digital', 'Google Analytics', 'SEO', 'Redes Sociais'],
      accessible: true,
      posted: '2024-03-12',
      isInternal: true,
    },
    {
      id: 8,
      title: t('qaEngineer'),
      department: t('technology'),
      location: 'Remoto',
      type: 'fullTime',
      workModel: 'remote',
      salary: 'R$ 7.000 - R$ 10.000',
      description: t('qaEngineerDesc'),
      requirements: ['Testes Automatizados', 'Selenium', 'Acessibilidade', 'CI/CD'],
      accessible: true,
      posted: '2024-03-11',
      isInternal: true,
    },
  ];

  const myApplications = [
    {
      id: 101,
      title: t('techLeadFrontend'),
      department: t('technology'),
      appliedDate: '2024-03-10',
      status: t('underReview'),
      location: 'Remoto',
      workModel: 'remote',
    },
    {
      id: 102,
      title: t('projectCoordinator'),
      department: t('management'),
      appliedDate: '2024-03-05',
      status: t('interviewScheduled'),
      location: 'Rio de Janeiro, RJ',
      workModel: 'hybrid',
      interviewDate: '2024-03-22',
    },
  ];

  const handleApply = (jobTitle: string) => {
    toast.success(`Candidatura enviada: ${jobTitle}`);
  };

  const getWorkModelLabel = (model: string) => {
    const models: { [key: string]: string } = {
      remote: t('remote'),
      hybrid: t('hybrid'),
      onsite: t('onsite'),
    };
    return models[model] || model;
  };

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      fullTime: t('fullTime'),
      partTime: t('partTime'),
      contract: t('contract'),
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('internalJobsTitle')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('internalJobsSubtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('openPositions')}</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{openPositions.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('myApplications')}</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{myApplications.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('accessibleJobsLabel')}</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{openPositions.filter(j => j.accessible).length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="open" className="w-full">
        <TabsList>
          <TabsTrigger value="open">{t('openPositions')}</TabsTrigger>
          <TabsTrigger value="applications">{t('myApplications')}</TabsTrigger>
        </TabsList>

        {/* Open Positions Tab */}
        <TabsContent value="open" className="space-y-4 mt-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('search') + '...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('location')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allLocationsFilter')}</SelectItem>
                <SelectItem value="remote">{t('remote')}</SelectItem>
                <SelectItem value="hybrid">{t('hybrid')}</SelectItem>
                <SelectItem value="onsite">{t('onsite')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {openPositions.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge>{getWorkModelLabel(job.workModel)}</Badge>
                        {job.accessible && (
                          <Badge className="bg-purple-100 text-purple-700 gap-1">
                            <Accessibility className="w-3 h-3" />
                            {t('accessible')}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="mt-2">{job.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {getTypeLabel(job.type)}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('requirementsLabel')}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {t('publishedOnLabel')} {new Date(job.posted).toLocaleDateString('pt-BR')}
                    </span>
                    <Button onClick={() => handleApply(job.title)} className="gap-2">
                      <Briefcase className="w-4 h-4" />
                      {t('applyNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="applications" className="space-y-4 mt-6">
          {myApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{application.department}</Badge>
                      <Badge>{getWorkModelLabel(application.workModel)}</Badge>
                      <Badge className="bg-blue-100 text-blue-700">{application.status}</Badge>
                    </div>
                    <CardTitle className="text-xl">{application.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {application.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t('applicationOnLabel')} {new Date(application.appliedDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {myApplications.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Você ainda não se candidatou a nenhuma vaga</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}