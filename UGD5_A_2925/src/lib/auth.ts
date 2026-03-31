import type { FlashToast } from "./app-types";
import {
  AUTH_COOKIE_KEY,
  FLASH_TOAST_KEY,
  INITIAL_LOGIN_ATTEMPTS,
  LOGIN_ATTEMPTS_KEY,
} from "./constants";

function isBrowser() {
  return typeof window !== "undefined";
}

function clampAttempts(value: number) {
  return Math.min(INITIAL_LOGIN_ATTEMPTS, Math.max(0, value));
}

export function setAuthCookie(maxAgeInSeconds: number) {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=${maxAgeInSeconds}; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function readLoginAttempts() {
  if (!isBrowser()) {
    return INITIAL_LOGIN_ATTEMPTS;
  }

  const raw = window.localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  const parsed = Number.parseInt(raw ?? "", 10);

  if (Number.isNaN(parsed)) {
    return INITIAL_LOGIN_ATTEMPTS;
  }

  return clampAttempts(parsed);
}

export function writeLoginAttempts(value: number) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(LOGIN_ATTEMPTS_KEY, String(clampAttempts(value)));
}

export function resetLoginAttempts() {
  writeLoginAttempts(INITIAL_LOGIN_ATTEMPTS);
}

export function saveFlashToast(toast: FlashToast) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(FLASH_TOAST_KEY, JSON.stringify(toast));
}

export function consumeFlashToast() {
  if (!isBrowser()) {
    return null;
  }

  const serialized = window.sessionStorage.getItem(FLASH_TOAST_KEY);

  if (!serialized) {
    return null;
  }

  window.sessionStorage.removeItem(FLASH_TOAST_KEY);

  try {
    return JSON.parse(serialized) as FlashToast;
  } catch {
    return null;
  }
}
