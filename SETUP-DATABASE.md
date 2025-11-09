# 🗄️ Guía Completa de Configuración de Base de Datos Supabase para COCOIN

Esta guía te ayudará a configurar todas las tablas necesarias en Supabase para que el dashboard de COCOIN funcione correctamente.

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Tablas a Crear](#tablas-a-crear)
3. [Pasos de Configuración](#pasos-de-configuración)
4. [Verificación](#verificación)
5. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Una cuenta en Supabase (https://supabase.com)
- ✅ Un proyecto de Supabase creado
- ✅ Acceso al SQL Editor de tu proyecto
- ✅ Credenciales de Supabase configuradas en `.env.local`

---

## 📊 Tablas a Crear

El dashboard de COCOIN requiere las siguientes tablas para funcionar:

### 1. **clases_tomadas**
Almacena las clases educativas que cada usuario ha completado.

**Funcionalidad**: Permite a los usuarios tomar clases sobre blockchain, NFTs, staking, etc., y guardar su progreso.

**Campos**:
- `id` (UUID): Clave primaria
- `user_id` (UUID): Referencia al usuario (FK a auth.users)
- `clase_id` (TEXT): Identificador único de la clase
- `clase_titulo` (TEXT): Título de la clase
- `clase_contenido` (TEXT): Contenido educativo de la clase
- `fecha_tomada` (TIMESTAMP): Fecha en que se tomó la clase
- `created_at` (TIMESTAMP): Fecha de creación del registro

**SQL para crear la tabla**:

```sql
-- Crear tabla clases_tomadas
CREATE TABLE clases_tomadas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  clase_id TEXT NOT NULL,
  clase_titulo TEXT NOT NULL,
  clase_contenido TEXT,
  fecha_tomada TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_clases_user_id ON clases_tomadas(user_id);
CREATE INDEX idx_clases_fecha ON clases_tomadas(fecha_tomada DESC);
CREATE INDEX idx_clases_clase_id ON clases_tomadas(clase_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE clases_tomadas ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias clases
CREATE POLICY "Users can view their own classes"
  ON clases_tomadas FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propias clases
CREATE POLICY "Users can insert their own classes"
  ON clases_tomadas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propias clases (opcional)
CREATE POLICY "Users can update their own classes"
  ON clases_tomadas FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### 2. **retos_completados**
Almacena los retos que cada usuario ha completado.

**Funcionalidad**: Permite a los usuarios completar retos comunitarios y obtener recompensas simbólicas.

**Campos**:
- `id` (UUID): Clave primaria
- `user_id` (UUID): Referencia al usuario (FK a auth.users)
- `reto_id` (TEXT): Identificador único del reto
- `reto_titulo` (TEXT): Título del reto
- `reto_descripcion` (TEXT): Descripción del reto
- `recompensa` (TEXT): Recompensa obtenida (frase, ícono, badge)
- `fecha_completado` (TIMESTAMP): Fecha en que se completó el reto
- `created_at` (TIMESTAMP): Fecha de creación del registro

**SQL para crear la tabla**:

```sql
-- Crear tabla retos_completados
CREATE TABLE retos_completados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reto_id TEXT NOT NULL,
  reto_titulo TEXT NOT NULL,
  reto_descripcion TEXT,
  recompensa TEXT,
  fecha_completado TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Evitar duplicados: un usuario no puede completar el mismo reto dos veces
  UNIQUE(user_id, reto_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_retos_user_id ON retos_completados(user_id);
CREATE INDEX idx_retos_fecha ON retos_completados(fecha_completado DESC);
CREATE INDEX idx_retos_reto_id ON retos_completados(reto_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE retos_completados ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios retos
CREATE POLICY "Users can view their own retos"
  ON retos_completados FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propios retos
CREATE POLICY "Users can insert their own retos"
  ON retos_completados FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

### 3. **cantos_diarios**
Almacena los cantos diarios (pensamientos, aprendizajes) de cada usuario.

**Funcionalidad**: Permite a los usuarios escribir y guardar sus pensamientos diarios, creando un historial personal.

**Campos**:
- `id` (UUID): Clave primaria
- `user_id` (UUID): Referencia al usuario (FK a auth.users)
- `canto_texto` (TEXT): Contenido del canto diario
- `fecha` (TIMESTAMP): Fecha del canto
- `created_at` (TIMESTAMP): Fecha de creación del registro

**SQL para crear la tabla**:

```sql
-- Crear tabla cantos_diarios
CREATE TABLE cantos_diarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  canto_texto TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_cantos_user_id ON cantos_diarios(user_id);
CREATE INDEX idx_cantos_fecha ON cantos_diarios(fecha DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE cantos_diarios ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios cantos
CREATE POLICY "Users can view their own cantos"
  ON cantos_diarios FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propios cantos
CREATE POLICY "Users can insert their own cantos"
  ON cantos_diarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propios cantos (opcional)
CREATE POLICY "Users can delete their own cantos"
  ON cantos_diarios FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 4. **comunidad_publicaciones**
Almacena las publicaciones públicas de la comunidad.

**Funcionalidad**: Permite a los usuarios publicar mensajes en el muro público de la comunidad, visible para todos.

**Campos**:
- `id` (UUID): Clave primaria
- `user_id` (UUID): Referencia al usuario (FK a auth.users)
- `contenido` (TEXT): Contenido de la publicación
- `fecha_publicacion` (TIMESTAMP): Fecha de la publicación
- `created_at` (TIMESTAMP): Fecha de creación del registro

**SQL para crear la tabla**:

```sql
-- Crear tabla comunidad_publicaciones
CREATE TABLE comunidad_publicaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contenido TEXT NOT NULL,
  fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_comunidad_fecha ON comunidad_publicaciones(fecha_publicacion DESC);
CREATE INDEX idx_comunidad_user_id ON comunidad_publicaciones(user_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE comunidad_publicaciones ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver las publicaciones (muro público)
CREATE POLICY "Anyone can view publicaciones"
  ON comunidad_publicaciones FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden insertar publicaciones
CREATE POLICY "Authenticated users can insert publicaciones"
  ON comunidad_publicaciones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propias publicaciones (opcional)
CREATE POLICY "Users can delete their own publicaciones"
  ON comunidad_publicaciones FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 5. **user_profiles** (Opcional - para expansión futura)
Almacena información adicional del perfil del usuario.

**Funcionalidad**: Permite expandir los perfiles de usuario con información adicional, puntos, roles, etc.

**Campos**:
- `id` (UUID): Clave primaria (FK a auth.users)
- `username` (TEXT): Nombre de usuario personalizado
- `role` (TEXT): Rol del usuario (por defecto: "Gallina del corral")
- `puntos` (INTEGER): Puntos acumulados
- `retos_completados_count` (INTEGER): Contador de retos completados
- `created_at` (TIMESTAMP): Fecha de creación del perfil
- `updated_at` (TIMESTAMP): Fecha de última actualización

**SQL para crear la tabla**:

```sql
-- Crear tabla user_profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  role TEXT DEFAULT 'Gallina del corral',
  puntos INTEGER DEFAULT 0,
  retos_completados_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas
CREATE INDEX idx_profiles_username ON user_profiles(username);
CREATE INDEX idx_profiles_puntos ON user_profiles(puntos DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver los perfiles (para ranking, etc.)
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Política: Los usuarios pueden insertar su propio perfil
CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## 🚀 Pasos de Configuración

### Paso 1: Acceder a Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto `oscvuucghxofbbdrhydz`
3. Haz clic en **SQL Editor** en el menú lateral

### Paso 2: Crear las Tablas

1. **Copia el primer bloque SQL** (clases_tomadas)
2. **Pégalo en el editor SQL**
3. **Haz clic en "Run"** o presiona `Ctrl+Enter`
4. **Verifica que se ejecutó correctamente** (deberías ver un mensaje de éxito)
5. **Repite el proceso** para cada tabla:
   - `retos_completados`
   - `cantos_diarios`
   - `comunidad_publicaciones`
   - `user_profiles` (opcional)

### Paso 3: Verificar las Tablas

1. Ve a **Table Editor** en el menú lateral
2. Deberías ver todas las tablas creadas:
   - ✅ `clases_tomadas`
   - ✅ `retos_completados`
   - ✅ `cantos_diarios`
   - ✅ `comunidad_publicaciones`
   - ✅ `user_profiles` (si la creaste)

### Paso 4: Verificar las Políticas RLS

1. Ve a **Authentication** > **Policies** en el menú lateral
2. Verifica que cada tabla tenga sus políticas RLS configuradas
3. Asegúrate de que las políticas estén **habilitadas**

---

## ✅ Verificación

Después de crear las tablas, verifica que:

- ✅ Todas las tablas aparecen en "Table Editor"
- ✅ Las políticas RLS están activas en cada tabla
- ✅ Los índices se crearon correctamente
- ✅ Las relaciones (FK) están configuradas correctamente
- ✅ No hay errores en los logs de Supabase

### Comando de Verificación Rápida

Puedes ejecutar este comando en SQL Editor para verificar todas las tablas:

```sql
-- Verificar que todas las tablas existen
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'clases_tomadas',
  'retos_completados',
  'cantos_diarios',
  'comunidad_publicaciones',
  'user_profiles'
)
ORDER BY table_name;
```

---

## 🔍 Solución de Problemas

### Error: "relation does not exist"

**Causa**: La tabla no se creó correctamente.

**Solución**: 
1. Verifica que ejecutaste el SQL completo
2. Revisa los logs de error en Supabase
3. Asegúrate de estar en el esquema correcto (`public`)

### Error: "permission denied for table"

**Causa**: Las políticas RLS están bloqueando el acceso.

**Solución**:
1. Verifica que las políticas RLS están configuradas correctamente
2. Asegúrate de que el usuario está autenticado
3. Revisa las políticas en Authentication > Policies

### Error: "foreign key constraint violation"

**Causa**: Intento de insertar un `user_id` que no existe en `auth.users`.

**Solución**:
1. Asegúrate de que el usuario está autenticado
2. Verifica que `auth.users` tiene el usuario correcto
3. Revisa que las referencias FK estén correctas

### Error: "duplicate key value violates unique constraint"

**Causa**: Intento de insertar un registro duplicado (ej: completar el mismo reto dos veces).

**Solución**:
1. Verifica que el código del dashboard maneja duplicados correctamente
2. Revisa la restricción `UNIQUE` en la tabla `retos_completados`

---

## 📝 Notas Importantes

### Row Level Security (RLS)

- **RLS está habilitado** en todas las tablas para seguridad
- Los usuarios solo pueden ver/editar sus propios datos (excepto en `comunidad_publicaciones`)
- Las políticas RLS aseguran que los datos estén protegidos

### Índices

- Los índices mejoran el rendimiento de las consultas
- Se crean automáticamente en campos frecuentemente consultados
- No afectan la funcionalidad, solo el rendimiento

### Relaciones (Foreign Keys)

- Todas las tablas tienen una relación con `auth.users`
- Al eliminar un usuario, se eliminan automáticamente sus registros (CASCADE)
- Esto mantiene la integridad de los datos

### Expansión Futura

- La tabla `user_profiles` es opcional pero recomendada para expansión futura
- Puedes agregar más campos según necesites
- El trigger `update_updated_at_column` actualiza automáticamente la fecha de modificación

---

## 🎯 Próximos Pasos

Después de configurar las tablas:

1. ✅ Prueba el dashboard en local: `npm run dev`
2. ✅ Verifica que puedes tomar clases
3. ✅ Verifica que puedes completar retos
4. ✅ Verifica que puedes guardar cantos diarios
5. ✅ Verifica que puedes publicar en la comunidad
6. ✅ Despliega en Vercel y prueba en producción

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor de Supabase](https://supabase.com/docs/guides/database/tables)

---

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs de Supabase en **Logs** > **Postgres Logs**
2. Verifica las políticas RLS en **Authentication** > **Policies**
3. Revisa la documentación de Supabase
4. Contacta al equipo de desarrollo de COCOIN

---

**¡Listo!** 🎉 Ahora tu dashboard de COCOIN está listo para funcionar con todas las funcionalidades activas.
