import Layout from "components/Layout";
import {
  Center,
  Text,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";
import dateFormat from "utils/dateFormat";
import Header from "components/Header";

export default function Recommendations() {
  const { data, error } = useSWR(`/api/recommendations`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <Layout title="Recommendations" selected="/recommendations">
      <Header title="Recommendations" />
      <Text m={5} align="center" fontSize="xl">
        Recommendations from your Watchlist and History Movies
      </Text>
      <Text m={5} align="center" fontSize="xl">
        Recommended movies based on
        <Badge ml={3} mr={3} variant="solid" colorScheme="blue" fontSize="1rem">
          {data.randomMovie?.title}
        </Badge>
      </Text>
      <Center>
        {data.recommendedMovie.results?.length > 0 && (
          <TableContainer w="90%">
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Title</Th>
                  <Th>Release Date</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.recommendedMovie.results.map(
                  ({ id, title, release_date, vote_average }, index) => (
                    <Tr key={id}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td>
                        <Link href={`/movies/${id}`} passHref legacyBehavior>
                          <Text as="a">{title}</Text>
                        </Link>
                      </Td>
                      <Td>{dateFormat(release_date)}</Td>
                      <Td>{vote_average}</Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Center>
      <Text m={5} mt={50} align="center" fontSize="xl">
        Similar movies based on
        <Badge ml={3} mr={3} variant="solid" colorScheme="blue" fontSize="1rem">
          {data.randomMovie?.title}
        </Badge>
      </Text>
      <Center>
        {data.similarMovie.results?.length && (
          <TableContainer w="90%">
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Title</Th>
                  <Th>Release Date</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.similarMovie.results.map(
                  ({ id, title, release_date, vote_average }, index) => (
                    <Tr key={id}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Link href={`/movies/${id}`} passHref legacyBehavior>
                          <Text as="a">{title}</Text>
                        </Link>
                      </Td>
                      <Td>{dateFormat(release_date)}</Td>
                      <Td>{vote_average.toFixed(1)}</Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Center>
    </Layout>
  );
}
