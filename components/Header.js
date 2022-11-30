import { Center, Heading } from "@chakra-ui/react";

export default function Header(props) {
  return (
    <Center>
      <Heading as="h1" size="2xl" mb={10}>
        {props.title}
      </Heading>
    </Center>
  );
}
