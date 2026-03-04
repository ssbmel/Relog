'use server';

import { createClient } from '@/src/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { addContact } from '../services/add-contact';
import { AddContactInput } from '../query-builder/add-contact.builder';

export async function addContactAction(
  data: AddContactInput,
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();

  // 현재 로그인한 사용자 ID 가져오기
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: '인증이 필요합니다.' };
  }

  try {
    const insertData = {
      ...data,
      user_id: user.id,
    };
    console.log('Final data to insert:', JSON.stringify(insertData, null, 2));
    
    const result = await addContact(supabase, insertData);
    console.log('Contact added successfully:', result);
  } catch (error) {
    console.error('Add contact action error:', error);
    return { error: '연락처 저장에 실패했습니다.' };
  }

  revalidatePath('/contacts');
  return { success: true };
}
