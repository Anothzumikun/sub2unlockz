import { supabasePublic } from "@/lib/supabase";
import UnlockClient from "./UnlockClient";
import { notFound } from "next/navigation";

// Selalu ambil data terbaru dari Supabase, jangan pakai cache Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function UnlockPage({
  params,
}: {
  params: { slug: string };
}) {
  const [{ data, error }, { data: settings }] = await Promise.all([
    supabasePublic
      .from("links")
      .select("id, slug, title, platform_name, platform_url, target_link, youtube_like_url, delay_seconds")
      .eq("slug", params.slug)
      .eq("is_active", true)
      .single(),
    supabasePublic.from("settings").select("site_gif_url").eq("id", 1).single(),
  ]);

  if (error || !data) {
    notFound();
  }

  return <UnlockClient link={data} gifUrl={settings?.site_gif_url ?? null} />;
}
