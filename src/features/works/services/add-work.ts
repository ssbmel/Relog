import { SupabaseClient } from '@supabase/supabase-js';
import { addWorkQueryBuilder, AddWorkData } from '../query-builder/add-work.builder';

export const addWork = async (
  supabaseClient: SupabaseClient,
  data: AddWorkData,
) => {
  const { data: work, error } = await addWorkQueryBuilder(
    supabaseClient,
    data,
  );

  if (error) {
    throw new Error(`작업 저장에 실패했습니다: ${error.message}`);
  }

  return work;
};
