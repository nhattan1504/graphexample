const { ApolloServer} = require('apollo-server');
const {typeDefs}=require('./src/typeDefs/query');
const {resolvers}=require('./src/resolver/resolver');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.





// # A book has a title and an author




const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});