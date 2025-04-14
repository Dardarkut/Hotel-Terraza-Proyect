// Función para obtener los íconos de servicios
function getIcon(icon) {
    const icons = {
        "wifi": `<i class="bi bi-wifi" title="Wi-Fi"></i>`,
        "parqueo": `<i class="bi bi-car-front" title="Parqueo"></i>`,
        "desayuno": `<i class="bi bi-cup-straw" title="Desayuno"></i>`,
        "piscina": `<i class="bi bi-water" title="Piscina"></i>`,
        "cable": `<i class="bi bi-tv" title="TV Cable"></i>`,
        "comidas": `<i class="bi bi-utensils" title="Comidas"></i>`
    };
    return icons[icon] || "";
}

// Función para renderizar detalles de la habitación
function renderRoomDetail(room) {
    const detailContainer = document.getElementById("room-detail");

    // Carrusel de imágenes
    let imagesHtml = "";
    if (room.images && room.images.length > 0) {
        imagesHtml = `
        <div id="carouselRoom" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${room.images.map((img, i) => `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <img src="${img}" class="d-block w-100" alt="${room.name}">
                    </div>
                `).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselRoom" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselRoom" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>`;
    } else if (room.imageUrl) {
        imagesHtml = `<img src="${room.imageUrl}" class="img-fluid mb-4" alt="${room.name}">`;
    }

    // Renderizar toda la info
    detailContainer.innerHTML = `
        <h2>${room.name}</h2>
        ${imagesHtml}
        <p>${room.description}</p>
        <p><strong>Precio:</strong> ${room.price}</p>
        ${room.amenities ? `
        <div class="icons mb-3">
            <strong>Servicios:</strong> ${room.amenities.map(getIcon).join(" ")}
        </div>` : ""}
        <a href="index.html" class="btn btn-secondary">Volver a habitaciones</a>
    `;
}

// Obtener ID guardado y cargar detalles solo si es par
const roomId = parseInt(localStorage.getItem("selectedRoomId"));

// Verificar que el ID sea par antes de cargar los detalles
if (roomId % 2 === 0) {
    fetch("rooms.json")
        .then(res => res.json())
        .then(data => {
            const room = data.find(r => r.id === roomId);
            if (room) {
                renderRoomDetail(room);
            } else {
                document.getElementById("room-detail").innerHTML = "<p>Habitación no encontrada.</p>";
            }
        })
        .catch(err => {
            console.error("Error al cargar los detalles de la habitación:", err);
            document.getElementById("room-detail").innerHTML = "<p>Error al cargar los datos.</p>";
        });
} else {
    document.getElementById("room-detail").innerHTML = "<p>Solo se pueden ver detalles de habitaciones con ID par.</p>";
}
