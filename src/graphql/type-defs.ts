import { gql } from 'apollo-server-express';

export default gql`
  type Pong {
    msg: String!
  }

  type Upload {
    id: Int!
    destination: String!
    encoding: String!
    fieldname: String!
    filename: String!
    mimetype: String!
    originalname: String!
    path: String!
    size: Int!
  }

  input DeleteUploadInput {
    id: Int!
    destination: String!
    encoding: String!
    fieldname: String!
    filename: String!
    mimetype: String!
    originalname: String!
    path: String!
    size: Int!
  }

  type Query {
    ping: Pong
    uploads: [Upload!]
  }

  type Mutation {
    deleteUploads(uploads: [DeleteUploadInput!]!): [Int!]
    renameUpload(id: Int!, newName: String!): Upload
  }
`;
