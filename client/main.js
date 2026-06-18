const API_BASE = '/api';

const form = document.getElementById('movie-form');
const titleInput = document.getElementById('title');
const directorInput = document.getElementById('director');
const yearInput = document.getElementById('year');
const genreInput = document.getElementById('genre');
const movieGrid = document.getElementById('movie-grid');
const statusMessage = document.getElementById('status-message');
const submitMessage = document.getElementById('submit-message');

async function loadMovies() {
  statusMessage.textContent = 'Loading movies...';
  submitMessage.textContent = '';
  movieGrid.innerHTML = '';

  try {
    const response = await fetch(`${API_BASE}/movies`);
    if (!response.ok) throw new Error('Unable to load movies');
    const movies = await response.json();

    if (movies.length === 0) {
      statusMessage.textContent = 'No movies found. Add one to get started.';
      return;
    }

    statusMessage.textContent = '';
    movies.forEach((movie) => {
      const card = document.createElement('article');
      card.className = 'movie-card';

      const top = document.createElement('div');
      top.className = 'movie-card-top';

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const remove = document.createElement('button');
      remove.className = 'delete-button';
      remove.textContent = 'Delete';
      remove.addEventListener('click', () => removeMovie(movie.id));

      top.append(title, remove);
      card.append(top);

      card.insertAdjacentHTML('beforeend', `
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
      `);

      movieGrid.appendChild(card);
    });
  } catch (error) {
    statusMessage.textContent = 'Unable to load movies.';
  }
}

async function removeMovie(movieId) {
  submitMessage.textContent = '';
  statusMessage.textContent = '';

  try {
    const response = await fetch(`${API_BASE}/movies/${movieId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Delete failed');
    submitMessage.textContent = 'Movie removed successfully.';
    await loadMovies();
  } catch (error) {
    statusMessage.textContent = 'Failed to delete movie.';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitMessage.textContent = '';
  statusMessage.textContent = '';

  const payload = {
    title: titleInput.value.trim(),
    director: directorInput.value.trim(),
    year: yearInput.value.trim(),
    genre: genreInput.value.trim(),
  };

  if (!payload.title || !payload.director || !payload.year || !payload.genre) {
    statusMessage.textContent = 'Please fill in all fields before adding a movie.';
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Submit failed');

    submitMessage.textContent = 'Movie added successfully.';
    form.reset();
    await loadMovies();
  } catch (error) {
    statusMessage.textContent = 'Failed to add movie.';
  }
});

loadMovies();
