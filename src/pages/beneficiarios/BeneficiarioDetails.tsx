import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Phone, Mail, MapPin, User, Calendar, Briefcase, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBeneficiarios } from '@/hooks/useBeneficiarios';
import { Beneficiario } from '@/types/beneficiario';

export function BeneficiarioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBeneficiarioById, loading } = useBeneficiarios();

  if (!id) {
    navigate('/beneficiarios');
    return null;
  }

  const beneficiario = getBeneficiarioById(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando beneficiário...</p>
        </div>
      </div>
    );
  }

  if (!beneficiario) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-2">Beneficiário não encontrado</h2>
        <p className="text-muted-foreground mb-4">O beneficiário solicitado não existe ou foi removido.</p>
        <Button asChild>
          <Link to="/beneficiarios">Voltar para Lista</Link>
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: Beneficiario['status']) => {
    const variants = {
      ativo: 'default',
      inativo: 'secondary',
      pendente: 'outline'
    } as const;

    const labels = {
      ativo: 'Ativo',
      inativo: 'Inativo',
      pendente: 'Pendente'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getEscolaridadeLabel = (escolaridade: string) => {
    const labels: Record<string, string> = {
      analfabeto: 'Analfabeto',
      fundamental_incompleto: 'Fundamental Incompleto',
      fundamental_completo: 'Fundamental Completo',
      medio_incompleto: 'Médio Incompleto',
      medio_completo: 'Médio Completo',
      superior_incompleto: 'Superior Incompleto',
      superior_completo: 'Superior Completo',
      pos_graduacao: 'Pós-graduação'
    };
    return labels[escolaridade] || escolaridade;
  };

  const getEstadoCivilLabel = (estadoCivil: string) => {
    const labels: Record<string, string> = {
      solteiro: 'Solteiro(a)',
      casado: 'Casado(a)',
      divorciado: 'Divorciado(a)',
      viuvo: 'Viúvo(a)',
      uniao_estavel: 'União Estável'
    };
    return labels[estadoCivil] || estadoCivil;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/beneficiarios')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{beneficiario.nome}</h1>
            <p className="text-sm text-muted-foreground">
              Cadastrado em {formatDate(beneficiario.dataCadastro)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(beneficiario.status)}
          <Button asChild>
            <Link to={`/beneficiarios/${beneficiario.id}/editar`}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CPF</p>
                  <p className="text-base">{beneficiario.cpf}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">RG</p>
                  <p className="text-base">{beneficiario.rg}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
                  <p className="text-base">{formatDate(beneficiario.dataNascimento)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado Civil</p>
                  <p className="text-base">{getEstadoCivilLabel(beneficiario.estadoCivil)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Escolaridade</p>
                  <p className="text-base">{getEscolaridadeLabel(beneficiario.escolaridade)}</p>
                </div>
                {beneficiario.profissao && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profissão</p>
                    <p className="text-base">{beneficiario.profissao}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <p className="text-base">{beneficiario.telefone}</p>
                </div>
                {beneficiario.celular && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Celular</p>
                    <p className="text-base">{beneficiario.celular}</p>
                  </div>
                )}
                {beneficiario.email && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                    <p className="text-base">{beneficiario.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-base">
                  {beneficiario.endereco.logradouro}, {beneficiario.endereco.numero}
                  {beneficiario.endereco.complemento && `, ${beneficiario.endereco.complemento}`}
                </p>
                <p className="text-base">
                  {beneficiario.endereco.bairro} - {beneficiario.endereco.cidade}/{beneficiario.endereco.uf}
                </p>
                <p className="text-sm text-muted-foreground">
                  CEP: {beneficiario.endereco.cep}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          {beneficiario.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base whitespace-pre-wrap">{beneficiario.observacoes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          {/* Dados Socioeconômicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Dados Socioeconômicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Renda Mensal</p>
                <p className="text-lg font-semibold">
                  {beneficiario.renda ? formatCurrency(beneficiario.renda) : 'Não informada'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios */}
          <Card>
            <CardHeader>
              <CardTitle>Benefícios</CardTitle>
              <CardDescription>
                Benefícios ativos para este beneficiário
              </CardDescription>
            </CardHeader>
            <CardContent>
              {beneficiario.beneficios.length > 0 ? (
                <div className="space-y-2">
                  {beneficiario.beneficios.map((beneficio, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {beneficio}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum benefício cadastrado
                </p>
              )}
            </CardContent>
          </Card>

          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Histórico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data de Cadastro</p>
                <p className="text-base">{formatDate(beneficiario.dataCadastro)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
                <p className="text-base">{formatDate(beneficiario.dataAtualizacao)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Atendimento
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="w-4 h-4 mr-2" />
                Novo Atendimento
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Notificação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}