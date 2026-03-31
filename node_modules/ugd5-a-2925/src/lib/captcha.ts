import { CAPTCHA_LENGTH } from "./constants";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCaptcha(length = CAPTCHA_LENGTH) {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * CAPTCHA_CHARS.length);
    return CAPTCHA_CHARS[index];
  }).join("");
}

export function matchesCaptcha(input: string, captcha: string) {
  return input.trim().toLowerCase() === captcha.trim().toLowerCase();
}
