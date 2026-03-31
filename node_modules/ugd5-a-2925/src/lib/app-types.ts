export type ToastVariant = "success" | "successDark" | "error" | "info";

export type ToastPayload = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
};

export type FlashToast = Omit<ToastPayload, "id">;

export type GameKey = "eek" | "survivor";
