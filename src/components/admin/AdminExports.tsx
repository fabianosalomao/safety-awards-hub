import { useState, useCallback, useRef } from 'react';
import {
  FileSpreadsheet,
  FileText,
  FileArchive,
  FileJson,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Submission {
  id: string;
  created_at: string;
  name: string;
  job_title: string;
  company: string;
  email: string;
  phone: string | null;
  country_iso2: string | null;
  country_dial_code: string | null;
  incentivador: string | null;
  name_2: string | null;
  job_title_2: string | null;
  name_3: string | null;
  job_title_3: string | null;
  project_title: string;
  current_scenario: string;
  solution_applied: string;
  results_obtained: string;
  main_learning: string;
  what_would_change: string | null;
  file_urls: string[];
  status: string;
}

type ExportAction = 'csv' | 'xlsx' | 'json' | 'zip-attachments' | 'zip-dossier';

const EXPORT_LABELS: Record<ExportAction, { label: string; icon: typeof FileText; description: string }> = {
  xlsx: { label: 'Exportar dados em Excel', icon: FileSpreadsheet, description: 'Planilha XLSX com todos os campos' },
  csv: { label: 'Exportar dados em CSV', icon: FileText, description: 'Arquivo CSV compatível com qualquer planilha' },
  'zip-attachments': { label: 'Baixar anexos organizados (ZIP)', icon: FileArchive, description: 'ZIP com pastas numeradas contendo anexos' },
  'zip-dossier': { label: 'Baixar dossiês de avaliação (ZIP)', icon: FileArchive, description: 'ZIP com summaries + anexos por projeto' },
  json: { label: 'Baixar consolidado geral JSON', icon: FileJson, description: 'all-submissions.json com todos os registros' },
};

const CSV_HEADERS = [
  'ID', 'Data de Submissão', 'Status',
  'Nome Completo 1', 'Cargo 1', 'Nome Completo 2', 'Cargo 2', 'Nome Completo 3', 'Cargo 3',
  'Empresa', 'Incentivador', 'E-mail', 'País (ISO2)', 'DDI', 'Telefone',
  'Título do Projeto', 'Cenário Encontrado', 'Solução Implementada',
  'Resultados Obtidos', 'Principal Aprendizado', 'O que Faria Diferente',
  'Arquivos Anexos', 'Aceite do Regulamento',
];

function sanitizeFilename(str: string, maxLen = 60): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\- ]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, maxLen)
    .replace(/_+$/, '') || 'sem_titulo';
}

function padIndex(i: number): string {
  return String(i).padStart(3, '0');
}

function extractFilename(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1] || 'file';
}

function submissionToRow(sub: Submission): string[] {
  return [
    sub.id,
    new Date(sub.created_at).toISOString(),
    sub.status,
    sub.name,
    sub.job_title,
    sub.name_2 || '',
    sub.job_title_2 || '',
    sub.name_3 || '',
    sub.job_title_3 || '',
    sub.company,
    sub.incentivador || '',
    sub.email,
    sub.country_iso2 || '',
    sub.country_dial_code || '',
    sub.phone || '',
    sub.project_title,
    sub.current_scenario,
    sub.solution_applied,
    sub.results_obtained,
    sub.main_learning,
    sub.what_would_change || '',
    (sub.file_urls || []).join('; '),
    'true', // aceite do regulamento
  ];
}

function submissionToSummaryObj(sub: Submission, index: number) {
  return {
    index: padIndex(index + 1),
    id: sub.id,
    created_at: sub.created_at,
    status: sub.status,
    project_title: sub.project_title,
    company: sub.company,
    country_iso2: sub.country_iso2 || '',
    country_dial_code: sub.country_dial_code || '',
    responsavel_1: { nome: sub.name, cargo: sub.job_title },
    responsavel_2: { nome: sub.name_2 || '', cargo: sub.job_title_2 || '' },
    responsavel_3: { nome: sub.name_3 || '', cargo: sub.job_title_3 || '' },
    incentivador: sub.incentivador || '',
    email: sub.email,
    phone: sub.phone || '',
    cenario_encontrado: sub.current_scenario,
    solucao_implementada: sub.solution_applied,
    resultados_obtidos: sub.results_obtained,
    principal_aprendizado: sub.main_learning,
    o_que_faria_diferente: sub.what_would_change || '',
    arquivos_anexos: (sub.file_urls || []).map(extractFilename),
    aceite_regulamento: true,
  };
}

