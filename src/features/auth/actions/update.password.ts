'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { updatePassword } from '../services/update.password';

export async function updatePasswordAction(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const supabase = await createClient();

  try {
    await updatePassword(supabase, password, confirmPassword);
  } catch (error) {
    console.error('Update password action error:', error);
    return {
      error:
        error instanceof Error
          ? error.message
          : '새 비밀번호 설정에 실패했습니다.',
    };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
