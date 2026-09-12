import { supabasePublic } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { data } = await supabasePublic
    .from("settings")
    .select("site_gif_url")
    .eq("id", 1)
    .single();

  const gifUrl = data?.site_gif_url as string | null;
  const isVideo = gifUrl?.toLowerCase().endsWith(".mp4");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4 max-w-sm">
        {gifUrl && isVideo && (
          <video
            src={gifUrl}
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto rounded-2xl max-h-56 w-full object-cover"
          />
        )}
        {gifUrl && !isVideo && (
          <img
            src={gifUrl}
            alt=""
            className="mx-auto rounded-2xl max-h-56 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold text-accent">Sub2Unlock</h1>
        <p className="text-neutral-400 text-sm">
          Link gate pribadi. Buka link unlock kamu lewat URL{" "}
          <code className="text-accent">/unlock/[slug]</code>
        </p>
      </div>
    </main>
  );
}
