import { useState } from 'react';
import { formatearPrecio } from '../data/products';

/**
 * Componente ProductCard
 * 
 * Representa una tarjeta visual individual para un producto en la cuadrícula de la tienda.
 * Muestra información relevante como imagen, insignia/oferta, categorías, título, descripción,
 * precio formateado y botón de acción interactivo.
 * 
 * Requisitos Semana 8 implementados:
 * - useState: Gestiona la retroalimentación visual interactiva al presionar el botón.
 * - Renderizado Condicional: Alterna estilo y texto del botón según el estado:
 *   1. "¡Agregado!" (estado momentáneo al hacer clic)
 *   2. "✓ En el carrito (X)" (con estilo btn-neon cuando ya está añadido)
 *   3. "Agregar al carrito" (con estilo btn-outline-neon cuando no está en el carrito)
 * 
 * @param {Object} props
 * @param {Object} props.producto - Objeto con los datos del producto (id, titulo, precio, imagen, etc.).
 * @param {number} props.cantidadEnCarrito - Número de unidades de este producto actualmente en el carrito.
 * @param {Function} props.alAgregarAlCarrito - Función de devolución de llamada para agregar el producto al carrito.
 */
export default function ProductCard({ producto, cantidadEnCarrito = 0, alAgregarAlCarrito }) {
  const {
    titulo,
    categoria,
    subcategoria,
    precio,
    imagen,
    descripcion,
    badge,
    badgeClass,
    destacado
  } = producto;

  // Estado local para interacción instantánea del botón (Requisito: useState en elemento interactivo)
  const [recienAgregado, setRecienAgregado] = useState(false);

  /**
   * Manejador de clic: ejecuta la lógica de agregar al carrito y activa
   * un cambio temporal de estado visual en el botón.
   */
  const manejarClick = () => {
    alAgregarAlCarrito(producto);
    setRecienAgregado(true);

    setTimeout(() => {
      setRecienAgregado(false);
    }, 800);
  };

  const estaEnCarrito = cantidadEnCarrito > 0;

  return (
    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-stretch">
      <article className={`card product-card w-100 position-relative h-100 ${destacado ? 'featured-product' : ''}`}>
        
        {/* Insignia visual flotante si el producto tiene badge definida */}
        {badge && (
          <span className={`badge position-absolute top-0 end-0 m-3 fs-6 ${badgeClass || 'bg-danger'}`}>
            {badge}
          </span>
        )}

        {/* Contenedor de imagen con carga diferida (lazy loading) */}
        <div className="card-img-wrapper">
          <img
            src={imagen}
            className="card-img-top p-3"
            alt={titulo}
            loading="lazy"
            onError={(e) => {
              // Imagen de respaldo en caso de fallo de red
              e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop';
            }}
          />
        </div>

        {/* Cuerpo de la tarjeta con detalles y botón de compra */}
        <div className="card-body d-flex flex-column text-center">
          {/* Categoría y subcategoría */}
          <span className="badge bg-dark text-info mb-2 align-self-center">
            {subcategoria ? `${categoria} / ${subcategoria}` : categoria}
          </span>

          {/* Título del producto */}
          <h3 className="card-title h5 text-neon">{titulo}</h3>

          {/* Descripción resumida */}
          <p className="card-text text-secondary flex-grow-1 small">{descripcion}</p>

          {/* Precio con formato en moneda local */}
          <p className="fw-bold text-light fs-5 mb-2">{formatearPrecio(precio)}</p>

          {/* 
            Botón interactivo con Renderizado Condicional:
            Alterna colores, iconos y texto según el estado ('recienAgregado', 'estaEnCarrito' o default)
          */}
          {recienAgregado ? (
            <button
              type="button"
              className="btn btn-warning text-dark fw-bold mt-auto d-flex align-items-center justify-content-center gap-1 shadow"
              disabled
              aria-label="Producto recién agregado"
            >
              <i className="bi bi-check-circle-fill me-1" aria-hidden="true"></i>
              ¡Agregado!
            </button>
          ) : estaEnCarrito ? (
            <button
              type="button"
              className="btn btn-neon mt-auto d-flex align-items-center justify-content-center gap-1 fw-bold"
              onClick={manejarClick}
              aria-label={`En el carrito: ${cantidadEnCarrito}. Clic para agregar otra unidad.`}
              title="Haz clic para agregar otra unidad"
            >
              <i className="bi bi-bag-check-fill me-1" aria-hidden="true"></i>
              En el carrito ({cantidadEnCarrito})
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-neon mt-auto d-flex align-items-center justify-content-center gap-1"
              onClick={manejarClick}
              aria-label={`Agregar ${titulo} al carrito`}
            >
              <i className="bi bi-cart-plus me-1" aria-hidden="true"></i>
              Agregar al carrito
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
