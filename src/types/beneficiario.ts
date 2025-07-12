export interface Beneficiario {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  telefone: string;
  celular?: string;
  email?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  estadoCivil: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel';
  escolaridade: 'analfabeto' | 'fundamental_incompleto' | 'fundamental_completo' | 'medio_incompleto' | 'medio_completo' | 'superior_incompleto' | 'superior_completo' | 'pos_graduacao';
  profissao?: string;
  renda?: number;
  beneficios: string[];
  observacoes?: string;
  status: 'ativo' | 'inativo' | 'pendente';
  dataCadastro: string;
  dataAtualizacao: string;
}

export interface BeneficiarioFormData {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  telefone: string;
  celular?: string;
  email?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  estadoCivil: Beneficiario['estadoCivil'];
  escolaridade: Beneficiario['escolaridade'];
  profissao?: string;
  renda?: number;
  beneficios: string[];
  observacoes?: string;
  status: Beneficiario['status'];
}