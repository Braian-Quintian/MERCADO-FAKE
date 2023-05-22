const searchButton = document.getElementById('searchButton');

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
    } catch (error) {
        console.error(error);
    }
});