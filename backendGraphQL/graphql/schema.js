const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Post {
    _id: ID!
    title: String!
    description: String!
    image: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
}

input UserInputData {
    email: String!
    password: String!
    name: String!
}

type AuthData {
    userId: String!
    token: String!
}

type PostData {
    posts: [Post!]!
    totalPosts: Int!
}

input PostInputData {
    title: String!
    description: String!
    image: String!
}

type RootMutation {
    createUser(userInput: UserInputData): User!
    createPost(postInput: PostInputData): Post!
}

type RootQuery {
   login(email: String!, password: String!): AuthData! 
   posts: PostData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);