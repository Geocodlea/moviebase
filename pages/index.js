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
      <Homepage data="watchlist" text="Watchlist" />
      <Homepage data="history" text="History" />
      <Homepage data="recommendations" text="Watchlist/History" />
    </Layout>
  );
}
