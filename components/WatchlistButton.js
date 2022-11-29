import { Icon, Button, Center } from "@chakra-ui/react";
import { CgPlayListAdd, CgPlayListCheck } from "react-icons/cg";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function WatchlistButton() {
  const { id } = useRouter().query;
  const { data } = useSWR(`/api/watchlist/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Center m={5}>
      <Button
        mr={5}
        isLoading={!data}
        loadingText="Loading"
        colorScheme={data?.found ? "purple" : "gray"}
        size="sm"
        onClick={() => {
          mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
              method: data?.found ? "DELETE" : "POST",
            })
          );
        }}
      >
        {data?.found ? "Remove from watchlist" : "Add to watchlist"}
      </Button>
      <Icon w={10} h={10} as={data?.found ? CgPlayListCheck : CgPlayListAdd} />
    </Center>
  );
}
