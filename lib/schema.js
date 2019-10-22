const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLError
} = require('graphql');

const movies = [];

const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    Title: { type: GraphQLString },
    Released: { type: GraphQLInt },
    Rated: { type: GraphQLString },
    Runtime: { type: GraphQLInt },
    Genre: { type: GraphQLString },
    Directot: { type: GraphQLString },
    Writer: { type: GraphQLString },
    Actors: { type: GraphQLString },
    Plot: { type: GraphQLString },
    Language: { type: GraphQLString },
    Country: { type: GraphQLString },
    Awards: { GraphQLString },
    Poster: { type: GraphQLString },
    Ratings: { type: GraphQLString }
  })
});

const favoredType = new GraphQLObjectType({
  name: 'Favored',
  fields: () => ({
    uid: { type: GraphQLID },
    movies: { type: new GraphQLList(GraphQLID) }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(movieType),
      resolve: () => new GraphQLError('not authorized')
    },
    movie: {
      type: movieType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => {
        return movies.filter(m => m.id == id);
      }
    },
    favorite: {
      type: new GraphQLList(movieType),
      resolve: (_, args, ctx, info) => {
        return movies.filter(m => m.fevoritedBy.includes(ctx.userInfo.uid));
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addFavorite: {
      type: movieType,
      args: { id: { type: GraphQLID } },
      resolve: (mv, { id }, ctx, info) => {
        const idx = movies.indexOf({ id });
        Object.assign(movies[idx], {
          favoredBy: [...movies[idx], ctx.userInfo.uid]
        });
        return movies[idx];
      }
    },
    removeFavorite: {
      type: movieType,
      args: { id: { type: GraphQLID } },
      resolve: (mv, { id }, ctx, info) => {
        const idx = movies.indexOf({ id });
        movies[idx].favoritedBy = movie[idx].favoredBy.filter(
          (fav = fav !== ctx.userInfo.uid)
        );
        return movies[idx];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
