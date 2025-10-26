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
