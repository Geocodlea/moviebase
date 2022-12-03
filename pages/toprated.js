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
  const { data, error } = useSWR(`/api/toprated`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <Layout title="Top Rated" selected="/toprated">
      <Header title="Top Rated" />
      <Text m={5} align="center" fontSize="xl">
        Top Rated Movies with more than 10.000 votes
      </Text>
      <Center>
        {data.results && (
          <TableContainer w="90%">
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Title</Th>
                  <Th>Release Date</Th>
                  <Th>Rating</Th>
                  <Th>Votes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.results.map(
                  (
                    { id, title, release_date, vote_average, vote_count },
                    index
                  ) => (
                    <Tr key={id}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td>
                        <Link href={`/movies/${id}`} passHref legacyBehavior>
                          <Text as="a">{title}</Text>
                        </Link>
                      </Td>
                      <Td>{dateFormat(release_date)}</Td>
                      <Td>{vote_average}</Td>
                      <Td>{vote_count}</Td>
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
