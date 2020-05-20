import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import USER from './graphql/user';
import { Query } from 'react-apollo';
import UserInfo from './components/userInfo';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>Hello GraphQL</p>
        <UserInfo />
      </div>
    </ApolloProvider>
  );
};

export default App;
