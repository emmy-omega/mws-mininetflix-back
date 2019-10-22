const { RESTDataSource } = require('apollo-datasource-rest');

const movies = [
  'Glass',
  'The Kid Who Would Be King',
  'Miss Bala',
  'What Men Want',
  'Alita: Battle Angel',
  'Fighting with My Family',
  'Happy Death Day 2U',
  'How to Train Your Dragon: The Hidden World',
  'A Madea Family Funeral',
  'Captain Marvel',
  'The Kid',
  'Wonder Park',
  'The Hummingbird Project',
  'The Aftermath',
  'Us',
  'Hotel Mumbai',
  'Dumbo',
  'The Beach Bum',
  'Shazam!',
  'Pet Sematary',
  'The Best of Enemies',
  'Hellboy',
  'Little',
  'Missing Link',
  'The Curse of La Llorona',
  'Avengers: Endgame',
  'UglyDolls',
  'Long Shot',
  'Pokémon Detective Pikachu',
  'The Hustle',
  'Tolkien',
  'John Wick: Chapter 3 - Parabellum',
  'Aladdin',
  'Brightburn',
  'Booksmart',
  'Godzilla: King of the Monsters',
  'Rocketman',
  'Dark Phoenix',
  'The Secret Life of Pets 2',
  'Men in Black: International',
  'Shaft',
  'Toy Story 4',
  'Annabelle Comes Home',
  'Yesterday',
  'Spider-Man: Far from Home',
  'Stuber',
  'Crawl',
  'The Farewell'
];

class MovieDS extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://omdbapi.com';
  }

  async getMovie(title) {
    return await this.get('', { apikey: '2d0c12a8', t: title });
  }

  async getById(imdbID) {
    return await this.get('', { apikey: '2d0c12a8', i: imdbID });
  }

  async getMovies(_movies = movies) {
    let movieData = [];
    for (let i = 0; i < movies.length; i++) {
      let md = await this.get('', { apikey: '2d0c12a8', t: movies[i] });
      movieData.push(md);
    }
    return movieData;
  }
}

module.exports = MovieDS;
