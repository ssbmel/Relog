"use server";

import { createClient } from "@/src/utils/supabase/server";

export async function resetPassword(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "이메일을 입력해주세요." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/update-password`,
  });

  if (error) {
    console.error("Reset password action error:", error);
    // Supabase Auth Email Rate Limit (429) 처리
    if (error.status === 429) {
      return { error: "이메일 발송 제한(시간당 약 3회)을 초과했습니다. 잠시 후 다시 시도해주세요." };
    }
    return { error: "비밀번호 재설정 이메일 발송에 실패했습니다. 이메일 주소를 확인해주세요." };
  }

  return { success: true };
}
