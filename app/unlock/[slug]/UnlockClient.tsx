"use client";

import { useEffect, useState } from "react";

type LinkData = {
  id: string;
  slug: string;
  title: string;
  platform_name: string;
  platform_url: string;
  target_link: string;
  youtube_like_url: string | null;
  delay_seconds: number;
};

type PlatformStyle = {
  color: string;
  bg: string;
  icon: JSX.Element;
};

function getPlatformStyle(name: string): PlatformStyle {
  const n = name.toLowerCase();

  if (n.includes("youtube")) {
    return {
      color: "#EF4444",
      bg: "bg-[#EF4444]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21.6 7.2c-.2-1-1-1.7-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3c-1 .2-1.7 1-1.9 1.9C2 9 2 12 2 12s0 3 .4 4.8c.2 1 1 1.7 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3c1-.2 1.7-1 1.9-1.9.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15V9l5 3-5 3Z" />
        </svg>
      ),
    };
  }
  if (n.includes("telegram")) {
    return {
      color: "#0EA5E9",
      bg: "bg-[#0EA5E9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21.5 4.5 3 11.4c-.9.3-.9 1.6.1 1.9l4.6 1.4 1.8 5.4c.3.9 1.4 1 2 .2l2.4-3 4.6 3.4c.8.6 1.9.2 2.1-.8L23 5.6c.2-.9-.7-1.6-1.5-1.1ZM9 14.5 17 8l-6.8 7.4-.2 3-1-3.9Z" />
        </svg>
      ),
    };
  }
  if (n.includes("instagram")) {
    return {
      color: "#C026D3",
      bg: "bg-gradient-to-br from-[#FDBA74] via-[#EC4899] to-[#7C3AED]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2c2.7 0 3.1 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8.9 1.1 1.6.2.6.4 1.3.5 2.3 0 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1-.2 1.7-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-.9.8-1.6 1.1-.6.2-1.3.4-2.3.5-1 0-1.4.1-4.1.1s-3.1 0-4.1-.1c-1 0-1.7-.2-2.3-.5-.6-.2-1.1-.6-1.6-1.1-.5-.5-.8-.9-1.1-1.6-.2-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1 .2-1.7.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5.9-.8 1.6-1.1.6-.2 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2Zm0 2.7a7.3 7.3 0 1 0 0 14.6 7.3 7.3 0 0 0 0-14.6Zm0 12a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4Zm7.6-12.2a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0Z" />
        </svg>
      ),
    };
  }
  if (n.includes("tiktok")) {
    return {
      color: "#111827",
      bg: "bg-[#111827]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.7V9.3a5.9 5.9 0 1 0 5 5.8V8.1a7 7 0 0 0 4.5 1.6V6.6A4 4 0 0 1 16.5 2Z" />
        </svg>
      ),
    };
  }
  if (n.includes("discord")) {
    return {
      color: "#5865F2",
      bg: "bg-[#5865F2]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20 6.5a17 17 0 0 0-4-1.2l-.3.6a15 15 0 0 1 3.4 1.3 12.8 12.8 0 0 0-13.9 0 15 15 0 0 1 3.4-1.3l-.3-.6a17 17 0 0 0-4 1.2C2.4 10.4 2 14.2 2 17.8a17 17 0 0 0 4.6 1.7l.7-1.1a10 10 0 0 1-1.6-.8l.4-.3a12 12 0 0 0 10 0l.4.3a10 10 0 0 1-1.6.8l.7 1.1A17 17 0 0 0 22 17.8c0-3.6-.4-7.4-2-11.3ZM9 15c-.7 0-1.3-.7-1.3-1.5S8.3 12 9 12s1.3.7 1.3 1.5S9.7 15 9 15Zm6 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5Z" />
        </svg>
      ),
    };
  }
  return {
    color: "#22c55e",
    bg: "bg-accent",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a3 3 0 1 1 4.2 4.2l-1.6 1.6a1 1 0 1 1-1.4-1.4l1.6-1.6a1 1 0 1 0-1.4-1.4l-3 3a1 1 0 0 1-1.4 0Zm-2.8 2.8a1 1 0 0 0 1.4 1.4l1.6-1.6a1 1 0 1 0-1.4-1.4l-1.6 1.6Zm-1.4-1.4a3 3 0 0 1 0-4.2l1.6-1.6a1 1 0 1 1 1.4 1.4L8 12a1 1 0 0 0 1.4 1.4l-3 3a3 3 0 0 1-1-4Z" />
      </svg>
    ),
  };
}

