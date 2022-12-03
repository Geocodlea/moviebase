import { Link, Image, Heading, VStack } from "@chakra-ui/react";
import Layout from "components/Layout";
import Header from "components/Header";

export default function Credits() {
  return (
    <Layout title="Credits" selected="/credits">
      <Header title="Credits" />
      <VStack>
        <Heading as="h2" p="10" align="center">
          This website uses the TMDB API but is not endorsed or certified by
          TMDB
        </Heading>
        <Link href="https://www.themoviedb.org/" isExternal>
          <Image src="images/logoTMDB.svg" width={100} alt="TMDB logo" />
        </Link>
      </VStack>
    </Layout>
  );
}
