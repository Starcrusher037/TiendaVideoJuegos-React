import { useState } from 'react';

/**
 * Componente Header
 * 
 * Barra de navegación principal de la tienda virtual Carlos's Duty.
 * Contiene:
 * 1. Logotipo interactivo para restablecer la vista principal.
 * 2. Enlaces de navegación por categoría ('Consolas', 'Videojuegos', 'Accesorios', 'Contacto').
 * 3. Formulario de búsqueda en tiempo real.
 * 4. Botón con contador de productos en el carrito para dispositivos móviles y de escritorio.
 * 5. Banner principal ("Hero banner") de bienvenida.
 * 
 * @param {Object} props
 * @param {number} props.totalProductosCarrito - Cantidad total acumulada de productos en el carrito.
 * @param {Function} props.alAbrirCarrito - Callback para abrir el panel lateral del carrito.
 * @param {Function} props.alBuscar - Callback ejecutado al realizar una búsqueda de texto.
 * @param {string} props.categoriaSeleccionada - Categoría actualmente seleccionada.
 * @param {Function} props.alSeleccionarCategoria - Callback para cambiar la categoría filtrada.
 */
export default function Header({
  totalProductosCarrito,
  alAbrirCarrito,
  alBuscar,
  categoriaSeleccionada,
  alSeleccionarCategoria
}) {
  // Estado local para el valor ingresado en el campo de búsqueda
  const [textoBusqueda, setTextoBusqueda] = useState('');

  /**
   * Maneja el evento de envío del formulario de búsqueda (submit).
   * Previene la recarga de página nativa y propaga el término al componente padre.
   * 
   * @param {React.FormEvent} evento - Evento de formulario.
   */
  const manejarEnvioBusqueda = (evento) => {
    evento.preventDefault();
    alBuscar(textoBusqueda);
  };

  /**
   * Restablece la vista al estado inicial: sin filtros de texto y mostrando todas las categorías.
   */
  const reiniciarVista = () => {
    setTextoBusqueda('');
    alBuscar('');
    alSeleccionarCategoria('all');
  };

  return (
    <header id="inicio">
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top" aria-label="Navegación principal">
        <div className="container">
          
          {/* Logo y Marca Principal */}
          <a
            className="navbar-brand text-uppercase fw-bold brand-logo d-flex align-items-center"
            href="#inicio"
            onClick={reiniciarVista}
          >
            <i className="bi bi-controller me-2 text-neon" aria-hidden="true"></i>
            Carlos's Duty
          </a>

          {/* Botón Carrito para pantallas móviles (visible solo en < lg) */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button
              type="button"
              className="btn btn-outline-neon btn-sm position-relative d-flex align-items-center px-2 py-1"
              onClick={alAbrirCarrito}
              aria-label="Ver carrito de compras"
            >
              <i className="bi bi-cart-fill" aria-hidden="true"></i>
              {totalProductosCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalProductosCarrito}
                </span>
              )}
            </button>
          </div>

          {/* Menú de Navegación de Escritorio */}
          <div className="collapse navbar-collapse justify-content-between d-none d-lg-flex" id="navbarNavegacion">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-lg-2 ms-lg-3">
              <li className="nav-item">
                <a 
                  className={`nav-link ${categoriaSeleccionada === 'all' && !textoBusqueda ? 'active' : ''}`} 
                  href="#productos"
                  onClick={reiniciarVista}
                >
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${categoriaSeleccionada === 'Consolas' ? 'active' : ''}`} 
                  href="#productos"
                  onClick={() => { alBuscar(''); alSeleccionarCategoria('Consolas'); }}
                >
                  Consolas
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${categoriaSeleccionada === 'Videojuegos' ? 'active' : ''}`} 
                  href="#productos"
                  onClick={() => { alBuscar(''); alSeleccionarCategoria('Videojuegos'); }}
                >
                  Videojuegos
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${categoriaSeleccionada === 'Accesorios' ? 'active' : ''}`} 
                  href="#productos"
                  onClick={() => { alBuscar(''); alSeleccionarCategoria('Accesorios'); }}
                >
                  Accesorios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">Contacto</a>
              </li>
            </ul>

            {/* Formulario de Búsqueda y Botón de Carrito para Escritorio */}
            <div className="d-flex align-items-center gap-2">
              <form onSubmit={manejarEnvioBusqueda} className="d-flex gap-2" role="search" aria-label="Búsqueda de productos">
                <input
                  className="form-control form-control-sm bg-dark text-light border-secondary"
                  type="search"
                  placeholder="Buscar videojuegos, consolas..."
                  value={textoBusqueda}
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                  aria-label="Término de búsqueda de productos"
                />
                <button className="btn btn-outline-neon btn-sm d-flex align-items-center gap-1" type="submit" aria-label="Ejecutar búsqueda">
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <span>Buscar</span>
                </button>
              </form>

              {/* Botón Carrito para Escritorio con indicador numérico */}
              <button
                type="button"
                className="btn btn-outline-neon btn-sm position-relative d-flex align-items-center justify-content-center px-3 py-1 ms-2"
                onClick={alAbrirCarrito}
                aria-label="Ver carrito de compras"
              >
                <i className="bi bi-cart-fill me-1" aria-hidden="true"></i>
                <span>Carrito</span>
                {totalProductosCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalProductosCarrito}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner de Presentación (Hero) */}
      <div className="hero-banner text-center py-4 px-3">
        <div className="container">
          <h1 className="display-5 fw-bold text-neon mb-2">Carlos's Duty</h1>
          <p className="lead text-light mb-0">Tu tienda especializada en videojuegos, consolas y accesorios al mejor precio.</p>
        </div>
      </div>
    </header>
  );
}
