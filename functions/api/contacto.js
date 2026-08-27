const DEFAULT_MAIL_FROM = "MedOnline <noreply@medonline.com.mx>";
const DEFAULT_LEAD_TO = "ngcsoftwaresolutions@gmail.com";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_URL = "https://api.resend.com/emails";

const SHORT_FIELD_MAX = 200;
const LONG_FIELD_MAX = 1000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Mensaje único para cualquier falla del envío: el detalle queda en los logs.
const SEND_ERROR =
  "No pudimos enviar tus datos. Intenta de nuevo en un momento.";

// `aliases` acepta los nombres camelCase que usa el formulario del sitio.
const FIELDS = [
  {
    key: "nombre_clinica",
    aliases: ["clinicName"],
    label: "Nombre de la clínica",
    required: true,
    max: SHORT_FIELD_MAX,
  },
  {
    key: "nombre_contacto",
    aliases: ["contactName"],
    label: "Nombre de contacto",
    required: true,
    max: SHORT_FIELD_MAX,
  },
  {
    key: "contacto",
    aliases: ["contactMethod"],
    label: "Teléfono / correo",
    required: true,
    max: SHORT_FIELD_MAX,
  },
  {
    key: "num_medicos",
    aliases: ["doctorsRange"],
    label: "Número aproximado de médicos",
    required: false,
    max: SHORT_FIELD_MAX,
  },
  {
    key: "expediente_actual",
    aliases: ["recordKeeping"],
    label: "Cómo lleva el expediente hoy",
    required: false,
    max: LONG_FIELD_MAX,
  },
];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function readPayload(request) {
  const contentType = request.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function pickValue(payload, field) {
  for (const name of [field.key, ...field.aliases]) {
    const raw = payload[name];
    if (typeof raw === "string" && raw.trim() !== "") {
      return raw.trim();
    }
  }
  return "";
}

function collectLead(payload) {
  const values = {};
  const missing = [];
  const tooLong = [];

  for (const field of FIELDS) {
    const value = pickValue(payload, field);

    if (field.required && value === "") {
      missing.push(field.key);
    }
    if (value.length > field.max) {
      tooLong.push(field.key);
    }

    values[field.key] = value;
  }

  return { values, missing, tooLong };
}

async function verifyTurnstile(token, secret, ip) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) {
    body.append("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });

  // Un 400 aquí suele significar que TURNSTILE_SECRET_KEY está mal.
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Turnstile siteverify falló", response.status, detail);
    return false;
  }

  const result = await response.json();
  if (!result.success) {
    console.error("Turnstile rechazó el token", result["error-codes"]);
  }
  return result.success === true;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildRows(values) {
  return FIELDS.map((field) => ({
    label: field.label,
    value: values[field.key] || "No especificado",
  }));
}

function buildEmailHtml(values) {
  const rows = buildRows(values)
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;">MedOnline · Nuevo lead</p>
        <h1 style="margin:0;font-size:20px;color:#111827;">${escapeHtml(values.nombre_clinica)}</h1>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;">
        <tbody>${rows}</tbody>
      </table>
      <div style="padding:16px 24px;background:#f9fafb;">
        <p style="margin:0;font-size:12px;color:#6b7280;">Enviado desde el formulario de medonline.com.mx</p>
      </div>
    </div>
  </body>
</html>`;
}

function buildEmailText(values) {
  const lines = buildRows(values).map(
    ({ label, value }) => `${label}: ${value}`,
  );
  return [
    "MedOnline - Nuevo lead",
    "",
    ...lines,
    "",
    "Enviado desde el formulario de medonline.com.mx",
  ].join("\n");
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no está configurada en el entorno");
    return jsonResponse({ ok: false, error: SEND_ERROR }, 500);
  }

  let payload;
  try {
    payload = await readPayload(request);
  } catch (error) {
    console.error("No se pudo leer el cuerpo de la petición", error);
    return jsonResponse({ ok: false, error: "Petición inválida." }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "Petición inválida." }, 400);
  }

  const { values, missing, tooLong } = collectLead(payload);

  if (missing.length > 0) {
    return jsonResponse(
      { ok: false, error: "Faltan campos requeridos.", campos: missing },
      400,
    );
  }

  if (tooLong.length > 0) {
    return jsonResponse(
      {
        ok: false,
        error: "Algunos campos exceden el largo permitido.",
        campos: tooLong,
      },
      400,
    );
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token =
      typeof payload["cf-turnstile-response"] === "string"
        ? payload["cf-turnstile-response"]
        : "";

    if (!token) {
      return jsonResponse(
        {
          ok: false,
          error: "Completa la verificación anti-spam e intenta de nuevo.",
        },
        403,
      );
    }

    const isHuman = await verifyTurnstile(
      token,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP"),
    );

    if (!isHuman) {
      return jsonResponse(
        {
          ok: false,
          error:
            "No pudimos validar la verificación anti-spam. Intenta de nuevo.",
        },
        403,
      );
    }
  }

  const email = {
    from: env.MAIL_FROM || DEFAULT_MAIL_FROM,
    to: [env.LEAD_TO_EMAIL || DEFAULT_LEAD_TO],
    subject: `Nuevo lead: ${values.nombre_clinica}`,
    html: buildEmailHtml(values),
    text: buildEmailText(values),
  };

  // Resend rechaza la petición si reply_to no es una dirección válida, y el
  // campo de contacto acepta también números telefónicos.
  if (EMAIL_PATTERN.test(values.contacto)) {
    email.reply_to = values.contacto;
  }

  let resendResponse;
  try {
    resendResponse = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  } catch (error) {
    console.error("Error de red al llamar a Resend", error);
    return jsonResponse({ ok: false, error: SEND_ERROR }, 500);
  }

  if (!resendResponse.ok) {
    const detail = await resendResponse.text().catch(() => "");
    console.error("Resend respondió con error", resendResponse.status, detail);
    return jsonResponse({ ok: false, error: SEND_ERROR }, 500);
  }

  return jsonResponse({ ok: true });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { Allow: "POST, OPTIONS" },
  });
}

export function onRequest() {
  return jsonResponse({ ok: false, error: "Método no permitido." }, 405);
}
