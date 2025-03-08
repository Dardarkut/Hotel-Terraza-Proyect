document.addEventListener("DOMContentLoaded", () => {
    fetch('pages/home.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);
    
    fetch('pages/rooms.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);

    fetch('pages/services.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);

    fetch('pages/contact.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);
    
    fetch('pages/location.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);

        fetch('pages/dashboard.html')
        .then(response => response.text())
        .then(data => document.getElementById("container").innerHTML = data);
});