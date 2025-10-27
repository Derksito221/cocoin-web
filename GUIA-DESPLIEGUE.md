# 🚀 Guía Rápida de Despliegue - COCOIN

## ⚡ Despliegue en 3 Pasos (Vercel - Recomendado)

### Paso 1: Prepara el Proyecto
```bash
# Asegúrate de estar en la carpeta del proyecto
cd cocoin

# Verifica que tengas estos archivos:
# - index.html
# - styles.css
# - script.js
# - images/ (carpeta con imágenes)
```

### Paso 2: Sube a GitHub (Opcional pero recomendado)
```bash
# Inicializa Git
git init

# Agrega los archivos
git add .

# Haz commit
git commit -m "Initial commit: Página web COCOIN"

# Crea un repositorio en GitHub y luego:
git remote add origin https://github.com/TU_USUARIO/cocoin.git
git branch -M main
git push -u origin main
```

### Paso 3: Despliega en Vercel
1. Ve a [https://vercel.com](https://vercel.com)
2. Conéctate con GitHub
3. Importa el repositorio `cocoin`
4. Click en "Deploy"
5. ¡Listo! Tu página estará en: `https://cocoin.vercel.app`

---

## 🌐 Otras Opciones de Despliegue

### Netlify (También Muy Fácil)
1. Ve a [https://app.netlify.com](https://app.netlify.com)
2. Arrastra y suelta la carpeta `cocoin`
3. ¡Listo! Tu página estará en: `https://tudominio.netlify.app`

### GitHub Pages
1. Sube el proyecto a GitHub
2. Ve a Settings > Pages
3. Selecciona: Source = `main` / Branch
4. Carpeta = `/ (root)`
5. ¡Listo! Tu página estará en: `https://TU_USUARIO.github.io/cocoin`

---

## ✏️ Personalización Rápida

### Cambiar Enlaces de Redes Sociales
Edita `index.html` líneas ~225-245:

```html
<a href="https://t.me/cocoin" target="_blank">... <!-- Cambia URL aquí -->
```

### Cambiar Colores
Edita `styles.css` líneas 3-8:

```css
--color-primary: #FF6B35;    /* Cambia estos valores */
--color-secondary: #FFC107;
--color-accent: #FF3B30;
```

---

## 📧 Activar Formulario de Contacto

1. Lee el archivo `form-setup.md`
2. Elige EmailJS, Formspree, o backend propio
3. Sigue las instrucciones
4. ¡Tendrás un formulario funcional!

---

## ✅ Checklist Pre-Despliegue

- [ ] Revisa que todas las imágenes estén en `images/`
- [ ] Personaliza los enlaces de redes sociales
- [ ] Configura el formulario de contacto
- [ ] Prueba la página localmente
- [ ] Verifica que todo sea responsivo
- [ ] Revisa ortografía y contenido
- [ ] ¡Despliega!

---

## 🐛 Solución de Problemas

### La página no carga las imágenes
- Verifica que la carpeta `images/` esté en el mismo directorio que `index.html`
- Revisa las rutas en el HTML: `src="images/nombre-imagen.png"`

### El menú móvil no funciona
- Asegúrate de que `script.js` esté cargado antes de `</body>`
- Revisa la consola del navegador para errores

### Los estilos no se aplican
- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Revasa la ruta en el HTML: `<link rel="stylesheet" href="styles.css">`

---

## 📱 Prueba Local

Antes de desplegar, prueba localmente:

```bash
# Python
python -m http.server 8000

# O Node.js
npx http-server

# Luego abre:
http://localhost:8000
```

---

## 🎉 ¡Despliegue Completado!

Una vez desplegado, tu página web de COCOIN estará en línea y accesible para toda la comunidad del corral.

**Próximos pasos:**
- Comparte el enlace en Telegram
- Anúncialo en Twitter/X
- Actualiza el README del proyecto con el enlace
- ¡Celebra con el corral! 🐔

---

¿Necesitas ayuda? Únete al [Telegram de COCOIN](https://t.me/cocoin)

