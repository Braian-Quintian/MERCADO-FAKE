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
        const productsToShow = result.result.slice(0, 50);

        // Recorrer los productos obtenidos
        productsToShow.forEach(product => {
            const { thumbnail, title, price, reviews } = product;
            const { rating } = reviews;

            // Crear elementos HTML para mostrar la información
            const productDiv = createProductDiv();
            const thumbnailImg = createThumbnailImg(thumbnail);
            const textDiv = createTextDiv();
            const titleP = createTitleParagraph(title);
            const priceP = createPriceParagraph(price);
            const ratingDiv = createRatingStars(rating);

            // Estructurar los elementos creados
            productDiv.appendChild(thumbnailImg);
            textDiv.appendChild(titleP);
            textDiv.appendChild(priceP);
            textDiv.appendChild(ratingDiv);
            productDiv.appendChild(textDiv);
            resultDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error(error);
    }
});

function createProductDiv() {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    return productDiv;
}

function createThumbnailImg(src) {
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = src;
    return thumbnailImg;
}

function createTextDiv() {
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    return textDiv;
}

function createTitleParagraph(text) {
    const titleP = document.createElement('p');
    titleP.classList.add('title');
    titleP.textContent = text;
    return titleP;
}

function createPriceParagraph(price) {
    const formattedPrice = formatPrice(price);
    const priceP = document.createElement('p');
    priceP.classList.add('price');
    priceP.textContent = formattedPrice;
    return priceP;
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('star');

    for (let i = 0; i < fullStars; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star');
        ratingDiv.appendChild(starIcon);
    }

    if (hasHalfStar) {
        const halfStarIcon = document.createElement('i');
        halfStarIcon.classList.add('fas', 'fa-star-half-alt');
        ratingDiv.appendChild(halfStarIcon);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        const emptyStarIcon = document.createElement('i');
        emptyStarIcon.classList.add('far', 'fa-star');
        ratingDiv.appendChild(emptyStarIcon);
    }

    return ratingDiv;
}

function formatPrice(price) {
    const current_price = price.current_price;
    if (current_price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formatter.format(current_price);
    }
    return 'Price not available';
}