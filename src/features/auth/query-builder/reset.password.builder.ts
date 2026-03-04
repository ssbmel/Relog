import { SupabaseClient } from '@supabase/supabase-js';

export const resetPasswordQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
) => {
  const query = supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/update-password`,
  });

  return query;
};
