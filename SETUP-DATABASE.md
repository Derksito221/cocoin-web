# 🗄️ Guía Completa de Configuración de Base de Datos Supabase para COCOIN

Esta guía te ayudará a configurar todas las tablas necesarias en Supabase para que el dashboard de COCOIN funcione correctamente.

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Método Rápido: Script Completo](#método-rápido-script-completo)
3. [Tablas Creadas](#tablas-creadas)
4. [Verificación](#verificación)
5. [Solución de Problemas](#solución-de-problemas)
6. [Configuración Manual (Opcional)](#configuración-manual-opcional)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Una cuenta en Supabase (https://supabase.com)
- ✅ Un proyecto de Supabase creado
- ✅ Acceso al SQL Editor de tu proyecto
- ✅ Credenciales de Supabase configuradas en `.env.local`

**Tu proyecto Supabase:**
- URL: `https://oscvuucghxofbbdrhydz.supabase.co`
- Anon Key: Configurada en `.env.local`

---

## 🚀 Método Rápido: Script Completo

### Paso 1: Acceder a Supabase SQL Editor

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto `oscvuucghxofbbdrhydz`
3. Haz clic en **SQL Editor** en el menú lateral izquierdo
4. Haz clic en **New Query** para crear una nueva consulta

### Paso 2: Ejecutar el Script Completo

1. **Abre el archivo `supabase-schema.sql`** en este proyecto
2. **Copia TODO el contenido** del archivo
3. **Pégalo en el SQL Editor** de Supabase
4. **Haz clic en "Run"** o presiona `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
5. **Espera a que termine** (puede tardar unos segundos)

### Paso 3: Verificar la Ejecución

Deberías ver un mensaje de éxito que dice:
```
✅ Se crearon 13 tablas correctamente
```

Si ves algún error, consulta la sección [Solución de Problemas](#solución-de-problemas).

---

## 📊 Tablas Creadas

El script crea **13 tablas** en total:

### Tablas Principales (Usadas por el código actual)

1. **`clases_tomadas`** - Clases educativas completadas por usuarios
2. **`retos_completados`** - Retos completados por usuarios
3. **`cantos_diarios`** - Cantos diarios (pensamientos) de usuarios
4. **`comunidad_publicaciones`** - Publicaciones públicas en el muro

### Tablas Adicionales (Para expansión futura)

5. **`clases`** - Catálogo de clases disponibles
6. **`retos`** - Catálogo de retos disponibles
7. **`cantos`** - Versión alternativa de cantos
8. **`comunidad`** - Versión alternativa de comunidad
9. **`reto_corral`** - Retos especiales del corral
10. **`ranking`** - Ranking de usuarios más activos
11. **`referidos`** - Sistema de referidos e invitaciones
12. **`recompensas`** - Sistema de recompensas y redenciones
13. **`user_profiles`** - Perfiles extendidos de usuarios

### Características de las Tablas

✅ **Row Level Security (RLS)** activado en todas las tablas
✅ **Índices** creados para mejorar el rendimiento
✅ **Realtime** habilitado en: `cantos_diarios`, `comunidad_publicaciones`, `cantos`, `comunidad`, `ranking`
✅ **Foreign Keys** configuradas con `ON DELETE CASCADE`
✅ **Políticas de seguridad** configuradas según el tipo de tabla

---

## ✅ Verificación

### Verificar en Supabase Dashboard

1. Ve a **Table Editor** en el menú lateral
2. Deberías ver todas las tablas listadas:
   - ✅ `clases_tomadas`
   - ✅ `retos_completados`
   - ✅ `cantos_diarios`
   - ✅ `comunidad_publicaciones`
   - ✅ `clases`
   - ✅ `retos`
   - ✅ `cantos`
   - ✅ `comunidad`
   - ✅ `reto_corral`
   - ✅ `ranking`
   - ✅ `referidos`
   - ✅ `recompensas`
   - ✅ `user_profiles`

### Verificar Políticas RLS

1. Ve a **Authentication** > **Policies** en el menú lateral
2. Selecciona cada tabla y verifica que las políticas estén activas
3. Cada tabla debe tener al menos una política de SELECT

### Verificar Realtime

1. Ve a **Database** > **Replication** en el menú lateral
2. Verifica que estas tablas estén habilitadas para Realtime:
   - `cantos_diarios`
   - `comunidad_publicaciones`
   - `cantos`
   - `comunidad`
   - `ranking`

### Comando de Verificación SQL

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
  'clases',
  'retos',
  'cantos',
  'comunidad',
  'reto_corral',
  'ranking',
  'referidos',
  'recompensas',
  'user_profiles'
)
ORDER BY table_name;
```

Deberías ver **13 filas** con los nombres de las tablas.

---

## 🔍 Solución de Problemas

### Error: "relation already exists"

**Causa**: Las tablas ya existen en la base de datos.

**Solución**: 
1. El script usa `CREATE TABLE IF NOT EXISTS`, así que debería funcionar
2. Si el error persiste, puedes eliminar las tablas manualmente desde **Table Editor** y volver a ejecutar el script

### Error: "permission denied for table"

**Causa**: Las políticas RLS están bloqueando el acceso.

**Solución**:
1. Verifica que las políticas RLS están configuradas correctamente
2. Asegúrate de que el usuario está autenticado
3. Revisa las políticas en **Authentication** > **Policies**

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
2. Revisa la restricción `UNIQUE` en las tablas (ej: `retos_completados`, `reto_corral`)

### Error: "publication does not exist"

**Causa**: El script intenta habilitar Realtime pero la publicación no existe.

**Solución**:
1. Ve a **Database** > **Replication** en Supabase
2. Habilita Realtime manualmente para las tablas necesarias
3. O simplemente ignora este error si no necesitas Realtime inmediatamente

### Las tablas no aparecen en Table Editor

**Causa**: Puede ser un problema de caché o permisos.

**Solución**:
1. Refresca la página del dashboard de Supabase
2. Verifica que estás en el proyecto correcto
3. Ejecuta el comando de verificación SQL para confirmar que las tablas existen

---

## 📝 Configuración Manual (Opcional)

Si prefieres crear las tablas manualmente o necesitas modificar algo específico, puedes seguir estos pasos:

### Crear una Tabla Individual

1. Ve a **Table Editor** > **New Table**
2. Configura los campos según la documentación
3. Ve a **Authentication** > **Policies** para configurar RLS
4. Ve a **Database** > **Replication** para habilitar Realtime si es necesario

### Estructura de Campos Común

- **`id`**: UUID, Primary Key, Default `gen_random_uuid()`
- **`user_id`** o **`usuario_id`**: UUID, Foreign Key a `auth.users(id)`, `ON DELETE CASCADE`
- **`created_at`**: TIMESTAMP WITH TIME ZONE, Default `NOW()`
- **Campos de contenido**: TEXT o VARCHAR según necesidad

---

## 🎯 Próximos Pasos

Después de configurar las tablas:

1. ✅ **Prueba el dashboard en local**: `npm run dev`
2. ✅ **Crea un usuario de prueba** en Supabase Authentication
3. ✅ **Verifica que puedes tomar clases**
4. ✅ **Verifica que puedes completar retos**
5. ✅ **Verifica que puedes guardar cantos diarios**
6. ✅ **Verifica que puedes publicar en la comunidad**
7. ✅ **Verifica el ranking de usuarios**
8. ✅ **Despliega en Vercel** y prueba en producción

---

## 📚 Estructura de Datos

### Relaciones entre Tablas

```
auth.users (tabla de Supabase)
  ├── clases_tomadas (user_id)
  ├── retos_completados (user_id)
  ├── cantos_diarios (user_id)
  ├── comunidad_publicaciones (user_id)
  ├── reto_corral (usuario_id)
  ├── ranking (usuario_id)
  ├── referidos (usuario_id, referido_por)
  ├── recompensas (usuario_id)
  └── user_profiles (id)
```

### Políticas de Seguridad

- **Privadas**: Solo el usuario puede ver/editar sus propios datos
  - `clases_tomadas`
  - `retos_completados`
  - `cantos_diarios`
  - `cantos`
  - `recompensas`

- **Públicas**: Todos pueden ver, solo autenticados pueden insertar
  - `comunidad_publicaciones`
  - `comunidad`
  - `ranking`
  - `user_profiles`

- **Mixtas**: Públicas para lectura, privadas para escritura
  - `reto_corral` (pública para ranking, privada para edición)

---

## 🔐 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS activado para proteger los datos:

- Los usuarios solo pueden ver/editar sus propios datos (excepto en tablas públicas)
- Las políticas están configuradas según el tipo de contenido
- Las foreign keys con `ON DELETE CASCADE` aseguran la integridad de los datos

### Recomendaciones

1. **No desactives RLS** sin una razón muy específica
2. **Revisa las políticas** antes de hacer cambios importantes
3. **Prueba las políticas** con usuarios de prueba antes de producción
4. **Mantén las credenciales seguras** (`.env.local` no debe subirse a Git)

---

## 📖 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor de Supabase](https://supabase.com/docs/guides/database/tables)
- [Realtime en Supabase](https://supabase.com/docs/guides/realtime)

---

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs de Supabase en **Logs** > **Postgres Logs**
2. Verifica las políticas RLS en **Authentication** > **Policies**
3. Revisa la documentación de Supabase
4. Verifica que el archivo `supabase-schema.sql` se ejecutó completamente

---

## ✅ Checklist Final

- [ ] Script SQL ejecutado correctamente
- [ ] Todas las tablas aparecen en Table Editor
- [ ] Políticas RLS configuradas y activas
- [ ] Realtime habilitado en tablas necesarias
- [ ] Índices creados correctamente
- [ ] Dashboard funciona en local
- [ ] Usuarios pueden crear cuentas
- [ ] Funcionalidades del dashboard operativas

---

**¡Listo!** 🎉 Ahora tu dashboard de COCOIN está listo para funcionar con todas las funcionalidades activas.

**Archivo SQL completo**: `supabase-schema.sql`
