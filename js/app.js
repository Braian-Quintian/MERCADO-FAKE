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
        // resultDiv.innerHTML = ''; SE COMENTA POR EL MOMENTO EN QUE SE HACEN LAS PRUEBAS

        // Obtener los primeros 15 productos o menos si hay menos de 15
        const productsToShow = result.result.slice(0, 15);

        // Recorrer los productos obtenidos
        productsToShow.forEach(product => {
            const thumbnail = product.thumbnail;
            const title = product.title;
            const currency = product.price.currency;
            const price = product.price.current_price;
            const rating = product.reviews.rating;

            // Crear elementos HTML para mostrar la información
            const productDiv = document.createElement('div');
            const thumbnailImg = document.createElement('img');
            const titleP = document.createElement('p');
            const priceP = document.createElement('p');
            const ratingDiv = createRatingStars(rating); // Utilizar la función para generar las estrellitas

            thumbnailImg.src = thumbnail;
            titleP.textContent = title;
            priceP.textContent = `${currency} ${price}`;

            // Agregar los elementos al div del producto
            productDiv.appendChild(thumbnailImg);
            productDiv.appendChild(titleP);
            productDiv.appendChild(priceP);
            productDiv.appendChild(ratingDiv); // Agregar el div de las estrellitas

            // Agregar el div del producto al div principal de resultados
            resultDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error(error);
    }
});

function createRatingStars(rating) {
  const ratingDiv = document.createElement('div');

  // Rellenar las estrellas completas
  for (let i = 0; i < Math.floor(rating); i++) {
    const star = document.createElement('span');
    star.textContent = '★'; // Estrella completa
    ratingDiv.appendChild(star);
  }

  // Agregar media estrella si el rating tiene decimal mayor a 0
  if (rating % 1 !== 0) {
    const halfStar = document.createElement('span');
    halfStar.textContent = '½'; // Media estrella
    ratingDiv.appendChild(halfStar);
  }

  // Agregar estrellas vacías para completar 5 estrellas en total
  for (let i = Math.ceil(rating); i < 5; i++) {
    const emptyStar = document.createElement('span');
    emptyStar.textContent = '☆'; // Estrella vacía
    ratingDiv.appendChild(emptyStar);
  }

  return ratingDiv;
}
