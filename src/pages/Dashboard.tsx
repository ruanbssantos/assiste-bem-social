import { Users, Calendar, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useBeneficiarios } from '@/hooks/useBeneficiarios';

export function Dashboard() {
  const { beneficiarios, loading } = useBeneficiarios();

  // Dados mock para demonstração
  const stats = {
    totalBeneficiarios: beneficiarios.length,
    beneficiariosAtivos: beneficiarios.filter(b => b.status === 'ativo').length,
    atendimentosHoje: 8,
    agendamentosProximos: 15,
  };

  const atendimentosRecentes = [
    {
      id: 1,
      beneficiario: 'Maria das Graças Santos',
      tipo: 'Renovação de Benefício',
      horario: '14:30',
      status: 'concluido'
    },
    {
      id: 2,
      beneficiario: 'João Silva Oliveira',
      tipo: 'Primeira Consulta',
      horario: '15:00',
      status: 'em_andamento'
    },
    {
      id: 3,
      beneficiario: 'Ana Costa Ferreira',
      tipo: 'Acompanhamento',
      horario: '15:30',
      status: 'agendado'
    },
  ];

  const agendamentosProximos = [
    {
      id: 1,
      beneficiario: 'Carlos Santos',
      data: '2024-01-16',
      horario: '09:00',
      tipo: 'Avaliação Socioeconômica'
    },
    {
      id: 2,
      beneficiario: 'Fernanda Lima',
      data: '2024-01-16',
      horario: '10:30',
      tipo: 'Renovação de Documentos'
    },
    {
      id: 3,
      beneficiario: 'Roberto Oliveira',
      data: '2024-01-16',
      horario: '14:00',
      tipo: 'Entrega de Benefício'
    },
  ];

  const alertas = [
    {
      id: 1,
      tipo: 'documento_vencendo',
      mensagem: 'Ana Costa - RG vence em 7 dias',
      urgencia: 'media'
    },
    {
      id: 2,
      tipo: 'beneficio_pendente',
      mensagem: '3 benefícios aguardando aprovação',
      urgencia: 'alta'
    },
    {
      id: 3,
      tipo: 'agendamento_cancelado',
      mensagem: 'João Silva cancelou atendimento de amanhã',
      urgencia: 'baixa'
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      concluido: 'default',
      em_andamento: 'secondary',
      agendado: 'outline'
    } as const;

    const labels = {
      concluido: 'Concluído',
      em_andamento: 'Em Andamento',
      agendado: 'Agendado'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getAlertaBadge = (urgencia: string) => {
    const variants = {
      alta: 'destructive',
      media: 'default',
      baixa: 'secondary'
    } as const;

    return (
      <Badge variant={variants[urgencia as keyof typeof variants]} className="text-xs">
        {urgencia.charAt(0).toUpperCase() + urgencia.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do sistema de assistência social
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBeneficiarios}</div>
            <p className="text-xs text-muted-foreground">
              {stats.beneficiariosAtivos} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos Hoje</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.atendimentosHoje}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.agendamentosProximos}</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Atendimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +5% desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atendimentos de Hoje */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atendimentos de Hoje
            </CardTitle>
            <CardDescription>
              Acompanhe os atendimentos do dia atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atendimentosRecentes.map((atendimento) => (
                <div key={atendimento.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{atendimento.beneficiario}</p>
                    <p className="text-xs text-muted-foreground">{atendimento.tipo}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{atendimento.horario}</p>
                    {getStatusBadge(atendimento.status)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/atendimentos">Ver Todos os Atendimentos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Agendamentos
            </CardTitle>
            <CardDescription>
              Agendamentos para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agendamentosProximos.map((agendamento) => (
                <div key={agendamento.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{agendamento.beneficiario}</p>
                    <p className="text-xs text-muted-foreground">{agendamento.tipo}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">
                      {new Date(agendamento.data).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit' 
                      })} às {agendamento.horario}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/agendamentos">Ver Todos os Agendamentos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Alertas e Notificações
          </CardTitle>
          <CardDescription>
            Itens que precisam de atenção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{alerta.mensagem}</p>
                </div>
                {getAlertaBadge(alerta.urgencia)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às funcionalidades mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col gap-2">
              <Link to="/beneficiarios/novo">
                <Users className="h-6 w-6" />
                Novo Beneficiário
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link to="/atendimentos/novo">
                <FileText className="h-6 w-6" />
                Novo Atendimento
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link to="/agendamentos/novo">
                <Calendar className="h-6 w-6" />
                Agendar Consulta
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link to="/relatorios">
                <TrendingUp className="h-6 w-6" />
                Ver Relatórios
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}