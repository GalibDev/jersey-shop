alter table public.orders
add column if not exists delivery_charge integer default 0;

select pg_notify('pgrst', 'reload schema');
