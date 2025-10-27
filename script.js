// Seleccionamos todos los botones "Ver"
const botonesVer = document.querySelectorAll('.ver-detalle');


// Seleccionamos el modal y sus elementos internos
const modal = document.getElementById('modal-detalle');
const cerrarModal = document.getElementById('cerrar-modal');
const titulo = document.getElementById('titulo-modal');
const descripcion = document.getElementById('descripcion-modal');
const precio = document.getElementById('precio-modal');
const imagen = document.getElementById('imagen-modal');

// Recorremos cada botón y agregamos un evento de clic
botonesVer.forEach(boton => {
    boton.addEventListener('click', () => {
        // Llenamos el contenido del modal con los datos del producto
        titulo.textContent = boton.dataset.nombre;
        descripcion.textContent = boton.dataset.descripcion;
        precio.textContent = `Precio: ${boton.dataset.precio}`;
        imagen.src = boton.dataset.imagen;
        imagen.alt = boton.dataset.nombre;

        // Mostramos el modal
        modal.classList.add('activo');
        modal.setAttribute('aria-hidden', 'false');
        cerrarModal.focus(); // Por accesibilidad, lleva el foco al botón "Cerrar"
    });
});

// Cerrar modal al hacer clic en el botón "Cerrar"
cerrarModal.addEventListener('click', () => {
    modal.classList.remove('activo');
    modal.setAttribute('aria-hidden', 'true');
});

// Cerrar modal presionando la tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('activo')) {
        modal.classList.remove('activo');
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Cerrar modal haciendo clic fuera del contenido (en el fondo oscuro)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('activo');
        modal.setAttribute('aria-hidden', 'true');
    }
});

// ====== FILTRO DE BÚSQUEDA MEJORADO ======
const buscador = document.getElementById('buscador');
const formBusqueda = document.getElementById('form-busqueda');
const productos = document.querySelectorAll('.card');
const secciones = document.querySelectorAll('section'); // Para controlar los títulos SAMSUNG, IPHONE, XIAOMI

// Evita que el formulario recargue la página
formBusqueda.addEventListener('submit', (e) => e.preventDefault());

buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase().trim();
  let encontrados = 0;

  productos.forEach(producto => {
    const nombre = producto.querySelector('p').textContent.toLowerCase();
    const descripcion = producto.querySelector('.ver-detalle').dataset.descripcion.toLowerCase();

    if (nombre.includes(texto) || descripcion.includes(texto)) {
      producto.style.display = ''; // Mostrar producto
      encontrados++;
    } else {
      producto.style.display = 'none'; // Ocultar producto
    }
  });

  // Ocultar secciones vacías (sin productos visibles)
  secciones.forEach(seccion => {
    const cardsVisibles = seccion.querySelectorAll('.card:not([style*="display: none"])');
    if (cardsVisibles.length === 0) {
      seccion.style.display = 'none';
    } else {
      seccion.style.display = '';
    }
  });

  // Mostrar mensaje si no hay resultados
  let mensaje = document.getElementById('sin-resultados');
  if (!mensaje) {
    mensaje = document.createElement('p');
    mensaje.id = 'sin-resultados';
    mensaje.textContent = 'No se encontraron productos.';
    mensaje.style.textAlign = 'center';
    mensaje.style.marginTop = '30px';
    mensaje.style.fontSize = '1.2em';
    mensaje.style.fontWeight = 'bold';
    document.querySelector('.items').appendChild(mensaje);
  }
  mensaje.style.display = encontrados === 0 ? 'block' : 'none';
});