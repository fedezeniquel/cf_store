-- ===================================================================
-- Semilla de Datos Iniciales (Seed) para CF Yerba
-- Carga categorías y productos base con sus variantes físicas
-- ===================================================================

-- 1. Insertar Categorías
insert into public.categories (id, name, slug) values
  ('c1000000-0000-0000-0000-000000000001', 'Yerba Mate', 'yerba'),
  ('c1000000-0000-0000-0000-000000000002', 'Mates', 'mates'),
  ('c1000000-0000-0000-0000-000000000003', 'Bombillas', 'bombillas'),
  ('c1000000-0000-0000-0000-000000000004', 'Combos & Sets', 'combos')
on conflict (slug) do nothing;

-- 2. Insertar Productos Base
insert into public.products (id, title, slug, description, category_id, image_url, is_published) values
  (
    'p1000000-0000-0000-0000-000000000001',
    'Mate Torpedo Artesanal Uruguayo',
    'mate-torpedo-artesanal',
    'Calabaza gruesa seleccionada, forrado en cuero vacuno legítimo con costura reforzada a mano. Base firme y excelente aislación térmica.',
    'c1000000-0000-0000-0000-000000000002',
    null,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'Yerba Mate Agroecológica 1kg',
    'yerba-mate-agroecologica-1kg',
    'Cosecha manual y secado barbacuá tradicional con 24 meses de estacionamiento natural. Sabor suave, rendidor y equilibrado sin acidez.',
    'c1000000-0000-0000-0000-000000000001',
    null,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'Bombilla Pico de Loro de Alpaca',
    'bombilla-pico-loro-alpaca',
    'Filtro ranurado desmontable de fácil limpieza, caño cincelado con soldadura en plata. Tiro perfecto para yerbas con y sin palo.',
    'c1000000-0000-0000-0000-000000000003',
    null,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000004',
    'Mate Camionero Cuero Vaqueta',
    'mate-camionero-cuero-vaqueta',
    'Boca ancha ideal para armar una buena montañita. Interior de calabaza brasileña seleccionada de gran espesor y cuero de primera calidad.',
    'c1000000-0000-0000-0000-000000000002',
    null,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000005',
    'Yerba Mate Selección Especial 500g',
    'yerba-mate-seleccion-especial-500g',
    'Hojas seleccionadas de monte nativo con bajo contenido de polvo. Molienda intermedia ideal para un mate equilibrado y duradero.',
    'c1000000-0000-0000-0000-000000000001',
    null,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000006',
    'Combo Ritual Completo CF',
    'combo-ritual-completo-cf',
    'Incluye Mate Torpedo con virola lisa, Bombilla Pico de Loro de alpaca y 1kg de Yerba Mate Agroecológica estacionada.',
    'c1000000-0000-0000-0000-000000000004',
    null,
    true
  )
on conflict (slug) do nothing;

-- 3. Insertar Variantes e Inventario
insert into public.product_variants (product_id, variant_name, price, stock, low_stock_threshold) values
  -- Mate Torpedo
  ('p1000000-0000-0000-0000-000000000001', 'Sin virola', 24500, 5, 3),
  ('p1000000-0000-0000-0000-000000000001', 'Virola lisa', 28900, 4, 3),
  ('p1000000-0000-0000-0000-000000000001', 'Virola cincelada', 33500, 2, 3),
  -- Yerba 1kg
  ('p1000000-0000-0000-0000-000000000002', 'Paquete 1kg', 7200, 15, 3),
  -- Bombilla Pico de Loro
  ('p1000000-0000-0000-0000-000000000003', 'Estándar 19cm', 14800, 8, 3),
  -- Mate Camionero
  ('p1000000-0000-0000-0000-000000000004', 'Sin virola', 26000, 3, 3),
  ('p1000000-0000-0000-0000-000000000004', 'Virola lisa', 30500, 6, 3),
  ('p1000000-0000-0000-0000-000000000004', 'Virola cincelada', 35000, 0, 3),
  -- Yerba 500g
  ('p1000000-0000-0000-0000-000000000005', 'Paquete 500g', 4100, 20, 5),
  -- Combo
  ('p1000000-0000-0000-0000-000000000006', 'Set Completo', 47500, 4, 2);
