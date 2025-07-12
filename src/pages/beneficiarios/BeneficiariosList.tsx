import { useState } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useBeneficiarios } from '@/hooks/useBeneficiarios';
import { useToast } from '@/hooks/use-toast';
import { Beneficiario } from '@/types/beneficiario';

export function BeneficiariosList() {
  const { beneficiarios, loading, deleteBeneficiario } = useBeneficiarios();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBeneficiarios = beneficiarios.filter(beneficiario => {
    const matchesSearch = beneficiario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beneficiario.cpf.includes(searchTerm) ||
                         beneficiario.telefone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || beneficiario.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (beneficiario: Beneficiario) => {
    const success = await deleteBeneficiario(beneficiario.id);
    
    if (success) {
      toast({
        title: "Beneficiário excluído",
        description: `${beneficiario.nome} foi excluído com sucesso.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o beneficiário. Tente novamente.",
        variant: "destructive",
      });
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando beneficiários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Beneficiários</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os beneficiários cadastrados no sistema
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/beneficiarios/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Beneficiário
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome, CPF ou telefone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Renda</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeneficiarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Nenhum beneficiário encontrado com os filtros aplicados.'
                      : 'Nenhum beneficiário cadastrado.'
                    }
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredBeneficiarios.map((beneficiario) => (
                <TableRow key={beneficiario.id}>
                  <TableCell className="font-medium">
                    {beneficiario.nome}
                  </TableCell>
                  <TableCell>{beneficiario.cpf}</TableCell>
                  <TableCell>{beneficiario.telefone}</TableCell>
                  <TableCell>
                    {beneficiario.renda ? formatCurrency(beneficiario.renda) : 'Não informada'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(beneficiario.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/beneficiarios/${beneficiario.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/beneficiarios/${beneficiario.id}/editar`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o beneficiário "{beneficiario.nome}"? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(beneficiario)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-semibold text-foreground">
            {beneficiarios.length}
          </div>
          <div className="text-sm text-muted-foreground">Total de beneficiários</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-semibold text-success-foreground">
            {beneficiarios.filter(b => b.status === 'ativo').length}
          </div>
          <div className="text-sm text-muted-foreground">Ativos</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-2xl font-semibold text-warning-foreground">
            {beneficiarios.filter(b => b.status === 'pendente').length}
          </div>
          <div className="text-sm text-muted-foreground">Pendentes</div>
        </div>
      </div>
    </div>
  );
}