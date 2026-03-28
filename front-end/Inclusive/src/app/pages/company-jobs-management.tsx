import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Briefcase, Plus, Eye, Edit2, Users, TrendingUp, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function CompanyJobsManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    workModel: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
  });

  const activeJobs = [
    {
      id: 1,
      title: 'Tech Lead - Desenvolvimento Frontend',
      department: 'Tecnologia',
      location: 'Remoto',
      workModel: 'Remoto',
      type: 'Tempo Integral',
      salary: 'R$ 14.000 - R$ 20.000',
      posted: '2024-03-13',
      applications: 8,
      status: 'Ativa',
      isInternal: true,
    },
    {
      id: 2,
      title: 'Designer UX/UI Sênior',
      department: 'Design',
      location: 'Remoto',
      workModel: 'Remoto',
      type: 'Tempo Integral',
      salary: 'R$ 9.000 - R$ 13.000',
      posted: '2024-03-17',
      applications: 12,
      status: 'Ativa',
      isInternal: true,
    },
    {
      id: 3,
      title: 'Coordenador de Projetos',
      department: 'Gestão',
      location: 'Rio de Janeiro, RJ',
      workModel: 'Híbrido',
      type: 'Tempo Integral',
      salary: 'R$ 10.000 - R$ 14.000',
      posted: '2024-03-16',
      applications: 15,
      status: 'Ativa',
      isInternal: true,
    },
    {
      id: 4,
      title: 'Analista de RH - Diversidade e Inclusão',
      department: 'Recursos Humanos',
      location: 'Belo Horizonte, MG',
      workModel: 'Híbrido',
      type: 'Tempo Integral',
      salary: 'R$ 6.500 - R$ 9.000',
      posted: '2024-03-14',
      applications: 9,
      status: 'Ativa',
      isInternal: true,
    },
    {
      id: 5,
      title: 'Especialista em Dados e BI',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      workModel: 'Híbrido',
      type: 'Tempo Integral',
      salary: 'R$ 10.000 - R$ 15.000',
      posted: '2024-03-15',
      applications: 11,
      status: 'Ativa',
      isInternal: true,
    },
    {
      id: 6,
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      location: 'São Paulo, SP',
      workModel: 'Híbrido',
      type: 'Tempo Integral',
      salary: 'R$ 5.500 - R$ 8.000',
      posted: '2024-03-12',
      applications: 18,
      status: 'Ativa',
      isInternal: true,
    },
  ];

  const closedJobs = [
    {
      id: 7,
      title: 'Analista de Sistemas Pleno',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      posted: '2024-02-20',
      closedDate: '2024-03-10',
      applications: 22,
      hired: 1,
      status: 'Preenchida',
      hiredName: 'Pedro Henrique Silva',
    },
    {
      id: 8,
      title: 'Assistente Administrativo',
      department: 'Administrativo',
      location: 'Belo Horizonte, MG',
      posted: '2024-02-15',
      closedDate: '2024-03-05',
      applications: 28,
      hired: 1,
      status: 'Preenchida',
      hiredName: 'Juliana Costa',
    },
    {
      id: 9,
      title: 'Analista Financeiro Junior',
      department: 'Financeiro',
      location: 'São Paulo, SP',
      posted: '2024-01-25',
      closedDate: '2024-02-18',
      applications: 34,
      hired: 1,
      status: 'Preenchida',
      hiredName: 'Roberto Almeida',
    },
  ];

  const topCandidates = [
    {
      id: 1,
      name: 'Mariana Silva',
      position: 'Tech Lead - Desenvolvimento Frontend',
      appliedDate: '2024-03-14',
      score: 96,
      status: 'Entrevista Agendada',
      accessibility: 'Deficiência Auditiva',
    },
    {
      id: 2,
      name: 'João Pedro Santos',
      position: 'Designer UX/UI Sênior',
      appliedDate: '2024-03-18',
      score: 94,
      status: 'Em Análise',
      accessibility: 'Mudez',
    },
    {
      id: 3,
      name: 'Ana Paula Costa',
      position: 'Coordenador de Projetos',
      appliedDate: '2024-03-17',
      score: 92,
      status: 'Entrevista Agendada',
      accessibility: null,
    },
    {
      id: 4,
      name: 'Carlos Eduardo Lima',
      position: 'Especialista em Dados e BI',
      appliedDate: '2024-03-16',
      score: 89,
      status: 'Em Análise',
      accessibility: 'Deficiência Auditiva',
    },
    {
      id: 5,
      name: 'Fernanda Oliveira',
      position: 'Analista de Marketing Digital',
      appliedDate: '2024-03-13',
      score: 87,
      status: 'Aprovado para próxima fase',
      accessibility: null,
    },
  ];

  const handleCreateJob = () => {
    if (!formData.title || !formData.department || !formData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    toast.success('Vaga criada com sucesso!');
    setOpenDialog(false);
    resetForm();
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      workModel: job.workModel,
      type: job.type,
      salary: job.salary,
      description: '',
      requirements: '',
    });
    setOpenDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      workModel: '',
      type: '',
      salary: '',
      description: '',
      requirements: '',
    });
    setEditingJob(null);
  };

  const totalApplications = activeJobs.reduce((sum, job) => sum + job.applications, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas Internas</h1>
          <p className="text-gray-600 mt-1">
            Crie e gerencie oportunidades de crescimento para seus colaboradores
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => { resetForm(); setOpenDialog(true); }}>
              <Plus className="w-4 h-4" />
              Nova Vaga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Editar Vaga' : 'Criar Nova Vaga'}</DialogTitle>
              <DialogDescription>
                Preencha as informações da vaga interna. Todas as vagas são acessíveis por padrão.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Vaga *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Analista de Sistemas Sênior"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="Gestão">Gestão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Ex: São Paulo, SP"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workModel">Modelo de Trabalho</Label>
                  <Select value={formData.workModel} onValueChange={(value) => setFormData({ ...formData, workModel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remoto">Remoto</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Contrato</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tempo Integral">Tempo Integral</SelectItem>
                      <SelectItem value="Meio Período">Meio Período</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Faixa Salarial</Label>
                <Input
                  id="salary"
                  placeholder="Ex: R$ 8.000 - R$ 12.000"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva as responsabilidades e o que esperamos do profissional..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos (um por linha)</Label>
                <Textarea
                  id="requirements"
                  placeholder="React&#10;TypeScript&#10;3+ anos de experiência"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setOpenDialog(false); resetForm(); }}>
                Cancelar
              </Button>
              <Button onClick={handleCreateJob}>
                {editingJob ? 'Salvar Alterações' : 'Criar Vaga'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vagas Ativas</p>
                <p className="text-3xl font-bold text-blue-600">{activeJobs.length}</p>
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
                <p className="text-sm text-gray-600">Total de Candidaturas</p>
                <p className="text-3xl font-bold text-green-600">{totalApplications}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vagas Preenchidas</p>
                <p className="text-3xl font-bold text-purple-600">{closedJobs.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tempo Médio</p>
                <p className="text-3xl font-bold text-orange-600">18d</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Vagas Ativas ({activeJobs.length})</TabsTrigger>
              <TabsTrigger value="closed">Preenchidas ({closedJobs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 mt-6">
              {activeJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline">{job.department}</Badge>
                          <Badge>{job.workModel}</Badge>
                          <Badge className="bg-green-100 text-green-700">{job.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {job.location} • {job.type}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Candidaturas</p>
                        <p className="text-lg font-semibold">{job.applications}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Publicada em</p>
                        <p className="text-sm">{new Date(job.posted).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1 flex-1">
                        <Eye className="w-4 h-4" />
                        Ver Candidatos
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 flex-1" onClick={() => handleEditJob(job)}>
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4 mt-6">
              {closedJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{job.department}</Badge>
                          <Badge className="bg-gray-100 text-gray-700">{job.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-2">{job.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Candidaturas</p>
                        <p className="font-semibold">{job.applications}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Contratados</p>
                        <p className="font-semibold">{job.hired}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Encerrada em</p>
                        <p className="text-xs">{new Date(job.closedDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Top Candidates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Principais Candidatos</CardTitle>
              <CardDescription>Melhores matches das vagas ativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCandidates.map((candidate) => (
                  <div key={candidate.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{candidate.name}</p>
                        <p className="text-xs text-gray-600 truncate">{candidate.position}</p>
                      </div>
                      <Badge variant="outline" className="text-xs ml-2">
                        {candidate.score}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {new Date(candidate.appliedDate).toLocaleDateString('pt-BR')}
                      </span>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}