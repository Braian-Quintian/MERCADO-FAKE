const resultDiv = document.getElementById('resultDiv');

(async function () {
    const searchValue = localStorage.getItem('searchValue');
    let capitalizedSearchValue = ''; // Variable inicializada con un valor vacío
    if (searchValue !== null) {
        capitalizedSearchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase();
        const url = `https://amazon23.p.rapidapi.com/product-search?query=${capitalizedSearchValue}&country=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c14cddfe9cmsh28ddb67bf9544a6p1a7da5jsnce1a65e84a26',
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

                const { thumbnail, title, price, reviews, asin } = product;
                const { rating } = reviews;
                const { current_price, before_price, discounted } = price;

                console.log(thumbnail, title, current_price, before_price, rating, discounted, asin);
                // Crear elementos HTML para mostrar la información
                const productDiv = createProductDiv();
                const thumbnailImg = createThumbnailImg(thumbnail);
                const textDiv = createTextDiv();
                const titleP = createTitleParagraph(title);
                const priceP = createPriceParagraph(current_price);
                const priceBeforeP = createPriceBeforeParagraph(before_price, discounted);
                const ratingDiv = createRatingStars(rating);

                // Agregar el asin como atributo personalizado al productDiv
                productDiv.setAttribute('data-asin', asin);
                thumbnailImg.setAttribute('data-asin', asin);
                thumbnailImg.setAttribute('onclick', 'handleThumbnailClick(event)');

                // Estructurar los elementos creados
                productDiv.appendChild(thumbnailImg);
                textDiv.appendChild(titleP);
                textDiv.appendChild(priceP);
                if (priceBeforeP) {
                    textDiv.appendChild(priceBeforeP);
                }
                textDiv.appendChild(ratingDiv);
                productDiv.appendChild(textDiv);
                resultDiv.appendChild(productDiv);
            });
        } catch (error) {
            console.error(error);
        }
    }
    document.title = `${capitalizedSearchValue} | Mercado Libre Colombia`;
    document.getElementById('busqueda').textContent = capitalizedSearchValue;
    localStorage.removeItem('searchValue');
})();

function createProductDiv() {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    return productDiv;
}

function createThumbnailImg(src) {
    const thumbnailImg = document.createElement('img');
    thumbnailImg.id = 'productImage';
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
    const formattedPrice = formatPrice({ current_price: price });
    const priceP = document.createElement('p');
    priceP.classList.add('price');
    priceP.textContent = formattedPrice.current_price;
    return priceP;
}

function createPriceBeforeParagraph(beforeprice, discounted) {
    if (!discounted) {
        return null;
    }
    const formattedPrice = formatPrice({ before_price: beforeprice });
    const priceBeforeP = document.createElement('p');
    priceBeforeP.classList.add('beforeprice');
    priceBeforeP.textContent = formattedPrice.before_price;
    return priceBeforeP;
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
    const current_price = price?.current_price;
    const before_price = price?.before_price;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedCurrentPrice = current_price ? formatter.format(current_price) : 'Current price not available';
    const formattedBeforePrice = before_price ? formatter.format(before_price) : 'Previous price not available';

    return {
        current_price: formattedCurrentPrice,
        before_price: formattedBeforePrice
    };
}