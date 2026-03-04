'use server';

import { createClient } from '@/src/utils/supabase/server';
import { resetPassword } from '../services/reset.password';

export async function resetPasswordAction(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: '이메일을 입력해주세요.' };
  }

  const supabase = await createClient();

  try {
    await resetPassword(supabase, email);
  } catch (error) {
    console.error('Reset password action error:', error);

    if (error instanceof Error && error.message === 'EMAIL_RATE_LIMIT') {
      return {
        error:
          '이메일 발송 제한(시간당 약 3회)을 초과했습니다. 잠시 후 다시 시도해주세요.',
      };
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : '비밀번호 재설정에 실패했습니다.',
    };
  }

  return { success: true };
}
