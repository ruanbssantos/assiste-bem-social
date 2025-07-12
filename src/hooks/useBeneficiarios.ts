import { useState, useEffect } from 'react';
import { Beneficiario, BeneficiarioFormData } from '@/types/beneficiario';

// Dados mock para demonstração
const mockBeneficiarios: Beneficiario[] = [
  {
    id: '1',
    nome: 'Maria das Graças Santos',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    dataNascimento: '1975-03-15',
    telefone: '(11) 3456-7890',
    celular: '(11) 99999-8888',
    email: 'maria.santos@email.com',
    endereco: {
      cep: '01234-567',
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    estadoCivil: 'casado',
    escolaridade: 'medio_completo',
    profissao: 'Auxiliar de limpeza',
    renda: 1200,
    beneficios: ['Auxílio Alimentação', 'Cesta Básica'],
    observacoes: 'Família com 3 filhos menores',
    status: 'ativo',
    dataCadastro: '2024-01-15',
    dataAtualizacao: '2024-01-15'
  },
  {
    id: '2',
    nome: 'João Silva Oliveira',
    cpf: '987.654.321-00',
    rg: '98.765.432-1',
    dataNascimento: '1982-07-22',
    telefone: '(11) 2345-6789',
    celular: '(11) 88888-7777',
    endereco: {
      cep: '09876-543',
      logradouro: 'Avenida Central',
      numero: '456',
      bairro: 'Vila Nova',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    estadoCivil: 'solteiro',
    escolaridade: 'fundamental_completo',
    profissao: 'Desempregado',
    renda: 0,
    beneficios: ['Auxílio Desemprego'],
    observacoes: 'Procurando trabalho na área de construção',
    status: 'ativo',
    dataCadastro: '2024-02-10',
    dataAtualizacao: '2024-02-10'
  },
  {
    id: '3',
    nome: 'Ana Costa Ferreira',
    cpf: '456.789.123-00',
    rg: '45.678.912-3',
    dataNascimento: '1990-11-08',
    telefone: '(11) 4567-8901',
    celular: '(11) 77777-6666',
    email: 'ana.costa@email.com',
    endereco: {
      cep: '54321-098',
      logradouro: 'Rua do Sol',
      numero: '789',
      bairro: 'Jardim Primavera',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    estadoCivil: 'divorciado',
    escolaridade: 'superior_incompleto',
    profissao: 'Vendedora',
    renda: 800,
    beneficios: ['Auxílio Creche'],
    observacoes: 'Mãe solteira com 2 filhos',
    status: 'ativo',
    dataCadastro: '2024-03-05',
    dataAtualizacao: '2024-03-05'
  }
];

export function useBeneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simular carregamento dos dados
  useEffect(() => {
    const loadBeneficiarios = async () => {
      setLoading(true);
      try {
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBeneficiarios(mockBeneficiarios);
      } catch (err) {
        setError('Erro ao carregar beneficiários');
      } finally {
        setLoading(false);
      }
    };

    loadBeneficiarios();
  }, []);

  const addBeneficiario = async (data: BeneficiarioFormData): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBeneficiario: Beneficiario = {
        id: Date.now().toString(),
        ...data,
        endereco: {
          cep: data.cep,
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf
        },
        dataCadastro: new Date().toISOString().split('T')[0],
        dataAtualizacao: new Date().toISOString().split('T')[0]
      };

      setBeneficiarios(prev => [...prev, newBeneficiario]);
      return true;
    } catch (err) {
      setError('Erro ao adicionar beneficiário');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateBeneficiario = async (id: string, data: BeneficiarioFormData): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      setBeneficiarios(prev => prev.map(beneficiario => 
        beneficiario.id === id 
          ? {
              ...beneficiario,
              ...data,
              endereco: {
                cep: data.cep,
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf
              },
              dataAtualizacao: new Date().toISOString().split('T')[0]
            }
          : beneficiario
      ));
      return true;
    } catch (err) {
      setError('Erro ao atualizar beneficiário');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteBeneficiario = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      setBeneficiarios(prev => prev.filter(beneficiario => beneficiario.id !== id));
      return true;
    } catch (err) {
      setError('Erro ao excluir beneficiário');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBeneficiarioById = (id: string): Beneficiario | undefined => {
    return beneficiarios.find(beneficiario => beneficiario.id === id);
  };

  return {
    beneficiarios,
    loading,
    error,
    addBeneficiario,
    updateBeneficiario,
    deleteBeneficiario,
    getBeneficiarioById
  };
}