function summaryToTxt(obj: ReturnType<typeof submissionToSummaryObj>): string {
  return `SAFETY INNOVATION AWARDS — Ficha de Submissão
=============================================

ID: ${obj.id}
Data de Submissão: ${new Date(obj.created_at).toLocaleString('pt-BR')}
Status: ${obj.status}

TÍTULO DO PROJETO: ${obj.project_title}
EMPRESA: ${obj.company}
PAÍS: ${obj.country_iso2}${obj.country_dial_code ? ` (DDI: ${obj.country_dial_code})` : ''}

RESPONSÁVEIS
  1. ${obj.responsavel_1.nome} — ${obj.responsavel_1.cargo}
  2. ${obj.responsavel_2.nome || '—'} — ${obj.responsavel_2.cargo || '—'}
  3. ${obj.responsavel_3.nome || '—'} — ${obj.responsavel_3.cargo || '—'}

INCENTIVADOR: ${obj.incentivador || '—'}
E-MAIL: ${obj.email}
TELEFONE: ${obj.phone || '—'}

CENÁRIO ENCONTRADO:
${obj.cenario_encontrado}

SOLUÇÃO IMPLEMENTADA:
${obj.solucao_implementada}

RESULTADOS OBTIDOS:
${obj.resultados_obtidos}

PRINCIPAL APRENDIZADO:
${obj.principal_aprendizado}

O QUE FARIA DIFERENTE:
${obj.o_que_faria_diferente || '—'}

ARQUIVOS ANEXOS:
${obj.arquivos_anexos.length > 0 ? obj.arquivos_anexos.map((f, i) => `  ${i + 1}. ${f}`).join('\n') : '  Nenhum'}

ACEITE DO REGULAMENTO: Sim
`;
}

function summaryToMd(obj: ReturnType<typeof submissionToSummaryObj>): string {
  return `# ${obj.project_title}

**ID:** ${obj.id}  
**Data:** ${new Date(obj.created_at).toLocaleString('pt-BR')}  
**Status:** ${obj.status}  
**Empresa:** ${obj.company}  
**País:** ${obj.country_iso2}${obj.country_dial_code ? ` (DDI: ${obj.country_dial_code})` : ''}

## Responsáveis

| # | Nome | Cargo |
|---|------|-------|
| 1 | ${obj.responsavel_1.nome} | ${obj.responsavel_1.cargo} |
| 2 | ${obj.responsavel_2.nome || '—'} | ${obj.responsavel_2.cargo || '—'} |
| 3 | ${obj.responsavel_3.nome || '—'} | ${obj.responsavel_3.cargo || '—'} |

**Incentivador:** ${obj.incentivador || '—'}  
**E-mail:** ${obj.email}  
**Telefone:** ${obj.phone || '—'}

## Cenário Encontrado

${obj.cenario_encontrado}

## Solução Implementada

${obj.solucao_implementada}

## Resultados Obtidos

${obj.resultados_obtidos}

## Principal Aprendizado

${obj.principal_aprendizado}

## O que Faria Diferente

${obj.o_que_faria_diferente || '—'}

## Arquivos Anexos

${obj.arquivos_anexos.length > 0 ? obj.arquivos_anexos.map((f, i) => `${i + 1}. ${f}`).join('\n') : 'Nenhum'}

**Aceite do Regulamento:** Sim
`;
}

async function fetchAllSubmissions(
  onProgress: (loaded: number, total: number) => void
): Promise<Submission[]> {
  const all: Submission[] = [];
  const pageSize = 200;
  let from = 0;
  let hasMore = true;

  // Use the same supabase.from('submissions') query that the admin listing uses
  while (hasMore) {
    const { data, error, count } = await supabase
      .from('submissions')
      .select('*', { count: from === 0 ? 'exact' : undefined })
      .order('created_at', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) throw new Error(error.message || 'Erro ao buscar submissões');
    if (!data || data.length === 0) break;

    all.push(...(data as Submission[]));
    const total = count ?? all.length;
    onProgress(all.length, total);

    hasMore = data.length === pageSize;
    from += pageSize;
  }

  return all;
}

