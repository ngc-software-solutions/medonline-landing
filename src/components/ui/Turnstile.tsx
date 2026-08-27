"use client";

import Script from "next/script";
import { cn } from "@/lib/utils";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Widget anti-spam de Cloudflare Turnstile en modo implícito: el script
 * inyecta un input oculto `cf-turnstile-response` que viaja con el FormData.
 * Si la llave pública no está configurada el widget no se monta, de modo que
 * el formulario sigue funcionando antes de registrar el sitio en Turnstile.
 */
export default function Turnstile({ className }: { className?: string }) {
  if (!SITE_KEY) {
    return null;
  }

  return (
    <div className={cn("flex justify-center", className)}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" />
    </div>
  );
}
