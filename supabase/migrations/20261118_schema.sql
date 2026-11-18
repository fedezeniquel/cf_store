-- ===================================================================
-- Esquema DDL para CF Yerba (E-commerce / Vidriera Digital)
-- Compatible con PostgreSQL 15+ y Supabase
-- ===================================================================

-- 1. EXTENSIONES
create extension if not exists "uuid-ossp";

-- 2. TABLA DE CATEGORÍAS
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABLA DE PRODUCTOS BASE
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TABLA DE VARIANTES E INVENTARIO
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade not null,
  variant_name text not null,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. ÍNDICES DE RENDIMIENTO
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_is_published on public.products(is_published);
create index if not exists idx_variants_product on public.product_variants(product_id);
create index if not exists idx_variants_low_stock on public.product_variants(stock, low_stock_threshold);

-- 6. POLÍTICAS DE SEGURIDAD ROW LEVEL SECURITY (RLS)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

-- Categorías: Lectura pública anónima, escritura sólo para usuarios autenticados (admin)
create policy "Categorias son publicamente legibles"
  on public.categories for select
  using (true);

create policy "Solo admin puede insertar categorias"
  on public.categories for insert
  with check (auth.role() = 'authenticated');

create policy "Solo admin puede actualizar categorias"
  on public.categories for update
  using (auth.role() = 'authenticated');

create policy "Solo admin puede eliminar categorias"
  on public.categories for delete
  using (auth.role() = 'authenticated');

-- Productos: Lectura pública sólo si está publicado (o si está autenticado el admin)
create policy "Productos publicados son publicamente legibles"
  on public.products for select
  using (is_published = true or auth.role() = 'authenticated');

create policy "Solo admin puede insertar productos"
  on public.products for insert
  with check (auth.role() = 'authenticated');

create policy "Solo admin puede actualizar productos"
  on public.products for update
  using (auth.role() = 'authenticated');

create policy "Solo admin puede eliminar productos"
  on public.products for delete
  using (auth.role() = 'authenticated');

-- Variantes: Lectura pública de variantes asociadas a productos legibles
create policy "Variantes son publicamente legibles"
  on public.product_variants for select
  using (
    exists (
      select 1 from public.products
      where products.id = product_variants.product_id
      and (products.is_published = true or auth.role() = 'authenticated')
    )
  );

create policy "Solo admin puede insertar variantes"
  on public.product_variants for insert
  with check (auth.role() = 'authenticated');

create policy "Solo admin puede actualizar variantes"
  on public.product_variants for update
  using (auth.role() = 'authenticated');

create policy "Solo admin puede eliminar variantes"
  on public.product_variants for delete
  using (auth.role() = 'authenticated');

-- 7. BUCKET DE ALMACENAMIENTO DE IMÁGENES (Supabase Storage)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Políticas para el Storage Bucket 'products'
create policy "Imagenes de productos son publicamente accesibles"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Solo admin puede subir imagenes de productos"
  on storage.objects for insert
  with check (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "Solo admin puede actualizar imagenes de productos"
  on storage.objects for update
  using (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "Solo admin puede eliminar imagenes de productos"
  on storage.objects for delete
  using (bucket_id = 'products' and auth.role() = 'authenticated');
