alter table public.products
add column if not exists serial integer;

create index if not exists products_serial_idx
on public.products (serial asc nulls last, id desc);
