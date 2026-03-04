import { SupabaseClient } from '@supabase/supabase-js';
import { updatePasswordQueryBuilder } from '../query-builder/update.password';

export const updatePassword = async (
  supabaseClient: SupabaseClient,
  password: string,
  confirmPassword: string,
) => {
  if (!password || !confirmPassword) {
    throw new Error('비밀번호를 입력해주세요.');
  }

  if (password !== confirmPassword) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  const { data, error } = await updatePasswordQueryBuilder(
    supabaseClient,
    password,
  );

  if (error) {
    throw new Error('새 비밀번호 설정에 실패했습니다.');
  }

  return data;
};
