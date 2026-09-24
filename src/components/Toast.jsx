
/**
 * Componente Toast
 * 
 * Mensaje flotante de notificación temporal que aparece en la esquina inferior derecha.
 * Permite retroalimentar al usuario de acciones como agregar productos, eliminar ítems, vaciar carrito o enviar mensajes.
 * 
 * @param {Object} props
 * @param {Object|null} props.notificacion - Objeto con datos de la notificación ({ mensaje, tipo }) o null si no hay ninguna activa.
 * @param {Function} props.alCerrar - Función callback para cerrar/descartar la notificación manualmente.
 */
export default function Toast({ notificacion, alCerrar }) {
  // Si no hay notificación activa, no renderizamos ningún elemento
  if (!notificacion) return null;

  const { mensaje, tipo = 'success' } = notificacion;

  /**
   * Determina las clases CSS y el icono de Bootstrap correspondiente según la severidad del mensaje.
   * 
   * @returns {{ bg: string, icono: string }}
   */
  const obtenerEstilos = () => {
    switch (tipo) {
      case 'info':
        return { bg: 'bg-info text-dark', icono: 'bi-info-circle-fill' };
      case 'warning':
        return { bg: 'bg-warning text-dark', icono: 'bi-exclamation-triangle-fill' };
      case 'success':
      default:
        return { bg: 'bg-success text-dark', icono: 'bi-cart-check-fill' };
    }
  };

  const { bg, icono } = obtenerEstilos();

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1090 }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={`alert ${bg} alert-dismissible fade show shadow-lg fw-semibold d-flex align-items-center mb-0`}
        role="alert"
        style={tipo === 'success' ? { backgroundColor: 'var(--verde-neon, #00ff66)', color: '#000' } : {}}
      >
        <i className={`bi ${icono} me-2 fs-5`}></i>
        <span className="flex-grow-1 me-2">{mensaje}</span>
        <button
          type="button"
          className="btn-close"
          onClick={alCerrar}
          aria-label="Cerrar notificación"
        ></button>
      </div>
    </div>
  );
}
