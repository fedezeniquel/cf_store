# Guía de Conexión de Supabase para CF Yerba

Esta guía te permite dejar la base de datos lista en menos de 2 minutos cuando crees tu proyecto en [Supabase](https://supabase.com).

---

## Paso 1: Crear el Proyecto en Supabase
1. Ingresá a [supabase.com](https://supabase.com) e iniciá sesión.
2. Hacé clic en **"New Project"**.
3. Ingresá el nombre: `cf-store`.
4. Definí una contraseña segura para la base de datos y elegí la región más cercana (ej: `sa-east-1` São Paulo).

---

## Paso 2: Ejecutar el Esquema y las Políticas RLS
1. En el panel izquierdo de Supabase, andá a **SQL Editor**.
2. Hacé clic en **"New query"**.
3. Copiá y pegá todo el contenido de [`supabase/migrations/20261118_schema.sql`](./migrations/20261118_schema.sql).
4. Presioná el botón verde **"Run"**.
   - Esto creará las tablas `categories`, `products`, `product_variants`, las políticas de seguridad RLS y el bucket de Storage `products`.

---

## Paso 3: Cargar los Datos Semilla (Opcional)
1. En el **SQL Editor**, abrí otra consulta ("New query").
2. Copiá y pegá el contenido de [`supabase/migrations/20261118_seed.sql`](./migrations/20261118_seed.sql).
3. Presioná **"Run"**.
   - Esto insertará las categorías iniciales y los productos con sus variantes y stock.

---

## Paso 4: Crear el Usuario Administrador (Vendedor)
1. En el panel izquierdo, andá a **Authentication** -> **Users**.
2. Hacé clic en **"Add user"** -> **"Create user"**.
3. Ingresá el correo del vendedor (ej: `admin@cfyerba.com`) y una contraseña.
4. Con ese usuario y contraseña podrás iniciar sesión en `/login` del panel de administración.

---

## Paso 5: Configurar las Variables de Entorno en el Proyecto
1. En Supabase, andá a **Project Settings** (el engranaje abajo a la izquierda) -> **API**.
2. Copiá los siguientes valores:
   - **Project URL**
   - **anon / public key**
3. Pegalos en tu archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_WHATSAPP_PHONE=5491100000000
```

¡Listo! El frontend y el panel admin tomarán automáticamente los datos de Supabase.
