const express = require('express');
const { readMovies, saveMovies } = require('./data');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

router.get('/movies', async (req, res) => {
  const movies = await readMovies();
  res.json(movies);
});

router.get('/movies/:id', async (req, res) => {
  const movies = await readMovies();
  const movie = movies.find((item) => item.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

router.post('/movies', async (req, res) => {
  const { title, director, year, genre } = req.body;
  if (!title || !director || !year || !genre) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const movies = await readMovies();
  const newMovie = {
    id: `${Date.now()}`,
    title,
    director,
    year,
    genre,
  };
  movies.push(newMovie);
  await saveMovies(movies);
  res.status(201).json(newMovie);
});

router.put('/movies/:id', async (req, res) => {
  const { title, director, year, genre } = req.body;
  const movies = await readMovies();
  const index = movies.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  movies[index] = {
    ...movies[index],
    title: title || movies[index].title,
    director: director || movies[index].director,
    year: year || movies[index].year,
    genre: genre || movies[index].genre,
  };

  await saveMovies(movies);
  res.json(movies[index]);
});

router.delete('/movies/:id', async (req, res) => {
  const movies = await readMovies();
  const updated = movies.filter((item) => item.id !== req.params.id);
  if (updated.length === movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  await saveMovies(updated);
  res.json({ success: true });
});

module.exports = router;
