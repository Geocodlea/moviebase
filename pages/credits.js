import { Center, Image, Flex, Heading } from "@chakra-ui/react";
import Layout from "components/Layout";
import Header from "components/Header";

export default function Credits() {
  return (
    <Layout title="Credits">
      <Header title="Credits" />
      <Center h="full">
        <Flex p="5" direction="column" align="end">
          <Heading as="h2" p="10">
            This website uses the TMDB API but is not endorsed or certified by
            TMDB
          </Heading>
          <Image
            mt="100"
            src="images/logoTMDB.svg"
            width={100}
            alt="TMDB logo"
          />
        </Flex>
      </Center>
    </Layout>
  );
}
