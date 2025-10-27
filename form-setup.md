# 📧 Configuración del Formulario de Contacto

## Opción 1: EmailJS (Recomendado)

EmailJS es un servicio gratuito que permite enviar emails desde JavaScript sin necesidad de un backend.

### Pasos para Configurar:

1. **Crea una cuenta en EmailJS**
   - Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
   - Regístrate (gratis)

2. **Configura tu servicio de email**
   - Ve a "Email Services" en el dashboard
   - Selecciona tu proveedor (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar tu email

3. **Crea una Template**
   - Ve a "Email Templates"
   - Crea una nueva template con estos campos:
     - `{{name}}` - Nombre del usuario
     - `{{email}}` - Email del usuario
     - `{{message}}` - Mensaje del usuario

4. **Obtén tus credenciales**
   - Ve a "Account" > "General"
   - Copia tu "Public Key"
   - Ve a "Email Services" y copia el "Service ID"
   - Ve a "Email Templates" y copia el "Template ID"

5. **Actualiza el HTML**
   Agrega esto antes de `</head>` en `index.html`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

6. **Actualiza el JavaScript**
   En `script.js`, reemplaza la sección del formulario con:
   ```javascript
   const contactForm = document.getElementById('contactForm');
   
   if (contactForm) {
       // Inicializa EmailJS
       emailjs.init("TU_PUBLIC_KEY");
       
       contactForm.addEventListener('submit', (e) => {
           e.preventDefault();
           
           emailjs.sendForm(
               'TU_SERVICE_ID',
               'TU_TEMPLATE_ID',
               contactForm
           ).then(() => {
               alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
               contactForm.reset();
           }, (error) => {
               console.error('Error:', error);
               alert('Hubo un error al enviar el mensaje. Intenta más tarde.');
           });
       });
   }
   ```

## Opción 2: Formspree (Más Simple)

1. **Regístrate en Formspree**
   - Ve a [https://formspree.io/](https://formspree.io/)
   - Crea una cuenta gratuita

2. **Crea un formulario**
   - Formspree generará una URL única para tu formulario
   - Copia la URL (ejemplo: `https://formspree.io/f/abcdefg`)

3. **Actualiza el HTML**
   En `index.html`, cambia el `<form>`:
   ```html
   <form id="contactForm" class="form" action="https://formspree.io/f/abcdefg" method="POST">
   ```

4. **Listo!** No necesitas cambiar el JavaScript

## Opción 3: Backend Propio

Si tienes un backend, actualiza `script.js`:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('TU_ENDPOINT_AQUI', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('¡Gracias por tu mensaje!');
            contactForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje.');
    }
});
```

## ✨ Recomendación

Para un proyecto como COCOIN, recomendamos **EmailJS** porque:
- ✅ Gratis (hasta 200 emails/mes)
- ✅ Fácil de configurar
- ✅ No requiere backend
- ✅ Seguro y confiable

