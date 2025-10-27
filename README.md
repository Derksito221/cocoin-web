# 🐔 COCOIN - Página Web Oficial

Página web profesional y funcional para COCOIN, un proyecto educativo y comunitario basado en blockchain.

## 🌟 Características

- ✨ Diseño moderno y responsivo
- 🎨 Colores cálidos (naranja, amarillo, rojo) del branding COCOIN
- 📱 Optimizado para todos los dispositivos
- ⚡ Carga rápida y optimizada
- 🎯 SEO básico incluido
- 🔐 Compatible con futuras integraciones de staking y NFTs
- 🎓 Tono educativo y ético

## 📋 Secciones

1. **Inicio** - Frase destacada y call-to-action
2. **Nuestra Historia** - Fase 1: sin preminteo, sin hype, con propósito
3. **Fase 2** - NFTs con propósito, nuevo token, staking pool, guías educativas
4. **Educación** - Memes educativos sobre wallets, seguridad, staking, NFTs
5. **Reconocimientos** - Homenaje a los primeros creyentes
6. **Contacto y Comunidad** - Enlaces a redes sociales

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

3. O conecta tu repositorio en [vercel.com](https://vercel.com)

### Opción 2: Netlify

1. Arrastra y suelta la carpeta del proyecto en [app.netlify.com](https://app.netlify.com)
2. O conecta tu repositorio en GitHub

### Opción 3: GitHub Pages

1. Crea un repositorio GitHub
2. Sube los archivos del proyecto
3. Ve a Settings > Pages
4. Selecciona la rama main y carpeta raíz
5. ¡Listo!

### Opción 4: Vercel desde GitHub

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Cada push al repositorio desplegará automáticamente
3. Configuración automática de HTTPS y dominio personalizado

## 📁 Estructura del Proyecto

```
cocoin/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Interactividad y funcionalidades
├── images/             # Imágenes del proyecto
│   ├── Logo cuadrado optimi.png
│   ├── Un pollo caricatures 1.png
│   ├── Un pollo caricatures 11.png
│   └── ...
└── README.md           # Este archivo
```

## 🎨 Personalización

### Colores

Los colores de COCOIN están definidos en `styles.css` como variables CSS:

```css
:root {
    --color-primary: #FF6B35;    /* Naranja principal */
    --color-secondary: #FFC107;  /* Amarillo */
    --color-accent: #FF3B30;     /* Rojo */
}
```

### Enlaces de Redes Sociales

Actualiza los enlaces en `index.html` en la sección de Contacto:

```html
<a href="https://t.me/cocoin" target="_blank">Telegram</a>
<a href="https://twitter.com/cocoin" target="_blank">Twitter</a>
<a href="https://reddit.com/r/cocoin" target="_blank">Reddit</a>
```

### Formulario de Contacto

El formulario actualmente usa JavaScript básico. Para hacerlo funcional:

1. **EmailJS** (Recomendado para proyectos simples):
   - Regístrate en [emailjs.com](https://www.emailjs.com)
   - Configura el servicio
   - Agrega el script en `index.html`
   - Actualiza `script.js` con tus credenciales

2. **Formspree**:
   - Regístrate en [formspree.io](https://formspree.io)
   - Agrega `action="https://formspree.io/f/YOUR_FORM_ID"` al formulario
   - Agrega `method="POST"`

3. **Backend propio**:
   - Configura un endpoint
   - Actualiza la función de submit en `script.js`

## 🛠️ Desarrollo Local

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. O usa un servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Visita `http://localhost:8000`

## 📱 Responsive Design

La página está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🔮 Futuras Integraciones

El diseño está preparado para:

1. **Visualización de NFTs**: Sección de galería
2. **Staking Pool**: Integración de botones y conectores de wallet
3. **Token Metrics**: Gráficos y estadísticas
4. **Blog**: Sección de noticias y actualizaciones
5. **Dashboard**: Panel de usuario

## 📊 SEO

Optimizaciones incluidas:

- Meta descriptions
- Meta keywords
- Títulos optimizados
- Etiquetas semánticas HTML5
- Imágenes con alt text
- Estructura clara de navegación

Para mejorar el SEO, considera:
- Agregar Google Analytics
- Configurar Google Search Console
- Añadir sitemap.xml
- Implementar Open Graph tags

## 🤝 Contribuir

Si quieres contribuir a COCOIN:

1. Únete al [Telegram](https://t.me/cocoin)
2. Proporciona feedback y sugerencias
3. Reporta bugs y problemas
4. Comparte con la comunidad

## 📄 Licencia

Este proyecto pertenece a COCOIN. Todos los derechos reservados.

## 🙏 Agradecimientos

Gracias a todos los miembros del corral, especialmente a los primeros creyentes como Spins.

---

**Hecho con ❤️ para la comunidad COCOIN**

🐔 COCOIN - El corral te espera 🐔

