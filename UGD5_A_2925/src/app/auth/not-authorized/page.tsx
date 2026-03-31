"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { LOGIN_ROUTE } from "@/lib/constants";
import { WarningIcon } from "@/components/icons";
import { useToast } from "@/components/toast-provider";

export default function NotAuthorizedPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [countdown, setCountdown] = useState(3);
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (!hasShownToastRef.current) {
      hasShownToastRef.current = true;
      showToast({
        title: "Anda belum login",
        description: "Akses ke halaman game dibatasi sampai login berhasil.",
        variant: "error",
      });
    }

    const tick = window.setInterval(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      startTransition(() => {
        router.replace(LOGIN_ROUTE);
      });
    }, 3200);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(redirectTimer);
    };
  }, [router, showToast]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="auth-orb left-[12%] top-20 h-40 w-40 bg-sky-300" />
      <div className="auth-orb right-[15%] top-[32%] h-28 w-28 bg-indigo-300 [animation-delay:2.5s]" />

      <article className="glass-card w-full max-w-md rounded-[32px] p-6 text-center sm:p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <WarningIcon className="h-9 w-9" />
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,_rgba(22,163,74,0.35),_rgba(37,99,235,0.4)),url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center p-5 text-left text-white shadow-lg">
          <div className="rounded-[18px] bg-slate-950/55 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
              Access Denied
            </p>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight">
              Anda belum login
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Halaman game tidak bisa dibuka langsung lewat URL. Sistem akan
              mengembalikan Anda ke halaman login.
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          Redirect otomatis dalam{" "}
          <span className="font-display text-lg font-bold text-slate-950">
            {countdown}
          </span>{" "}
          detik.
        </p>

        <button
          type="button"
          onClick={() =>
            startTransition(() => {
              router.replace(LOGIN_ROUTE);
            })
          }
          className="mt-5 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
        >
          Kembali ke Login
        </button>
      </article>
    </main>
  );
}
