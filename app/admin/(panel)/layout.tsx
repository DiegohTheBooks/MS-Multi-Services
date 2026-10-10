import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/admin-auth";

export const metadata = { title: "Administração | MS Multi Services", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = await getAdminSession(cookieStore);
  if (!session) redirect("/admin/login");
  return children;
}
