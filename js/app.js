const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', async function() {
  const searched = document.getElementById('search').value;
  const url = `https://real-time-product-search.p.rapidapi.com/search?q=${searched}&country=co&language=es`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ef83921e6bmsh953b269570e564dp16eac6jsn64d0c9daeb77',
      'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});
