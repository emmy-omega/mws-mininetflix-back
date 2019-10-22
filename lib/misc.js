const axios = require('axios');
const fs = require('fs');
let movies = [
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

// movies.forEach(async (mv) => {
//   axios
//     .get('http://omdbapi.com', { params: { apikey: '2d0c12a8', t: mv } })
//     .then(md => {
//       console.log(`${md}`);
//       movieData.push(md);
//     })
//     .catch(err => console.log(`${err.message}`));
// });

movies.forEach(async mv => {
  const md = await axios.get('http://omdbapi.com', {
    params: { apikey: '2d0c12a8', t: mv }
  });
  const rm = fs.readFileSync('data.json');
  const movieData = JSON.parse(rm);
  console.log(md);
  movieData.push(md);
  await fs.writeFile('data.json', JSON.stringify(movieData));
});

// console.log(movieData);

// const jsonContent = JSON.stringify(movieData);

// fs.writeFile('data.json', jsonContent, err => {
//   if (err) console.log(err.message);
// });
