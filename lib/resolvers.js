const resolvers = {
  Query: {
    movies: (mv, args, { datasources: { movie } }) => {
      // TODO:: retrieve all the movies from movie datasource
    },
    search: (mv, { title }, { datasource: { movie } }) => {
      // TODO:: retrieve filter movies by title
    },
    favored: (
      mv,
      args,
      { userInfo: { uid }, datasources: { movie, favored } }
    ) => favored.get(uid).then(favs => favs)
  },
  Mutation: {
    addFav: (mv, { mvid }, { userInfo: { uid }, datasource: { favored } }) => {
      favored.add(uid, mvid).then(fav => fav);
    }
  }
};
