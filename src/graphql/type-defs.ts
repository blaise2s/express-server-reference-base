import { gql } from 'apollo-server-express';

export default gql`
  type Pong {
    msg: String!
  }

  scalar JSONObject

  type Query {
    ping: Pong
    analyze(scriptId: Int!): JSONObject
  }
`;
