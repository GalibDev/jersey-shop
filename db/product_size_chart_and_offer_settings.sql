alter table public.products
add column if not exists size_chart jsonb;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

insert into public.site_settings (key, value)
values (
  'limited_offer',
  '{"label":"Limited Offer","title":"Up To 40% OFF 🔥","subtitle":"Premium Football Jerseys","isActive":true}'::jsonb
)
on conflict (key) do nothing;
