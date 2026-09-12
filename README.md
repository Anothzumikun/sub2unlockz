# Sub2Unlock

Website link gate pribadi. Setiap link punya slug unik di `/unlock/[slug]`, pengunjung diminta subscribe/follow dulu, tunggu timer, baru link asli muncul.

## 1. Setup Supabase

Buka Supabase project kamu → SQL Editor → jalankan query ini:

```sql
create table links (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  platform_name text not null,
  platform_url text not null,
  target_link text not null,
  delay_seconds int default 15,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table links enable row level security;

-- Publik hanya boleh baca link yang aktif
create policy "public read active links"
on links for select
using (is_active = true);
```

Catatan: insert/update/delete link HANYA lewat API admin (pakai service role key di server), jadi RLS di atas cukup untuk baca publik saja.

## 2. Ambil kredensial Supabase

Di Supabase: Project Settings → API
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (rahasia, JANGAN pernah di-share atau commit ke GitHub)

## 3. Deploy ke Vercel

1. Upload folder ini ke GitHub repo baru (langsung upload file via web GitHub, tidak perlu terminal)
2. Import repo itu di Vercel
3. Di halaman Environment Variables Vercel, isi 4 variable ini:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (bikin password kuat sendiri)
4. Deploy

## 4. Pakai

- Buka `https://domainmu.vercel.app/admin` → login pakai `ADMIN_PASSWORD`
- Tambah link baru: isi slug, judul, nama platform, URL platform (link subscribe), target link (link asli), delay timer
- Copy URL hasil generate → sebar ke user
- User buka `/unlock/slug-kamu` → klik tombol subscribe → tunggu timer → link asli muncul

## Soal hemat kuota Vercel/Supabase

- Halaman `/unlock/[slug]` cuma 1x request ke Supabase per kunjungan (bukan per detik) — timer countdown-nya jalan di browser (client-side), jadi tidak nambah beban server sama sekali
- Dashboard admin baru manggil API pas kamu buka/refresh, bukan otomatis polling
