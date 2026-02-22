import { SupabaseClient } from "@supabase/supabase-js";

export const getUserByIdQueryBuilder = (
  supabaseClient: SupabaseClient<any>, // 타입을 명시적으로 지정하기 위해 향후 Database 제네릭으로 교체 가능
  id: string,
) => {
  const query = supabaseClient
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return query;
};
