import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useBeneficiarios } from '@/hooks/useBeneficiarios';
import { useToast } from '@/hooks/use-toast';
import { BeneficiarioFormData } from '@/types/beneficiario';

const estadosCivis = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' },
];

const escolaridades = [
  { value: 'analfabeto', label: 'Analfabeto' },
  { value: 'fundamental_incompleto', label: 'Fundamental Incompleto' },
  { value: 'fundamental_completo', label: 'Fundamental Completo' },
  { value: 'medio_incompleto', label: 'Médio Incompleto' },
  { value: 'medio_completo', label: 'Médio Completo' },
  { value: 'superior_incompleto', label: 'Superior Incompleto' },
  { value: 'superior_completo', label: 'Superior Completo' },
  { value: 'pos_graduacao', label: 'Pós-graduação' },
];

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const beneficiosDisponiveis = [
  'Auxílio Alimentação',
  'Cesta Básica',
  'Auxílio Desemprego',
  'Auxílio Creche',
  'Auxílio Transporte',
  'Auxílio Medicamento',
  'Auxílio Moradia',
  'Programa Bolsa Família',
];

export function BeneficiarioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addBeneficiario, updateBeneficiario, getBeneficiarioById, loading } = useBeneficiarios();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<BeneficiarioFormData>({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    celular: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: 'SP',
    estadoCivil: 'solteiro',
    escolaridade: 'fundamental_incompleto',
    profissao: '',
    renda: 0,
    beneficios: [],
    observacoes: '',
    status: 'ativo',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const beneficiario = getBeneficiarioById(id);
      if (beneficiario) {
        setFormData({
          nome: beneficiario.nome,
          cpf: beneficiario.cpf,
          rg: beneficiario.rg,
          dataNascimento: beneficiario.dataNascimento,
          telefone: beneficiario.telefone,
          celular: beneficiario.celular || '',
          email: beneficiario.email || '',
          cep: beneficiario.endereco.cep,
          logradouro: beneficiario.endereco.logradouro,
          numero: beneficiario.endereco.numero,
          complemento: beneficiario.endereco.complemento || '',
          bairro: beneficiario.endereco.bairro,
          cidade: beneficiario.endereco.cidade,
          uf: beneficiario.endereco.uf,
          estadoCivil: beneficiario.estadoCivil,
          escolaridade: beneficiario.escolaridade,
          profissao: beneficiario.profissao || '',
          renda: beneficiario.renda || 0,
          beneficios: beneficiario.beneficios,
          observacoes: beneficiario.observacoes || '',
          status: beneficiario.status,
        });
      }
    }
  }, [isEdit, id, getBeneficiarioById]);

  const handleInputChange = (field: keyof BeneficiarioFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBeneficioToggle = (beneficio: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      beneficios: checked
        ? [...prev.beneficios, beneficio]
        : prev.beneficios.filter(b => b !== beneficio)
    }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatRG = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success;
      if (isEdit && id) {
        success = await updateBeneficiario(id, formData);
      } else {
        success = await addBeneficiario(formData);
      }

      if (success) {
        toast({
          title: isEdit ? "Beneficiário atualizado" : "Beneficiário cadastrado",
          description: `${formData.nome} foi ${isEdit ? 'atualizado' : 'cadastrado'} com sucesso.`,
        });
        navigate('/beneficiarios');
      } else {
        toast({
          title: "Erro",
          description: `Não foi possível ${isEdit ? 'atualizar' : 'cadastrar'} o beneficiário.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/beneficiarios')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {isEdit ? 'Editar Beneficiário' : 'Novo Beneficiário'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEdit ? 'Atualize as informações do beneficiário' : 'Preencha os dados do novo beneficiário'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Dados Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rg">RG *</Label>
              <Input
                id="rg"
                value={formData.rg}
                onChange={(e) => handleInputChange('rg', formatRG(e.target.value))}
                placeholder="00.000.000-0"
                maxLength={12}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estadoCivil">Estado Civil</Label>
              <Select
                value={formData.estadoCivil}
                onValueChange={(value) => handleInputChange('estadoCivil', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estadosCivis.map((estado) => (
                    <SelectItem key={estado.value} value={estado.value}>
                      {estado.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="escolaridade">Escolaridade</Label>
              <Select
                value={formData.escolaridade}
                onValueChange={(value) => handleInputChange('escolaridade', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {escolaridades.map((escolaridade) => (
                    <SelectItem key={escolaridade.value} value={escolaridade.value}>
                      {escolaridade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                placeholder="(00) 0000-0000"
                maxLength={14}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                value={formData.celular}
                onChange={(e) => handleInputChange('celular', formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="exemplo@email.com"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP *</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
                placeholder="00000-000"
                maxLength={9}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logradouro">Logradouro *</Label>
              <Input
                id="logradouro"
                value={formData.logradouro}
                onChange={(e) => handleInputChange('logradouro', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numero">Número *</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input
                id="complemento"
                value={formData.complemento}
                onChange={(e) => handleInputChange('complemento', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input
                id="bairro"
                value={formData.bairro}
                onChange={(e) => handleInputChange('bairro', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uf">UF *</Label>
              <Select
                value={formData.uf}
                onValueChange={(value) => handleInputChange('uf', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ufs.map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Dados Socioeconômicos */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Dados Socioeconômicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profissao">Profissão</Label>
              <Input
                id="profissao"
                value={formData.profissao}
                onChange={(e) => handleInputChange('profissao', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="renda">Renda Mensal (R$)</Label>
              <Input
                id="renda"
                type="number"
                step="0.01"
                min="0"
                value={formData.renda}
                onChange={(e) => handleInputChange('renda', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficiosDisponiveis.map((beneficio) => (
              <div key={beneficio} className="flex items-center space-x-2">
                <Checkbox
                  id={beneficio}
                  checked={formData.beneficios.includes(beneficio)}
                  onCheckedChange={(checked) => handleBeneficioToggle(beneficio, checked as boolean)}
                />
                <Label htmlFor={beneficio} className="text-sm">
                  {beneficio}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Observações */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Observações</h2>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações Gerais</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Informações adicionais sobre o beneficiário..."
              rows={4}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/beneficiarios')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || loading}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                Salvando...
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Atualizar' : 'Cadastrar'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}