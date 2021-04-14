const { ApolloServer} = require('apollo-server');
const {typeDefs}=require('./src/typeDefs/query');
const {resolvers}=require('./src/resolver/resolver');
const {getUserId}=require('./src/untils/untils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.





// # A book has a title and an author




const server = new ApolloServer({ typeDefs, resolvers,context:
   ({ req }) => {
    var x=getUserId(req);
    console.log(x.role);
    return {
      ...req,
      prisma,
      userId:
        req&&req.headers.authorization?x.userId:null,
        // x.userId
      role:
        req&&req.headers.authorization?x.role:null,
    };
  }});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});