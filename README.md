# MedOnline Landing

## Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

## Build

```bash
pnpm build
```

Genera el sitio estático en la carpeta `out`.

## Endpoint de contacto

El formulario de "Hablemos de tu clínica" envía a `POST /api/contacto`, implementado
como Cloudflare Pages Function en `functions/api/contacto.js`. El endpoint valida los
campos del lado del servidor, verifica Turnstile cuando está configurado y manda el
lead por correo con Resend.

Como el sitio se compila con `output: "export"`, `next dev` no ejecuta la función. Para
probarla en local copia `.dev.vars.example` a `.dev.vars`, pon tu API key de Resend y
corre:

```bash
pnpm preview
```

### Variables de entorno

Hay **dos lugares distintos** y no son intercambiables. Poner una llave en el archivo
equivocado no da ningún error visible, simplemente no se aplica:

- `.env.local` — lo lee **Next.js al compilar**. Aquí van las `NEXT_PUBLIC_*` del
  frontend. Plantilla en `.env.example`.
- `.dev.vars` — lo lee **Wrangler en tiempo de ejecución**. Aquí van los secretos del
  Worker. Plantilla en `.dev.vars.example`.

| Variable | Local | En Cloudflare | Requerida |
|---|---|---|---|
| `RESEND_API_KEY` | `.dev.vars` | Secreto del proyecto de Pages | Sí |
| `LEAD_TO_EMAIL` | `.dev.vars` | Variable del proyecto | No. Por defecto `ngcsoftwaresolutions@gmail.com`. |
| `MAIL_FROM` | `.dev.vars` | Variable del proyecto | No. Por defecto `MedOnline <noreply@medonline.com.mx>`. El dominio debe estar verificado en Resend. |
| `TURNSTILE_SECRET_KEY` | `.dev.vars` | Secreto del proyecto | No. Si se define, el endpoint exige el token. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `.env.local` | Variable de **build** | No. Si falta, el widget no se monta. |

### Turnstile: las dos llaves van juntas

O configuras las dos, o ninguna. Si solo pones `TURNSTILE_SECRET_KEY`, el widget no
aparece en el formulario pero el endpoint sigue exigiendo el token, así que **todos los
envíos fallan** con "Completa la verificación anti-spam e intenta de nuevo". Sin ninguna
de las dos, el formulario funciona normal y solo se omite la verificación.

Para probar en localhost usa las llaves de prueba de Cloudflare, que pasan siempre y
funcionan en cualquier dominio:

```bash
# .env.local
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# .dev.vars
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Una site key real registrada para `medonline.com.mx` no funciona en `127.0.0.1` a menos
que agregues `localhost` en Hostname Management del widget. Cloudflare recomienda no
agregar dominios locales al widget de producción; usa uno aparte para desarrollo.

### Configuración en el dashboard de Cloudflare

1. **Workers & Pages → el proyecto → Settings → Variables and Secrets**: agregar
   `RESEND_API_KEY` como secreto encriptado.
2. **Turnstile → Add site** para `medonline.com.mx`: el site key va como variable de
   build `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y el secret key como secreto
   `TURNSTILE_SECRET_KEY`.
3. **Security → WAF → Rate limiting rules**: ruta `/api/contacto`, 5 peticiones por
   minuto por IP, acción Block.

Los errores del endpoint se registran con `console.error` y se ven en la pestaña
**Logs** del proyecto de Pages.
