const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('resultDiv');

searchButton.addEventListener('click', async function () {
    const searched = document.getElementById('search').value;
    const url = `https://amazon23.p.rapidapi.com/product-search?query=${searched}&country=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef83921e6bmsh953b269570e564dp16eac6jsn64d0c9daeb77',
            'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        // Limpiar el contenido previo del div
        resultDiv.innerHTML = '';

        // Obtener los primeros 15 productos o menos si hay menos de 15
        const productsToShow = result.result.slice(0, 15);

        // Recorrer los productos obtenidos
        productsToShow.forEach(product => {
            const { thumbnail, title, price, reviews } = product;
            const { currency, current_price } = price;
            const { rating } = reviews;

            // Crear elementos HTML para mostrar la información
            const productDiv = document.createElement('div');
            const thumbnailImg = document.createElement('img');
            const titleP = document.createElement('p');
            const priceP = document.createElement('p');
            const ratingDiv = createRatingStars(rating);
            productDiv.appendChild(ratingDiv);

            thumbnailImg.src = thumbnail;
            titleP.textContent = title;
            priceP.textContent = `${currency} ${current_price}`;

            // Agregar los elementos al div del producto
            productDiv.appendChild(thumbnailImg);
            productDiv.appendChild(titleP);
            productDiv.appendChild(priceP);

            // Agregar el div del producto al div principal de resultados
            resultDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error(error);
    }
});

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const ratingDiv = document.createElement('div');
    // Agregar estrellas completas
    for (let i = 0; i < fullStars; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star');
        ratingDiv.appendChild(starIcon);
    }
    // Agregar media estrella si hay medio punto
    if (hasHalfStar) {
        const halfStarIcon = document.createElement('i');
        halfStarIcon.classList.add('fas', 'fa-star-half-alt');
        ratingDiv.appendChild(halfStarIcon);
    }
    // Agregar estrellas vacías restantes hasta completar 5
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        const emptyStarIcon = document.createElement('i');
        emptyStarIcon.classList.add('far', 'fa-star');
        ratingDiv.appendChild(emptyStarIcon);
    }
    return ratingDiv;
}
