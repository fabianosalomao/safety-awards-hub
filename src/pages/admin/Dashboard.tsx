import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  FileText, 
  Download,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import logoDark from '@/assets/logo-dark-bg.png';

type SubmissionStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

interface Submission {
  id: string;
  created_at: string;
  name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string | null;
  project_title: string;
  current_scenario: string;
  solution_applied: string;
  results_obtained: string;
  main_learning: string;
  what_would_change: string | null;
  file_urls: string[];
  status: SubmissionStatus;
}

const statusConfig: Record<SubmissionStatus, { label: string; icon: typeof Clock; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pendente', icon: Clock, variant: 'secondary' },
  under_review: { label: 'Em Análise', icon: Eye, variant: 'default' },
  approved: { label: 'Aprovado', icon: CheckCircle, variant: 'outline' },
  rejected: { label: 'Rejeitado', icon: XCircle, variant: 'destructive' },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [serverVerified, setServerVerified] = useState(false);

  // Server-side admin verification on mount for defense-in-depth
  useEffect(() => {
    const verifyAdminServerSide = async () => {
      if (!user) {
        setServerVerified(false);
        return;
      }
      
      const { data, error } = await supabase.rpc('is_admin_or_reviewer', {
        _user_id: user.id
      });
      
      if (error || data !== true) {
        setServerVerified(false);
        navigate('/admin/login');
        return;
      }
      
      setServerVerified(true);
    };
    
    if (!loading && user) {
      verifyAdminServerSide();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin && serverVerified) {
      fetchSubmissions();
    }
  }, [user, isAdmin, serverVerified]);

  useEffect(() => {
    const filtered = submissions.filter(sub =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.project_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  }, [searchTerm, submissions]);

  const fetchSubmissions = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar submissões',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    }
    setLoadingData(false);
  };

  const updateStatus = async (id: string, status: SubmissionStatus) => {
    const { error } = await supabase
      .from('submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSubmissions(prev =>
        prev.map(sub => (sub.id === id ? { ...sub, status } : sub))
      );
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
      toast({
        title: 'Status atualizado',
        description: 'O status da submissão foi alterado com sucesso.',
      });
    }
  };

  const getFileDownloadUrl = async (filePath: string): Promise<string | null> => {
    const { data } = await supabase.storage
      .from('submissions-files')
      .createSignedUrl(filePath, 3600);
    return data?.signedUrl || null;
  };

  const handleDownloadFile = async (filePath: string) => {
    const url = await getFileDownloadUrl(filePath);
    if (url) {
      window.open(url, '_blank');
    } else {
      toast({
        title: 'Erro ao baixar arquivo',
        description: 'Não foi possível gerar o link de download.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading || !user || !isAdmin || !serverVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src={logoDark} alt="Logo" className="h-8" />
              <span className="text-sm font-medium text-muted-foreground">
                Área Administrativa
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            {(['pending', 'under_review', 'approved', 'rejected'] as SubmissionStatus[]).map(status => {
              const config = statusConfig[status];
              const count = submissions.filter(s => s.status === status).length;
              return (
                <div key={status} className="card-elevated p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <config.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-sm text-muted-foreground">{config.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, empresa ou projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredSubmissions.length} submissões
            </p>
          </div>

          {/* Table */}
          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma submissão encontrada</p>
            </div>
          ) : (
            <div className="card-elevated overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => {
                    const config = statusConfig[submission.status];
                    return (
                      <TableRow key={submission.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.company}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {submission.project_title}
                        </TableCell>
                        <TableCell>
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setDetailsOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Detalhes da Submissão
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-6">
              {/* Status and actions */}
              <div className="flex items-center gap-4">
                <Select
                  value={selectedSubmission.status}
                  onValueChange={(value) => updateStatus(selectedSubmission.id, value as SubmissionStatus)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="under_review">Em Análise</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  Enviado em {new Date(selectedSubmission.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              {/* Personal Data */}
              <div className="space-y-3">
                <h3 className="font-semibold text-accent">Dados Pessoais</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nome</p>
                    <p className="font-medium">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cargo</p>
                    <p className="font-medium">{selectedSubmission.job_title}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Empresa</p>
                    <p className="font-medium">{selectedSubmission.company}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.phone && (
                    <div>
                      <p className="text-muted-foreground">Telefone</p>
                      <p className="font-medium">{selectedSubmission.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Data */}
              <div className="space-y-4">
                <h3 className="font-semibold text-accent">Dados do Projeto</h3>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Título do Projeto</p>
                  <p className="font-medium">{selectedSubmission.project_title}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cenário Atual / Desafio</p>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                    {selectedSubmission.current_scenario}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Solução Implementada</p>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                    {selectedSubmission.solution_applied}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resultados Obtidos</p>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                    {selectedSubmission.results_obtained}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Principal Aprendizado</p>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                    {selectedSubmission.main_learning}
                  </p>
                </div>

                {selectedSubmission.what_would_change && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">O que Faria Diferente</p>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                      {selectedSubmission.what_would_change}
                    </p>
                  </div>
                )}
              </div>

              {/* Files */}
              {selectedSubmission.file_urls.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-accent">Arquivos Anexados</h3>
                  <div className="space-y-2">
                    {selectedSubmission.file_urls.map((filePath, index) => (
                      <button
                        key={index}
                        onClick={() => handleDownloadFile(filePath)}
                        className="flex items-center gap-3 w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="flex-1 text-sm truncate">
                          {filePath.split('/').pop()}
                        </span>
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
