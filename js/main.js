const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
  const searchValue = document.getElementById('search').value;
  if (searchValue.trim() !== '') {
    localStorage.setItem('searchValue', searchValue);
    window.location.href = 'list-producto.html';

  }
});
