import { formatearPrecio } from '../data/products';

/**
 * Componente ProductCard
 * 
 * Representa una tarjeta visual individual para un producto en la cuadrícula de la tienda.
 * Muestra información relevante como imagen, insignia/oferta, categorías, título, descripción,
 * precio formateado y botón de acción para agregarlo al carrito.
 * 
 * @param {Object} props
 * @param {Object} props.producto - Objeto con los datos del producto (id, titulo, precio, imagen, etc.).
 * @param {Function} props.alAgregarAlCarrito - Función de devolución de llamada para agregar el producto al carrito.
 */
export default function ProductCard({ producto, alAgregarAlCarrito }) {
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

  return (
    <div className="col-12 col-sm-6 col-lg-3 d-flex align-items-stretch">
      <article className={`card product-card w-100 position-relative h-100 ${destacado ? 'featured-product' : ''}`}>
        
        {/* Insignia visual flotante si el producto tiene badge definida (ej: OFERTA, PRO, DIGITAL) */}
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

          {/* Botón interactivo para añadir al carrito */}
          <button
            type="button"
            className="btn btn-outline-neon mt-auto d-flex align-items-center justify-content-center gap-1"
            onClick={() => alAgregarAlCarrito(producto)}
            aria-label={`Agregar ${titulo} al carrito`}
          >
            <i className="bi bi-cart-plus me-1" aria-hidden="true"></i>
            Agregar al carrito
          </button>
        </div>
      </article>
    </div>
  );
}
