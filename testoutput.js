query {
  posts {
    id
    title
    content
    author {
      name
      email
    }
    comments {
      content
      author {
        name
      }
    }
  }
}