async function signFilesBatch(filePaths: string[]): Promise<Record<string, string | null>> {
  const results: Record<string, string | null> = {};
  for (let i = 0; i < filePaths.length; i += 50) {
    const batch = filePaths.slice(i, i + 50);
    const { data, error } = await supabase.functions.invoke('sign-submission-files', {
      body: { filePaths: batch },
    });
    if (error) {
      console.error(`[signFilesBatch] Erro no lote ${i / 50 + 1}:`, error);
      continue;
    }
    if (data?.signedUrls) {
      Object.assign(results, data.signedUrls);
    } else {
      console.warn(`[signFilesBatch] Lote ${i / 50 + 1} retornou sem signedUrls:`, data);
    }
  }
  console.log(`[signFilesBatch] URLs obtidas: ${Object.values(results).filter(Boolean).length}/${filePaths.length}`);
  return results;
}

// Download with concurrency limit
async function downloadFilesWithConcurrency(
  urls: { path: string; signedUrl: string; folderPath: string }[],
  zip: any, // JSZip instance
  onProgress: (done: number, total: number) => void,
  concurrency = 4
): Promise<string[]> {
  const errors: string[] = [];
  let done = 0;
  const total = urls.length;

  const queue = [...urls];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      try {
        const resp = await fetch(item.signedUrl);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const blob = await resp.blob();
        zip.file(item.folderPath, blob);
      } catch (e: any) {
        errors.push(`${item.path}: ${e.message}`);
      }
      done++;
      onProgress(done, total);
    }
  });

  await Promise.all(workers);
  return errors;
}

