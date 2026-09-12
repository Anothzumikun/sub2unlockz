"use client";

import { FormEvent, useEffect, useState } from "react";

type LinkRow = {
  id: string;
  slug: string;
  title: string;
  platform_name: string;
  platform_url: string;
  target_link: string;
  youtube_like_url: string | null;
  delay_seconds: number;
  is_active: boolean;
};

const emptyForm = {
  slug: "",
  title: "",
  platform_name: "",
  platform_url: "",
  target_link: "",
  youtube_like_url: "",
  delay_seconds: 15,
};

export default function Dashboard() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState("");
  const [gifSaving, setGifSaving] = useState(false);

  async function loadSettings() {
    const res = await fetch("/api/settings");
    const json = await res.json();
    setGifUrl(json.data?.site_gif_url || "");
  }

  async function handleSaveGif(e: FormEvent) {
    e.preventDefault();
    setGifSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site_gif_url: gifUrl }),
    });
    setGifSaving(false);
    alert("GIF berhasil disimpan!");
  }

  async function loadLinks() {
    setLoading(true);
    const res = await fetch("/api/links");
    if (res.status === 401) {
      window.location.href = "/admin";
      return;
    }
    const json = await res.json();
    setLinks(json.data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadLinks();
    loadSettings();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await fetch(`/api/links/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    loadLinks();
  }

  function startEdit(link: LinkRow) {
    setEditingId(link.id);
    setForm({
      slug: link.slug,
      title: link.title,
      platform_name: link.platform_name,
      platform_url: link.platform_url,
      target_link: link.target_link,
      youtube_like_url: link.youtube_like_url || "",
      delay_seconds: link.delay_seconds,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function toggleActive(link: LinkRow) {
    await fetch(`/api/links/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !link.is_active }),
    });
    loadLinks();
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin hapus link ini?")) return;
    await fetch(`/api/links/${id}`, { method: "DELETE" });
    loadLinks();
  }

  function copyUrl(slug: string) {
    const url = `${window.location.origin}/unlock/${slug}`;
    navigator.clipboard.writeText(url);
    alert("URL disalin: " + url);
  }

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-accent">Admin Dashboard</h1>

      <form
        onSubmit={handleSaveGif}
        className="bg-card rounded-2xl p-5 space-y-3 border border-neutral-800"
      >
        <h2 className="font-semibold">GIF Beranda</h2>
        <p className="text-xs text-neutral-500">
          Muncul di halaman utama dan halaman unlock. Ambil link GIF dari
          Giphy/Tenor (klik kanan → copy image address).
        </p>
        <input
          placeholder="https://media.giphy.com/media/.../giphy.gif"
          value={gifUrl}
          onChange={(e) => setGifUrl(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
        />
        {gifUrl && gifUrl.toLowerCase().endsWith(".mp4") ? (
          <video
            src={gifUrl}
            autoPlay
            loop
            muted
            playsInline
            className="max-h-32 rounded-lg object-cover"
          />
        ) : (
          gifUrl && (
            <img
              src={gifUrl}
              alt="Preview"
              className="max-h-32 rounded-lg object-cover"
            />
          )
        )}
        <button
          type="submit"
          disabled={gifSaving}
          className="w-full py-2 rounded-lg bg-accent text-black font-semibold text-sm disabled:opacity-50"
        >
          {gifSaving ? "Menyimpan..." : "Simpan GIF"}
        </button>
      </form>

      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl p-5 space-y-3 border border-neutral-800"
      >
        <h2 className="font-semibold">
          {editingId ? "Edit Link" : "Tambah Link Baru"}
        </h2>
        <input
          placeholder="Slug (contoh: video-1)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
          required
        />
        <input
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
          required
        />
        <input
          placeholder="Nama platform (contoh: YouTube Channel)"
          value={form.platform_name}
          onChange={(e) => setForm({ ...form, platform_name: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
          required
        />
        <input
          placeholder="URL platform (link subscribe/follow)"
          value={form.platform_url}
          onChange={(e) => setForm({ ...form, platform_url: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
          required
        />
        <input
          placeholder="Target link (link asli yang di-unlock)"
          value={form.target_link}
          onChange={(e) => setForm({ ...form, target_link: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
          required
        />
        <input
          placeholder="Link video YouTube untuk like (opsional)"
          value={form.youtube_like_url}
          onChange={(e) => setForm({ ...form, youtube_like_url: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
        />
        <input
          type="number"
          placeholder="Delay timer (detik)"
          value={form.delay_seconds}
          onChange={(e) =>
            setForm({ ...form, delay_seconds: Number(e.target.value) })
          }
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 outline-none focus:border-accent text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2 rounded-lg bg-accent text-black font-semibold text-sm disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : editingId ? "Update" : "Tambah"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="px-4 py-2 rounded-lg bg-neutral-700 text-sm"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-semibold">Daftar Link ({links.length})</h2>
        {loading && <p className="text-neutral-500 text-sm">Memuat...</p>}
        {!loading && links.length === 0 && (
          <p className="text-neutral-500 text-sm">Belum ada link.</p>
        )}
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-card rounded-xl p-4 border border-neutral-800 space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{link.title}</p>
                <p className="text-xs text-neutral-500">/unlock/{link.slug}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  link.is_active
                    ? "bg-accent/20 text-accent"
                    : "bg-neutral-700 text-neutral-400"
                }`}
              >
                {link.is_active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => copyUrl(link.slug)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800"
              >
                Copy URL
              </button>
              <button
                onClick={() => startEdit(link)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800"
              >
                Edit
              </button>
              <button
                onClick={() => toggleActive(link)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800"
              >
                {link.is_active ? "Nonaktifkan" : "Aktifkan"}
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="px-3 py-1.5 rounded-lg bg-red-900/50 text-red-400"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
