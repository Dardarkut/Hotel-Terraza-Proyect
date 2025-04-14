// Función para obtener los íconos de servicios
function getIcon(icon) {
    const icons = {
        "wifi": `<i class="bi bi-wifi me-2 mb-2" title="Wi-Fi"></i>`,
        "parqueo": `<i class="bi bi-car-front me-2 mb-2" title="Parqueo"></i>`,
        "desayuno": `<i class="bi bi-cup-hot me-2 mb-2" title="Desayuno"></i>`,
        "piscina": `<i class="bi bi-droplet-half me-2 mb-2" title="Piscina"></i>`,
        "cable": `<i class="bi bi-tv me-2 mb-2" title="TV Cable"></i>`,
        "comidas": `<i class="bi bi-egg-fried me-2 mb-2" title="Comidas"></i>`,
        "spa": `<i class="bi bi-flower1 me-2 mb-2" title="Spa"></i>`,
        "masaje": `<i class="bi bi-hand-index-thumb me-2 mb-2" title="Masaje"></i>`,
        "bar": `<i class="bi bi-cup-straw me-2 mb-2" title="Bar"></i>`,
        "gimnasio": `<i class="bi bi-dumbbell me-2 mb-2" title="Gimnasio"></i>`,
        "jacuzzi": `<i class="bi bi-droplet-fill me-2 mb-2" title="Jacuzzi"></i>`,
        "vista": `<i class="bi bi-binoculars me-2 mb-2" title="Vista panorámica"></i>`,
        "room_service": `<i class="bi bi-bell me-2 mb-2" title="Room Service"></i>`,
        "champagne": `<i class="bi bi-cup me-2 mb-2" title="Champagne"></i>`,
        "pantuflas": `<i class="bi bi-slash-square me-2 mb-2" title="Pantuflas"></i>`,
        "bata": `<i class="bi bi-app me-2 mb-2" title="Bata de baño"></i>`,
        "lounge_access": `<i class="bi bi-house-door me-2 mb-2" title="Lounge VIP"></i>`,
        "tv": `<i class="bi bi-tv me-2 mb-2" title="Televisión"></i>`,
        "cuna": `<i class="bi bi-hospital me-2 mb-2" title="Cuna para bebé"></i>`,
        "espacio_extra": `<i class="bi bi-arrows-fullscreen me-2 mb-2" title="Espacio adicional"></i>`,
        "seguridad": `<i class="bi bi-shield-lock me-2 mb-2" title="Seguridad"></i>`
    };
    return icons[icon] || "";
};
   
// Función para cargar habitaciones en index.html (solo impares)
function loadRooms() {
    fetch('rooms.json')
        .then(response => response.json())
        .then(roomsData => {
            const roomList = document.getElementById("room-list");
            roomList.innerHTML = "";

            roomsData.filter(room => room.id % 2 !== 0).forEach(room => {
                const roomCard = document.createElement("div");
                roomCard.className = "col";
                roomCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${room.imageUrl}" class="card-img-top" alt="${room.name}">
                        <div class="card-body">
                            <h5 class="card-title">${room.name}</h5>
                            <p class="card-text">${room.description}</p>
                            <p><strong>Precio:</strong> ${room.price}</p>
                            <a href="roomDetails.html?id=${room.id + 1}" class="btn btn-primary">Más información</a>
                        </div>
                    </div>
                `;
                roomList.appendChild(roomCard);
            });
        })
        .catch(error => console.error("Error al cargar las habitaciones:", error));
}

// Función para cargar los detalles de la habitación en roomDetails.html
function loadRoomDetails() {
    const params = new URLSearchParams(window.location.search);
    const roomId = parseInt(params.get("id"));

    if (roomId % 2 === 0) {
        fetch('rooms.json')
            .then(response => response.json())
            .then(roomsData => {
                const room = roomsData.find(r => r.id === roomId);
                if (room) {
                    renderRoomDetail(room);
                } else {
                    document.getElementById("room-detail").innerHTML = "<p>Habitación no encontrada.</p>";
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
                document.getElementById("room-detail").innerHTML = "<p>Error al cargar los detalles.</p>";
            });
    } else {
        document.getElementById("room-detail").innerHTML = "<p>Esta página solo muestra detalles de habitaciones pares.</p>";
    }
}

// Función para renderizar los detalles de la habitación
function renderRoomDetail(room) {
    const detailContainer = document.getElementById("room-detail");

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

// Inicializar scripts según la página actual
if (document.getElementById("room-list")) {
    loadRooms();
} else if (document.getElementById("room-detail")) {
    loadRoomDetails();
}