function escapeCsvField(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export default function AdminExports() {
  const { toast } = useToast();
  const [activeAction, setActiveAction] = useState<ExportAction | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ExportAction | null>(null);
  const [progressLabel, setProgressLabel] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const abortRef = useRef(false);

  const startAction = (action: ExportAction) => {
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const confirmAction = async () => {
    const action = pendingAction;
    setConfirmOpen(false);
    if (!action) return;
    setActiveAction(action);
    setProgressValue(0);
    setProgressLabel('Iniciando...');
    abortRef.current = false;

    try {
      switch (action) {
        case 'csv': await exportCSV(); break;
        case 'xlsx': await exportXLSX(); break;
        case 'json': await exportJSON(); break;
        case 'zip-attachments': await exportZipAttachments(); break;
        case 'zip-dossier': await exportZipDossier(); break;
      }
      toast({ title: 'Exportação concluída', description: 'O arquivo foi gerado com sucesso.' });
    } catch (err: any) {
      toast({ title: 'Erro na exportação', description: err.message, variant: 'destructive' });
    } finally {
      setActiveAction(null);
      setProgressLabel('');
      setProgressValue(0);
    }
  };

  const exportCSV = async () => {
    setProgressLabel('Buscando submissões...');
    const subs = await fetchAllSubmissions((loaded, total) => {
      setProgressValue(Math.round((loaded / total) * 100));
      setProgressLabel(`Buscando submissões... ${loaded}/${total}`);
    });

    setProgressLabel('Gerando CSV...');
    const bom = '\uFEFF';
    const header = CSV_HEADERS.map(escapeCsvField).join(',');
    const rows = subs.map(s => submissionToRow(s).map(escapeCsvField).join(','));
    const csv = bom + [header, ...rows].join('\r\n');

    downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'SIA_Submissions.csv');
  };

  const exportXLSX = async () => {
    setProgressLabel('Buscando submissões...');
    const subs = await fetchAllSubmissions((loaded, total) => {
      setProgressValue(Math.round((loaded / total) * 100));
      setProgressLabel(`Buscando submissões... ${loaded}/${total}`);
    });

    setProgressLabel('Gerando planilha Excel...');
    const XLSX = await import('xlsx');
    const wsData = [CSV_HEADERS, ...subs.map(submissionToRow)];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submissões');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    downloadBlob(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'SIA_Submissions.xlsx');
  };

  const exportJSON = async () => {
    setProgressLabel('Buscando submissões...');
    const subs = await fetchAllSubmissions((loaded, total) => {
      setProgressValue(Math.round((loaded / total) * 100));
      setProgressLabel(`Buscando submissões... ${loaded}/${total}`);
    });

    setProgressLabel('Gerando JSON...');
    const data = subs.map((s, i) => submissionToSummaryObj(s, i));
    const json = JSON.stringify(data, null, 2);
    downloadBlob(new Blob([json], { type: 'application/json' }), 'all-submissions.json');
  };

  const exportZipAttachments = async () => {
    setProgressLabel('Buscando submissões...');
    const subs = await fetchAllSubmissions((loaded, total) => {
      setProgressValue(Math.round((loaded / Math.max(total, 1)) * 30));
      setProgressLabel(`Buscando submissões... ${loaded}/${total}`);
    });

    console.log(`[ZIP Anexos] Total submissões: ${subs.length}`);

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const root = zip.folder('SafetyInnovationAwards_Submissions')!;

    // Collect all files with safe file_urls parsing
    const allFiles: { path: string; folderPath: string; submissionId: string }[] = [];
    const manifestSubmissions: any[] = [];

    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      let fileUrls = sub.file_urls;
      if (typeof fileUrls === 'string') {
        try { fileUrls = JSON.parse(fileUrls); } catch { fileUrls = []; }
      }
      if (!Array.isArray(fileUrls)) fileUrls = [];

      const folderName = `${padIndex(i + 1)}_${sanitizeFilename(sub.project_title)}`;
      console.log(`[ZIP Anexos] Sub ${i + 1} (${sub.id}): ${fileUrls.length} arquivo(s)`);

      const subManifest = { submissionId: sub.id, folderName, files: fileUrls.map(extractFilename) };
      manifestSubmissions.push(subManifest);

      for (const fp of fileUrls) {
        if (typeof fp === 'string' && fp.trim()) {
          allFiles.push({ path: fp, folderPath: `${folderName}/${extractFilename(fp)}`, submissionId: sub.id });
        }
      }
    }

    console.log(`[ZIP Anexos] Total anexos encontrados: ${allFiles.length}`);

    if (allFiles.length === 0) {
      toast({ title: 'Nenhum anexo encontrado', description: 'As submissões não possuem arquivos anexos.', variant: 'destructive' });
      return;
    }

    setProgressLabel(`Gerando URLs de download para ${allFiles.length} arquivo(s)...`);
    setProgressValue(35);
    const signedUrls = await signFilesBatch(allFiles.map(f => f.path));

    const signedCount = Object.values(signedUrls).filter(Boolean).length;
    console.log(`[ZIP Anexos] URLs assinadas obtidas: ${signedCount}/${allFiles.length}`);

    if (signedCount === 0) {
      toast({ title: 'Erro ao gerar URLs', description: 'Não foi possível obter URLs de download para os anexos. Verifique os logs.', variant: 'destructive' });
      return;
    }

    const downloadItems = allFiles
      .filter(f => signedUrls[f.path])
      .map(f => ({ ...f, signedUrl: signedUrls[f.path]! }));

    const skippedFiles = allFiles.filter(f => !signedUrls[f.path]);
    const errors: string[] = skippedFiles.map(f => `${f.submissionId} - ${f.path}: URL assinada não gerada`);

    setProgressLabel('Baixando anexos...');
    const dlErrors = await downloadFilesWithConcurrency(downloadItems, root, (done, total) => {
      setProgressValue(35 + Math.round((done / total) * 55));
      setProgressLabel(`Baixando anexos... ${done}/${total}`);
    });
    errors.push(...dlErrors);

    // Add manifest
    const manifest = {
      totalSubmissions: subs.length,
      totalAttachmentsFound: allFiles.length,
      totalAddedToZip: downloadItems.length - dlErrors.length,
      totalErrors: errors.length,
      submissions: manifestSubmissions,
    };
    root.file('manifest.json', JSON.stringify(manifest, null, 2));

    if (errors.length > 0) {
      root.file('_errors.txt', `Erros de download:\n${errors.join('\n')}`);
      console.warn(`[ZIP Anexos] ${errors.length} erro(s):`, errors);
    }

    setProgressLabel('Compactando ZIP...');
    setProgressValue(95);
    const blob = await zip.generateAsync({ type: 'blob' });
    console.log(`[ZIP Anexos] ZIP gerado: ${(blob.size / 1024).toFixed(1)} KB`);

    if (errors.length > 0) {
      toast({ title: 'Exportação com avisos', description: `${downloadItems.length - dlErrors.length} anexos baixados, ${errors.length} falharam. Veja _errors.txt no ZIP.` });
    }

    downloadBlob(blob, 'SIA_Anexos.zip');
  };

  const exportZipDossier = async () => {
    setProgressLabel('Buscando submissões...');
    const subs = await fetchAllSubmissions((loaded, total) => {
      setProgressValue(Math.round((loaded / Math.max(total, 1)) * 20));
      setProgressLabel(`Buscando submissões... ${loaded}/${total}`);
    });

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const root = zip.folder('SafetyInnovationAwards_Submissions')!;

    // Add all-submissions.json at root
    const allSummaries = subs.map((s, i) => submissionToSummaryObj(s, i));
    root.file('all-submissions.json', JSON.stringify(allSummaries, null, 2));

    // Collect all files
    const allFiles: { path: string; folderPath: string }[] = [];
    subs.forEach((sub, i) => {
      const folderName = `${padIndex(i + 1)}_${sanitizeFilename(sub.project_title)}`;
      const folder = root.folder(folderName)!;
      const summaryObj = submissionToSummaryObj(sub, i);

      folder.file('submission-summary.json', JSON.stringify(summaryObj, null, 2));
      folder.file('submission-summary.txt', summaryToTxt(summaryObj));
      folder.file('submission-summary.md', summaryToMd(summaryObj));

      (sub.file_urls || []).forEach((fp) => {
        allFiles.push({ path: fp, folderPath: `${folderName}/${extractFilename(fp)}` });
      });
    });

    if (allFiles.length > 0) {
      setProgressLabel('Gerando URLs de download...');
      setProgressValue(25);
      const signedUrls = await signFilesBatch(allFiles.map(f => f.path));

      const downloadItems = allFiles
        .filter(f => signedUrls[f.path])
        .map(f => ({ ...f, signedUrl: signedUrls[f.path]! }));

      const errors = await downloadFilesWithConcurrency(downloadItems, root, (done, total) => {
        setProgressValue(25 + Math.round((done / total) * 65));
        setProgressLabel(`Baixando anexos... ${done}/${total}`);
      });

      if (errors.length > 0) {
        root.file('_errors.txt', `Erros de download:\n${errors.join('\n')}`);
      }
    }

    setProgressLabel('Compactando ZIP...');
    setProgressValue(95);
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'SIA_Dossies.zip');
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isRunning = activeAction !== null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileArchive className="w-5 h-5 text-primary" />
          Exportações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isRunning && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {progressLabel}
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.entries(EXPORT_LABELS) as [ExportAction, typeof EXPORT_LABELS[ExportAction]][]).map(
            ([action, config]) => {
              const Icon = config.icon;
              return (
                <Button
                  key={action}
                  variant="outline"
                  className="h-auto py-4 px-4 flex flex-col items-start gap-1 text-left"
                  disabled={isRunning}
                  onClick={() => startAction(action)}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Icon className="w-4 h-4 text-primary" />
                    {config.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {config.description}
                  </span>
                </Button>
              );
            }
          )}
        </div>

        {/* Confirmation dialog */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Confirmar exportação
              </DialogTitle>
              <DialogDescription>
                {pendingAction && EXPORT_LABELS[pendingAction]?.label}
                {'. '}
                Esta operação pode demorar dependendo do volume de dados. Deseja continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button onClick={confirmAction}>Continuar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
