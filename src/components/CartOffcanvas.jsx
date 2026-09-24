import { formatearPrecio } from '../data/products';

/**
 * Componente CartOffcanvas
 * 
 * Panel lateral deslizable (Offcanvas / Sidebar) que muestra el contenido actual del carrito de compras.
 * Permite al usuario:
 * 1. Visualizar los artículos añadidos con su imagen, título, precio unitario y subtotal.
 * 2. Incrementar o decrementar la cantidad por producto (eliminándose automáticamente si llega a 0).
 * 3. Eliminar un producto directamente mediante el botón de papelera.
 * 4. Ver el total acumulado de unidades e importe en pesos chilenos.
 * 5. Vaciar todo el carrito o proceder a la finalización de compra.
 * 
 * @param {Object} props
 * @param {boolean} props.abierto - Bandera que controla la visibilidad del modal lateral.
 * @param {Function} props.alCerrar - Función para cerrar el panel.
 * @param {Array} props.carrito - Lista de objetos de producto en el carrito con la propiedad 'cantidad'.
 * @param {Function} props.alModificarCantidad - Función (idProducto, delta) para sumar (+1) o restar (-1).
 * @param {Function} props.alEliminarProducto - Función (idProducto) para remover un producto del carrito.
 * @param {Function} props.alVaciarCarrito - Función para vaciar la totalidad del carrito.
 * @param {Function} props.alFinalizarCompra - Función para procesar el checkout y simular la compra.
 */
export default function CartOffcanvas({
  abierto,
  alCerrar,
  carrito,
  alModificarCantidad,
  alEliminarProducto,
  alVaciarCarrito,
  alFinalizarCompra
}) {
  // Si el panel no está abierto, no renderizamos nada en el DOM
  if (!abierto) return null;

  // Cálculo acumulativo de la cantidad total de unidades en el carrito
  const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

  // Cálculo acumulativo del precio total a pagar (precio unitario * cantidad)
  const precioTotal = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);

  return (
    <>
      {/* Telón de fondo oscuro (Backdrop) con evento para cerrar al hacer clic afuera */}
      <div className="custom-offcanvas-backdrop" onClick={alCerrar}></div>

      {/* Contenedor principal del panel lateral */}
      <aside className="custom-offcanvas" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
        
        {/* Cabecera del panel con título y botón de cierre */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          <h2 className="h5 text-neon d-flex align-items-center gap-2 m-0" id="cartTitle">
            <i className="bi bi-cart3 text-neon" aria-hidden="true"></i>
            Carrito de Compras
          </h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={alCerrar}
            aria-label="Cerrar carrito"
          ></button>
        </div>

        {/* Cuerpo del carrito con lista deslizable de productos */}
        <div className="flex-grow-1 p-3 overflow-y-auto lista-carrito-scroll">
          {carrito.length === 0 ? (
            /* Estado vacío */
            <div className="text-center py-5 text-secondary">
              <i className="bi bi-cart-x display-3 text-secondary opacity-50 mb-3 d-block"></i>
              <p className="h6 text-light mb-1">Tu carrito está vacío</p>
              <p className="small text-muted mb-0">¡Explora nuestro catálogo y agrega tus juegos y consolas favoritas!</p>
            </div>
          ) : (
            /* Lista con los ítems agregados */
            <div className="d-flex flex-column gap-3">
              {carrito.map((item) => (
                <div key={item.id} className="card bg-black border-secondary p-2 shadow-sm">
                  <div className="row g-2 align-items-center">
                    
                    {/* Miniatura del producto */}
                    <div className="col-3 text-center">
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="img-fluid rounded border border-secondary"
                        style={{ height: '55px', width: '55px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Información y controles del ítem */}
                    <div className="col-9">
                      <div className="d-flex justify-content-between align-items-start">
                        <h4 className="h6 text-light mb-1 text-truncate" title={item.titulo} style={{ maxWidth: '180px' }}>
                          {item.titulo}
                        </h4>
                        
                        {/* Botón para eliminar este producto individual */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger border-0 p-0 ms-1"
                          onClick={() => alEliminarProducto(item.id)}
                          aria-label={`Eliminar ${item.titulo}`}
                          title="Eliminar producto"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>

                      {/* Precio unitario */}
                      <p className="small text-neon mb-2">{formatearPrecio(item.precio)}</p>

                      {/* Botones de incremento/decremento y subtotal */}
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="btn-group btn-group-sm" role="group" aria-label={`Control de cantidad para ${item.titulo}`}>
                          <button
                            type="button"
                            className="btn btn-outline-secondary text-light px-2"
                            onClick={() => alModificarCantidad(item.id, -1)}
                            aria-label="Disminuir cantidad"
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <span className="btn btn-dark disabled text-light fw-bold px-3">
                            {item.cantidad}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-secondary text-light px-2"
                            onClick={() => alModificarCantidad(item.id, 1)}
                            aria-label="Aumentar cantidad"
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>

                        {/* Subtotal del ítem */}
                        <span className="small text-light fw-bold">
                          Subtotal: {formatearPrecio(item.precio * item.cantidad)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección inferior con resumen de totales y botones de compra */}
        <div className="border-top border-secondary p-3 mt-auto bg-dark">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-secondary">Cantidad de productos:</span>
            <strong className="text-light fs-6">
              {cantidadTotal} {cantidadTotal === 1 ? 'unidad' : 'unidades'}
            </strong>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-light fw-semibold fs-5">Total a pagar:</span>
            <span className="text-neon fw-bold fs-4">{formatearPrecio(precioTotal)}</span>
          </div>

          <div className="d-grid gap-2">
            {/* Botón para finalizar compra */}
            <button
              className="btn btn-neon py-2 fw-bold d-flex align-items-center justify-content-center"
              type="button"
              disabled={carrito.length === 0}
              onClick={alFinalizarCompra}
            >
              <i className="bi bi-credit-card-fill me-2" aria-hidden="true"></i>
              Finalizar Compra
            </button>

            {/* Botón para vaciar todo el carrito */}
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
              type="button"
              disabled={carrito.length === 0}
              onClick={alVaciarCarrito}
            >
              <i className="bi bi-trash3-fill me-1" aria-hidden="true"></i>
              Vaciar Carrito
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
