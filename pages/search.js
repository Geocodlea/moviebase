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
import { SearchIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
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

  const [isSortDate, setIsSortDate] = useState(false);
  const [isSortRating, setIsSortRating] = useState(false);
  const [isSortVotes, setIsSortVotes] = useState(false);

  const [sortState, setSortState] = useState("none");
  const sortMethods = {
    none: { method: (a, b) => null },
    dateAscending: {
      method: (a, b) => (a.release_date > b.release_date ? 1 : -1),
    },
    dateDescending: {
      method: (a, b) => (a.release_date > b.release_date ? -1 : 1),
    },
    ratingAscending: {
      method: (a, b) => (a.vote_average > b.vote_average ? 1 : -1),
    },
    ratingDescending: {
      method: (a, b) => (a.vote_average > b.vote_average ? -1 : 1),
    },
    votesAscending: {
      method: (a, b) => (a.vote_count > b.vote_count ? 1 : -1),
    },
    votesDescending: {
      method: (a, b) => (a.vote_count > b.vote_count ? -1 : 1),
    },
  };

  const handleSortDate = () => {
    setIsSortDate((prevValue) => !prevValue);
    isSortDate ? setSortState("dateAscending") : setSortState("dateDescending");
  };
  const handleSortRating = () => {
    setIsSortRating((prevValue) => !prevValue);
    isSortRating
      ? setSortState("ratingAscending")
      : setSortState("ratingDescending");
  };
  const handleSortVotes = () => {
    setIsSortVotes((prevValue) => !prevValue);
    isSortVotes
      ? setSortState("votesAscending")
      : setSortState("votesDescending");
  };

  if (!terms) {
    return (
      <Text m={5} fontSize="xl">
        Type some terms for a quick search
      </Text>
    );
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
    return (
      <Text m={5} fontSize="xl">
        No results
      </Text>
    );
  }
  return (
    <Center>
      <TableContainer w="90%">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Title </Th>
              <Th>
                Release Date{" "}
                <button onClick={handleSortDate}>
                  {isSortDate ? <TriangleDownIcon /> : <TriangleUpIcon />}
                </button>
              </Th>
              <Th>
                Rating{" "}
                <button onClick={handleSortRating}>
                  {isSortRating ? <TriangleDownIcon /> : <TriangleUpIcon />}
                </button>
              </Th>
              <Th>
                Votes{" "}
                <button onClick={handleSortVotes}>
                  {isSortVotes ? <TriangleDownIcon /> : <TriangleUpIcon />}
                </button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.results
              .sort(sortMethods[sortState].method)
              .map(
                (
                  { id, title, release_date, vote_average, vote_count },
                  index
                ) => (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Link href={`/movies/${id}`} passHref legacyBehavior>
                        <Text as="a">{title}</Text>
                      </Link>
                    </Td>
                    <Td>{dateFormat(release_date)}</Td>
                    <Td>{vote_average.toFixed(1)}</Td>
                    <Td>{vote_count}</Td>
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
