import Header from "./components/Header";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";

// Apollo Client Setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/graphql",
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Projects />
          <AddClientModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
