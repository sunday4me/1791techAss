const books = [
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};
