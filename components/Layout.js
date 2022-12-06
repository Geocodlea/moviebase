import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
  Text,
  useColorMode,
  DarkMode,
  Flex,
  Image,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const MenuItem = ({ selected, href, children, ...props }) => (
  <DarkMode>
    <Link href={href} passHref legacyBehavior>
      <Button
        fontSize={["xs", "sm", "md", "lg", "xl"]}
        color={selected === href ? "gray" : "white"}
        as="a"
        variant="link"
        {...props}
      >
        {children}
      </Button>
    </Link>
  </DarkMode>
);

function Header({ selected }) {
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bgGradient="linear(to-t, blue.600, blue.800)">
      <Container>
        <Stack
          as="nav"
          direction={["column", , "row"]}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">
                <img src="/images/logo.svg" width="60" />
              </Heading>
            </MenuItem>

            <Box display={["block", , "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={["column", , "row"]}
            justify="start"
            align={["start", , "center"]}
            display={[isOpen ? "flex" : "none", , "flex"]}
            spacing={4}
          >
            <MenuItem selected={selected} href="/">
              Home
            </MenuItem>
            <MenuItem selected={selected} href="/search">
              Search
            </MenuItem>
            <MenuItem selected={selected} href="/watchlist">
              Watchlist
            </MenuItem>
            <MenuItem selected={selected} href="/history">
              History
            </MenuItem>
            <MenuItem selected={selected} href="/toprated">
              Top Rated
            </MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Box>

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <MenuItem
              selected={selected}
              href="/recommendations"
              variant="outline"
            >
              Recommendations
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ selected, title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header selected={selected} />
          <Box as="main" h="full">
            <Center>
              <Heading as="h1" size="2xl" mb={10}>
                {title}
              </Heading>
            </Center>
            {children}
          </Box>
          <Flex align="center" px={3}>
            <Text fontSize="md">
              This website uses the TMDB API but is not endorsed or certified by{" "}
              <Link href="https://www.themoviedb.org/">
                <Image
                  display="inline"
                  src="/images/logoTMDB.svg"
                  width={8}
                  alt="TMDB logo"
                />
              </Link>
            </Text>
            <Spacer />
            <Text fontSize="md">&#169; Created by George Anton</Text>
          </Flex>
        </VStack>
      </Grid>
    </>
  );
}
