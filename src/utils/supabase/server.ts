import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Define a function named 'supabase' that takes a 'CookieOptions' object as input
export const supabase = (cookies: CookieOptions) => {
  // Retrieve cookies from the provided 'CookieOptions' object
  const cookieStore = cookies();

  // Create and return a Supabase client configured with environment variables and cookie handling
  return createServerClient(
    // Retrieve Supabase URL from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Retrieve Supabase anonymous key from environment variables
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Define a custom 'get' function to retrieve cookies by name from the cookie store
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
