import { SupabaseClient } from '@supabase/supabase-js';

export const updatePasswordQueryBuilder = (
  supabaseClient: SupabaseClient,
  password: string,
) => {
  const query = supabaseClient.auth.updateUser({ password });
  return query;
};
