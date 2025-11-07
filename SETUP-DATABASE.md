# 🗄️ Configuración de Base de Datos Supabase para COCOIN

Este documento explica cómo configurar las tablas necesarias en Supabase para el dashboard de COCOIN.

## 📋 Tablas a Crear

### 1. **clases_tomadas**
Almacena las clases que cada usuario ha tomado.

```sql
CREATE TABLE clases_tomadas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  clase_id TEXT NOT NULL,
  clase_titulo TEXT NOT NULL,
  clase_contenido TEXT,
  fecha_tomada TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_clases_user_id ON clases_tomadas(user_id);
CREATE INDEX idx_clases_fecha ON clases_tomadas(fecha_tomada DESC);

-- Política RLS: Los usuarios solo pueden ver sus propias clases
ALTER TABLE clases_tomadas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own classes"
  ON clases_tomadas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own classes"
  ON clases_tomadas FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 2. **retos_completados**
Almacena los retos que cada usuario ha completado.

```sql
CREATE TABLE retos_completados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reto_id TEXT NOT NULL,
  reto_titulo TEXT NOT NULL,
  reto_descripcion TEXT,
  recompensa TEXT,
  fecha_completado TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_retos_user_id ON retos_completados(user_id);
CREATE INDEX idx_retos_fecha ON retos_completados(fecha_completado DESC);

-- Política RLS: Los usuarios solo pueden ver sus propios retos
ALTER TABLE retos_completados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own retos"
  ON retos_completados FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own retos"
  ON retos_completados FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 3. **cantos_diarios**
Almacena los cantos diarios de cada usuario.

```sql
CREATE TABLE cantos_diarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  canto_texto TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_cantos_user_id ON cantos_diarios(user_id);
CREATE INDEX idx_cantos_fecha ON cantos_diarios(fecha DESC);

-- Política RLS: Los usuarios solo pueden ver sus propios cantos
ALTER TABLE cantos_diarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own cantos"
  ON cantos_diarios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cantos"
  ON cantos_diarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 4. **comunidad_publicaciones**
Almacena las publicaciones públicas de la comunidad.

```sql
CREATE TABLE comunidad_publicaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contenido TEXT NOT NULL,
  fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_comunidad_fecha ON comunidad_publicaciones(fecha_publicacion DESC);
CREATE INDEX idx_comunidad_user_id ON comunidad_publicaciones(user_id);

-- Política RLS: Todos pueden ver las publicaciones, solo el autor puede insertar
ALTER TABLE comunidad_publicaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view publicaciones"
  ON comunidad_publicaciones FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own publicaciones"
  ON comunidad_publicaciones FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### 5. **user_profiles** (Opcional - para expandir perfiles)
Almacena información adicional del perfil del usuario.

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  role TEXT DEFAULT 'Gallina del corral',
  puntos INTEGER DEFAULT 0,
  retos_completados_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Política RLS: Los usuarios pueden ver todos los perfiles, pero solo editar el suyo
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

## 🚀 Pasos para Configurar

1. **Ve a tu proyecto en Supabase**: https://supabase.com/dashboard
2. **Abre SQL Editor**
3. **Copia y pega cada bloque SQL** en el editor
4. **Ejecuta cada bloque** haciendo clic en "Run"
5. **Verifica que las tablas se crearon** en la sección "Table Editor"

## ✅ Verificación

Después de crear las tablas, verifica que:
- ✅ Todas las tablas aparecen en "Table Editor"
- ✅ Las políticas RLS están activas
- ✅ Los índices se crearon correctamente

## 📝 Notas

- Las políticas RLS (Row Level Security) aseguran que los usuarios solo puedan ver/editar sus propios datos (excepto en comunidad_publicaciones que es pública)
- Los índices mejoran el rendimiento de las consultas
- Las referencias a `auth.users` aseguran la integridad referencial

