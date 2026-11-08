# 🌱 SalvaPlato - Aplicación Móvil & Prototipo Comercial

Aplicación web interactiva y responsiva (PWA ready) diseñada para presentar y vender la idea de negocio de **rescate de comida y descuentos presenciales** a dueños y administradores de restaurantes.

---

## 🚀 ¿Cómo abrir la aplicación en tu computadora?

**No necesitas instalar Node.js ni configurar ningún servidor complejo.**

1. Ve a la carpeta del proyecto:
   `C:\Users\Xyctr\.gemini\antigravity\scratch\salvaplato-app\`
2. Haz **doble clic en el archivo `index.html`**. Se abrirá de inmediato en tu navegador habitual (Google Chrome, Microsoft Edge, Brave, etc.).
3. *(Opcional)* Si usas **Visual Studio Code**, puedes abrir la carpeta y hacer clic derecho en `index.html` -> **"Open with Live Server"**.

---

## 📱 ¿Cómo abrirla en tu teléfono celular para el Pitch en vivo?

Tienes dos formas súper rápidas de tenerla en tu celular:

### Opción 1: Despliegue en 60 segundos (Recomendada y 100% Gratis)
1. Entra desde tu computadora a [Netlify Drop](https://app.netlify.com/drop) o crea un proyecto en Vercel.
2. Arrastra y suelta la carpeta `salvaplato-app`.
3. En 10 segundos te dará un enlace web seguro (ejemplo: `https://salvaplato-demo.netlify.app`).
4. Abre ese enlace en el navegador de tu celular (Safari o Chrome), pulsa **"Compartir" -> "Agregar a pantalla de inicio"** y ¡la tendrás como si fuera una app nativa de la App Store / Play Store!

---

## 🎨 ¿Cómo integrar tu Logo existente?

En el encabezado de `index.html` o en la carpeta `assets/`, puedes colocar tu imagen de logo (por ejemplo `logo.png`):
1. Copia tu archivo de imagen y pégalo dentro de:
   `C:\Users\Xyctr\.gemini\antigravity\scratch\salvaplato-app\assets\logo.png`
2. En `index.html`, en el bloque de encabezado, puedes descomentar o colocar la etiqueta `<img src="assets/logo.png" class="h-8">`.

---

## 🌟 Funcionalidades Principales Incluidas en la Demo

1. **Modo Comensal (Cliente)**:
   * Feed de restaurantes con fotos reales, distancia, valoraciones y horarios de recogida.
   * Filtro por categorías (🥐 Panaderías, 🍝 Italiana, 🥗 Saludable, 🍔 Hamburguesas).
   * Contador de porciones restantes en tiempo real ("¡Solo quedan 3!").
   * Botón **"Salvar Plato"** que abre el modal de confirmación con el desglose de precios.
   * Generación de **Bono de Descuento con Código QR dinámico de alta resolución** y **PIN de 4 dígitos**.
   * Pestaña **"Mis Bonos"** para gestionar todos los cupones activos.

2. **Modo Restaurante (Mesero / Caja)**:
   * Selector para simular ser diferentes restaurantes de la ciudad.
   * Métricas de impacto: Dinero recuperado, platos salvados y kg de CO₂ prevenidos.
   * **Validador de Códigos para el Mesero**: Campo grande donde el cajero o mesero escribe el PIN de 4 dígitos o presiona validar. Cuenta con **efectos de sonido (Web Audio API)** tipo campana de éxito, modal de confirmación y resta automática del stock del plato.
   * **Publicador de Ofertas Flash en 10 Segundos**: Formulario ultra-rápido para que el restaurante publique sus excedentes al final de la jornada.

3. **Calculadora Comercial ROI (Para cerrar la venta con el restaurante)**:
   * Pantalla con controles deslizantes interactivos para mostrarle en números al dueño del restaurante cuánto dinero pierde hoy botando comida a la basura y cuántos millones puede recuperar al año con SalvaPlato.

4. **Guía Comercial Completa (`PITCH_RESTAURANTES.md`)**:
   * Incluye el libreto para hablar con los gerentes, el desglose de porcentajes (15%-20% de comisión sugerida), lista de primeros clientes ideales y cómo derribar cualquier objeción.
