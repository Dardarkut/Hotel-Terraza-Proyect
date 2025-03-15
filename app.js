document.addEventListener('DOMContentLoaded', () => {
  loadPage('pages/home.html');

  document.addEventListener('click', function (event) {
    if (event.target.matches('.nav-link')) {
      event.preventDefault();
      const page = event.target.getAttribute('href');
      if (page) {
        loadPage(`pages/${page}`);
      }
    }
  });
});

function loadPage(page) {
  fetch(page)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then((data) => (document.getElementById('container').innerHTML = data))
    .catch((error) => console.error('Error loading page:', error));
}
