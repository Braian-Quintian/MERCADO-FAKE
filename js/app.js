function handleThumbnailClick(event) {
    event.preventDefault();
    const asin = event.target.getAttribute('data-asin');
    localStorage.setItem('productAsin', asin);
    window.location.href = 'details.html';
}
