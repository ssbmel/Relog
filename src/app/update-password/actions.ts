"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePassword(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return { error: "비밀번호를 입력해주세요." };
  }

  if (password !== confirmPassword) {
    return { error: "비밀번호가 일치하지 않습니다." };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Update password action error:", error);
    return { error: "새 비밀번호 설정에 실패했습니다." };
  }

  // 성공 시 쿠키와 세션은 그대로 유지 (자동 로그인 상태)
  revalidatePath("/", "layout");
  return { success: true };
}
