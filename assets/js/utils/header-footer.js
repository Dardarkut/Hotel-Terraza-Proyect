document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
                <div class="container">
                    <a class="navbar-brand logo-text" href="index.html">Hotel Terraza</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="rooms.html" id="roomsDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Rooms
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="standarRoom.html">Standar Room</a></li>
                                    <li><a class="dropdown-item" href="suiteRoom.html">Suite Room</a></li>
                                    <li><a class="dropdown-item" href="familiarRoom.html">Familiar Room</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="services.html">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">About Us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contact.html">Contact</a>
                        </ul>
                        <a href="#" class="btn btn-outline-light reservation-btn">RESERVATION</a>
                    </div>
                </div>
            </nav>
        </header>
    `
  );

  document.querySelector('footer').innerHTML = `
  ${fetch('components/footer.html')
    .then((response) => response.text())
    .then((html) => (document.querySelector('footer').innerHTML = html))}
`;

  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'backToTop';
  backToTopButton.classList.add('back-to-top');
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
