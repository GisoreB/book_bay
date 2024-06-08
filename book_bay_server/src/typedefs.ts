const typeDefs = `#graphql
  type Book {
    id: ID
    title: String
    year: Int
    author: Author
  }

  type Author {
    id: ID
    name: String
    birth_year: Int
    nationality: String
    books: [Book]
  }

  # Entrypoint for Queries
  type Query {
    book(id: ID): Book
    books: [Book]
    booksByTitle(title: String): [Book]
    author(id: ID): Author
    authors: [Author]
    authorsByName(name: String): [Author]
  }

  type Mutation {
    addBook(title: String, year: Int, authorName: String): Book
    removeBook(id: ID): Book
  }
`;

export default typeDefs;