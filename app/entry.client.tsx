import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { ApolloProvider } from "@apollo/client";
import { initApollo } from "./context/apollo";

function Client() {
  const client = initApollo(false);
  return (
    <ApolloProvider client={client}>
      <RemixBrowser />
    </ApolloProvider>
  )
}

hydrate(<Client />, document);
