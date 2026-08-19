import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const siteUrl = "https://medonline.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "MedOnline | Expediente Clínico Electrónico para Clínicas Privadas | Diseñado conforme a NOM-004",
  description:
    "Digitaliza el expediente clínico de tu consulta general conforme al decreto de enero 2026 y la NOM-004-SSA3-2012. Sistema hecho para clínicas privadas de 1 a 3 médicos. Solicita información.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MedOnline — Tu expediente clínico, listo para la ley de 2026",
    description:
      "Sistema de expediente clínico electrónico diseñado conforme a NOM-004-SSA3-2012, hecho para clínicas privadas de consulta general en México.",
    url: siteUrl,
    type: "website",
    locale: "es_MX",
    // TODO: og:image pendiente — falta el asset 1200x630px (ver sección 7 de la estrategia SEO).
  },
  twitter: {
    card: "summary_large_image",
    title: "MedOnline — Expediente Clínico Electrónico para Clínicas Privadas",
    description:
      "Diseñado conforme a NOM-004-SSA3-2012. Para clínicas privadas de consulta general en México.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NGC Software Solutions",
  url: siteUrl,
  // TODO: logo pendiente de URL definitiva.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cuernavaca",
    addressRegion: "Morelos",
    addressCountry: "MX",
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MedOnline",
  applicationCategory: "MedicalApplication",
  operatingSystem: "Web",
  description:
    "Sistema de expediente clínico electrónico diseñado conforme a NOM-004-SSA3-2012, para clínicas privadas de consulta general en México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        plusJakartaSans.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
