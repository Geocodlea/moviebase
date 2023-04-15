import Link from "next/link";
import useSWR from "swr";
import {
  Text,
  Button,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Progress,
  Stack,
  Image,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";

const Home = ({ page, text }) => {
  let { data } = useSWR(`/api/${page}`);
  if (page === "recommendations") {
    data = data?.similarMovie.results;
  }

  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  if (!data.length) {
    return (
      <Text m="auto" fontSize="xl">
        Add some movies to your {text} page
      </Text>
    );
  }

  return (
    <SimpleGrid
      spacing={[4, 6, 8, 10, 16]}
      columns={[1, 2, 3]}
      mx={[4, 6, 8, 10, 16]}
    >
      {data.slice(0, 3).map(({ id, title, overview, poster_path }) => (
        <Card align="center" key={id}>
          <CardBody>
            <Image
              src={buildImageUrl(poster_path)}
              alt="Movie Poster"
              borderRadius="lg"
              m="auto"
              w="100%"
              h="auto"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title}</Heading>
              <Text>{overview.substring(0, 100)} ...</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button as="a" variant="solid">
                Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default function Homepage({ page, text }) {
  return (
    <VStack>
      <Heading as="h2" align="center" mt={10} mb={3}>
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </Heading>
      <Home page={page} text={text} />
    </VStack>
  );
}
