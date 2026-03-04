import { SupabaseClient } from '@supabase/supabase-js';

export interface AddContactInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  notes?: string;
}

export interface AddContactData extends AddContactInput {
  user_id: string;
}

export const addContactQueryBuilder = (
  supabaseClient: SupabaseClient,
  data: AddContactData,
) => {
  // .select().single()을 빼고 insert만 시도해봅니다.
  const query = supabaseClient.from('contacts').insert(data);
  return query;
};
