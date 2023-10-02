document.addEventListener('DOMContentLoaded', function () {
    const Lista = document.getElementById('Lista');
    const Contenedor = document.getElementById('Contenedor');
    const Volver = document.querySelector('.volver');
    let Juegos;

    
    function mostrarDetalle(producto) {
        localStorage.setItem('JuegoAComprar', JSON.stringify(producto));
        window.location.href = 'producto.html';
    }

    
    const CargarListaDeProductos = async () => {
        try {
            const response = await fetch('elementos.json');
            Juegos = await response.json();
            
            Lista.innerHTML = '';
            
            Juegos.forEach(Juego => {
                const Juego_Div = document.createElement('div');
                Juego_Div.classList.add('Juego');
                Juego_Div.innerHTML = `
                    <h2>${Juego.nombre}</h2>
                    <img src="${Juego.imagen}" alt="${Juego.id}" style="max-width: 120px; height: auto;">
                    <button class="ver-detalle" data-Juego='${JSON.stringify(Juego)}'>Ver Detalles</button>
                `;

                const botonVerDetalle = Juego_Div.querySelector('.ver-detalle');
                botonVerDetalle.addEventListener('click', () => {
                    mostrarDetalle(Juego);
                });

                Lista.appendChild(Juego_Div);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }

    function convertirAEstrellas(puntuación) {
        const estrellasLlenas = puntuación.length;
        const estrellasVacias = 5 - estrellasLlenas;

        const estrellasHTML = '<span class="estrella-llena">★</span>'.repeat(estrellasLlenas) +
            '<span class="estrella-vacia">☆</span>'.repeat(estrellasVacias);

        return `<p class="puntuacion-estrellas">${estrellasHTML}</p>`;
    }

    const DetallesDelProducto = () => {
        const JuegoAComprar = JSON.parse(localStorage.getItem('JuegoAComprar'));

        if (JuegoAComprar) {
            Contenedor.innerHTML = `
                <h2>${JuegoAComprar.nombre}</h2>
                <p>${JuegoAComprar.detalles}</p>
                <p>Precio: ${JuegoAComprar.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                
                <img src="${JuegoAComprar.imagen}" alt="${JuegoAComprar.id}" style="max-width: 200px; height: auto;">

                <p>${convertirAEstrellas(JuegoAComprar.estrellas)}</p>
            `;

            Volver.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        } else {
            window.location.href = 'index.html';
        }
    }


    CargarListaDeProductos();

    if (Contenedor) {
        DetallesDelProducto();
    }
});