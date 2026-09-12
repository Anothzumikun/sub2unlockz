import { createClient } from "@supabase/supabase-js";

// Public client - dipakai di halaman unlock (read-only, aman dipakai di client/server)
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client - HANYA dipakai di route API server-side (pakai service role key, jangan pernah dikirim ke browser)
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
