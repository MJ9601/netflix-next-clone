import { styled } from "@mui/material/styles";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import { red } from "@mui/material/colors";
import MainPageRowSec from "../components/MainPageRowSec";
import AuthLayout from "../layout/AuthLayout";
import { subscribePageLoad } from "../backend/lib/pageLoads";

const Subscribe = () => {
  return (
    <div>
      <Head>
        <title>Netflix next clone</title>
      </Head>
      <Box
        position={"relative"}
        sx={{ backgroundColor: "#000", color: "#fff" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px="20px"
          position="fixed"
          top={0}
          width="100%"
          zIndex={100}
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
        <ImageTage src="/images/background.jpg" />
        <Wrapper>
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
        <Container>
          {subscribePageLoad.map((load, index) => (
            <MainPageRowSec
              key={index}
              load={load.load}
              isleft={load.isleft}
              url={load.url}
            />
          ))}
        </Container>
      </Box>
    </div>
  );
};

Subscribe.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>;
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