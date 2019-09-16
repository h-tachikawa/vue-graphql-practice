import gql from 'graphql-tag'

export const ALL_POSTS_QUERY = gql`  
  query Posts {
      posts {
          id
          title
      }
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!) {
    createPost(
      data: {
        title: $title
      }
    ) {
      id
      title
    }
  }
`
