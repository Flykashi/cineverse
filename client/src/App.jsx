import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', director: '', year: '', genre: '' });
  const [submitMessage, setSubmitMessage] = useState('');

  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/movies`);
      setMovies(response.data);
    } catch (err) {
      setError('Unable to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage('');
    setError('');

    const payload = {
      title: form.title.trim(),
      director: form.director.trim(),
      year: Number(form.year),
      genre: form.genre.trim(),
    };

    if (!payload.title || !payload.director || !payload.year || !payload.genre) {
      setError('Please fill in all fields before adding a movie.');
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/movies`, payload);
      setSubmitMessage('Movie added successfully.');
      setForm({ title: '', director: '', year: '', genre: '' });
      await loadMovies();
    } catch (err) {
      setError('Failed to add movie.');
    }
  };

  const handleDelete = async (movieId) => {
    setError('');
    try {
      await axios.delete(`${API_BASE}/api/movies/${movieId}`);
      setSubmitMessage('Movie removed successfully.');
      await loadMovies();
    } catch (err) {
      setError('Failed to delete movie.');
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Cineverse</h1>
        <p>Full-stack movie catalog with React and Express.</p>
      </header>

      <section className="form-card">
        <h2>Add a New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} placeholder="Movie title" />
            </label>
            <label>
              Director
              <input name="director" value={form.director} onChange={handleChange} placeholder="Director name" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Year
              <input name="year" value={form.year} onChange={handleChange} placeholder="2025" type="number" />
            </label>
            <label>
              Genre
              <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
            </label>
          </div>
          <button type="submit" className="primary-button">Add Movie</button>
        </form>
        {submitMessage && <p className="status-message status-success">{submitMessage}</p>}
      </section>

      <main>
        {loading && <p className="status-message">Loading movies...</p>}
        {error && <p className="status-message status-error">{error}</p>}
        {!loading && !error && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <article key={movie.id} className="movie-card">
                <div className="movie-card-top">
                  <h2>{movie.title}</h2>
                  <button className="delete-button" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </div>
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>Year:</strong> {movie.year}</p>
                <p><strong>Genre:</strong> {movie.genre}</p>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>Demo full stack project for Cineverse submission.</p>
      </footer>
    </div>
  );
}

export default App;
