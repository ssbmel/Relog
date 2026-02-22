"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData): Promise<{ error?: string } | void> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // 에러 발생 시 로그인 페이지로 돌아가며 쿼리 파라미터로 메시지 전달
    console.error("Login server action error:", error);
    return { error: "인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
