"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<{ error?: string } | void> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      }
    }
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Signup server action error:", error);
    
    // 이메일 발송 제한 에러 처리
    if (error.status === 429) {
      return { error: "이메일 발송 제한(시간당 약 3회)을 초과했습니다. 1시간 뒤 다시 시도하거나, Supabase 대시보드에서 'Confirm email' 옵션을 꺼주세요." };
    }
    
    // 에러 원인을 더 명확하게 파악하기 위해 실제 에러 메시지를 함께 반환합니다.
    return { error: `회원가입에 실패했습니다: ${error.message}` };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