export default function UnlockClient({
  link,
  gifUrl,
}: {
  link: LinkData;
  gifUrl: string | null;
}) {
  const [step, setStep] = useState<"start" | "waiting" | "unlocked">("start");
  const [countdown, setCountdown] = useState(link.delay_seconds || 15);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const platform = getPlatformStyle(link.platform_name);
  const requiresLike = !!link.youtube_like_url;

  useEffect(() => {
    if (step !== "start") return;
    if (subscribed && (!requiresLike || liked)) {
      setStep("waiting");
    }
  }, [subscribed, liked, step, requiresLike]);

  useEffect(() => {
    if (step !== "waiting") return;
    if (countdown <= 0) {
      setStep("unlocked");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  function handleSubscribe() {
    window.open(link.platform_url, "_blank", "noopener,noreferrer");
    setSubscribed(true);
  }

  function handleLike() {
    window.open(link.youtube_like_url!, "_blank", "noopener,noreferrer");
    setLiked(true);
  }

  const progressPct = 100 - (countdown / (link.delay_seconds || 15)) * 100;
  const isGifVideo = gifUrl?.toLowerCase().endsWith(".mp4");

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-ink border-b border-white/10 px-5 py-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-accent">
            <path
              d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <span className="font-bold text-white text-lg">
          Sub2<span className="text-accent">Unlock</span>
        </span>
      </header>

      {/* Hero + CTA (digabung jadi 1 card) */}
      <section className="px-5 pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-8">
          <div className="absolute -right-10 top-6 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            {gifUrl && isGifVideo && (
              <video
                src={gifUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl mb-4 max-h-40 object-cover"
              />
            )}
            {gifUrl && !isGifVideo && (
              <img
                src={gifUrl}
                alt=""
                className="w-full rounded-2xl mb-4 max-h-40 object-cover"
              />
            )}
            <span className="inline-block text-xs font-medium text-accent bg-accent/10 border border-accent/30 rounded-full px-3 py-1 mb-4">
              Link siap dibuka
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-white">
              Selesaikan langkah,
              <span className="block text-accent">buka link kamu</span>
            </h1>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Subscribe dulu, lalu link asli terbuka otomatis.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <span className="text-white/40 text-xs">Membuka:</span>
              <span className="text-white text-sm font-semibold">
                {link.title}
              </span>
            </div>
          </div>

          {/* Lock graphic */}
          <div className="relative mt-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full bg-black/40 border border-accent/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-12 h-12 text-white relative"
              >
                <path
                  d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>

          {/* Status + Action (nyambung langsung di card yang sama) */}
          <div className="relative mt-8 text-center">
            {step === "start" && (
              <>
                <p className="text-accent text-sm mb-4">
                  Selesaikan langkah di atas untuk membuka link
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleSubscribe}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-white font-semibold active:scale-[0.98] transition ${platform.bg} ${
                      subscribed ? "opacity-60" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {platform.icon}
                      Subscribe {link.platform_name}
                    </span>
                    <span>{subscribed ? "✓" : "→"}</span>
                  </button>

                  {requiresLike && (
                    <button
                      onClick={handleLike}
                      className={`w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-white font-semibold active:scale-[0.98] transition bg-[#EF4444] ${
                        liked ? "opacity-60" : ""
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 21s-6.7-4.3-9.3-8.1C1 10.2 1.7 6.9 4.4 5.5c2.2-1.1 4.6-.4 6 1.4l1.6 2 1.6-2c1.4-1.8 3.8-2.5 6-1.4 2.7 1.4 3.4 4.7 1.7 7.4C18.7 16.7 12 21 12 21Z" />
                        </svg>
                        Like Video YouTube
                      </span>
                      <span>{liked ? "✓" : "→"}</span>
                    </button>
                  )}
                </div>
              </>
            )}

            {step === "waiting" && (
              <>
                <p className="text-white/60 text-sm mb-4">
                  Terima kasih! Link terbuka dalam beberapa detik.
                </p>
                <div className="text-4xl font-extrabold text-accent mb-4">
                  {countdown}s
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-1000"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            )}

            {step === "unlocked" && (
              <>
                <p className="text-white font-bold text-lg mb-1">
                  Link berhasil terbuka 🎉
                </p>
                <p className="text-white/60 text-sm mb-4">
                  Terima kasih sudah subscribe.
                </p>
                <a
                  href={link.target_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-2xl px-5 py-4 bg-accent text-black font-semibold active:scale-[0.98] transition"
                >
                  Buka link sekarang
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-5 pt-8">
        <div className="rounded-full bg-accent/10 border border-accent/20 px-4 py-3 text-center text-xs text-emerald-800">
          Aman &amp; cepat · tanpa password · sekali klik
        </div>
      </section>

      {/* How it works (dipindah ke bawah) */}
      <section className="px-5 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-ink">Cara kerjanya</h2>
          <div className="w-10 h-1 bg-accent rounded-full mx-auto mt-2" />
        </div>

        <div className="space-y-3">
          <StepCard
            number={1}
            title="Subscribe"
            description={`Subscribe/follow ke ${link.platform_name}.`}
            iconBg={platform.bg}
            icon={platform.icon}
            active={step === "start" && !subscribed}
          />
          {requiresLike && (
            <StepCard
              number={2}
              title="Like video"
              description="Like video YouTube-nya juga ya."
              iconBg="bg-[#EF4444]"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 21s-6.7-4.3-9.3-8.1C1 10.2 1.7 6.9 4.4 5.5c2.2-1.1 4.6-.4 6 1.4l1.6 2 1.6-2c1.4-1.8 3.8-2.5 6-1.4 2.7 1.4 3.4 4.7 1.7 7.4C18.7 16.7 12 21 12 21Z" />
                </svg>
              }
              active={step === "start" && subscribed && !liked}
            />
          )}
          <StepCard
            number={requiresLike ? 3 : 2}
            title="Tunggu sebentar"
            description="Timer berjalan setelah langkah di atas selesai."
            iconBg="bg-indigo-500"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
            active={step === "waiting"}
          />
          <StepCard
            number={requiresLike ? 4 : 3}
            title="Dapatkan link"
            description="Link asli langsung terbuka."
            iconBg="bg-accent"
            icon={
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M6 10V8a6 6 0 1 1 12 0v2M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            }
            active={step === "unlocked"}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink px-5 py-8 text-center">
        <p className="text-white font-bold">
          Sub2<span className="text-accent">Unlock</span>
        </p>
        <p className="text-white/40 text-xs mt-2">
          © {new Date().getFullYear()} Sub2Unlock
        </p>
      </footer>
    </main>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
  iconBg,
  active,
}: {
  number: number;
  title: string;
  description: string;
  icon: JSX.Element;
  iconBg: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl bg-white p-4 border transition ${
        active ? "border-accent shadow-sm" : "border-black/5"
      }`}
    >
      <div
        className={`w-11 h-11 shrink-0 rounded-xl ${iconBg} text-white flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm text-ink">
          {number}. {title}
        </p>
        <p className="text-xs text-muted mt-0.5">{description}</p>
      </div>
    </div>
  );
}
