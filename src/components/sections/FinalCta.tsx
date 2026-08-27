"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Turnstile from "@/components/ui/Turnstile";
import { cn } from "@/lib/utils";

const CONTACT_ENDPOINT = "/api/contacto";

const GENERIC_ERROR =
  "No pudimos enviar tus datos. Revisa tu conexión e intenta de nuevo.";

type Status = "idle" | "submitting" | "success" | "error";

const DOCTORS_RANGE_OPTIONS = [
  "1 médico",
  "2 a 4 médicos",
  "5 a 10 médicos",
  "Más de 10 médicos",
];

const RECORD_KEEPING_OPTIONS = [
  "Papel",
  "Excel / hoja de cálculo",
  "Otro sistema digital",
  "No tengo expediente formal",
];

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-foreground/40 hover:border-foreground/20 focus:border-primary focus:ring-4 focus:ring-primary/15";

const selectClasses = cn(
  inputClasses,
  "appearance-none pr-10 text-foreground/90",
);

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground/80"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  className,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  className?: string;
}) {
  return (
    <Field label={label} htmlFor={id} className={className}>
      <div className="relative">
        <select id={id} name={name} defaultValue="" className={selectClasses}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-foreground/40"
          strokeWidth={2}
          aria-hidden
        />
      </div>
    </Field>
  );
}

export default function FinalCta() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      nombre_clinica: formData.get("clinicName"),
      nombre_contacto: formData.get("contactName"),
      contacto: formData.get("contactMethod"),
      num_medicos: formData.get("doctorsRange"),
      expediente_actual: formData.get("recordKeeping"),
      "cf-turnstile-response": formData.get("cf-turnstile-response"),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setErrorMessage(body?.error || GENERIC_ERROR);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(GENERIC_ERROR);
      setStatus("error");
    }
  }

  return (
    <section
      id="cta-final"
      className="bg-background py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-2xl px-6 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="timeline-view flex flex-col items-center text-center animate-zoom-in animate-range-entry">
          <span className="font-mono text-xs tracking-wide text-primary uppercase">
            Hablemos
          </span>
          <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-[3rem] lg:leading-[1.08]">
            Hablemos de tu clínica
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Cuéntanos cómo opera tu consulta y te ayudamos a entender si
            MedOnline es el sistema correcto para ti, sin compromiso.
          </p>
        </div>

        {/* Form */}
        <div className="timeline-view mt-12 animate-zoom-in animate-range-entry animate-delay-150">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary-muted/20 px-8 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted/60 text-primary">
                <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Listo, recibimos tus datos
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/70">
                Nuestro equipo revisará la información de tu clínica y te
                contactará en breve. Sin compromiso.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate={false}
              className="rounded-2xl border border-border bg-white/60 p-6 shadow-sm shadow-foreground/5 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Nombre de la clínica" htmlFor="clinicName">
                  <input
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Ej. Clínica San Juan"
                    className={inputClasses}
                  />
                </Field>

                <Field label="Nombre de contacto" htmlFor="contactName">
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ej. Dra. Ana Martínez"
                    className={inputClasses}
                  />
                </Field>

                <Field
                  label="Teléfono / correo"
                  htmlFor="contactMethod"
                  className="sm:col-span-2"
                >
                  <input
                    id="contactMethod"
                    name="contactMethod"
                    type="text"
                    required
                    autoComplete="tel"
                    placeholder="Ej. 55 1234 5678 o contacto@clinica.com"
                    className={inputClasses}
                  />
                </Field>

                <SelectField
                  id="doctorsRange"
                  name="doctorsRange"
                  label="Número aproximado de médicos"
                  placeholder="Selecciona un rango"
                  options={DOCTORS_RANGE_OPTIONS}
                />

                <SelectField
                  id="recordKeeping"
                  name="recordKeeping"
                  label="¿Cómo llevas tu expediente hoy?"
                  placeholder="Selecciona una opción"
                  options={RECORD_KEEPING_OPTIONS}
                />
              </div>

              <Turnstile className="mt-6" />

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-2.5 rounded-lg border border-danger/25 bg-danger/5 px-4 py-3"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-danger"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={status === "submitting"}
                  rightIcon={<ArrowRight />}
                >
                  Dejar mis datos de contacto
                </Button>
                <p className="text-sm text-foreground/50">
                  Sin compromiso. Te contactamos para entender tu clínica.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
