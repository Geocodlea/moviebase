import { CalendarIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function HistoryButton({ movieId }) {
  const id = useRouter().query.id || movieId;
  const { data } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={data?.found ? "Remove from history" : "Add to history"}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? "blue" : "gray"}
        size="sm"
        onClick={() => {
          if (!data?.found) {
            mutate(`/api/watchlist/${id}`, () =>
              fetcher(`/api/watchlist/${id}`, {
                method: "DELETE",
              })
            );

            mutate(`/api/watchlist`, () => fetcher(`/api/watchlist`));
          }
          mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
              method: data?.found ? "DELETE" : "POST",
            })
          );
        }}
      >
        <CalendarIcon />
      </IconButton>
    </Tooltip>
  );
}
