# Documento de Arquitectura y Especificación Técnica
**Proyecto:** CF Yerba (E-commerce / Vidriera Digital)  
**Versión:** 1.0 (MVP)  
**Stack Principal:** Next.js (App Router) + Tailwind CSS + Supabase + Zustand + Vercel  

---

## 1. Visión del Proyecto y Alcance (MVP)

**CF Yerba** es una tienda web concebida inicialmente como una **vidriera digital interactiva** para catálogo de yerba mate y accesorios artesanales (mates, bombillas, termos). 

### Objetivos Clave:
* **Exhibición de Catálogo:** Presentación moderna y responsiva de productos y combos.
* **Cierre de Ventas Ágil:** En lugar de procesar cobros automáticos con comisiones de pasarela, el carrito deriva en un **checkout estructurado hacia WhatsApp**, permitiendo trato directo para coordinar pagos (transferencia/efectivo) y envíos.
* **Panel de Administración para el Vendedor:** Ruta protegida para gestionar catálogo, modificar precios, actualizar stock por variante y recibir alertas automáticas de productos con stock bajo.
* **Arquitectura Escalable:** El frontend y la base de datos quedan preparados para conectar pasarelas de pago (Mercado Pago) y APIs de logística (Andreani) en fases futuras sin necesidad de refactorizar la base.

---

## 2. Identidad Visual y Design Tokens

### 2.1 Paleta Cromática y Reglas de Uso

| Token | HEX | Rol en la Interfaz | Regla de Accesibilidad (WCAG) |
|---|---|---|---|
| `cf-forest` | `#04402A` | Fondo Header, Hero principal, sección Storytelling y Footer. | Textos en `#FFFFFF`, `#BFA004` o `#C2C6C7`. |
| `cf-wine` | `#A62447` | Botones Call to Action (CTA) principales (ej. *Agregar al Carrito*), badges destacados. | Usar sobre fondos claros/blancos o con texto `#FFFFFF` Bold. |
| `action-slate` | `#71749F` | Elementos de interacción secundarios y botones alternativos. | Texto `#FFFFFF` Bold $\ge$ 16px. |
| `gold` | `#BFA004` | Íconos (estrellas, camión de envío), acentos en Storytelling, alertas. | Excelente contraste sobre fondo verde y blanco. |
| `silver` | `#C2C6C7` | Bordes de tarjetas (1px), divisores. **Texto secundario solo sobre fondo verde oscuro**. | **Prohibido** como texto sobre fondos blancos. |
| `dark` | `#1F2937` | Títulos de interfaz, nombres y precios sobre fondo blanco. | Contraste óptimo sobre fondos claros. |
| `standard` | `#767676` | Párrafos y descripciones de producto sobre fondo blanco. | Tono neutro accesible que no cansa la vista. |
| `base-white` | `#FFFFFF` | Fondo general del grid de productos, modal de checkout y cards. | Neutro de lectura. |

### 2.2 Sistema Tipográfico (Google Fonts)

* **Roboto (`font-heading`):** Títulos de interfaz, nombres de productos, precios y encabezados de tablas/checkout.
* **Montserrat (`font-story`):** Títulos editoriales, encabezados de Storytelling (*El Ritual*, *Nuestra Historia*), frases de impacto.
* **Inter (`font-body`):** Cuerpo de texto, fichas técnicas, descripciones de producto, textos del carrito.

---

## 3. Modelo de Datos Relacional (Supabase / PostgreSQL)

Se diseñó un esquema relacional normalizado que desacopla el producto de sus variantes físicas para admitir control de stock individualizado:

```sql
-- Categorías generales
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

-- Productos base
create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category_id uuid references categories(id) on delete set null,
  image_url text,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Variantes e Inventario
-- Para mates: 'Sin virola' | 'Virola lisa' | 'Virola cincelada'
-- Para yerba/otros: 'Estándar' o presentación de peso
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  variant_name text not null,
  price integer not null,
  stock integer not null default 0,
  low_stock_threshold integer default 3
);