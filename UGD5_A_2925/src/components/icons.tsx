import type { SVGProps } from "react";

function BaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function EyeOpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M2 12s3.2-6.5 10-6.5S22 12 22 12s-3.2 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </BaseIcon>
  );
}

export function EyeClosedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A2 2 0 0 0 14 12" />
      <path d="M9.88 5.08A11.7 11.7 0 0 1 12 5c7 0 10.5 7 10.5 7a18.15 18.15 0 0 1-3.09 3.92" />
      <path d="M6.61 6.62A17.82 17.82 0 0 0 1.5 12s3.5 7 10.5 7a10.8 10.8 0 0 0 4.18-.79" />
    </BaseIcon>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M20 11a8 8 0 1 0 2 5.3" />
      <path d="M20 4v7h-7" />
    </BaseIcon>
  );
}

export function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3 2 20.25h20Z" />
      <path d="M12 9v4.5" />
      <circle cx="12" cy="16.75" r=".85" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function PowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2.75v8.5" />
      <path d="M6.35 5.9a8 8 0 1 0 11.3 0" />
    </BaseIcon>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </BaseIcon>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </BaseIcon>
  );
}

export function AlertCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4.2" />
      <circle cx="12" cy="16.2" r=".9" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12.22 10.2v3.92h5.46c-.24 1.26-.96 2.33-2.05 3.05l3.32 2.57c1.93-1.78 3.05-4.4 3.05-7.52 0-.72-.06-1.4-.2-2.02Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.76 0 5.08-.91 6.77-2.46l-3.32-2.57c-.92.62-2.1.99-3.45.99-2.66 0-4.91-1.8-5.72-4.22l-3.43 2.65A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#4A90E2"
        d="M6.28 13.74A5.98 5.98 0 0 1 5.96 12c0-.61.11-1.2.32-1.74L2.85 7.61A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.39Z"
      />
      <path
        fill="#FBBC05"
        d="M12 6.04c1.5 0 2.86.52 3.92 1.55l2.93-2.93C17.08 2.98 14.76 2 12 2a9.99 9.99 0 0 0-9.15 5.61l3.43 2.65C7.09 7.84 9.34 6.04 12 6.04Z"
      />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.35 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.22 9.22 0 0 1 12 6.88c.85 0 1.71.12 2.51.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.77 0 3.96-2.35 4.83-4.59 5.08.36.32.69.95.69 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.09 4.39 23.08 10.13 24v-8.44H7.08v-3.5h3.05V9.39c0-3.04 1.79-4.72 4.54-4.72 1.31 0 2.68.24 2.68.24v2.98h-1.51c-1.49 0-1.95.94-1.95 1.9v2.28h3.32l-.53 3.5h-2.79V24C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}
