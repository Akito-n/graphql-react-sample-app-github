// apolloClientでproviderに渡すclientの設定
import { ApolloClient } from 'apollo-client';
// クライアントのlinkのインスタンス
import { HttpLink } from 'apollo-link-http';
// apollo-clientを使うといるらしい
import { InMemoryCache } from 'apollo-cache-inmemory';
//ヘッダーなどをカスタマイズするのに使う
import { ApolloLink } from 'apollo-link';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const headersLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`
    }
  });
  return forward(operation);
});

const endpoint = 'https://api.github.com/graphql';
const httplink = new HttpLink({ uri: endpoint });
const link = ApolloLink.from([ headersLink, httplink ]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
