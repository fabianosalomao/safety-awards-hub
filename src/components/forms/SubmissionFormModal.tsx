import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Upload, FileText, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { submissionSchema, SubmissionFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface SubmissionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_FILES = 5;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const SubmissionFormModal = ({ open, onOpenChange }: SubmissionFormModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: t('Arquivo muito grande', 'Archivo muy grande'),
          description: t(
            `${file.name} excede o limite de 20MB`,
            `${file.name} excede el límite de 20MB`
          ),
          variant: 'destructive',
        });
        return false;
      }
      return true;
    });

    if (files.length + validFiles.length > MAX_FILES) {
      toast({
        title: t('Limite de arquivos', 'Límite de archivos'),
        description: t(
          `Máximo de ${MAX_FILES} arquivos permitidos`,
          `Máximo de ${MAX_FILES} archivos permitidos`
        ),
        variant: 'destructive',
      });
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `submissions/${fileName}`;

      const { error } = await supabase.storage
        .from('submissions-files')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(t('Erro ao enviar arquivo', 'Error al subir archivo'));
      }

      uploadedUrls.push(filePath);
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true);
    
    try {
      let fileUrls: string[] = [];
      
      if (files.length > 0) {
        fileUrls = await uploadFiles();
      }

      const { error } = await supabase.from('submissions').insert({
        name: data.name,
        job_title: data.job_title,
        company: data.company,
        email: data.email,
        phone: data.phone || null,
        project_title: data.project_title,
        current_scenario: data.current_scenario,
        solution_applied: data.solution_applied,
        results_obtained: data.results_obtained,
        main_learning: data.main_learning,
        what_would_change: data.what_would_change || null,
        file_urls: fileUrls,
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      reset();
      setFiles([]);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: t('Erro ao enviar', 'Error al enviar'),
        description: t(
          'Ocorreu um erro ao enviar sua submissão. Tente novamente.',
          'Ocurrió un error al enviar su proyecto. Intente nuevamente.'
        ),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      reset();
      setFiles([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isSuccess 
              ? t('Submissão Enviada!', '¡Proyecto Enviado!')
              : t('Submeter Projeto', 'Enviar Proyecto')
            }
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {t('Obrigado!', '¡Gracias!')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t(
                  'Recebemos sua submissão com sucesso. Entraremos em contato em breve.',
                  'Recibimos su proyecto con éxito. Nos pondremos en contacto pronto.'
                )}
              </p>
              <Button onClick={handleClose}>
                {t('Fechar', 'Cerrar')}
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Personal Data Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  {t('Dados Pessoais', 'Datos Personales')}
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('Nome completo', 'Nombre completo')} *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="job_title">{t('Cargo', 'Cargo')} *</Label>
                    <Input
                      id="job_title"
                      {...register('job_title')}
                      className={errors.job_title ? 'border-destructive' : ''}
                    />
                    {errors.job_title && (
                      <p className="text-sm text-destructive">{errors.job_title.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t('Empresa', 'Empresa')} *</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    className={errors.company ? 'border-destructive' : ''}
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive">{errors.company.message}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('Telefone', 'Teléfono')}</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Data Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  {t('Dados do Projeto', 'Datos del Proyecto')}
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="project_title">{t('Título do projeto', 'Título del proyecto')} *</Label>
                  <Input
                    id="project_title"
                    {...register('project_title')}
                    className={errors.project_title ? 'border-destructive' : ''}
                  />
                  {errors.project_title && (
                    <p className="text-sm text-destructive">{errors.project_title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_scenario">
                    {t('Cenário atual / Desafio', 'Escenario actual / Desafío')} *
                  </Label>
                  <Textarea
                    id="current_scenario"
                    rows={4}
                    {...register('current_scenario')}
                    className={errors.current_scenario ? 'border-destructive' : ''}
                    placeholder={t(
                      'Descreva o cenário ou problema que motivou o projeto...',
                      'Describa el escenario o problema que motivó el proyecto...'
                    )}
                  />
                  {errors.current_scenario && (
                    <p className="text-sm text-destructive">{errors.current_scenario.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution_applied">
                    {t('Solução implementada', 'Solución implementada')} *
                  </Label>
                  <Textarea
                    id="solution_applied"
                    rows={5}
                    {...register('solution_applied')}
                    className={errors.solution_applied ? 'border-destructive' : ''}
                    placeholder={t(
                      'Descreva a solução desenvolvida e como foi implementada...',
                      'Describa la solución desarrollada y cómo fue implementada...'
                    )}
                  />
                  {errors.solution_applied && (
                    <p className="text-sm text-destructive">{errors.solution_applied.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="results_obtained">
                    {t('Resultados obtidos', 'Resultados obtenidos')} *
                  </Label>
                  <Textarea
                    id="results_obtained"
                    rows={4}
                    {...register('results_obtained')}
                    className={errors.results_obtained ? 'border-destructive' : ''}
                    placeholder={t(
                      'Apresente os resultados mensuráveis e impactos alcançados...',
                      'Presente los resultados medibles e impactos alcanzados...'
                    )}
                  />
                  {errors.results_obtained && (
                    <p className="text-sm text-destructive">{errors.results_obtained.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="main_learning">
                    {t('Principal aprendizado', 'Principal aprendizaje')} *
                  </Label>
                  <Textarea
                    id="main_learning"
                    rows={3}
                    {...register('main_learning')}
                    className={errors.main_learning ? 'border-destructive' : ''}
                    placeholder={t(
                      'Qual foi a maior lição aprendida com este projeto?',
                      '¿Cuál fue la mayor lección aprendida con este proyecto?'
                    )}
                  />
                  {errors.main_learning && (
                    <p className="text-sm text-destructive">{errors.main_learning.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="what_would_change">
                    {t('O que faria diferente?', '¿Qué haría diferente?')}
                  </Label>
                  <Textarea
                    id="what_would_change"
                    rows={3}
                    {...register('what_would_change')}
                    className={errors.what_would_change ? 'border-destructive' : ''}
                    placeholder={t(
                      'Se pudesse refazer, o que mudaria? (opcional)',
                      'Si pudiera rehacer, ¿qué cambiaría? (opcional)'
                    )}
                  />
                  {errors.what_would_change && (
                    <p className="text-sm text-destructive">{errors.what_would_change.message}</p>
                  )}
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  {t('Arquivos de Apoio', 'Archivos de Apoyo')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    `Até ${MAX_FILES} arquivos (PDF, imagens, vídeos). Máximo 20MB cada.`,
                    `Hasta ${MAX_FILES} archivos (PDF, imágenes, videos). Máximo 20MB cada uno.`
                  )}
                </p>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="files"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.mp4,.mov"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={files.length >= MAX_FILES}
                  />
                  <label
                    htmlFor="files"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t('Clique para selecionar arquivos', 'Haga clic para seleccionar archivos')}
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="flex-1 text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting}>
                  {t('Cancelar', 'Cancelar')}
                </Button>
                <Button type="submit" disabled={isSubmitting} className="glow-green">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('Enviando...', 'Enviando...')}
                    </>
                  ) : (
                    t('Submeter Projeto', 'Enviar Proyecto')
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionFormModal;
