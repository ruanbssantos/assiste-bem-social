import { Calendar, Clock, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Agendamentos() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Agendamentos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie agendamentos de consultas e atendimentos
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Hoje
            </CardTitle>
            <CardDescription>
              Agendamentos para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              3 concluídos, 3 pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Esta Semana
            </CardTitle>
            <CardDescription>
              Próximos agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Distribuídos em 5 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Taxa de Comparecimento
            </CardTitle>
            <CardDescription>
              Beneficiários que compareceram
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
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
            O módulo de agendamentos estará disponível em breve. Ele incluirá:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Calendário interativo para agendamentos</li>
            <li>• Notificações automáticas por SMS/WhatsApp</li>
            <li>• Gestão de horários por profissional</li>
            <li>• Lista de espera automatizada</li>
            <li>• Reagendamento online</li>
            <li>• Relatórios de no-show e comparecimento</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}