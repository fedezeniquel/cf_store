import { Category, Product } from "@/types/database";

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-todos", name: "Todos", slug: "todos" },
  { id: "cat-yerba", name: "Yerba Mate", slug: "yerba" },
  { id: "cat-mates", name: "Mates", slug: "mates" },
  { id: "cat-bombillas", name: "Bombillas", slug: "bombillas" },
  { id: "cat-combos", name: "Combos & Sets", slug: "combos" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Mate Torpedo Artesanal Uruguayo",
    slug: "mate-torpedo-artesanal",
    description:
      "Calabaza gruesa seleccionada, forrado en cuero vacuno legítimo con costura reforzada a mano. Base firme y excelente aislación térmica.",
    category_id: "cat-mates",
    image_url: null,
    is_published: true,
    created_at: "2026-01-01T00:00:00Z",
    category: { id: "cat-mates", name: "Mates", slug: "mates" },
    variants: [
      {
        id: "var-1",
        product_id: "prod-1",
        variant_name: "Sin virola",
        price: 24500,
        stock: 5,
        low_stock_threshold: 3,
      },
      {
        id: "var-2",
        product_id: "prod-1",
        variant_name: "Virola lisa",
        price: 28900,
        stock: 4,
        low_stock_threshold: 3,
      },
      {
        id: "var-3",
        product_id: "prod-1",
        variant_name: "Virola cincelada",
        price: 33500,
        stock: 2,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-2",
    title: "Yerba Mate Agroecológica 1kg",
    slug: "yerba-mate-agroecologica-1kg",
    description:
      "Cosecha manual y secado barbacuá tradicional con 24 meses de estacionamiento natural. Sabor suave, rendidor y equilibrado sin acidez.",
    category_id: "cat-yerba",
    image_url: null,
    is_published: true,
    created_at: "2026-01-02T00:00:00Z",
    category: { id: "cat-yerba", name: "Yerba Mate", slug: "yerba" },
    variants: [
      {
        id: "var-4",
        product_id: "prod-2",
        variant_name: "Paquete 1kg",
        price: 7200,
        stock: 15,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-3",
    title: "Bombilla Pico de Loro de Alpaca",
    slug: "bombilla-pico-loro-alpaca",
    description:
      "Filtro ranurado desmontable de fácil limpieza, caño cincelado con soldadura en plata. Tiro perfecto para yerbas con y sin palo.",
    category_id: "cat-bombillas",
    image_url: null,
    is_published: true,
    created_at: "2026-01-03T00:00:00Z",
    category: { id: "cat-bombillas", name: "Bombillas", slug: "bombillas" },
    variants: [
      {
        id: "var-5",
        product_id: "prod-3",
        variant_name: "Estándar 19cm",
        price: 14800,
        stock: 8,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-4",
    title: "Mate Camionero Cuero Vaqueta",
    slug: "mate-camionero-cuero-vaqueta",
    description:
      "Boca ancha ideal para armar una buena montañita. Interior de calabaza brasileña seleccionada de gran espesor y cuero de primera calidad.",
    category_id: "cat-mates",
    image_url: null,
    is_published: true,
    created_at: "2026-01-04T00:00:00Z",
    category: { id: "cat-mates", name: "Mates", slug: "mates" },
    variants: [
      {
        id: "var-6",
        product_id: "prod-4",
        variant_name: "Sin virola",
        price: 26000,
        stock: 3,
        low_stock_threshold: 3,
      },
      {
        id: "var-7",
        product_id: "prod-4",
        variant_name: "Virola lisa",
        price: 30500,
        stock: 6,
        low_stock_threshold: 3,
      },
      {
        id: "var-8",
        product_id: "prod-4",
        variant_name: "Virola cincelada",
        price: 35000,
        stock: 0,
        low_stock_threshold: 3,
      },
    ],
  },
  {
    id: "prod-5",
    title: "Yerba Mate Selección Especial 500g",
    slug: "yerba-mate-seleccion-especial-500g",
    description:
      "Hojas seleccionadas de monte nativo con bajo contenido de polvo. Molienda intermedia ideal para un mate equilibrado y duradero.",
    category_id: "cat-yerba",
    image_url: null,
    is_published: true,
    created_at: "2026-01-05T00:00:00Z",
    category: { id: "cat-yerba", name: "Yerba Mate", slug: "yerba" },
    variants: [
      {
        id: "var-9",
        product_id: "prod-5",
        variant_name: "Paquete 500g",
        price: 4100,
        stock: 20,
        low_stock_threshold: 5,
      },
    ],
  },
  {
    id: "prod-6",
    title: "Combo Ritual Completo CF",
    slug: "combo-ritual-completo-cf",
    description:
      "Incluye Mate Torpedo con virola lisa, Bombilla Pico de Loro de alpaca y 1kg de Yerba Mate Agroecológica estacionada.",
    category_id: "cat-combos",
    image_url: null,
    is_published: true,
    created_at: "2026-01-06T00:00:00Z",
    category: { id: "cat-combos", name: "Combos & Sets", slug: "combos" },
    variants: [
      {
        id: "var-10",
        product_id: "prod-6",
        variant_name: "Set Completo",
        price: 47500,
        stock: 4,
        low_stock_threshold: 2,
      },
    ],
  },
];

