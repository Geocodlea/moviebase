import { SearchBar, SearchResults } from "components/Search";
import Layout from "components/Layout";
import Header from "components/Header";

export default function Search() {
  return (
    <Layout title="Search">
      <Header title="Search" />
      <SearchBar route="/search" />
      <SearchResults />
    </Layout>
  );
}
