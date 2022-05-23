import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { pink, red } from "@mui/material/colors";
import MainPageRowSec from "../components/MainPageRowSec";

const Subscribe = () => {
  return (
    <div>
      <Head>
        <title>Netflix next clone</title>
      </Head>
      <Box position={"relative"} sx={{ backgroundColor: "#333" }}>
        <ImageTage src="/images/background.jpg" />
        <Wrapper>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px="20px"
            position="sticky"
            top={0}
          >
            <Logo src="/images/logo.png" />
            <Button
              variant="contained"
              sx={{
                backgroundColor: red["A400"],
                ":hover": { background: red["A400"] },
              }}
            >
              sign in
            </Button>
          </Stack>
          <Center>
            <Stack direction="column" spacing={2}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={600}
                textAlign="center"
              >
                Unilimited movies, TV shows, and more
              </Typography>
              <Typography
                variant="h6"
                component="h5"
                fontWeight={500}
                textAlign="center"
              >
                Watch anywhere. Cancel anytime.
              </Typography>
              <Typography
                variant="body1"
                component="p"
                fontWeight={500}
                textAlign="center"
              >
                Subscribe for your membership Now!
              </Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <InputTag type="email" placeholder="@example.com" />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: red["A400"],
                    borderRadius: "0",
                    ":hover": { backgroundColor: red["A400"] },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Center>
        </Wrapper>
        <Container sx={{ background: red[800] }}>
          <MainPageRowSec
            load={{
              headline: "Enjoy on your TV",
              content: "Watch on Smart TVs, Xbox, Bluray players,and more.",
            }}
            isleft
            url="/images/tv.jpg"
          />
        </Container>
      </Box>
    </div>
  );
};

export default Subscribe;

const ImageTage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  objectFit: "cover",
}));

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: "0",
  left: "0",
  backgroundColor: "rgba(0, 0, 0, .7)",
  color: "#fff",
}));

const Logo = styled("img")(({ theme }) => ({
  height: "80px",
  objectFit: "contain",
}));

const Center = styled("div")(() => ({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
}));

const InputTag = styled("input")(() => ({
  background: "#fff",
  border: "none",
  fontSize: "20px",
  padding: "9px",
  "&:focus": {
    outline: "none",
  },
}));
