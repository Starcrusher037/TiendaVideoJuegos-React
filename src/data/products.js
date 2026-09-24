/**
 * @file products.js
 * @description Catálogo de productos iniciales, productos digitales y funciones de utilidad
 * para formateo de moneda y datos en la tienda virtual Carlos's Duty.
 */

/**
 * Catálogo base de productos físicos disponibles en la tienda (consolas y accesorios).
 * Cada objeto representa un ítem con sus propiedades de visualización y comercialización.
 */
export const productosIniciales = [
  {
    id: 'prod-1',
    titulo: 'Consola PlayStation 5',
    categoria: 'Consolas',
    subcategoria: 'PlayStation',
    precio: 499990,
    imagen: 'https://images.unsplash.com/photo-1679813553141-5621567f95e8?q=80&w=435&auto=format&fit=crop',
    descripcion: 'Consola de última generación con soporte para resolución 4K y gatillos adaptativos.',
    badge: '¡OFERTA!',
    badgeClass: 'bg-danger'
  },
  {
    id: 'prod-2',
    titulo: 'Xbox Series X',
    categoria: 'Consolas',
    subcategoria: 'Xbox',
    precio: 479990,
    imagen: 'https://images.unsplash.com/photo-1683823362932-6f7599661d22?q=80&w=387&auto=format&fit=crop',
    descripcion: 'La consola más potente de Microsoft con 12 Teraflops de procesamiento gráfico.',
    badge: null,
    badgeClass: null
  },
  {
    id: 'prod-3',
    titulo: 'Nintendo Switch OLED',
    categoria: 'Consolas',
    subcategoria: 'Nintendo',
    precio: 329990,
    imagen: 'https://images.unsplash.com/photo-1612036781124-847f8939b154?q=80&w=870&auto=format&fit=crop',
    descripcion: 'Consola híbrida portátil y de sobremesa con pantalla OLED vibrante de 7 pulgadas.',
    badge: null,
    badgeClass: null
  },
  {
    id: 'prod-4',
    titulo: 'Prótesis Magic Hands ProPlay',
    categoria: 'Accesorios',
    subcategoria: 'ProPlay',
    precio: 89990,
    imagen: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=387&auto=format&fit=crop',
    descripcion: 'Prótesis avanzadas ergonómicas para un rendimiento y agarre excepcional en el juego.',
    badge: 'PRO',
    badgeClass: 'bg-warning text-dark',
    destacado: true
  }
];

/**
 * Catálogo adicional de videojuegos en formato digital descargable.
 * Se incorpora dinámicamente al catálogo principal cuando el usuario solicita cargar el catálogo digital.
 */
export const productosDigitales = [
  {
    id: 'dig-101',
    titulo: 'Elden Ring',
    categoria: 'Videojuegos',
    subcategoria: 'RPG / Acción',
    precio: 59990,
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop',
    descripcion: 'Un épico juego de rol y acción ambientado en las Tierras Intermedias, creado por FromSoftware.',
    badge: 'DIGITAL',
    badgeClass: 'bg-success'
  },
  {
    id: 'dig-102',
    titulo: 'God of War Ragnarök',
    categoria: 'Videojuegos',
    subcategoria: 'Aventura / Acción',
    precio: 64990,
    imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop',
    descripcion: 'Acompaña a Kratos y Atreus en un viaje mítico a través de los nueve reinos nórdicos.',
    badge: 'DIGITAL',
    badgeClass: 'bg-success'
  },
  {
    id: 'dig-103',
    titulo: 'Cyberpunk 2077',
    categoria: 'Videojuegos',
    subcategoria: 'Mundo Abierto / Sci-Fi',
    precio: 39990,
    imagen: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500&auto=format&fit=crop',
    descripcion: 'Una aventura de acción en Night City, una megalópolis obsesionada con el poder y las modificaciones corporales.',
    badge: 'DIGITAL',
    badgeClass: 'bg-success'
  },
  {
    id: 'dig-104',
    titulo: 'The Legend of Zelda: TotK',
    categoria: 'Videojuegos',
    subcategoria: 'Aventura / Exploración',
    precio: 54990,
    imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop',
    descripcion: 'Explora los vastos cielos y la tierra de Hyrule en una aventura inolvidable para Nintendo Switch.',
    badge: 'DIGITAL',
    badgeClass: 'bg-success'
  }
];

/**
 * Convierte un valor numérico a un formato de moneda en pesos chilenos (CLP).
 * Ejemplo: 499990 -> "$499.990"
 * 
 * @param {number|string} valor - Monto numérico a formatear.
 * @returns {string} Cadena formateada con signo de peso y separador de miles.
 */
export const formatearPrecio = (valor) => {
  return '$' + Number(valor).toLocaleString('es-CL');
};
