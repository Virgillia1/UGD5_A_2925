import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HomeDashboard } from "@/components/home-dashboard";
import { AUTH_COOKIE_KEY, NOT_AUTHORIZED_ROUTE } from "@/lib/constants";

export default async function HomePage() {
  const cookieStore = await cookies();

  if (cookieStore.get(AUTH_COOKIE_KEY)?.value !== "1") {
    redirect(NOT_AUTHORIZED_ROUTE);
  }

  return <HomeDashboard />;
}
