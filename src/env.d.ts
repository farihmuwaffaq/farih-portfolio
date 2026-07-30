/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  portfolioAnalytics?: {
    track: (name: string, detail?: Record<string, unknown>) => void;
  };
}
