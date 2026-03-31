"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, type FormEvent } from "react";
import { generateCaptcha } from "@/lib/captcha";
import {
  readLoginAttempts,
  resetLoginAttempts,
  saveFlashToast,
  setAuthCookie,
  writeLoginAttempts,
} from "@/lib/auth";
import {
  HOME_ROUTE,
  INITIAL_LOGIN_ATTEMPTS,
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
  REGISTER_ROUTE,
} from "@/lib/constants";
import {
  type FormErrors,
  type LoginField,
  type LoginFormValues,
  validateLoginForm,
} from "@/lib/validation";
import {
  AuthFooterLink,
  CaptchaField,
  PasswordField,
  SimpleAuthCard,
  SocialButtons,
  TextField,
} from "./auth-shared";
import { useToast } from "./toast-provider";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  captcha: "",
  rememberMe: false,
};

export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<LoginField>>({});
  const [captcha, setCaptcha] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(INITIAL_LOGIN_ATTEMPTS);

  useEffect(() => {
    const initializeForm = window.setTimeout(() => {
      setCaptcha(generateCaptcha());
      setAttemptsLeft(readLoginAttempts());
    }, 0);

    return () => window.clearTimeout(initializeForm);
  }, []);

  function updateField(field: "email" | "password" | "captcha", value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setValues((current) => ({ ...current, captcha: "" }));
  }

  function handleFailure(nextErrors: FormErrors<LoginField>) {
    const nextAttempts = Math.max(0, attemptsLeft - 1);

    setErrors(nextErrors);
    setAttemptsLeft(nextAttempts);
    writeLoginAttempts(nextAttempts);
    refreshCaptcha();

    showToast({
      title:
        nextAttempts === 0 ? "Kesempatan login habis!" : "Login Gagal!",
      description:
        nextAttempts === 0 ? undefined : `Sisa kesempatan: ${nextAttempts}`,
      variant: "error",
    });
  }

  function handleResetAttempts() {
    resetLoginAttempts();
    setAttemptsLeft(INITIAL_LOGIN_ATTEMPTS);
    setErrors({});
    refreshCaptcha();

    showToast({
      title: "Kesempatan direset",
      description: "Anda punya 3 kesempatan login lagi.",
      variant: "success",
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (attemptsLeft <= 0) {
      showToast({
        title: "Kesempatan login habis!",
        variant: "error",
      });
      return;
    }

    const nextErrors = validateLoginForm(values, captcha);

    if (Object.keys(nextErrors).length > 0) {
      handleFailure(nextErrors);
      return;
    }

    resetLoginAttempts();
    setAttemptsLeft(INITIAL_LOGIN_ATTEMPTS);
    setErrors({});
    setAuthCookie(values.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 10);
    saveFlashToast({
      title: "Login berhasil",
      description: "Selamat datang di halaman game React Hooks.",
      variant: "success",
    });

    startTransition(() => {
      router.push(HOME_ROUTE);
    });
  }

  return (
    <SimpleAuthCard
      title="Login"
      footer={
        <AuthFooterLink
          prompt="Tidak punya akun?"
          href={REGISTER_ROUTE}
          label="Daftar"
        />
      }
    >
      <p className="mb-8 text-center text-[18px] font-semibold text-slate-800">
        Sisa Kesempatan: {attemptsLeft}
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          placeholder="Masukan email"
          value={values.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
        />

        <div className="space-y-3">
          <PasswordField
            name="password"
            label="Password"
            placeholder="Masukan password"
            value={values.password}
            onChange={(value) => updateField("password", value)}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-3 text-[16px] text-slate-800">
              <input
                type="checkbox"
                checked={values.rememberMe}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    rememberMe: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
              />
              Ingat Saya
            </label>

            <button
              type="button"
              onClick={() =>
                showToast({
                  title: "Forgot Password?",
                  description: `Gunakan email ${LOGIN_EMAIL} dan password ${LOGIN_PASSWORD}.`,
                  variant: "info",
                })
              }
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <CaptchaField
          captcha={captcha}
          value={values.captcha}
          onChange={(value) => updateField("captcha", value)}
          onRefresh={refreshCaptcha}
          error={errors.captcha}
          compact
        />

        <div className="space-y-5 pt-1">
          <button
            type="submit"
            disabled={attemptsLeft === 0}
            className={`w-full rounded-[12px] px-4 py-4 text-[18px] font-semibold text-white transition ${
              attemptsLeft === 0
                ? "cursor-not-allowed bg-slate-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleResetAttempts}
            disabled={attemptsLeft !== 0}
            className={`w-full rounded-[12px] px-4 py-4 text-[18px] font-semibold transition ${
              attemptsLeft === 0
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "cursor-not-allowed bg-slate-400 text-white"
            }`}
          >
            Reset Kesempatan
          </button>
        </div>
      </form>

      <div className="mt-8">
        <SocialButtons />
      </div>
    </SimpleAuthCard>
  );
}
