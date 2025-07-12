import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { BeneficiariosList } from "./pages/beneficiarios/BeneficiariosList";
import { BeneficiarioForm } from "./pages/beneficiarios/BeneficiarioForm";
import { BeneficiarioDetails } from "./pages/beneficiarios/BeneficiarioDetails";
import { Atendimentos } from "./pages/Atendimentos";
import { Agendamentos } from "./pages/Agendamentos";
import { Relatorios } from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para proteger rotas autenticadas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota de login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="beneficiarios" element={<BeneficiariosList />} />
              <Route path="beneficiarios/novo" element={<BeneficiarioForm />} />
              <Route path="beneficiarios/:id" element={<BeneficiarioDetails />} />
              <Route path="beneficiarios/:id/editar" element={<BeneficiarioForm />} />
              <Route path="atendimentos" element={<Atendimentos />} />
              <Route path="agendamentos" element={<Agendamentos />} />
              <Route path="relatorios" element={<Relatorios />} />
            </Route>
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
