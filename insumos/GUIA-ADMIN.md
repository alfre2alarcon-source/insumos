# Guía del administrador · Tecno-Store

## 1. Ingresar
1. Abrí `https://alfre2alarcon-source.github.io/insumos/admin.html`.
2. Escribí tu correo y contraseña y tocá **Ingresar**.
3. Para salir, usá **Cerrar sesión** (arriba a la derecha). Hacelo siempre si usás una computadora compartida.

**¿Olvidaste la contraseña?** Escribí tu correo, tocá **Olvidé mi contraseña**, abrí el mail que te llega y elegí una nueva (mínimo 8 caracteres). Revisá también la carpeta de spam.

## 2. Categorías
Al pie del panel, en **Categorías**: escribí el nombre y tocá **Agregar categoría**. Podés **Renombrar** o **Eliminar**; una categoría con productos no se puede eliminar hasta mover esos productos a otra.

## 3. Productos
- **Crear:** **Nuevo producto**, completá el formulario y **Guardar**.
- **Editar:** **Editar** en la fila del producto.
- **Eliminar:** **Eliminar** y confirmar. Es definitivo.
- **Ocultar sin borrar:** editá el producto y desmarcá **Publicado en la tienda**.

Campos del formulario:
- **Precio:** en pesos argentinos, sin símbolo (ej. `14900`).
- **Stock:** unidades disponibles. En 0 la tienda muestra “Agotado” y no permite agregar al carrito.
- **Imágenes:** una URL `https://` por línea. La primera es la principal. Para cambiar, agregar o quitar fotos, editá la lista.
- **Especificaciones técnicas:** una por línea con el formato `Característica: valor` (ej. `Conexión: USB-C`).
- El **código** (TS-0001, TS-0002…) se asigna solo; el cliente y vos lo ven en cada pedido.

## 4. Cómo llegan los pedidos
- **Un producto:** en el detalle, el botón **Consultar por WhatsApp** abre un mensaje con nombre, código, precio y enlace directo al producto.
- **Varios productos:** el cliente usa el **Carrito** y **Enviar pedido por WhatsApp**: el mensaje trae cada producto con cantidad, código, precio, enlace y total.
- Con el enlace del mensaje podés abrir el producto exacto en la tienda.
- Los pedidos llegan al número configurado en `js/config.js` (`WHATSAPP`). La tienda **no descuenta stock sola**: al concretar una venta, editá el stock del producto.

## 5. Cambiar el número de WhatsApp
Editá `js/config.js` (formato `5493625123456`: país 54, 9, código de área sin 0, número sin 15), guardá y volvé a hacer `git push`.
