// ====== Settings ======
const API_KEY = '2g0nBcT0Hcn7aPR7Umbexh31BhIlBWIF';
const LIMIT = 9;
const RATING = 'g';

// Build the API endpoint string \\
function buildEndpoint(queryTerm = 'funny') {
  const base = 'https://api.giphy.com/v1/gifs/search';
  const params = new URLSearchParams({
    api_key: API_KEY,
    q: queryTerm,
    limit: LIMIT.toString(),
    rating: RATING
  });
  return `${base}?${params.toString()}`;
}

// ====== DOM elements ======
const gifContainer = document.querySelector('#gif-container');
const fetchBtn = document.querySelector('#fetch-gif-btn');
const searchInput = document.querySelector('#search-input');
const statusText = document.querySelector('#status');

// ====== Fetch GIFs ======
async function fetchGifs(queryTerm) {
  const endpoint = buildEndpoint(queryTerm);
  statusText.textContent = 'Loading...';
  try {
    const res = await fetch(endpoint);
    const json = await res.json();

    // Store urls in an array \\
    const images = json.data.map(item => item.images.original.url);

    // Render to the page
    renderGifs(images);
    statusText.textContent = images.length ? '' : 'No results. Try another search.';
  } catch (err) {
    console.error(err);
    statusText.textContent = 'Something went wrong. Check the console.';
  }
}

// ====== Render function ======
function renderGifs(images) {
  // Clear previous
  gifContainer.innerHTML = '';

  images.forEach(url => {
    // Create a column and image \\
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4';

    col.innerHTML = `<img src="${url}" alt="gif" class="img-fluid" />`;
    gifContainer.appendChild(col);
  });
}

// ====== Events ======
fetchBtn.addEventListener('click', () => {
  const term = (searchInput.value || 'funny').trim();
  fetchGifs(term);
});

// Press Enter in the input to search
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    fetchBtn.click();
  }
});

// Initial default fetch so the page is not empty
fetchGifs('cats');
