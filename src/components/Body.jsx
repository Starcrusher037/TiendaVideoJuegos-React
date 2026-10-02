import ProductCard from './ProductCard';

/**
 * Componente Body
 * 
 * Contenedor principal de la sección de productos y catálogo.
 * Gestiona:
 * 1. El filtrado reactivo del catálogo (administrado en useState vía useEffect).
 * 2. El renderizado condicional del estado de carga (Spinner durante petición a la API).
 * 3. La renderización de tarjetas de producto con conocimiento de su estado en el carrito.
 * 4. Alertas informativas cuando no hay coincidencias de búsqueda.
 * 
 * @param {Object} props
 * @param {Array} props.productos - Lista de productos proveniente del estado global (useState en App).
 * @param {boolean} props.cargando - Bandera que indica si la API externa aún está cargando datos.
 * @param {string} props.origenDatos - Indica la procedencia de los datos ('api' o 'local').
 * @param {Array} props.carrito - Arreglo con los ítems agregados al carrito para calcular cantidades.
 * @param {string} props.terminoBusqueda - Texto ingresado por el usuario en la barra de búsqueda.
 * @param {string} props.categoriaSeleccionada - Categoría activa para el filtro ('all', 'Consolas', 'Videojuegos', etc.).
 * @param {Function} props.alRestablecerFiltros - Función para limpiar la búsqueda y restaurar el catálogo completo.
 * @param {Function} props.alAgregarAlCarrito - Callback ejecutado al presionar "Agregar al carrito" en cualquier tarjeta.
 */
export default function Body({
  productos = [],
  cargando = false,
  origenDatos = 'api',
  carrito = [],
  terminoBusqueda,
  categoriaSeleccionada,
  alRestablecerFiltros,
  alAgregarAlCarrito
}) {
  /**
   * Algoritmo de filtrado reactivo:
   * Evalúa cada producto contra la categoría seleccionada y el texto de búsqueda.
   * La búsqueda se realiza convirtiendo a minúsculas e inspeccionando:
   * - Título del producto
   * - Categoría
   * - Subcategoría (si existe)
   * - Descripción
   */
  const productosFiltrados = productos.filter((producto) => {
    // Verificación de coincidencia por categoría seleccionada
    const coincideCategoria =
      categoriaSeleccionada === 'all' ||
      producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase();

    // Si no hay texto de búsqueda activo, solo consideramos el filtro por categoría
    if (!terminoBusqueda) return coincideCategoria;

    // Normalización del término de búsqueda a minúsculas
    const textoLimpio = terminoBusqueda.toLowerCase();

    // Búsqueda multi-campo exhaustiva
    const coincideBusqueda =
      producto.titulo.toLowerCase().includes(textoLimpio) ||
      producto.categoria.toLowerCase().includes(textoLimpio) ||
      (producto.subcategoria && producto.subcategoria.toLowerCase().includes(textoLimpio)) ||
      (producto.descripcion && producto.descripcion.toLowerCase().includes(textoLimpio));

    return coincideCategoria && coincideBusqueda;
  });

  // Flag booleano para determinar si existe algún filtro activo aplicado
  const estaFiltrando = Boolean(terminoBusqueda) || categoriaSeleccionada !== 'all';

  return (
    <main className="flex-grow-1">
      <section id="productos" className="container my-5" aria-labelledby="titulo-productos">
        <div className="section-wrapper p-4 p-md-5 rounded-4">
          
          {/* Cabecera de la sección: Título dinámico, origen de datos y botón para reiniciar filtros */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h2 id="titulo-productos" className="text-uppercase fw-bold m-0 section-title">
                {categoriaSeleccionada === 'all' ? 'Productos destacados' : `Categoría: ${categoriaSeleccionada}`}
              </h2>
              {/* Indicador de procedencia de los datos (API pública o respaldo) */}
              {!cargando && (
                <div className="small mt-2 text-secondary">
                  <span className={`badge ${origenDatos === 'api' ? 'bg-dark border border-success text-neon' : 'bg-dark border border-warning text-warning'}`}>
                    <i className={`bi ${origenDatos === 'api' ? 'bi-broadcast' : 'bi-hdd-fill'} me-1`}></i>
                    {origenDatos === 'api' ? 'Datos en vivo desde RAWG Games API' : 'Catálogo local activo'}
                  </span>
                </div>
              )}
            </div>

            {estaFiltrando && (
              <button
                className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                type="button"
                onClick={alRestablecerFiltros}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i>
                Mostrar todos los productos
              </button>
            )}
          </div>

          {/* Alertas informativas sobre los resultados de búsqueda */}
          {terminoBusqueda && !cargando && (
            <div className="mb-4">
              {productosFiltrados.length > 0 ? (
                <div className="alert alert-dark border-success text-light d-flex justify-content-between align-items-center shadow-sm">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle text-neon me-2 fs-5"></i>
                    <span>
                      Mostrando {productosFiltrados.length} resultado(s) para "<strong>{terminoBusqueda}</strong>".
                    </span>
                  </div>
                </div>
              ) : (
                <div className="alert alert-dark border-warning text-light text-center shadow-sm py-4">
                  <i className="bi bi-search display-6 text-warning mb-2 d-block"></i>
                  <h5 className="fw-bold text-warning">No encontramos productos para "{terminoBusqueda}"</h5>
                  <p className="text-muted small mb-3">
                    Intenta buscar con palabras clave más generales (ej: "PlayStation", "Xbox", "Zelda", "Grand Theft Auto").
                  </p>
                  <button className="btn btn-outline-neon btn-sm" type="button" onClick={alRestablecerFiltros}>
                    Restablecer catálogo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 
            Requisito: Renderizado Condicional
            1. Mientras 'cargando === true': muestra un spinner gamer neón.
            2. Cuando termina la carga: despliega la cuadrícula con las tarjetas.
          */}
          {cargando ? (
            <div className="text-center py-5 my-5">
              <div
                className="spinner-border text-neon mb-3"
                style={{ width: '3.5rem', height: '3.5rem', borderWidth: '0.35rem' }}
                role="status"
              >
                <span className="visually-hidden">Cargando catálogo...</span>
              </div>
              <h4 className="text-neon fw-bold mb-2">Conectando con RAWG Video Games API...</h4>
              <p className="text-secondary small mb-0">Cargando catálogo dinámico y actualizando estados de la tienda.</p>
            </div>
          ) : (
            <div className="row g-4">
              {productosFiltrados.map((producto) => {
                // Buscamos si este producto ya está en el carrito para pasar la cantidad
                const itemEnCarrito = carrito.find((item) => String(item.id) === String(producto.id));
                const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

                return (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    cantidadEnCarrito={cantidadEnCarrito}
                    alAgregarAlCarrito={alAgregarAlCarrito}
                  />
                );
              })}
            </div>
          )}

          {/* Pie de catálogo con información de la API y soporte */}
          <div className="mt-5 text-center">
            <hr className="my-5 border-secondary opacity-50" />
            <h3 className="text-uppercase fw-bold text-neon mb-2">Catálogo Gaming en Tiempo Real</h3>
            <p className="text-secondary mb-3">
              Catálogo sincronizado mediante efectos secundarios (<code>useEffect</code>) con la API pública de RAWG y gestionado en <code>useState</code>.
            </p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <span className="badge bg-black border border-secondary text-light px-3 py-2">
                 {productos.length} Productos Disponibles
              </span>
              <span className="badge bg-black border border-success text-neon px-3 py-2">
                 Renderizado React 19 Activo
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
