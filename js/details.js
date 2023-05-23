(async function () {
    const searchValue = localStorage.getItem('searchValue');

    if (searchValue) {
        const url = `https://amazon23.p.rapidapi.com/product-search?query=${searchValue}&country=US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'eb035deb6fmsh3819ce686166826p13ac95jsn020f0b6bf18f',
                'X-RapidAPI-Host': 'amazon23.p.rapidapi.com'
            }
        };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}});
