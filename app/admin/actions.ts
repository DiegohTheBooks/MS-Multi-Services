"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdmin, createAdminSession, destroyAdminSession } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function loginAdmin(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password || email.length > 254 || password.length > 128) {
    return { error: "Confira o e-mail e a senha." };
  }

  const authenticated = await authenticateAdmin(email, password);
  if (!authenticated) return { error: "Não foi possível entrar. Confira os dados ou tente novamente mais tarde." };

  const cookieStore = await cookies();
  await createAdminSession(cookieStore, email);
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  await destroyAdminSession(cookieStore);
  redirect("/admin/login");
}
