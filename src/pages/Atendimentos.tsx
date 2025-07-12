import { Calendar, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Atendimentos() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Atendimentos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os atendimentos realizados e agendados
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Atendimento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Atendimentos Hoje
            </CardTitle>
            <CardDescription>
              Atendimentos realizados no dia atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agendados
            </CardTitle>
            <CardDescription>
              Próximos atendimentos agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conclusão</CardTitle>
            <CardDescription>
              Atendimentos concluídos vs agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +5% desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em Desenvolvimento</CardTitle>
          <CardDescription>
            Esta funcionalidade está sendo desenvolvida
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O módulo de atendimentos estará disponível em breve. Ele incluirá:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Registro detalhado de atendimentos</li>
            <li>• Histórico completo por beneficiário</li>
            <li>• Agendamento de consultas</li>
            <li>• Relatórios de produtividade</li>
            <li>• Integração com o cadastro de beneficiários</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}