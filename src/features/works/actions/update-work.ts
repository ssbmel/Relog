'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { updateWork } from '../services/update-work';

export async function updateWorkStatusAction(
  workId: string | number,
  isCompleted: boolean,
  contactId?: string | number
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();

  // 현재 로그인한 사용자 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: '인증이 필요합니다.' };
  }

  try {
    // 완료로 변경하면 오늘 날짜를, 진행 중으로 변경하면 null을 설정
    const endDate = isCompleted ? new Date().toISOString().split('T')[0] : null;
    
    await updateWork(supabase, workId, { endDate });

    // 관련 페이지 캐시 갱신
    revalidatePath('/dashboard');
    revalidatePath('/works');
    if (contactId) {
      revalidatePath(`/contacts/${contactId}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Update work status error:', error);
    return { error: '상태 변경에 실패했습니다.' };
  }
}
