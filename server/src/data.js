const { promises: fs } = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'movies.json');

async function readMovies() {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

async function saveMovies(movies) {
  await fs.writeFile(DATA_FILE, JSON.stringify(movies, null, 2), 'utf8');
}

module.exports = {
  readMovies,
  saveMovies,
};
