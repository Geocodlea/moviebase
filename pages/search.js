import { SearchBar, SearchResults } from "components/Search";
import Layout from "components/Layout";

export default function Search() {
  return (
    <Layout title="Search" selected="/search">
      <SearchBar route="/search" />
      <SearchResults />
    </Layout>
  );
}
