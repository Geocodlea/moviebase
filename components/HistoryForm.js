import { Formik, Field } from "formik";
import {
  Text,
  Box,
  Button,
  Select,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function HistoryForm() {
  const { data } = useSWR(`/api/history`);
  const { mutate } = useSWRConfig();

  return (
    <Flex align="center" justify="center" direction="column">
      <Text mt={10} ml={10} mr={10} fontSize="xl">
        You have the option to edit the date, add the location or add your
        personal rating for the selected movie.
      </Text>
      <Box p={6} w={500}>
        <Formik
          initialValues={{
            title: "",
            date: "",
            location: "",
            rating: "",
          }}
          onSubmit={(values) => {
            fetcher(`/api/history/${values.title}`, {
              method: "PUT",
              body: JSON.stringify(values),
            });

            mutate(`/api/history`, () => fetcher(`/api/history`));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Field as={Select} id="title" name="title" variant="filled">
                    <option>-- Select Title --</option>
                    {data.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </Field>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Field
                    as={Input}
                    id="date"
                    name="date"
                    type="date"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Field
                    as={Input}
                    id="location"
                    name="location"
                    type="string"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="rating">Rating</FormLabel>
                  <Field
                    as={Input}
                    id="rating"
                    name="rating"
                    type="number"
                    variant="filled"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Submit
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
