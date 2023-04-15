import { Heading } from "@chakra-ui/react";
import Layout from "components/Layout";
import Homepage from "components/Homepage";
import { SearchBar, SearchResults } from "components/Search";

export default function Home() {
  return (
    <Layout title="Moviebase" selected="/">
      <Heading as="h2" align="center" mb={3}>
        Search
      </Heading>
      <SearchBar route="" />
      <SearchResults results="5" />
      <Homepage page="watchlist" text="Watchlist" />
      <Homepage page="history" text="History" />
      <Homepage page="recommendations" text="Watchlist/History" />
    </Layout>
  );
}
