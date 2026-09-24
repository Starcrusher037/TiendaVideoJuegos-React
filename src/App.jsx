import { useState, useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import CartOffcanvas from './components/CartOffcanvas';
import Toast from './components/Toast';
import { formatearPrecio } from './data/products';

/**
 * Componente Principal App
 * 
 * Orquestador central de la aplicación de comercio electrónico "Carlos's Duty".
 * Administra el estado global de la aplicación:
 * - Persistencia del carrito de compras en LocalStorage del navegador.
 * - Visibilidad del panel lateral del carrito (Offcanvas).
 * - Filtros globales: término de búsqueda y categoría seleccionada.
 * - Sistema de notificaciones temporales (Toast).
 * - Lógica de negocio para agregar, modificar, eliminar, vaciar y comprar productos.
 */
export default function App() {
  /**
   * 1. Estado del Carrito con Inicialización Perezosa (Lazy Initialization)
   * Lee directamente desde el LocalStorage al montar el componente.
   * Si ocurre un error de deserialización (JSON inválido) o no existe data, retorna un arreglo vacío [].
   */
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carlos_duty_carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.warn('No se pudo recuperar el carrito desde localStorage:', error);
      return [];
    }
  });

  // 2. Estados de interfaz de usuario y filtros de catálogo
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');
  const [notificacion, setNotificacion] = useState(null);

  /**
   * Efecto de Sincronización con LocalStorage:
   * Cada vez que el estado 'carrito' muta (se agrega, altera o elimina un ítem),
   * se serializa a JSON y se guarda automáticamente bajo la clave 'carlos_duty_carrito'.
   */
  useEffect(() => {
    try {
      localStorage.setItem('carlos_duty_carrito', JSON.stringify(carrito));
    } catch (error) {
      console.warn('Error al persistir el carrito en localStorage:', error);
    }
  }, [carrito]);

  /**
   * Despliega una notificación flotante (Toast) en pantalla durante 3.5 segundos.
   * 
   * @param {string} mensaje - Texto descriptivo para el usuario.
   * @param {'success'|'warning'|'info'} tipo - Nivel de severidad para definir colores e icono.
   */
  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => {
      setNotificacion(null);
    }, 3500);
  };

  /**
   * Agrega un producto al carrito:
   * - Si el producto ya se encuentra en el carrito, incrementa su propiedad 'cantidad' en 1 de forma inmutable.
   * - Si es un producto nuevo, crea un nuevo registro con 'cantidad: 1'.
   * 
   * @param {Object} producto - Objeto con datos del producto (id, titulo, precio, imagen).
   */
  const manejarAgregarAlCarrito = (producto) => {
    setCarrito((carritoPrevio) => {
      const existente = carritoPrevio.find((item) => String(item.id) === String(producto.id));

      if (existente) {
        return carritoPrevio.map((item) =>
          String(item.id) === String(producto.id)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...carritoPrevio,
        {
          id: producto.id,
          titulo: producto.titulo,
          precio: Number(producto.precio),
          imagen: producto.imagen,
          cantidad: 1
        }
      ];
    });

    mostrarNotificacion(`¡"${producto.titulo}" agregado al carrito! 🎮`);
  };

  /**
   * Modifica la cantidad de un ítem existente (+1 o -1):
   * Si la nueva cantidad resultante es inferior a 1, el producto se descarta automáticamente del carrito.
   * 
   * @param {string|number} idProducto - Identificador único del producto.
   * @param {number} delta - Variación de cantidad (+1 para aumentar, -1 para disminuir).
   */
  const manejarModificarCantidad = (idProducto, delta) => {
    setCarrito((carritoPrevio) => {
      const existente = carritoPrevio.find((item) => String(item.id) === String(idProducto));
      if (!existente) return carritoPrevio;

      const nuevaCantidad = existente.cantidad + delta;

      // Si la cantidad llega a 0 o menos, removemos el ítem del arreglo
      if (nuevaCantidad < 1) {
        mostrarNotificacion(`"${existente.titulo}" fue eliminado del carrito.`, 'info');
        return carritoPrevio.filter((item) => String(item.id) !== String(idProducto));
      }

      return carritoPrevio.map((item) =>
        String(item.id) === String(idProducto)
          ? { ...item, cantidad: nuevaCantidad }
          : item
      );
    });
  };

  /**
   * Elimina un producto específico del carrito sin importar su cantidad actual.
   * 
   * @param {string|number} idProducto - Identificador único del producto a remover.
   */
  const manejarEliminarProducto = (idProducto) => {
    const item = carrito.find((i) => String(i.id) === String(idProducto));
    if (item) {
      setCarrito((carritoPrevio) => carritoPrevio.filter((i) => String(i.id) !== String(idProducto)));
      mostrarNotificacion(`"${item.titulo}" fue eliminado del carrito.`, 'info');
    }
  };

  /**
   * Vacía la totalidad de los artículos del carrito previa confirmación del usuario.
   */
  const manejarVaciarCarrito = () => {
    if (carrito.length === 0) return;
    if (window.confirm('¿Estás seguro de que deseas vaciar tu carrito de compras?')) {
      setCarrito([]);
      mostrarNotificacion('El carrito ha sido vaciado.', 'info');
    }
  };

  /**
   * Simula el flujo de finalización de compra (Checkout):
   * Calcula el balance total e ítems adquiridos, muestra una alerta de confirmación
   * y restablece el carrito a su estado inicial cerrando el panel.
   */
  const manejarFinalizarCompra = () => {
    if (carrito.length === 0) return;

    const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    const precioTotal = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);

    alert(
      `¡Gracias por tu compra en Carlos's Duty!\n\n` +
      `Has adquirido ${cantidadTotal} producto(s) por un total de ${formatearPrecio(precioTotal)}.\n` +
      `Se ha enviado el comprobante a tu correo.`
    );

    setCarrito([]);
    setCarritoAbierto(false);
  };

  // Cálculo del total acumulado de unidades en el carrito para mostrar en la insignia de la cabecera
  const totalProductosCarrito = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

  /**
   * Restaura los filtros aplicados en el catálogo (limpia el buscador y selecciona todas las categorías).
   */
  const manejarRestablecerFiltros = () => {
    setTerminoBusqueda('');
    setCategoriaSeleccionada('all');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-principal">
      {/* 1. Encabezado principal (Navbar, barra de búsqueda y contador del carrito) */}
      <Header
        totalProductosCarrito={totalProductosCarrito}
        alAbrirCarrito={() => setCarritoAbierto(true)}
        alBuscar={(termino) => setTerminoBusqueda(termino)}
        categoriaSeleccionada={categoriaSeleccionada}
        alSeleccionarCategoria={(categoria) => setCategoriaSeleccionada(categoria)}
      />

      {/* 2. Cuerpo y catálogo (Listado de productos, filtros y catálogo digital dinámico) */}
      <Body
        terminoBusqueda={terminoBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        alRestablecerFiltros={manejarRestablecerFiltros}
        alAgregarAlCarrito={manejarAgregarAlCarrito}
      />

      {/* 3. Pie de página (Formulario de contacto interactivo, enlaces y redes sociales) */}
      <Footer alMostrarNotificacion={mostrarNotificacion} />

      {/* 4. Panel lateral deslizable del carrito de compras */}
      <CartOffcanvas
        abierto={carritoAbierto}
        alCerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        alModificarCantidad={manejarModificarCantidad}
        alEliminarProducto={manejarEliminarProducto}
        alVaciarCarrito={manejarVaciarCarrito}
        alFinalizarCompra={manejarFinalizarCompra}
      />

      {/* 5. Notificaciones emergentes (Toast) */}
      <Toast notificacion={notificacion} alCerrar={() => setNotificacion(null)} />
    </div>
  );
}
