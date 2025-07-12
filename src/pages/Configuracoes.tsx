import { Settings, User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações do sistema e preferências do usuário
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configurações do Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil do Usuário
            </CardTitle>
            <CardDescription>
              Suas informações pessoais e preferências
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" defaultValue="Maria da Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue="admin@assistencia.gov.br" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setor">Setor</Label>
              <Input id="setor" defaultValue="Coordenação Geral" />
            </div>
            <Button className="w-full">Salvar Alterações</Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como receber alertas e notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>E-mail</Label>
                <p className="text-xs text-muted-foreground">
                  Receber notificações por e-mail
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novos Beneficiários</Label>
                <p className="text-xs text-muted-foreground">
                  Alertas sobre novos cadastros
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Documentos Vencendo</Label>
                <p className="text-xs text-muted-foreground">
                  Avisos de documentos próximos ao vencimento
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Diários</Label>
                <p className="text-xs text-muted-foreground">
                  Resumo diário das atividades
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança e privacidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Configurar 2FA
            </Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sessão Automática</Label>
                <p className="text-xs text-muted-foreground">
                  Logout automático após inatividade
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Log de Auditoria</Label>
                <p className="text-xs text-muted-foreground">
                  Registrar todas as ações do usuário
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>
              Configurações gerais da aplicação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Escuro</Label>
                <p className="text-xs text-muted-foreground">
                  Alternar entre tema claro e escuro
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sidebar Compacta</Label>
                <p className="text-xs text-muted-foreground">
                  Menu lateral sempre recolhido
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animações</Label>
                <p className="text-xs text-muted-foreground">
                  Habilitar animações da interface
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="items-per-page">Itens por Página</Label>
              <select 
                id="items-per-page"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                defaultValue="10"
              >
                <option value="5">5 itens</option>
                <option value="10">10 itens</option>
                <option value="25">25 itens</option>
                <option value="50">50 itens</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Backup e Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Backup e Dados
            </CardTitle>
            <CardDescription>
              Gerenciamento de dados e backup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Último Backup</Label>
              <p className="text-sm text-muted-foreground">15/01/2024 às 03:00</p>
            </div>
            <Separator />
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Fazer Backup Agora
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Exportar Dados
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Importar Dados
            </Button>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-xs text-muted-foreground">
                  Backup diário às 03:00
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sobre o Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Sobre o Sistema
          </CardTitle>
          <CardDescription>
            Informações sobre a versão e suporte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Versão do Sistema</Label>
              <p className="text-sm font-medium">v1.0.0</p>
            </div>
            <div className="space-y-2">
              <Label>Última Atualização</Label>
              <p className="text-sm font-medium">15/01/2024</p>
            </div>
            <div className="space-y-2">
              <Label>Suporte Técnico</Label>
              <p className="text-sm font-medium">suporte@assistencia.gov.br</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Verificar Atualizações
            </Button>
            <Button variant="outline" size="sm">
              Contatar Suporte
            </Button>
            <Button variant="outline" size="sm">
              Manual do Usuário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}