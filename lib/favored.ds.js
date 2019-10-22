const { DataSource } = require('apollo-datasource');

class FavoredDS extends DataSource {
  constructor() {
    this.client = new MongoClient(process.env.mUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  initialize(config) {
    this.context = config.context;
  }

  async get(uid) {
    await this.client.connect();
    const col = this.client.db('mnetflix').collection('favored');
    favoured = col.find({ uid }).toArray();
    this.client.close();
    return favoured.movies;
  }

  async add(uid, movie) {
    await this.client.connect();
    const col = this.client.db('mnetflix').collection('favored');
    col.findAndModify({
      query: { uid },
      update: { $addToSet: { movies: movie } }
    });
    return movie;
  }
}

module.exports = FavoredDS;
