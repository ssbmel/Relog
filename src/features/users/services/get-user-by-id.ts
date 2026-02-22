import { SupabaseClient } from "@supabase/supabase-js";
import { getUserByIdQueryBuilder } from "../query-builder/get-user-by-id.builder";

export const getUserById = async (
  supabaseClient: SupabaseClient<any>,
  id: string,
) => {
  const { data, error } = await getUserByIdQueryBuilder(supabaseClient, id);

  if (error) {
    throw new Error(`User를 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
