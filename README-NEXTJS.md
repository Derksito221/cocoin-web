# 🐔 COCOIN - Sistema de Login con Next.js

Sistema de autenticación completo para COCOIN, un meme token educativo con propósito.

## 🚀 Características

- ✅ **Registro e Inicio de Sesión** con email y contraseña
- ✅ **Validación de formularios** (email válido, contraseña segura)
- ✅ **Dashboard de usuario** con perfil y rol
- ✅ **Protección de rutas** con middleware
- ✅ **Diseño cálido** con colores naranja, blanco y dorado
- ✅ **Responsive** y optimizado para móviles
- ✅ **Listo para expandir** (wallet login, verificación de tokens, etc.)

## 📋 Prerequisitos

- Node.js 18+ instalado
- Cuenta en Supabase (gratis): https://supabase.com

## 🔧 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Ve a https://supabase.com y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public key** (ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**Ejemplo:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Configurar Supabase Auth

En tu proyecto de Supabase:

1. Ve a **Authentication** → **URL Configuration**
2. Agrega tu URL de producción: `https://tu-dominio.vercel.app`
3. Agrega tu URL de desarrollo: `http://localhost:3000`
4. Guarda los cambios

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## 📁 Estructura del Proyecto

```
cocoin/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── login/             # Página de login
│   │   └── page.tsx
│   ├── dashboard/         # Dashboard protegido
│   │   └── page.tsx
│   └── globals.css        # Estilos globales
├── components/
│   ├── auth/              # Componentes de autenticación
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthTabs.tsx
│   ├── dashboard/         # Componentes del dashboard
│   │   └── UserDashboard.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/          # Secciones de la página
│       ├── Hero.tsx
│       ├── Historia.tsx
│       ├── Fase2.tsx
│       ├── Educacion.tsx
│       ├── Reconocimientos.tsx
│       └── Contacto.tsx
├── lib/
│   └── supabase.ts       # Configuración de Supabase
├── public/
│   └── images/           # Imágenes del proyecto
├── middleware.ts         # Protección de rutas
├── next.config.js        # Configuración de Next.js
├── package.json          # Dependencias
└── .env.local            # Variables de entorno (NO subir a Git)
```

## 🔐 Funcionalidades de Autenticación

### Registro
- Validación de email
- Contraseña segura (mínimo 8 caracteres, mayúscula, minúscula, número)
- Confirmación de contraseña
- Verificación de email (opcional)

### Login
- Validación de credenciales
- Manejo de errores
- Redirección automática al dashboard

### Dashboard
- Perfil de usuario con avatar
- Rol asignado ("Gallina del corral" por defecto)
- Espacio para recompensas futuras
- Espacio para contenido educativo
- Botón de cerrar sesión

## 🎨 Personalización

### Cambiar el rol por defecto

En `components/dashboard/UserDashboard.tsx`, línea ~30:

```typescript
const role = user.user_metadata?.role || 'Gallina del corral'
```

### Cambiar mensajes de bienvenida

En `components/dashboard/UserDashboard.tsx`:
- Línea ~45: "Bienvenido al corral, donde cada grano tiene propósito"
- Línea ~46: "El canto justo comienza aquí"

## 🚀 Despliegue en Vercel

1. **Sube tu código a GitHub**

2. **Conecta con Vercel:**
   - Ve a https://vercel.com
   - Importa tu repositorio
   - Vercel detectará automáticamente Next.js

3. **Configura variables de entorno:**
   - En Vercel, ve a **Settings** → **Environment Variables**
   - Agrega:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Despliega:**
   - Click en **Deploy**
   - ¡Listo!

## 🔮 Expansión Futura

El código está preparado para agregar:

### Login con Wallet (MetaMask)
- Integración con Web3
- Verificación de tenencia de $COCO
- Acceso basado en tokens

### Roles y Permisos
- Sistema de roles avanzado
- Contenido exclusivo por rol
- NFTs de reconocimiento

### Recompensas y Gamificación
- Sistema de puntos
- Badges y logros
- Clases y retos educativos

## 🛡️ Seguridad

- ✅ Validación de formularios en cliente y servidor
- ✅ Protección contra inyecciones SQL (Supabase lo maneja)
- ✅ Tokens JWT seguros
- ✅ HTTPS obligatorio en producción
- ✅ Variables de entorno protegidas

## 📝 Notas Importantes

- **NO subas `.env.local` a Git** (ya está en `.gitignore`)
- **Configura las URLs de redirección** en Supabase
- **Usa contraseñas seguras** en producción
- **Habilita verificación de email** para mayor seguridad

## 🆘 Solución de Problemas

### Error: "Invalid API key"
- Verifica que las variables de entorno estén correctas
- Asegúrate de usar la **anon key**, no la service role key

### Error: "Email already registered"
- El email ya está registrado. Usa "Iniciar Sesión" en su lugar

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Asegúrate de haber verificado el email si está habilitado

### El dashboard no carga
- Verifica que el middleware esté funcionando
- Revisa la consola del navegador para errores

## 📚 Recursos

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

**¡El corral digital está listo para crecer!** 🐔🌱

