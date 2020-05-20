import React from 'react';
//GraphQLのパースをする
import gql from 'graphql-tag';

const USER = gql`
  query UserInfo($login: String!, $parNum: Int) {
    user(login: $login) {
      name
      avatarUrl
      pullRequests(first: $parNum) {
        nodes {
          id
          title
          permalink
        }
      }
    }
  }
`;

export default USER;
