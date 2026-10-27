// Datos de ejemplo genéricos (modo demostración, sin Supabase)
window.DEMO = {
 "categorias": [
  {
   "id": 1,
   "nombre": "Periféricos"
  },
  {
   "id": 2,
   "nombre": "Almacenamiento"
  },
  {
   "id": 3,
   "nombre": "Cables y adaptadores"
  },
  {
   "id": 4,
   "nombre": "Impresión"
  }
 ],
 "productos": [
  {
   "id": 1,
   "codigo": 1,
   "nombre": "Teclado mecánico compacto",
   "categoria_id": 1,
   "marca": "NovaTech",
   "descripcion": "Teclado mecánico 60% con retroiluminación blanca, ideal para escritorios chicos.",
   "precio": 38500,
   "stock": 12,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore1a/640/480",
    "https://picsum.photos/seed/tecnostore1b/640/480"
   ],
   "especificaciones": {
    "Switches": "Rojos lineales",
    "Conexión": "USB-C",
    "Distribución": "Español latino"
   },
   "activo": true
  },
  {
   "id": 2,
   "codigo": 2,
   "nombre": "Mouse inalámbrico ergonómico",
   "categoria_id": 1,
   "marca": "Kiron",
   "descripcion": "Mouse con diseño vertical que reduce la tensión de la muñeca en jornadas largas.",
   "precio": 14900,
   "stock": 25,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore2a/640/480",
    "https://picsum.photos/seed/tecnostore2b/640/480"
   ],
   "especificaciones": {
    "Conexión": "2.4 GHz",
    "Sensor": "1600 DPI",
    "Batería": "1 pila AA"
   },
   "activo": true
  },
  {
   "id": 3,
   "codigo": 3,
   "nombre": "Auriculares USB con micrófono",
   "categoria_id": 1,
   "marca": "NovaTech",
   "descripcion": "Auriculares livianos con micrófono plegable para reuniones y clases virtuales.",
   "precio": 27900,
   "stock": 8,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore3a/640/480",
    "https://picsum.photos/seed/tecnostore3b/640/480"
   ],
   "especificaciones": {
    "Conexión": "USB-A",
    "Cable": "1,8 m",
    "Micrófono": "Cancelación de ruido"
   },
   "activo": true
  },
  {
   "id": 4,
   "codigo": 4,
   "nombre": "Disco sólido SSD 480 GB",
   "categoria_id": 2,
   "marca": "Kiron",
   "descripcion": "Unidad SSD SATA para renovar notebooks y PC de escritorio.",
   "precio": 42000,
   "stock": 15,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore4a/640/480",
    "https://picsum.photos/seed/tecnostore4b/640/480"
   ],
   "especificaciones": {
    "Capacidad": "480 GB",
    "Interfaz": "SATA III",
    "Lectura": "Hasta 500 MB/s"
   },
   "activo": true
  },
  {
   "id": 5,
   "codigo": 5,
   "nombre": "Pendrive 64 GB USB 3.0",
   "categoria_id": 2,
   "marca": "Datum",
   "descripcion": "Pendrive compacto con tapa deslizable y alta velocidad de transferencia.",
   "precio": 8900,
   "stock": 40,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore5a/640/480",
    "https://picsum.photos/seed/tecnostore5b/640/480"
   ],
   "especificaciones": {
    "Capacidad": "64 GB",
    "Interfaz": "USB 3.0"
   },
   "activo": true
  },
  {
   "id": 6,
   "codigo": 6,
   "nombre": "Cable HDMI 2.0 de 2 m",
   "categoria_id": 3,
   "marca": "Datum",
   "descripcion": "Cable HDMI 4K a 60 Hz con conectores dorados.",
   "precio": 5200,
   "stock": 0,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore6a/640/480",
    "https://picsum.photos/seed/tecnostore6b/640/480"
   ],
   "especificaciones": {
    "Largo": "2 m",
    "Versión": "HDMI 2.0",
    "Resolución": "4K 60 Hz"
   },
   "activo": true
  },
  {
   "id": 7,
   "codigo": 7,
   "nombre": "Hub USB-C 6 en 1",
   "categoria_id": 3,
   "marca": "Kiron",
   "descripcion": "Hub con HDMI, USB 3.0 y lector de tarjetas para notebooks delgadas.",
   "precio": 21500,
   "stock": 10,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore7a/640/480",
    "https://picsum.photos/seed/tecnostore7b/640/480"
   ],
   "especificaciones": {
    "Puertos": "HDMI, 2×USB 3.0, SD, microSD",
    "Conexión": "USB-C"
   },
   "activo": true
  },
  {
   "id": 8,
   "codigo": 8,
   "nombre": "Cartucho de tinta negra compatible",
   "categoria_id": 4,
   "marca": "Printa",
   "descripcion": "Cartucho compatible de alto rendimiento para impresoras de inyección.",
   "precio": 12800,
   "stock": 18,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore8a/640/480",
    "https://picsum.photos/seed/tecnostore8b/640/480"
   ],
   "especificaciones": {
    "Color": "Negro",
    "Rendimiento": "Aprox. 600 páginas"
   },
   "activo": true
  },
  {
   "id": 9,
   "codigo": 9,
   "nombre": "Resma de papel A4 75 g",
   "categoria_id": 4,
   "marca": "Printa",
   "descripcion": "Resma de 500 hojas, apta para impresoras láser y de inyección.",
   "precio": 9800,
   "stock": 30,
   "imagenes": [
    "https://picsum.photos/seed/tecnostore9a/640/480",
    "https://picsum.photos/seed/tecnostore9b/640/480"
   ],
   "especificaciones": {
    "Hojas": "500",
    "Gramaje": "75 g/m²",
    "Formato": "A4"
   },
   "activo": true
  }
 ]
};
