import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { AUTH_COOKIE_KEY, HOME_ROUTE } from "@/lib/constants";

export default async function LoginPage() {
  const cookieStore = await cookies();

  if (cookieStore.get(AUTH_COOKIE_KEY)?.value === "1") {
    redirect(HOME_ROUTE);
  }

  return <LoginForm />;
}
