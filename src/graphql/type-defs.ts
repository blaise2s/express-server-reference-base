import { gql } from 'apollo-server-express';

export default gql`
  type Pong {
    msg: String!
  }

  scalar JSONObject

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

  type State {
    name: String!
    abv: String!
    country: String!
    isstate: Boolean!
    islower48: Boolean!
    slug: String!
    latitude: Float!
    longitude: Float!
    population: String!
    area: Float!
  }

  input UploadInput {
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

  type ScriptArg {
    order: Int!
    name: String!
    placeholderText: String!
  }

  type Script {
    id: Int!
    name: String!
    description: String!
    numArgs: Int!
    args: [ScriptArg!]!
  }

  type Query {
    ping: Pong
    uploads: [Upload!]
    analyze(
      scriptId: Int!
      file1Id: Int!
      file2Id: Int
      file3Id: Int
    ): JSONObject
    states: [State!]
    scripts: [Script!]
  }

  type Mutation {
    deleteUploads(uploads: [UploadInput!]!): [Int!]
    renameUpload(id: Int!, newName: String!): Upload
  }
`;
