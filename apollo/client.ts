import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.dishplug.com",
  cache: new InMemoryCache(),
});

export default client;
