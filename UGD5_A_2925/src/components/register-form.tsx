"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, type FormEvent } from "react";
import { generateCaptcha } from "@/lib/captcha";
import { resetLoginAttempts, saveFlashToast } from "@/lib/auth";
import { LOGIN_ROUTE } from "@/lib/constants";
import {
  getPasswordStrength,
  type FormErrors,
  type RegisterField,
  type RegisterFormValues,
  validateRegisterForm,
} from "@/lib/validation";
import {
  AuthFooterLink,
  CaptchaField,
  PasswordField,
  SimpleAuthCard,
  StrengthMeter,
  TextField,
} from "./auth-shared";
import { useToast } from "./toast-provider";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  captcha: "",
};

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<RegisterField>>({});
  const [captcha, setCaptcha] = useState("");
  const passwordStrength = getPasswordStrength(values.password);
  const confirmStrength =
    values.confirmPassword.length > 0 &&
    values.confirmPassword === values.password
      ? 100
      : 0;

  useEffect(() => {
    const initializeCaptcha = window.setTimeout(() => {
      setCaptcha(generateCaptcha());
    }, 0);

    return () => window.clearTimeout(initializeCaptcha);
  }, []);

  function updateField(
    field: Exclude<keyof RegisterFormValues, "captcha"> | "captcha",
    value: string
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setValues((current) => ({ ...current, captcha: "" }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateRegisterForm(values, captcha);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      refreshCaptcha();
      showToast({
        title: "Registrasi belum valid",
        description: "Periksa lagi field yang masih merah dan captcha Anda.",
        variant: "error",
      });
      return;
    }

    saveFlashToast({
      title: "Register Berhasil!",
      variant: "successDark",
      duration: 3200,
    });
    resetLoginAttempts();

    startTransition(() => {
      router.push(LOGIN_ROUTE);
    });
  }

  return (
    <SimpleAuthCard
      title="Register"
      footer={
        <AuthFooterLink
          prompt="Sudah punya akun?"
          href={LOGIN_ROUTE}
          label="Login"
          onClick={resetLoginAttempts}
        />
      }
    >
      <form className="space-y-7" onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username (max 8 karakter)"
          placeholder="Masukkan username"
          value={values.username}
          onChange={(value) => updateField("username", value)}
          error={errors.username}
          autoComplete="username"
          maxLength={8}
        />

        <TextField
          name="email"
          label="Email"
          placeholder="Masukkan email"
          value={values.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
        />

        <TextField
          name="phone"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          value={values.phone}
          onChange={(value) => updateField("phone", value)}
          error={errors.phone}
          autoComplete="tel"
          inputMode="numeric"
        />

        <PasswordField
          name="password"
          label="Password"
          placeholder="Masukkan password"
          value={values.password}
          onChange={(value) => updateField("password", value)}
          error={errors.password}
          autoComplete="new-password"
        />

        {values.password ? <StrengthMeter strength={passwordStrength} /> : null}

        <PasswordField
          name="confirmPassword"
          label="Konfirmasi Password"
          placeholder="Masukkan ulang password"
          value={values.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        {values.confirmPassword ? (
          <StrengthMeter strength={confirmStrength} />
        ) : null}

        <CaptchaField
          captcha={captcha}
          value={values.captcha}
          onChange={(value) => updateField("captcha", value)}
          onRefresh={refreshCaptcha}
          error={errors.captcha}
          compact
        />

        <button
          type="submit"
          className="w-full rounded-[12px] bg-blue-600 px-4 py-4 text-[18px] font-semibold text-white transition hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </SimpleAuthCard>
  );
}
