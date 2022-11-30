import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import {
  Input,
  IconButton,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";
import dateFormat from "utils/dateFormat";
import Header from "components/Header";

function SearchBar() {
  const router = useRouter();
  const [text, setText] = useState("");

  // Update router history if a search was performed
  useEffect(() => {
    router.push(`/search/?terms=${text}`, undefined, { shallow: true });
  }, [text]);

  // Update text input when route changes (ex when user goes back/forward)
  const handleSearch = (event) => {
    setText(event.target.value);
  };

  return (
    <InputGroup as="form">
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={handleSearch}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;

  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <Center>
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
            {data.results.map(
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
    </Center>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Header title="Search" />
      <SearchBar />
      <SearchResults />
    </Layout>
  );
}
