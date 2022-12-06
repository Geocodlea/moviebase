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

export default function Watchlist() {
  const { data, error } = useSWR(`/api/watchlist`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <Layout title="Watchlist" selected="/watchlist">
      <Center>
        {data.length > 0 ? (
          <TableContainer w={["100%", , "95%", "90%", "80%", "60%"]}>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Title</Th>
                  <Th>Added</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({ id, title, date }, index) => (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Link href={`/movies/${id}`} passHref legacyBehavior>
                        <Text as="a">{title}</Text>
                      </Link>
                    </Td>
                    <Td>{dateFormat(date)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text m="auto" fontSize="xl">
            Add some movies to your Watchlist page. You can add movies by
            searching for a movie and clicking the{" "}
            <Badge>Add to watchlist</Badge> button inside the movie page.
          </Text>
        )}
      </Center>
    </Layout>
  );
}
