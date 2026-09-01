-- Blueframe Portfolio / Supabase schema
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  shop_name text not null default 'Blueframe Studio',
  logo_url text,
  profile_image text,
  bio text,
  description text,
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);


create table if not exists public.profile_media (
  id uuid primary key default gen_random_uuid(),
  media_type text not null check (media_type in ('image','video')),
  title text,
  caption text,
  media_url text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  video_url text,
  category_id uuid references public.categories(id) on delete set null,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.videos enable row level security;
alter table public.profile_media enable row level security;

-- Public can read portfolio data.
drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read" on public.profiles for select using (true);
drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read" on public.categories for select using (true);
drop policy if exists "videos_public_read" on public.videos;
create policy "videos_public_read" on public.videos for select using (published = true);


-- Public profile media
drop policy if exists "profile_media_public_read" on public.profile_media;
create policy "profile_media_public_read" on public.profile_media for select using (published = true);
drop policy if exists "profile_media_admin_all" on public.profile_media;
create policy "profile_media_admin_all" on public.profile_media for all to authenticated using (true) with check (true);

-- Authenticated admins can manage data.
drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles for all to authenticated using (true) with check (true);
drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all" on public.categories for all to authenticated using (true) with check (true);
drop policy if exists "videos_admin_all" on public.videos;
create policy "videos_admin_all" on public.videos for all to authenticated using (true) with check (true);

insert into public.profiles (shop_name,bio,description)
select 'Blueframe Studio','Creative editing, pacing, typography and visual storytelling.','รวมผลงานตัดต่อวิดีโอ งานโซเชียล งานโฆษณา และโปรเจกต์ครีเอทีฟที่คัดมาให้ชม'
where not exists (select 1 from public.profiles);

insert into public.categories (name,sort_order) values
('Social Media',1),('Commercial',2),('Beauty',3),('Creative',4)
on conflict (name) do nothing;

-- หลังจากรัน SQL แล้ว ให้สร้าง user สำหรับหลังบ้านใน Authentication > Users
-- แล้วใช้ email/password นั้นล็อกอินผ่าน /admin/login.html
