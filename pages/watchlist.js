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
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";
import dateFormat from "utils/dateFormat";
import Header from "components/Header";

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
      <Header title="Watchlist" />
      <Center>
        {data.length > 0 && (
          <TableContainer w="90%">
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
        )}
      </Center>
    </Layout>
  );
}
