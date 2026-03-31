import { matchesCaptcha } from "./captcha";
import { LOGIN_EMAIL, LOGIN_PASSWORD } from "./constants";

export type LoginFormValues = {
  email: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
};

export type RegisterFormValues = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

export type LoginField = "email" | "password" | "captcha";
export type RegisterField =
  | "username"
  | "email"
  | "phone"
  | "password"
  | "confirmPassword"
  | "captcha";

export type FormErrors<T extends string> = Partial<Record<T, string>>;

export function validateLoginForm(
  values: LoginFormValues,
  captchaText: string
) {
  const errors: FormErrors<LoginField> = {};

  if (!values.email.trim()) {
    errors.email = "Email tidak boleh kosong.";
  } else if (values.email.trim().toLowerCase() !== LOGIN_EMAIL) {
    errors.email = `Email harus sesuai ${LOGIN_EMAIL}.`;
  }

  if (!values.password.trim()) {
    errors.password = "Password tidak boleh kosong.";
  } else if (values.password !== LOGIN_PASSWORD) {
    errors.password = `Password harus sesuai ${LOGIN_PASSWORD}.`;
  }

  if (!values.captcha.trim()) {
    errors.captcha = "Captcha tidak boleh kosong.";
  } else if (!matchesCaptcha(values.captcha, captchaText)) {
    errors.captcha = "Captcha harus sesuai dengan yang ditampilkan.";
  }

  return errors;
}

export function validateRegisterForm(
  values: RegisterFormValues,
  captchaText: string
) {
  const errors: FormErrors<RegisterField> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|co)$/i;
  const digitsOnly = /^\d+$/;

  if (!values.username.trim()) {
    errors.username = "Username tidak boleh kosong.";
  } else if (values.username.trim().length < 3) {
    errors.username = "Username minimal 3 karakter.";
  } else if (values.username.trim().length > 8) {
    errors.username = "Username maksimal 8 karakter.";
  }

  if (!values.email.trim()) {
    errors.email = "Email tidak boleh kosong.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Email harus mengandung @ dan domain .com/.net/.co.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Nomor telepon tidak boleh kosong.";
  } else if (!digitsOnly.test(values.phone.trim())) {
    errors.phone = "Nomor telepon hanya boleh berisi angka.";
  } else if (values.phone.trim().length < 10) {
    errors.phone = "Nomor telepon minimal 10 karakter.";
  }

  if (!values.password.trim()) {
    errors.password = "Password tidak boleh kosong.";
  } else if (values.password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Konfirmasi password tidak boleh kosong.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Konfirmasi password harus sama.";
  }

  if (!values.captcha.trim()) {
    errors.captcha = "Captcha tidak boleh kosong.";
  } else if (!matchesCaptcha(values.captcha, captchaText)) {
    errors.captcha = "Captcha harus sesuai dengan yang ditampilkan.";
  }

  return errors;
}

export function getPasswordStrength(password: string) {
  return Math.min(
    100,
    (password.length > 7 ? 25 : 0) +
      (/[A-Z]/.test(password) ? 25 : 0) +
      (/[0-9]/.test(password) ? 25 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
  );
}

export function getStrengthDescriptor(strength: number) {
  if (strength >= 75) {
    return {
      label: "Kuat",
      barClassName: "from-emerald-500 to-green-500",
      textClassName: "text-emerald-600",
    };
  }

  if (strength >= 50) {
    return {
      label: "Sedang",
      barClassName: "from-emerald-400 to-green-500",
      textClassName: "text-emerald-600",
    };
  }

  if (strength >= 25) {
    return {
      label: "Lemah",
      barClassName: "from-lime-400 to-emerald-500",
      textClassName: "text-green-600",
    };
  }

  return {
    label: "Kosong",
    barClassName: "from-slate-300 to-slate-200",
    textClassName: "text-slate-400",
  };
}
