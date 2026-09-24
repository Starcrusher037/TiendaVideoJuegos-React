import { useState } from 'react';
import ProductCard from './ProductCard';
import { productosIniciales, productosDigitales } from '../data/products';

/**
 * Componente Body
 * 
 * Contenedor principal de la sección de productos y catálogo.
 * Gestiona:
 * 1. La integración del catálogo digital bajo demanda mediante un estado asíncrono simulado.
 * 2. El filtrado reactivo de productos por categoría y por término de búsqueda multi-campo.
 * 3. La renderización de tarjetas de producto o mensajes informativos cuando no hay coincidencias.
 * 
 * @param {Object} props
 * @param {string} props.terminoBusqueda - Texto ingresado por el usuario en la barra de búsqueda.
 * @param {string} props.categoriaSeleccionada - Categoría activa para el filtro ('all', 'Consolas', 'Videojuegos', etc.).
 * @param {Function} props.alRestablecerFiltros - Función para limpiar la búsqueda y restaurar el catálogo completo.
 * @param {Function} props.alAgregarAlCarrito - Callback ejecutado al presionar "Agregar al carrito" en cualquier tarjeta.
 */
export default function Body({
  terminoBusqueda,
  categoriaSeleccionada,
  alRestablecerFiltros,
  alAgregarAlCarrito
}) {
  // Estado que indica si los productos digitales ya fueron cargados e incorporados al catálogo
  const [catalogoDigitalCargado, setCatalogoDigitalCargado] = useState(false);

  // Estado que indica si la petición simulada de carga del catálogo digital está en progreso
  const [cargandoCatalogoDigital, setCargandoCatalogoDigital] = useState(false);

  /**
   * Colección completa de productos disponibles según el estado actual.
   * Si 'catalogoDigitalCargado' es verdadero, se fusionan los productos iniciales con los digitales
   * usando el operador spread (...), de lo contrario sólo se presentan los iniciales.
   */
  const todosLosProductos = catalogoDigitalCargado
    ? [...productosIniciales, ...productosDigitales]
    : productosIniciales;

  /**
   * Algoritmo de filtrado reactivo:
   * Evalúa cada producto contra la categoría seleccionada y el texto de búsqueda.
   * La búsqueda se realiza convirtiendo a minúsculas e inspeccionando:
   * - Título del producto
   * - Categoría
   * - Subcategoría (si existe)
   * - Descripción
   */
  const productosFiltrados = todosLosProductos.filter((producto) => {
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
      producto.descripcion.toLowerCase().includes(textoLimpio);

    return coincideCategoria && coincideBusqueda;
  });

  /**
   * Manejador para cargar el catálogo digital con una simulación de latencia de red (600ms).
   * Muestra un indicador de carga (spinner) mientras dura el proceso.
   */
  const manejarCargaDigital = () => {
    setCargandoCatalogoDigital(true);
    setTimeout(() => {
      setCatalogoDigitalCargado(true);
      setCargandoCatalogoDigital(false);
    }, 600);
  };

  // Flag booleano para determinar si existe algún filtro activo aplicado
  const estaFiltrando = Boolean(terminoBusqueda) || categoriaSeleccionada !== 'all';

  return (
    <main className="flex-grow-1">
      <section id="productos" className="container my-5" aria-labelledby="titulo-productos">
        <div className="section-wrapper p-4 p-md-5 rounded-4">
          
          {/* Cabecera de la sección: Título dinámico y botón para reiniciar filtros */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
            <h2 id="titulo-productos" className="text-uppercase fw-bold m-0 section-title">
              {categoriaSeleccionada === 'all' ? 'Productos destacados' : `Categoría: ${categoriaSeleccionada}`}
            </h2>

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
          {terminoBusqueda && (
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
                    Intenta buscar con palabras clave más generales (ej: "PlayStation", "Xbox", "Zelda").
                  </p>
                  <button className="btn btn-outline-neon btn-sm" type="button" onClick={alRestablecerFiltros}>
                    Restablecer catálogo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cuadrícula responsiva con las tarjetas de productos */}
          <div className="row g-4">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                alAgregarAlCarrito={alAgregarAlCarrito}
              />
            ))}
          </div>

          {/* Sección inferior para carga diferida de juegos digitales */}
          <div className="mt-5 text-center">
            <hr className="my-5 border-secondary opacity-50" />
            <h3 className="text-uppercase fw-bold text-neon mb-2">Catálogo Digital Online</h3>
            <p className="text-secondary mb-4">Amplio catálogo de juegos digitales listos para descargar.</p>

            {!catalogoDigitalCargado ? (
              <button
                className="btn btn-neon px-4 py-2 mb-2 d-inline-flex align-items-center gap-2"
                type="button"
                onClick={manejarCargaDigital}
                disabled={cargandoCatalogoDigital}
              >
                {cargandoCatalogoDigital ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Cargando catálogo...
                  </>
                ) : (
                  <>
                    <i className="bi bi-cloud-arrow-down-fill" aria-hidden="true"></i>
                    Cargar Catálogo Digital
                  </>
                )}
              </button>
            ) : (
              <div className="badge bg-dark border border-success text-neon p-2 px-3 fs-6">
                <i className="bi bi-check-circle-fill me-2"></i>
                Catálogo Digital Cargado e Integrado
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
