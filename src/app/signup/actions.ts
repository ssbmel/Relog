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
    return { error: "회원가입에 실패했습니다." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
