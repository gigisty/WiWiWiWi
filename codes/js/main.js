let arrastrando = false;
let ventanaActual = null; // Guardará la ventana que estamos moviendo
let ratonInicioX, ratonInicioY;
let ventanaInicioX, ventanaInicioY;

// Escuchamos los clics en todo el documento
document.addEventListener('mousedown', (e) => {
    // 1. Verificamos si el clic fue en una barra de título
    const barraTitulo = e.target.closest('.title-bar');
    if (!barraTitulo) return; // Si no es una barra de título, ignoramos

    // 2. Buscamos la ventana a la que pertenece esa barra
    const ventana = barraTitulo.closest('.window');
    
    // 3. LA MAGIA: ¿Tiene esta ventana la clase 'draggable'?
    if (!ventana || !ventana.classList.contains('draggable')) return; 

    // Si tiene la clase, empezamos el arrastre
    arrastrando = true;
    ventanaActual = ventana;
    
    ratonInicioX = e.clientX;
    ratonInicioY = e.clientY;
    
    const rect = ventanaActual.getBoundingClientRect();
    ventanaInicioX = rect.left;
    ventanaInicioY = rect.top;
});

document.addEventListener('mousemove', (e) => {
    if (!arrastrando || !ventanaActual) return;

    const diferenciaX = e.clientX - ratonInicioX;
    const diferenciaY = e.clientY - ratonInicioY;

    ventanaActual.style.left = `${ventanaInicioX + diferenciaX}px`;
    ventanaActual.style.top = `${ventanaInicioY + diferenciaY}px`;
});

document.addEventListener('mouseup', () => {
    arrastrando = false;
    ventanaActual = null; // Soltamos la ventana
});