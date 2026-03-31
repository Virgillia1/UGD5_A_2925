"use client";

import {
  createContext,
  type CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { consumeFlashToast } from "@/lib/auth";
import type { ToastPayload } from "@/lib/app-types";
import { AlertCircleIcon, CheckIcon, XIcon } from "./icons";

type ToastContextValue = {
  showToast: (toast: Omit<ToastPayload, "id">) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles = {
  success: {
    shell: "bg-white text-slate-900 shadow-sky-500/10",
    iconWrap: "bg-transparent text-emerald-500",
    close: "text-slate-400 hover:text-slate-700",
    track: "bg-[#d9ebff]",
    bar: "bg-[#67bdf3]",
    icon: <CheckIcon className="h-5 w-5" />,
  },
  successDark: {
    shell: "bg-[#181818] text-white shadow-black/25",
    iconWrap: "bg-[#16c63a] text-[#0d120f]",
    close: "text-slate-400 hover:text-white",
    track: "bg-[#244126]",
    bar: "bg-[#16c63a]",
    icon: <CheckIcon className="h-5 w-5" />,
  },
  error: {
    shell: "bg-[#181818] text-white shadow-black/25",
    iconWrap: "bg-[#f04d37] text-white",
    close: "text-slate-400 hover:text-white",
    track: "bg-[#402321]",
    bar: "bg-[#f04d37]",
    icon: <AlertCircleIcon className="h-5 w-5" />,
  },
  info: {
    shell: "bg-white text-slate-900 shadow-slate-500/10",
    iconWrap: "bg-sky-50 text-sky-500",
    close: "text-slate-400 hover:text-slate-700",
    track: "bg-[#d8eafe]",
    bar: "bg-[#38bdf8]",
    icon: <CheckIcon className="h-5 w-5" />,
  },
};

function createToastId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  function dismissToast(id: string) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function showToast(toast: Omit<ToastPayload, "id">) {
    const id = createToastId();
    const nextToast = { ...toast, id };

    setToasts((current) => [...current, nextToast]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, toast.duration ?? 3600);
  }

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col items-end gap-3">
        {toasts.map((toast) => {
          const style = variantStyles[toast.variant];
          const duration = toast.duration ?? 3600;
          const progressStyle = {
            animationDuration: `${duration}ms`,
          } as CSSProperties;

          return (
            <article
              key={toast.id}
              className={`toast-enter pointer-events-auto w-full max-w-[400px] overflow-hidden rounded-xl shadow-2xl ${style.shell}`}
            >
              <div className="flex items-start gap-4 px-5 py-4">
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.iconWrap}`}
                >
                  {style.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="pr-6 text-[15px] font-semibold leading-6 tracking-tight">
                    {toast.title}
                    {toast.description ? ` ${toast.description}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className={`-mr-1 -mt-1 rounded-full p-1 transition ${style.close}`}
                  aria-label="Tutup toast"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className={`h-1.5 w-full ${style.track}`}>
                <div
                  className={`toast-progress h-full ${style.bar}`}
                  style={progressStyle}
                />
              </div>
            </article>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function FlashToastBridge() {
  const { showToast } = useToast();
  const hasConsumedRef = useRef(false);

  useEffect(() => {
    if (hasConsumedRef.current) {
      return;
    }

    hasConsumedRef.current = true;

    const flashToast = consumeFlashToast();

    if (flashToast) {
      showToast(flashToast);
    }
  }, [showToast]);

  return null;
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast harus dipakai di dalam ToastProvider.");
  }

  return context;
}
