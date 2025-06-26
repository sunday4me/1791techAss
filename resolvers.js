const { gql } = require('graphql-tag');
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

const posts = [
  { id: '1', title: 'Post 1', content: 'Content 1', authorId: '1' },
  { id: '2', title: 'Post 2', content: 'Content 2', authorId: '1' },
];

const comments = [
  { id: '1', content: 'Comment 1', authorId: '1', postId: '1' },
  { id: '2', content: 'Comment 2', authorId: '2', postId: '1' },
];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),
    comments: (parent, args) => comments.filter((comment) => comment.postId === args.postId),
  },
  Mutation: {
    createUser: (parent, args) => {
      const existingUser = users.find((user) => user.email === args.input.email);
      if (existingUser) {
        throw new GraphQLError('Email already exists');
      }
      const newUser = { id: uuidv4(), ...args.input };
      users.push(newUser);
      return newUser;
    },
    createPost: (parent, args) => {
      const author = users.find((user) => user.id === args.input.authorId);
      if (!author) {
        throw new GraphQLError('Author not found');
      }
      const newPost = { id: uuidv4(), ...args.input };
      posts.push(newPost);
      return newPost;
    },
    createComment: (parent, args) => {
      const author = users.find((user) => user.id === args.input.authorId);
      const post = posts.find((post) => post.id === args.input.postId);
      if (!author || !post) {
        throw new GraphQLError('Author or post not found');
      }
      const newComment = { id: uuidv4(), ...args.input };
      comments.push(newComment);
      return newComment;
    },
  },
  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
  },
  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    comments: (parent) => comments.filter((comment) => comment.postId === parent.id),
  },
  Comment: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    post: (parent) => posts.find((post) => post.id === parent.postId),
  },
};
