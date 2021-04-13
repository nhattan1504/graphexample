export default`

type Book {
    title: String
    author: Author
  }
  
  // # An author has a name and a list of books
  type Author {
    name: String
    books: [Book]
  }


  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  `;