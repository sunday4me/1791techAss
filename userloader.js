const DataLoader = require('dataloader');

const batchUsers = async (ids) => {
  const result = await Promise.resolve(users.filter((user) => ids.includes(user.id)));
  return ids.map((id) => result.find((user) => user.id === id));
};

const userLoader = new DataLoader(batchUsers);

// In resolvers
const resolvers = {
  Post: {
    author: (parent) => userLoader.load(parent.authorId),
  },
  Comment: {
    author: (parent) => userLoader.load(parent.authorId),
  },
};
