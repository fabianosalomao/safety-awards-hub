-- ============================================
-- SUBMISSIONS TABLE - RLS SECURITY FIX
-- ============================================

-- 1. Garantir que RLS está ativado
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 2. Remover TODAS as policies existentes para recriá-las corretamente
DROP POLICY IF EXISTS "Only authenticated admins and reviewers can view submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins and reviewers can view submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public can submit projects with pending status" ON public.submissions;

-- ============================================
-- NOVAS POLICIES (todas PERMISSIVE com TO authenticated)
-- ============================================

-- 3. SELECT: APENAS admins e reviewers autenticados podem visualizar
CREATE POLICY "select_submissions_admin_reviewer_only"
ON public.submissions
FOR SELECT
TO authenticated
USING (is_admin_or_reviewer(auth.uid()));

-- 4. INSERT: Bloqueado para acesso direto via RLS
-- As submissões são processadas EXCLUSIVAMENTE via Edge Functions (create-submission)
-- que usam service_role e bypassam RLS.
-- NÃO criar policy de INSERT = nenhum usuário pode inserir diretamente

-- 5. UPDATE: APENAS admins autenticados podem atualizar
CREATE POLICY "update_submissions_admin_only"
ON public.submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 6. DELETE: APENAS admins autenticados podem deletar
CREATE POLICY "delete_submissions_admin_only"
ON public.submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- RESULTADO FINAL:
-- ============================================
-- ✅ anon: NENHUM acesso (SELECT, INSERT, UPDATE, DELETE bloqueados)
-- ✅ authenticated (comum): NENHUM acesso direto
-- ✅ authenticated (admin): SELECT, UPDATE, DELETE
-- ✅ authenticated (reviewer): apenas SELECT
-- ✅ service_role (Edge Functions): bypass RLS para INSERT via create-submission