const { gql } = require("apollo-server-express");

const typeDefs = gql`
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Book" type defines the queryable fields for every book in our data source.
type Post {
  content: String
  # author: Author
  approval:Boolean
}
type ReturnLogin{
  user:User,
  token:String
}
type User{
  email:String!
  name:String!
}
type Author{
  post:Post
  user:User
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  posts: [Post],
  hello:String!,
  getAllUser:[User],
  getInformationAuthor(authorId:Int):Author
}

type Mutation {
  createUser(email:String,name:String,password:String,roles:String):User
  createAuthor(userId:Int):Author,
  removeUser(userId:Int):String,
  updateUser(userId:Int,email:String,name:String):String,
  login(email:String,password:String):ReturnLogin,
  approPost(postId:Int):String,
  createPost(content:String):String
}
`;

module.exports={typeDefs};