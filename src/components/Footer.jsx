import { useState } from 'react';

/**
 * Componente Footer
 * 
 * Pie de página interactivo de la tienda.
 * Incluye:
 * 1. Formulario de contacto con validación de campos obligatorios y retroalimentación de envío.
 * 2. Canales de comunicación directa (correo, teléfono).
 * 3. Enlaces a redes sociales oficiales.
 * 4. Aviso de derechos de autor.
 * 
 * @param {Object} props
 * @param {Function} props.alMostrarNotificacion - Función callback para emitir notificaciones flotantes (toast).
 */
export default function Footer({ alMostrarNotificacion }) {
  // Estado que almacena los valores de los campos del formulario de contacto
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Estado que controla si el mensaje de éxito del formulario debe mostrarse
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  /**
   * Manejador genérico para actualizar el estado del formulario cuando el usuario escribe en un campo.
   * Utiliza el atributo 'id' del elemento para actualizar la propiedad correspondiente.
   * 
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} evento - Evento de cambio.
   */
  const manejarCambioInput = (evento) => {
    const { id, value } = evento.target;
    setDatosFormulario((datosPrevios) => ({ ...datosPrevios, [id]: value }));
  };

  /**
   * Valida y procesa el envío del formulario de contacto.
   * Verifica que todos los campos obligatorios contengan información.
   * Emite una notificación tipo 'toast' y reinicia el formulario tras 5 segundos.
   * 
   * @param {React.FormEvent} evento - Evento de envío del formulario.
   */
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const { nombre, email, mensaje } = datosFormulario;

    // Validación básica de campos vacíos
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      if (alMostrarNotificacion) {
        alMostrarNotificacion('Por favor, completa todos los campos del formulario.', 'warning');
      }
      return;
    }

    setFormularioEnviado(true);
    if (alMostrarNotificacion) {
      alMostrarNotificacion(`¡Gracias ${nombre}! Hemos recibido tu mensaje.`);
    }

    // Limpieza automática del formulario después de 5 segundos
    setTimeout(() => {
      setDatosFormulario({ nombre: '', email: '', mensaje: '' });
      setFormularioEnviado(false);
    }, 5000);
  };

  return (
    <footer id="contacto" className="custom-footer py-5 mt-auto">
      <div className="container text-center">
        
        {/* Formulario de Contacto interactivo */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card p-4 shadow-lg text-start"
              style={{ backgroundColor: 'var(--bg-principal)', border: 'var(--border-thin)' }}
            >
              <h3 className="h4 text-neon mb-3 text-center">
                <i className="bi bi-envelope-paper-fill me-2"></i>Envíanos un Mensaje
              </h3>

              <form onSubmit={manejarEnvio} noValidate>
                {/* Campo Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label text-light fw-semibold">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="nombre"
                    placeholder="Ej: Carlos Silva"
                    value={datosFormulario.nombre}
                    onChange={manejarCambioInput}
                    required
                  />
                </div>

                {/* Campo Correo Electrónico */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-light fw-semibold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    id="email"
                    placeholder="nombre@correo.com"
                    value={datosFormulario.email}
                    onChange={manejarCambioInput}
                    required
                  />
                </div>

                {/* Campo Mensaje */}
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label text-light fw-semibold">Mensaje o Consulta</label>
                  <textarea
                    className="form-control bg-dark text-light border-secondary"
                    id="mensaje"
                    rows="3"
                    placeholder="Escribe tu consulta aquí..."
                    value={datosFormulario.mensaje}
                    onChange={manejarCambioInput}
                    required
                  ></textarea>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  className="btn btn-neon w-100 fw-bold py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-send-fill"></i>
                  Enviar Mensaje
                </button>

                {/* Mensaje de Confirmación tras Envío Exitoso */}
                {formularioEnviado && (
                  <div className="alert alert-success mt-3 shadow-sm d-flex align-items-center" role="status">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div>
                      ¡Gracias <strong>{datosFormulario.nombre}</strong>! Tu mensaje ha sido recibido con éxito.
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Canales de Contacto Directo y Redes Sociales */}
        <div className="row gy-3 justify-content-center">
          <div className="col-12 col-md-4">
            <p className="mb-1"><i className="bi bi-envelope-fill me-2 text-neon"></i>contacto@carlosduty.com</p>
          </div>
          <div className="col-12 col-md-4">
            <p className="mb-1"><i className="bi bi-telephone-fill me-2 text-neon"></i>+56 9 1234 5678</p>
          </div>
          <div className="col-12 col-md-4">
            <div className="social-links d-flex justify-content-center gap-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="bi bi-facebook me-1"></i>Facebook
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="bi bi-instagram me-1"></i>Instagram
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="bi bi-twitter-x me-1"></i>Twitter
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-50" />

        {/* Copyright */}
        <p className="copyright-text mb-0">&copy; 2026 Carlos's Duty - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
