'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { addWork } from '../services/add-work';
import { AddWorkInput } from '../query-builder/add-work.builder';

export async function addWorkAction(
  data: AddWorkInput,
): Promise<{ error?: string; success?: boolean; data?: any }> {
  const supabase = await createClient();

  // 현재 로그인한 사용자 ID 가져오기
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: '인증이 필요합니다.' };
  }

  try {
    const result = await addWork(supabase, {
      ...data,
      user_id: user.id, // 쿼리 빌더와 일치하도록 user_id 사용
    });
    
    revalidatePath('/dashboard');
    revalidatePath('/works');
    if (data.contactId) {
      revalidatePath(`/contacts/${data.contactId}`);
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Add work action error:', error);
    return { error: '작업 저장에 실패했습니다.' };
  }
}
