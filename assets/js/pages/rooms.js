// Función para obtener los íconos de servicios
function getIcon(icon) {
    const icons = {
        wifi: `<i class="bi bi-wifi me-2 mb-2" title="Wi-Fi"></i>`,
        parqueo: `<i class="bi bi-car-front me-2 mb-2" title="Parqueo"></i>`,
        desayuno: `<i class="bi bi-cup-hot me-2 mb-2" title="Desayuno"></i>`,
        piscina: `<i class="bi bi-droplet-half me-2 mb-2" title="Piscina"></i>`,
        cable: `<i class="bi bi-tv me-2 mb-2" title="TV por cable"></i>`,
        comidas: `<i class="bi bi-egg-fried me-2 mb-2" title="Comidas"></i>`,
        spa: `<i class="bi bi-flower1 me-2 mb-2" title="Spa"></i>`,
        masaje: `<i class="bi bi-hand-index-thumb me-2 mb-2" title="Masaje"></i>`,
        bar: `<i class="bi bi-cup-straw me-2 mb-2" title="Bar"></i>`,
        gimnasio: `<i class="bi bi-dumbbell me-2 mb-2" title="Gimnasio"></i>`,
        jacuzzi: `<i class="bi bi-droplet-fill me-2 mb-2" title="Jacuzzi"></i>`,
        vista: `<i class="bi bi-binoculars me-2 mb-2" title="Vista panorámica"></i>`,
        room_service: `<i class="bi bi-bell me-2 mb-2" title="Room Service"></i>`,
        champagne: `<i class="bi bi-cup me-2 mb-2" title="Champagne"></i>`,
        pantuflas: `<i class="bi bi-slash-square me-2 mb-2" title="Pantuflas"></i>`,
        bata: `<i class="bi bi-app me-2 mb-2" title="Bata de baño"></i>`,
        lounge_access: `<i class="bi bi-house-door me-2 mb-2" title="Lounge VIP"></i>`,
        tv: `<i class="bi bi-tv me-2 mb-2" title="Televisión"></i>`,
        cuna: `<i class="bi bi-hospital me-2 mb-2" title="Cuna para bebé"></i>`,
        espacio_extra: `<i class="bi bi-arrows-fullscreen me-2 mb-2" title="Espacio adicional"></i>`,
        seguridad: `<i class="bi bi-shield-lock me-2 mb-2" title="Seguridad"></i>`
    };
    return icons[icon] || "";
}

// Renderizar la lista de habitaciones impares
function renderRooms(rooms) {
    const listContainer = document.getElementById("room-list");
    if (!listContainer) return;

    rooms
        .filter((room) => room.id % 2 !== 0)
        .forEach((room) => {
            const roomCard = document.createElement("div");
            roomCard.className = "col";
            roomCard.innerHTML = `
                <div class="card h-100">
                    <img src="${room.imageUrl || room.images?.[0]}" class="card-img-top" alt="${room.name}">
                    <div class="card-body">
                        <h5 class="card-title">${room.name}</h5>
                        <p class="card-text">${room.description}</p>
                        <p><strong>Precio:</strong> ${room.price}</p>
                        ${
                            room.amenities
                                ? `<div class="icons mb-3"><strong>Servicios:</strong> ${room.amenities.map(getIcon).join(" ")}</div>`
                                : ""
                        }
                        <a href="roomDetails.html" class="btn btn-primary" onclick="localStorage.setItem('selectedRoomId', ${room.id + 1})">Más información</a>
                    </div>
                </div>
            `;
            listContainer.appendChild(roomCard);
        });
}

// Renderizar detalles de habitación par
function renderRoomDetail(room) {
    const detailContainer = document.getElementById("room-detail");
    if (!detailContainer) return;

    let imagesHtml = "";
    if (room.images && room.images.length > 0) {
        imagesHtml = `
        <div id="carouselRoom" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${room.images
                    .map((img, i) => `
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

    detailContainer.innerHTML = `
        <h2>${room.name}</h2>
        ${imagesHtml}
        <p>${room.description}</p>
        <p><strong>Precio:</strong> ${room.price}</p>
        ${
            room.amenities
                ? `<div class="icons mb-3"><strong>Servicios:</strong> ${room.amenities.map(getIcon).join(" ")}</div>`
                : ""
        }
        <a href="rooms.html" class="btn btn-secondary">Volver a habitaciones</a>
    `;
}

// Detectar la página actual y ejecutar la lógica correspondiente
document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/Json/rooms.json")
        .then((res) => res.json())
        .then((data) => {
            if (document.getElementById("room-list")) {
                renderRooms(data);
            } else if (document.getElementById("room-detail")) {
                const roomId = parseInt(localStorage.getItem("selectedRoomId"));
                if (roomId % 2 === 0) {
                    const room = data.find((r) => r.id === roomId);
                    if (room) {
                        renderRoomDetail(room);
                    } else {
                        document.getElementById("room-detail").innerHTML =
                            "<p>Habitación no encontrada.</p>";
                    }
                } else {
                    document.getElementById("room-detail").innerHTML =
                        "<p>Solo se pueden ver detalles de habitaciones con ID par.</p>";
                }
            }
        })
        .catch((err) => {
            console.error("Error al cargar las habitaciones:", err);
            const fallback = document.getElementById("room-list") || document.getElementById("room-detail");
            if (fallback) fallback.innerHTML = "<p>Error al cargar los datos.</p>";
        });
});
