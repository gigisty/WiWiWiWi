// ==========================================
// 1. CLASE PARA GESTIONAR EL ARRASTRE (Drag)
// ==========================================
class WindowDragger {
    constructor() {
        this.arrastrando = false;
        this.ventanaActual = null;
        this.ratonInicioX = 0;
        this.ratonInicioY = 0;
        this.ventanaInicioX = 0;
        this.ventanaInicioY = 0;

        // Inicializamos los eventos globales
        this.initEvents();
    }

    initEvents() {
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseup', () => this.onMouseUp());
    }

    onMouseDown(e) {
        const barraTitulo = e.target.closest('.title-bar');
        if (!barraTitulo) return;

        const ventana = barraTitulo.closest('.window');
        if (!ventana || !ventana.classList.contains('draggable')) return;

        this.arrastrando = true;
        this.ventanaActual = ventana;
        this.ratonInicioX = e.clientX;
        this.ratonInicioY = e.clientY;

        const rect = this.ventanaActual.getBoundingClientRect();
        this.ventanaInicioX = rect.left;
        this.ventanaInicioY = rect.top;
    }

    onMouseMove(e) {
        if (!this.arrastrando || !this.ventanaActual) return;

        const diferenciaX = e.clientX - this.ratonInicioX;
        const diferenciaY = e.clientY - this.ratonInicioY;

        this.ventanaActual.style.left = `${this.ventanaInicioX + diferenciaX}px`;
        this.ventanaActual.style.top = `${this.ventanaInicioY + diferenciaY}px`;
    }

    onMouseUp() {
        this.arrastrando = false;
        this.ventanaActual = null;
    }
}

// ==========================================
// 2. CLASE/SERVICIO PARA VENTANAS (UI Manager)
// ==========================================
class WindowManager {
    static cerrarSuave(ventana) {
        ventana.classList.remove('aero-fade-in');
        ventana.classList.add('aero-fade-out');

        ventana.addEventListener('animationend', () => {
            ventana.remove();
        }, { once: true });
    }

    static crearVentanaInfo() {
        const contenedor = document.querySelector('.windows-container') || document.body;
        const nuevaVentana = document.createElement('div');
        nuevaVentana.className = 'window glass active draggable resizable aero-fade-in';

        nuevaVentana.innerHTML = `
            <div class="title-bar">
                <div class="title-bar-text">Coms Info!</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize" disabled=""></button>
                    <button aria-label="Close" class="btn-close"></button>
                </div>
            </div>
            <div class="window-body has-space"">
                <p>Wiwiwiwiw</p>
            </div>
        `;

        // Evento de cierre
        const btnCerrar = nuevaVentana.querySelector('.btn-close');
        btnCerrar.addEventListener('click', () => this.cerrarSuave(nuevaVentana));

        // Añadimos la ventana
        contenedor.appendChild(nuevaVentana);

        // Centramos dinámicamente según el tamaño del navegador
        const rect = nuevaVentana.getBoundingClientRect();
        nuevaVentana.style.position = 'absolute';
        nuevaVentana.style.left = `${Math.max(0, (window.innerWidth - rect.width) / 2)}px`;
        nuevaVentana.style.top = `${Math.max(0, (window.innerHeight - rect.height) / 2)}px`;
    }

    static switchTooltip(tooltip) {
        if (!tooltip) return;

        // 1. Verificamos si el tooltip está visible o en proceso de animación de entrada
    const estaVisible = tooltip.classList.contains('active') || tooltip.classList.contains('aero-fade-in');

    if (estaVisible) {
        // --- FADE OUT (Desaparecer) ---
        tooltip.classList.remove('aero-fade-in');
        tooltip.classList.add('aero-fade-out');

        // Esperamos a que la animación de salida termine para quitar el estado activo
        tooltip.addEventListener('animationend', () => {
            tooltip.classList.remove('active', 'aero-fade-out');
        }, { once: true });

    } else {
        // --- FADE IN (Aparecer) ---
        tooltip.classList.remove('aero-fade-out');
        tooltip.classList.add('active', 'aero-fade-in');
    }
    }
}

// ==========================================
// 2. CLASE/Toggle HelpTip
// ==========================================

// ==========================================
// 3. PUNTO DE ENTRADA (Main / Init)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializamos el sistema de arrastre
    new WindowDragger();

    // Evento del Tooltip
    const tooltip1 = document.getElementById('tp1');
    if (tooltip1) {
        tooltip1.addEventListener('click', () => WindowManager.crearVentanaInfo());
    }
    const btn1 = document.getElementById('btn1');
    if (btn1) {
        btn1.addEventListener('click', () => WindowManager.switchTooltip(tooltip1));
    }

    const tooltip2 = document.getElementById('tp2');
    const capooImg = document.getElementById('capoo');
    if (capooImg) {
        capooImg.addEventListener('click', () => WindowManager.switchTooltip(tooltip2));
    }
    

    document.addEventListener('click', (e) => {
    const btnCerrar = e.target.closest('.btn-close');
    if (!btnCerrar) return;

    const ventana = btnCerrar.closest('.window');
    if (ventana) {
        // 1. Leemos el tiempo guardado en data-fade-time (o usamos 0.5s si no existe)
        const tiempoPersonalizado = btnCerrar.dataset.fadeTime || '0.5s';

        // 2. Inyectamos ese valor a la variable CSS de la ventana
        ventana.style.setProperty('--fade-time', tiempoPersonalizado);

        // 3. Ejecutamos el cierre
        WindowManager.cerrarSuave(ventana);
    }
});
});