import { z } from 'zod';

export const submissionSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  job_title: z.string().trim().min(1, 'Cargo é obrigatório').max(100, 'Cargo deve ter no máximo 100 caracteres'),
  company: z.string().trim().min(1, 'Empresa é obrigatória').max(100, 'Empresa deve ter no máximo 100 caracteres'),
  email: z.string().trim().email('Email inválido').max(255, 'Email deve ter no máximo 255 caracteres'),
  phone: z.string().trim().max(20, 'Telefone deve ter no máximo 20 caracteres').optional().or(z.literal('')),
  project_title: z.string().trim().min(1, 'Título do projeto é obrigatório').max(100, 'Título deve ter no máximo 100 caracteres'),
  current_scenario: z.string().trim().min(1, 'Cenário atual é obrigatório').max(2000, 'Cenário atual deve ter no máximo 2000 caracteres'),
  solution_applied: z.string().trim().min(1, 'Solução aplicada é obrigatória').max(3000, 'Solução aplicada deve ter no máximo 3000 caracteres'),
  results_obtained: z.string().trim().min(1, 'Resultados obtidos são obrigatórios').max(2000, 'Resultados obtidos devem ter no máximo 2000 caracteres'),
  main_learning: z.string().trim().min(1, 'Principal aprendizado é obrigatório').max(1000, 'Principal aprendizado deve ter no máximo 1000 caracteres'),
  what_would_change: z.string().trim().max(1000, 'Este campo deve ter no máximo 1000 caracteres').optional().or(z.literal('')),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
