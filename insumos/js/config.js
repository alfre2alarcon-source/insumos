// Configuración pública. La clave "anon" de Supabase está pensada para ser pública:
// la seguridad real la dan las políticas RLS de supabase/schema.sql.
// NUNCA pegues acá la clave "service_role".
window.CONFIG = {
  NEGOCIO: "Tecno-Store",
  WHATSAPP: "5490000000000", // número de prueba (código país + área + número, sin + ni espacios)
  SUPABASE_URL: "",          // ej: https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: ""      // clave "anon / public"
};
