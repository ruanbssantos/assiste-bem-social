import { BarChart3, Download, FileText, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Relatorios() {
  const relatoriosDisponiveis = [
    {
      id: 1,
      titulo: 'Relatório de Beneficiários',
      descricao: 'Listagem completa dos beneficiários cadastrados com filtros personalizáveis',
      icone: Users,
      categoria: 'Beneficiários'
    },
    {
      id: 2,
      titulo: 'Relatório de Atendimentos',
      descricao: 'Histórico de atendimentos realizados por período e tipo de serviço',
      icone: FileText,
      categoria: 'Atendimentos'
    },
    {
      id: 3,
      titulo: 'Relatório Socioeconômico',
      descricao: 'Análise do perfil socioeconômico dos beneficiários cadastrados',
      icone: BarChart3,
      categoria: 'Análises'
    },
    {
      id: 4,
      titulo: 'Relatório de Produtividade',
      descricao: 'Métricas de produtividade da equipe e eficiência dos atendimentos',
      icone: TrendingUp,
      categoria: 'Gestão'
    },
    {
      id: 5,
      titulo: 'Relatório de Agendamentos',
      descricao: 'Análise de agendamentos, comparecimentos e cancelamentos',
      icone: Calendar,
      categoria: 'Agendamentos'
    },
    {
      id: 6,
      titulo: 'Relatório de Benefícios',
      descricao: 'Distribuição de benefícios por tipo, região e período',
      icone: FileText,
      categoria: 'Benefícios'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Relatórios</h1>
          <p className="text-sm text-muted-foreground">
            Gere relatórios detalhados para análise e controle
          </p>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Solicitado</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Beneficiários</div>
            <p className="text-xs text-muted-foreground">
              45% das solicitações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">
              Para gerar relatórios
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
          <CardDescription>
            Selecione o tipo de relatório que deseja gerar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatoriosDisponiveis.map((relatorio) => (
              <Card key={relatorio.id} className="relative hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <relatorio.icone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{relatorio.titulo}</CardTitle>
                      <p className="text-xs text-muted-foreground">{relatorio.categoria}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {relatorio.descricao}
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Em Desenvolvimento */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades em Desenvolvimento</CardTitle>
          <CardDescription>
            Novas funcionalidades que estarão disponíveis em breve
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Relatórios Dinâmicos</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Filtros avançados por múltiplos critérios</li>
                <li>• Gráficos interativos com drill-down</li>
                <li>• Exportação em múltiplos formatos (PDF, Excel, CSV)</li>
                <li>• Agendamento automático de relatórios</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Analytics Avançado</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Dashboards personalizáveis por usuário</li>
                <li>• Indicadores de performance (KPIs)</li>
                <li>• Comparativos históricos automáticos</li>
                <li>• Alertas inteligentes baseados em dados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}