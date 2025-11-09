# 📢 Guía de Configuración de Google AdSense para COCOIN

Esta guía te ayudará a configurar correctamente Google AdSense en tu sitio web de COCOIN.

## 📋 Requisitos Previos

- ✅ Cuenta de Google AdSense aprobada
- ✅ Publisher ID: `ca-pub-4297167192050875`
- ✅ Sitio web desplegado en producción (Vercel)
- ✅ Archivo `ads.txt` configurado correctamente

## 🔧 Configuración Actual

### 1. Script de AdSense

El script de AdSense está configurado en `components/ads/AdSense.tsx` y se carga en `app/layout.tsx`.

**Estrategia de carga**: `afterInteractive` - Se carga después de que la página sea interactiva.

### 2. Archivo ads.txt

El archivo `ads.txt` está en `public/ads.txt` y contiene:

```
google.com, pub-4297167192050875, DIRECT, f08c47fec0942fa0
```

**Verificación**: Asegúrate de que el archivo sea accesible en:
- https://cocoin-web.vercel.app/ads.txt

### 3. Verificación de Google Search Console

La meta tag de verificación está en `app/layout.tsx`:

```typescript
verification: {
  google: 'y6SjQrydU_7K6vWL3xgZBQZRXavIXzKru_TqYZ2hCjs',
}
```

## 🚀 Pasos para Configurar AdSense

### Paso 1: Verificar el Sitio en Google AdSense

