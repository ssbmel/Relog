import { SupabaseClient } from '@supabase/supabase-js';
import { resetPasswordQueryBuilder } from '../query-builder/reset.password.builder';

export const resetPassword = async (
  supabaseClient: SupabaseClient,
  email: string,
) => {
  const { data, error } = await resetPasswordQueryBuilder(
    supabaseClient,
    email,
  );

  if (error) {
    if (error.status === 429) {
      throw new Error('EMAIL_RATE_LIMIT');
    }
    throw new Error(
      '비밀번호 재설정 이메일 발송에 실패했습니다. 이메일 주소를 확인해주세요.',
    );
  }

  return data;
};
