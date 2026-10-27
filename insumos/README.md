# Tecno-Store · Insumos informáticos

Catálogo web de insumos informáticos con panel de administración (CRUD), carrito simple y pedidos por WhatsApp.

- **Frontend:** HTML, CSS y JavaScript sin paso de compilación (se publica tal cual en GitHub Pages).
- **Backend:** [Supabase](https://supabase.com) (base PostgreSQL + autenticación), plan gratuito.
- **Seguridad:** el público solo puede leer productos publicados; solo el administrador autenticado puede crear, editar o borrar (políticas RLS en `supabase/schema.sql`).

Sin configurar Supabase, el sitio funciona en **modo demostración** con datos de ejemplo.

## Puesta en marcha

1. Creá un proyecto en Supabase.
2. En **SQL Editor**, pegá y ejecutá `supabase/schema.sql` (crea tablas, reglas de seguridad y datos de prueba genéricos).
3. En **Authentication → Users → Add user**, creá al administrador (correo + contraseña, marcá *Auto Confirm*).
4. En **Authentication → Sign In / Providers**, desactivá *Allow new users to sign up* (así nadie más puede registrarse).
5. En **Authentication → URL Configuration**, poné como *Site URL* `https://alfre2alarcon-source.github.io/insumos/` y agregá `https://alfre2alarcon-source.github.io/insumos/admin.html` en *Redirect URLs* (necesario para recuperar la contraseña).
6. En **Project Settings → API**, copiá *Project URL* y la clave **anon public** en `js/config.js`. Cambiá también el número de WhatsApp. **Nunca** uses la clave `service_role`.
7. Publicá: `git push`, y en GitHub → **Settings → Pages → Source: GitHub Actions**. El sitio queda en `https://alfre2alarcon-source.github.io/insumos/`.

El panel está en `/admin.html`. Guía de uso: [GUIA-ADMIN.md](GUIA-ADMIN.md).

## Notas

- Las imágenes de ejemplo vienen de [Lorem Picsum](https://picsum.photos) (fotos de Unsplash, licencia gratuita) y son genéricas, no muestran el producto real. Reemplazalas desde el panel por tus fotos.
- Todos los datos de prueba (productos, marcas, número de WhatsApp) son ficticios.
