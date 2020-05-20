import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';
//GraphQLのパースをする
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

interface pullRequestData {
  id: string;
  title: string;
  permalink: string;
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>Hello GraphQL</p>
        <Query query={USER} variables={{ login: 'Akito-n', parNum: 30 }}>
          {(result: any) => {
            const { loading, error, data } = result;

            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error {error.message}</p>;

            return (
              <div>
                <p>{data.user.name}</p>
                <img src={data.user.avatarUrl} />
                {data.user.pullRequests.nodes.map((c: pullRequestData) => (
                  <div key={c.id}>
                    <p>{c.title}</p>
                    <a href={c.permalink}>GitHub</a>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
};

export default App;
