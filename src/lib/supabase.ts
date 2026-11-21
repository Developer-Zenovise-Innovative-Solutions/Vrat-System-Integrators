import { createClient } from "@supabase/supabase-js";

// Read from Vite env or fallback to provided credentials
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://emwsejodyxkfjgkpjoau.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_EGqYaG0PdcQ71UosqL6J3Q_bbjHLPln";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.includes("supabase.co")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Check if connection to Supabase database is active
 */
export async function checkSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  if (!isSupabaseConfigured) {
    return { connected: false, message: "Supabase credentials are not configured in .env" };
  }
  try {
    const { data, error } = await supabase.from("settings").select("id").limit(1);
    if (error) {
      // Table might not exist yet if migration hasn't run, but connection reached
      if (error.code === "PGRST204" || error.message.includes("relation") || error.code === "42P01") {
        return {
          connected: true,
          message: "Connected to Supabase project! (Tables need to be created via migration script)",
        };
      }
      return { connected: false, message: `Database response error: ${error.message}` };
    }
    return { connected: true, message: "Successfully connected and synced with Supabase Postgres Database!" };
  } catch (err: any) {
    return { connected: false, message: `Network error: ${err.message || "Failed to reach Supabase"}` };
  }
}