1. Ve a [Google AdSense](https://www.google.com/adsense)
2. Inicia sesión con tu cuenta
3. Ve a **Sitios** > **Añadir sitio**
4. Ingresa: `https://cocoin-web.vercel.app`
5. Verifica la propiedad (debería estar verificada con Search Console)

### Paso 2: Verificar ads.txt

1. Ve a **Configuración** > **Cuenta** > **Información de la cuenta**
2. Verifica que tu Publisher ID sea: `ca-pub-4297167192050875`
3. Verifica que el archivo `ads.txt` sea accesible:
   - https://cocoin-web.vercel.app/ads.txt
4. Debe mostrar: `google.com, pub-4297167192050875, DIRECT, f08c47fec0942fa0`

### Paso 3: Crear Unidades de Anuncios

1. Ve a **Anuncios** > **Por unidades de anuncios** > **Crear unidad de anuncios**
2. Selecciona el tipo de anuncio:
   - **Display ads** (recomendado para sitios web)
   - **In-feed ads** (para feeds de contenido)
   - **In-article ads** (para artículos)
3. Configura la unidad:
   - **Nombre**: Ej. "COCOIN - Banner Principal"
   - **Tamaño**: Auto (responsive) o tamaño específico
   - **Formato**: Display ads
4. Copia el **Ad Unit ID** (ej: `1234567890`)

### Paso 4: Agregar Anuncios en el Sitio

Puedes agregar anuncios en cualquier página usando el componente `AdUnit`:

```tsx
import AdUnit from '@/components/ads/AdUnit'

// En tu componente
<AdUnit 
  adSlot="1234567890" 
  adFormat="auto"
  style={{ display: 'block', textAlign: 'center' }}
/>
```

### Paso 5: Ubicaciones Recomendadas para Anuncios

1. **Header** (opcional, no intrusivo)
2. **Entre secciones** (después de cada sección principal)
3. **Sidebar** (si tienes una barra lateral)
4. **Footer** (antes del footer)
5. **Entre contenido** (en artículos o posts)

## 🎯 Ejemplo de Implementación

### En la página principal (app/page.tsx)

```tsx
import AdUnit from '@/components/ads/AdUnit'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      
      {/* Anuncio después del Hero */}
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <AdUnit 
          adSlot="1234567890" 
          adFormat="auto"
        />
      </div>
      
      <Historia />
      <Fase2 />
      
      {/* Anuncio entre secciones */}
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <AdUnit 
          adSlot="1234567890" 
          adFormat="horizontal"
        />
      </div>
      
      <Educacion />
      <Reconocimientos />
      <Contacto />
      <Footer />
    </main>
  )
}
```

## 🔍 Verificación y Solución de Problemas

### Problema: Los anuncios no se muestran

**Posibles causas y soluciones**:

1. **AdSense no está aprobado**
   - Verifica en Google AdSense que tu cuenta esté aprobada
   - Espera 24-48 horas después de la aprobación

2. **ads.txt no está accesible**
   - Verifica: https://cocoin-web.vercel.app/ads.txt
   - Asegúrate de que el archivo esté en `public/ads.txt`
   - Espera 24 horas para que Google lo indexe

3. **Script de AdSense no se carga**
   - Abre las DevTools (F12) > Console
   - Busca errores relacionados con AdSense
   - Verifica que el script se esté cargando correctamente

4. **Bloqueadores de anuncios**
   - Desactiva los bloqueadores de anuncios para probar
   - Los usuarios con bloqueadores no verán anuncios

5. **Tráfico insuficiente**
   - AdSense puede no mostrar anuncios si hay poco tráfico
   - Necesitas tráfico real para que AdSense muestre anuncios

### Problema: AdSense muestra "Ad serving is limited"

**Causa**: Google está limitando la entrega de anuncios debido a:
- Contenido insuficiente
- Tráfico bajo
- Violaciones de políticas

**Solución**:
1. Asegúrate de tener suficiente contenido
2. Genera tráfico orgánico
3. Revisa las políticas de AdSense
4. Espera a que Google revise tu sitio

### Problema: ads.txt no se detecta

**Solución**:
1. Verifica que el archivo esté en `public/ads.txt`
2. Verifica que sea accesible: https://cocoin-web.vercel.app/ads.txt
3. Espera 24-48 horas para que Google lo indexe
4. Usa la herramienta de verificación de ads.txt de Google

## 📊 Monitoreo y Análisis

### Verificar Rendimiento

1. Ve a **Google AdSense** > **Informes**
2. Revisa:
   - **Páginas vistas**
   - **Impresiones de anuncios**
   - **Clics**
   - **RPM (Revenue per mille)**
   - **CTR (Click-through rate)**

### Optimización

1. **Prueba diferentes ubicaciones** de anuncios
2. **Prueba diferentes tamaños** y formatos
3. **Analiza qué anuncios funcionan mejor**
4. **Ajusta la frecuencia** de anuncios

## ✅ Checklist de Configuración

- [ ] Cuenta de AdSense aprobada
- [ ] Publisher ID configurado: `ca-pub-4297167192050875`
- [ ] Script de AdSense agregado en `app/layout.tsx`
- [ ] Archivo `ads.txt` creado en `public/ads.txt`
- [ ] `ads.txt` accesible en: https://cocoin-web.vercel.app/ads.txt
- [ ] Google Search Console verificado
- [ ] Sitio verificado en Google AdSense
- [ ] Unidades de anuncios creadas
- [ ] Anuncios agregados en el sitio (opcional)
- [ ] Pruebas realizadas (esperar 24-48 horas)

## 📝 Notas Importantes

1. **Tiempo de aprobación**: Google AdSense puede tardar 24-48 horas en aprobar anuncios
2. **Tráfico necesario**: Necesitas tráfico real para que AdSense muestre anuncios
3. **Políticas de contenido**: Asegúrate de cumplir con las políticas de AdSense
4. **Bloqueadores de anuncios**: Muchos usuarios tienen bloqueadores, esto es normal
5. **Rendimiento**: Los anuncios pueden afectar el rendimiento del sitio, úsalos con moderación

## 🆘 Soporte

Si tienes problemas:

1. Revisa la [Documentación de Google AdSense](https://support.google.com/adsense)
2. Usa el [Centro de ayuda de AdSense](https://support.google.com/adsense/answer/1725006)
3. Verifica las [Políticas de AdSense](https://support.google.com/adsense/answer/48182)

## 🎯 Próximos Pasos

1. ✅ Verifica que el script de AdSense esté cargando
2. ✅ Verifica que `ads.txt` sea accesible
3. ✅ Espera 24-48 horas para que Google indexe
4. ✅ Crea unidades de anuncios en AdSense
5. ✅ Agrega anuncios en ubicaciones estratégicas
6. ✅ Monitorea el rendimiento

---

**¡Listo!** 🎉 Tu sitio está configurado para mostrar anuncios de Google AdSense.

