"use client";

import Link from "next/link";
import { useState, type HTMLAttributes, type ReactNode } from "react";
import { HOME_ROUTE } from "@/lib/constants";
import { getStrengthDescriptor } from "@/lib/validation";
import {
  FacebookIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  GitHubIcon,
  GoogleIcon,
  PowerIcon,
  RefreshIcon,
} from "./icons";
import { useToast } from "./toast-provider";

type AuthPageFrameProps = {
  badge: string;
  title: string;
  subtitle: string;
  sideTitle: string;
  sideDescription: string;
  highlights: string[];
  footer: ReactNode;
  children: ReactNode;
};

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  name: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  rightSlot?: ReactNode;
};

type PasswordFieldProps = Omit<TextFieldProps, "type" | "rightSlot">;

type CaptchaFieldProps = {
  captcha: string;
  value: string;
  onChange: (value: string) => void;
  onRefresh: () => void;
  error?: string;
  compact?: boolean;
};

function getInputClasses(error?: string, withRightSlot?: boolean) {
  return [
    "w-full rounded-[14px] border bg-white px-5 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400",
    withRightSlot ? "pr-14" : "",
    error
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-300 focus:border-sky-500",
  ].join(" ");
}

export function SimpleAuthCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden px-4 py-1 sm:items-center sm:px-6">
      <div className="mx-auto w-full max-w-[520px] rounded-[18px] bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.14)] sm:px-8 sm:py-9">
        <h1 className="text-center font-display text-[38px] font-bold tracking-tight text-black">
          {title}
        </h1>
        <div className="mt-9">{children}</div>
        {footer ? <div className="mt-7">{footer}</div> : null}
      </div>
    </main>
  );
}

export function AuthPageFrame({
  badge,
  title,
  subtitle,
  sideTitle,
  sideDescription,
  highlights,
  footer,
  children,
}: AuthPageFrameProps) {
  return (
    <main className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="auth-orb left-[8%] top-16 h-36 w-36 bg-cyan-300" />
      <div className="auth-orb right-[10%] top-[28%] h-28 w-28 bg-blue-300 [animation-delay:2.8s]" />
      <div className="auth-orb bottom-[14%] left-[16%] h-32 w-32 bg-indigo-300 [animation-delay:4.4s]" />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="glass-card grid w-full max-w-5xl overflow-hidden rounded-[34px] lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden overflow-hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.28),_transparent_30%),linear-gradient(145deg,_rgba(59,130,246,0.26),_transparent_52%)]" />

            <div className="relative space-y-6">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                UGD React Hooks
              </span>

              <div className="space-y-3">
                <h2 className="max-w-sm font-display text-4xl font-bold tracking-tight">
                  {sideTitle}
                </h2>
                <p className="max-w-md text-sm leading-7 text-slate-300">
                  {sideDescription}
                </p>
              </div>

              <div className="grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="soft-panel rounded-2xl px-4 py-3 text-sm leading-6 text-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/20">
              <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-600/25">
                <PowerIcon className="h-4 w-4" />
              </div>

              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Home Game
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                {HOME_ROUTE}
              </h3>
              <div className="mt-8 rounded-[24px] bg-slate-950/70 p-5">
                <p className="font-display text-2xl font-semibold text-white">
                  Choose Your Game
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Login sukses akan mengantarkan pemain ke dashboard biru tua
                  dengan dua mini-game react hooks.
                </p>

                <div className="mt-6 flex gap-3">
                  <div className="rounded-2xl bg-amber-500/90 px-4 py-3 text-sm font-semibold text-amber-950">
                    Game EEK
                  </div>
                  <div className="rounded-2xl bg-emerald-500/90 px-4 py-3 text-sm font-semibold text-emerald-950">
                    Poop Survivors
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
            <div className="mx-auto max-w-md">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
                {badge}
              </span>

              <div className="mt-5 space-y-3">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950">
                  {title}
                </h1>
                <p className="text-sm leading-7 text-slate-500">{subtitle}</p>
              </div>

              <div className="mt-8">{children}</div>

              <div className="mt-7 border-t border-slate-200 pt-5">{footer}</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  name,
  autoComplete,
  inputMode,
  maxLength,
  rightSlot,
}: TextFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-[16px] font-medium text-slate-800">{label}</span>

      <div className="relative">
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={getInputClasses(error, Boolean(rightSlot))}
        />
        {rightSlot ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightSlot}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-[13px] italic text-red-500">{error}</p>
      ) : null}
    </label>
  );
}

export function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="p-1 text-slate-600 transition hover:text-slate-700 focus:outline-none"
          aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
        >
          {isVisible ? (
            <EyeClosedIcon className="h-5 w-5" />
          ) : (
            <EyeOpenIcon className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
}

export function CaptchaField({
  captcha,
  value,
  onChange,
  onRefresh,
  error,
  compact = false,
}: CaptchaFieldProps) {
  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-3 ${compact ? "text-base" : "text-sm"}`}>
        <span className="font-medium text-slate-800">Captcha:</span>
        <span className="rounded-md bg-slate-100 px-4 py-2 font-display text-[18px] font-bold tracking-tight text-slate-900">
          {captcha}
        </span>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center justify-center rounded-full p-1 text-blue-600 transition hover:text-blue-700"
        >
          <RefreshIcon className="h-6 w-6" />
        </button>
      </div>

      <input
        name="captcha"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Masukkan captcha"
        className={getInputClasses(error)}
      />

      {error ? (
        <p className="text-[13px] italic text-red-500">{error}</p>
      ) : null}
    </div>
  );
}

export function StrengthMeter({ strength }: { strength: number }) {
  const descriptor = getStrengthDescriptor(strength);

  return (
    <div className="space-y-2">
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-300 ${descriptor.barClassName}`}
          style={{ width: `${strength}%` }}
        />
      </div>

      <div className={`text-[12px] ${descriptor.textClassName}`}>
        Strength: {strength}%
      </div>
    </div>
  );
}

export function SocialButtons() {
  const { showToast } = useToast();
  const items = [
    {
      name: "Google",
      icon: <GoogleIcon className="h-6 w-6" />,
      className: "text-red-500",
    },
    {
      name: "GitHub",
      icon: <GitHubIcon className="h-6 w-6" />,
      className: "text-slate-700",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="h-6 w-6" />,
      className: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        <span>Atau masuk dengan</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="flex justify-center gap-3">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() =>
              showToast({
                title: `${item.name} Login Berhasil!`,
                variant: "success",
                duration: 3200,
              })
            }
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 transition hover:bg-slate-100 focus:outline-none ${item.className}`}
            aria-label={item.name}
            title={item.name}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AuthFooterLink({
  prompt,
  href,
  label,
  onClick,
}: {
  prompt: string;
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <p className="text-center text-sm text-slate-500">
      {prompt}{" "}
      <Link
        href={href}
        onClick={onClick}
        className="font-semibold text-sky-700 hover:text-sky-900"
      >
        {label}
      </Link>
    </p>
  );
}
