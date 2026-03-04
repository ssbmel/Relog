import { SupabaseClient } from '@supabase/supabase-js';

export const updateWork = async (
  supabaseClient: SupabaseClient,
  workId: string | number,
  updates: { endDate: string | null }
) => {
  const { data, error } = await supabaseClient
    .from('works')
    .update(updates)
    .eq('id', workId)
    .select()
    .single();

  if (error) {
    throw new Error(`작업 업데이트에 실패했습니다: ${error.message}`);
  }

  return data;
};
