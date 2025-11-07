# 🔧 Guía Rápida: Configurar Supabase para COCOIN

## Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Click en **"Start your project"** o **"Sign up"**
3. Regístrate con GitHub, Google o email
4. Es **100% gratuito** para empezar

## Paso 2: Crear un nuevo proyecto

1. En el dashboard, click en **"New Project"**
2. Completa:
   - **Name:** `cocoin-auth` (o el nombre que prefieras)
   - **Database Password:** Crea una contraseña segura (guárdala)
   - **Region:** Elige la más cercana (ej: `South America`)
3. Click en **"Create new project"**
4. Espera 2-3 minutos mientras se crea

## Paso 3: Obtener las credenciales

1. En tu proyecto, ve a **Settings** (⚙️) → **API**
2. Encontrarás dos valores importantes:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```

### anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Paso 4: Configurar URLs de redirección

1. Ve a **Authentication** → **URL Configuration**
2. En **Site URL**, agrega:
   - Desarrollo: `http://localhost:3000`
   - Producción: `https://tu-dominio.vercel.app`
3. En **Redirect URLs**, agrega:
   - `http://localhost:3000/dashboard`
   - `https://tu-dominio.vercel.app/dashboard`
   - `http://localhost:3000/auth/callback`
   - `https://tu-dominio.vercel.app/auth/callback`
4. Click en **Save**

## Paso 5: Configurar email (Opcional pero recomendado)

1. Ve a **Authentication** → **Email Templates**
2. Puedes personalizar los emails de confirmación
3. Por defecto, Supabase enviará emails automáticos

### Configurar SMTP personalizado (Opcional)

Si quieres usar tu propio servidor de email:

1. Ve a **Settings** → **Auth** → **SMTP Settings**
2. Configura tu servidor SMTP
3. Esto es opcional, Supabase tiene SMTP por defecto

## Paso 6: Crear archivo .env.local

En la raíz de tu proyecto, crea `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**⚠️ IMPORTANTE:** 
- NO subas este archivo a Git
- Ya está en `.gitignore`
- Usa la **anon key**, NO la service role key

## Paso 7: Verificar que funciona

1. Ejecuta `npm run dev`
2. Ve a http://localhost:3000/login
3. Intenta registrarte con un email
4. Deberías recibir un email de confirmación (si está habilitado)
5. Inicia sesión y verifica que el dashboard funcione

## ✅ Checklist de Configuración

- [ ] Cuenta de Supabase creada
- [ ] Proyecto creado en Supabase
- [ ] Credenciales copiadas (URL y anon key)
- [ ] URLs de redirección configuradas
- [ ] Archivo `.env.local` creado con las credenciales
- [ ] Proyecto funciona en localhost
- [ ] Variables de entorno configuradas en Vercel (para producción)

## 🆘 Problemas Comunes

### "Invalid API key"
- Verifica que copiaste la **anon key**, no la service role key
- Verifica que no haya espacios extra en `.env.local`

### "Email already registered"
- El email ya existe. Usa "Iniciar Sesión" o prueba con otro email

### No recibo el email de confirmación
- Revisa la carpeta de spam
- Verifica que el email esté correcto
- En desarrollo, puedes deshabilitar la verificación de email temporalmente

### El dashboard redirige a login
- Verifica que las variables de entorno estén correctas
- Revisa la consola del navegador para errores
- Asegúrate de haber iniciado sesión correctamente

---

**¿Necesitas ayuda?** Revisa la documentación de Supabase: https://supabase.com/docs

