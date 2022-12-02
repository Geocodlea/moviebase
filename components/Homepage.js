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
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";

export default function Homepage(props) {
  let { data, error } = useSWR(`/api/${props.data}`);
  if (props.data === "recommendations") {
    data = data?.similarMovie.results;
  }

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <>
      <Heading as="h2" align="center" mt={10} mb={3}>
        {props.data.charAt(0).toUpperCase() + props.data.slice(1)}
      </Heading>
      <SimpleGrid
        spacing={[4, 6, 8, 10, 16]}
        columns={[1, 2, 3]}
        mx={[4, 6, 8, 10, 16]}
      >
        {data.length > 0 ? (
          data.slice(0, 3).map(({ id, title, overview, poster_path }) => (
            <Card align="center" key={id}>
              <CardBody>
                <Image
                  src={buildImageUrl(poster_path)}
                  alt="Movie Poster"
                  borderRadius="lg"
                  m="auto"
                  w="100%"
                  h="20rem"
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
          ))
        ) : (
          <Text m="auto" fontSize="xl">
            Add some movies to your {props.data} page
          </Text>
        )}
      </SimpleGrid>
    </>
  );
}
