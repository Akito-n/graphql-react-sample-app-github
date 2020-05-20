import React from 'react';
import USER from '../graphql/user';
import { Query } from 'react-apollo';

interface pullRequestData {
  id: string;
  title: string;
  permalink: string;
}

const UserInfo: React.FC = () => {
  return (
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
  );
};

export default UserInfo;
