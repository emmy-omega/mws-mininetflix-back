const express = require('express');
const path = require('path');
const logger = require('morgan');

// const graphqlHTTP = require('express-graphql');
const {
  ApolloServer,
  gql,
  AuthenticationError
} = require('apollo-server-express');
// import { graphqlExpress } from 'apollo-server-express';
const MovieDS = require('./lib/movie.ds');
const FavoredDS = require('./lib/favored.ds');

const schema = require('./lib/schema');
// import schema from './lib/schema';

const authRouter = require('./lib/auth.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }

  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (err) {
      return res.status(401).send({ error: 'not authorized' });
    }
  });
};

const typeDefs = gql`
  type Movie {
    imdbID: ID
    Title: String
    Genre: String
    Director: String
    Writer: String
    Actors: String
    Year: String
    Released: String
    Rated: String
    Runtime: String
    Plot: String
    Language: String
    Country: String
    Awards: String
    Poster: String
    Rating: String
  }

  input favInput {
    imdbID: String
  }

  type Query {
    movies: [Movie]
    movie(imdbID: String): Movie
  }

  type Mutation {
    addFavorite(favorite: favInput): Movie
  }
`;

const resolvers = {
  Query: {
    movies: (mv, args, { dataSources: { movie } }) =>
      movie
        .getMovies()
        .then(mvs => mvs)
        .catch(err => console.log(err)),
    movie: (mv, { imdbID }, { dataSources: { movie } }) =>
      movie
        .getById(imdbID)
        .then(mv => mv)
        .catch(err => console.log(err))
    // favored: (
    //   mv,
    //   args,
    //   { userInfo: { uid }, dataSources: { movie, favored } }
    // ) => favored.get(uid).then(favs => movie.getMovies(favs).then(mvs => mvs))
  },
  Mutation: {
    addFavorite: (
      mv,
      { favorite: { imdbID } },
      { uid, dataSources: { movie, favored } }
    ) => {
      favored.add(uid, mvid).then(mvid => movie.getById(mvid).then(mv => mv));
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ movie: new MovieDS() }),
  context: async ({ req }) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      req.authToken = req.headers.authorization.split(' ')[1];
    } else {
      req.authToken = null;
    }

    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      return { uid: userInfo.uid };
    } catch (err) {}
  }
});

server.applyMiddleware({ app });

// app.use(
//   '/gql',
//   graphqlExpress()
// );
// app.use('/auth', authRouter);

// module.exports = app;
module.exports = app;
