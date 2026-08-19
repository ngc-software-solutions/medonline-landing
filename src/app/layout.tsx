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
  title: "MedOnline | Expediente Clínico Electrónico NOM-004",
  description:
    "Digitaliza el expediente clínico de tu consulta conforme a la NOM-004-SSA3-2012 y el decreto 2026. Ideal para clínicas de 1 a 3 médicos. Solicita información.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "MedOnline",
    title: "MedOnline — Tu expediente clínico, listo para la ley de 2026",
    description:
      "Expediente clínico electrónico conforme a NOM-004-SSA3-2012, para clínicas privadas de consulta general en México.",
    url: siteUrl,
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "MedOnline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MedOnline — Expediente Clínico Electrónico",
    description:
      "Diseñado conforme a NOM-004-SSA3-2012. Para clínicas privadas de consulta general en México.",
    images: ["/logo/og-image.png"],
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
