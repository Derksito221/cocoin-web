# 🚀 GUÍA PASO A PASO - Reconectar Vercel

Sigue estos pasos **exactamente** para que tu sitio se actualice con todos los cambios:

---

## 📋 PASO 1: Ir al Dashboard de Vercel

1. Abre una nueva pestaña en tu navegador
2. Ve a: **https://vercel.com/dashboard**
3. Deberías ver tu proyecto **cocoin-web** en la lista

---

## 📋 PASO 2: Abrir Configuración del Proyecto

1. Haz clic en el proyecto **cocoin-web**
2. En la parte superior, haz clic en **"Settings"** (Configuración)
3. Espera a que cargue la página de configuración

---

## 📋 PASO 3: Desconectar el Repositorio Git

1. En el menú lateral izquierdo, busca y haz clic en **"Git"**
2. Verás una sección que dice **"Connected Git Repository"**
3. Debajo del repositorio actual, busca el botón **"Disconnect"** o **"Remove"**
4. Haz clic en ese botón
5. Confirma la desconexión si te pide confirmación

---

## 📋 PASO 4: Volver a Conectar el Repositorio

1. Después de desconectar, verás un botón **"Connect Git Repository"**
2. Haz clic en ese botón
3. Se abrirá una ventana con tus repositorios de GitHub
4. Busca y selecciona: **Derksito221/cocoin-web**
5. Haz clic en **"Import"** o **"Connect"**

---

## 📋 PASO 5: Configurar el Proyecto (MUY IMPORTANTE)

En la siguiente pantalla, verás opciones de configuración:

### ✅ Configuración Correcta:

- **Project Name:** `cocoin-web` (o déjalo como está)
- **Framework Preset:** **Other** (o déjalo en blanco)
- **Root Directory:** Déjalo **vacío** o pon un punto `.`
- **Build Command:** Déjalo **vacío**
- **Output Directory:** Déjalo **vacío**
- **Install Command:** Déjalo **vacío**

### ⚠️ NO CAMBIES NADA MÁS

---

## 📋 PASO 6: Desplegar

1. Haz clic en el botón grande azul que dice **"Deploy"**
2. Vercel comenzará a desplegar tu sitio
3. Verás una pantalla con una animación de carga
4. **Espera 1-3 minutos** hasta que termine

---

## 📋 PASO 7: Verificar el Despliegue

Cuando termine el despliegue:

1. Verás un mensaje de **"Congratulations!"** o similar
2. Haz clic en **"Visit"** para abrir tu sitio
3. O copia la URL y ábrela en una nueva pestaña

---

## ✅ PASO 8: Comprobar los Cambios

En tu sitio desplegado, verifica que veas:

1. ✅ **Imagen nueva** en la portada (photo_2025-10-27_11-26-01.jpg)
2. ✅ **Botón "Comprar COCOIN"** visible
3. ✅ **Botón "Únete al corral"** apunta a: `https://t.me/cocoinelgallo`
4. ✅ Sección **Reconocimientos** con el nuevo texto sobre "quienes creyeron antes de que el canto fuera fuerte"
5. ✅ Enlaces de **Reddit** apuntan a: `reddit.com/r/cocoinELGALLO`
6. ✅ Formulario de contacto configurado con `duglita00@hotmail.com`

---

## 📋 PASO 9: Limpiar Caché del Navegador

Si ves el sitio desplegado pero aún muestra la versión antigua:

1. Presiona **Ctrl + Shift + R** (Windows) o **Cmd + Shift + R** (Mac)
2. O presiona **Ctrl + F5**
3. Esto fuerza una recarga sin caché

---

## 📋 PASO 10: Verificar Google AdSense

Una vez que el sitio esté actualizado:

1. Vuelve a la pestaña de Google AdSense
2. Marca la casilla **"He colocado mi código"**
3. Haz clic en **"Verificar"**
4. Google detectará el código automáticamente
5. ✅ ¡Listo!

---

## 🆘 Si algo sale mal:

### Problema 1: No encuentro el botón "Disconnect"
**Solución:** Ve a Settings → General → scroll hasta abajo y busca "Delete Project". Elimínalo y vuelve a crearlo desde cero.

### Problema 2: El sitio sigue mostrando la versión antigua
**Solución:** 
1. Ve a Deployments en Vercel
2. Busca el deployment más reciente (debería decir commit `095214f`)
3. Haz clic en los 3 puntos (⋮)
4. Selecciona "Redeploy"

### Problema 3: Vercel dice "Build failed"
**Solución:** Asegúrate de que Build Command y Output Directory estén **vacíos**. Este es un sitio HTML estático, no necesita build.

---

## 📊 Resumen de Cambios que Deberías Ver:

| Elemento | Antes | Ahora |
|----------|-------|-------|
| Telegram | `t.me/cocoin` | `t.me/cocoinelgallo` |
| Reddit | `r/cocoin` | `r/cocoinELGALLO` |
| Email | - | `duglita00@hotmail.com` |
| Botón Comprar | ❌ | ✅ "Comprar COCOIN" |
| Imagen portada | pollo caricatura | Logo con gallo |
| Google AdSense | ❌ | ✅ Código instalado |
| Texto Reconocimientos | Antiguo | Nuevo (sobre el canto) |

---

**¿Listo?** Empieza con el PASO 1 y avísame cuando termines o si tienes algún problema en algún paso.

