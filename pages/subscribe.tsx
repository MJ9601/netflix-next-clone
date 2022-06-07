import { styled } from "@mui/material/styles";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import { red, grey } from "@mui/material/colors";
import MainPageRowSec from "../components/MainPageRowSec";
import AuthLayout from "../layout/AuthLayout";
import { subscribePageLoad } from "../backend/lib/pageLoads";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { Provider } from "next-auth/providers";

const Subscribe = ({
  providers,
  csrfToken,
}: {
  providers: Provider;
  csrfToken: any;
}) => {
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
                component="form"
                method="post"
                action="/api/auth/signin/email"
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <input
                  type="hidden"
                  defaultValue={csrfToken}
                  name="csrfToken"
                />
                <InputTag
                  type="email"
                  placeholder="@example.com"
                  id="email"
                  name="email"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: red["A400"],
                    borderRadius: "0",
                    textTransform: "capitalize",
                    ":hover": {
                      color: red["A400"],
                      backgroundColor: grey["800"],
                    },
                  }}
                >
                  Subscribe/Signin
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

export const getServerSideProps = async (ctx: any) => {
  const { req, res } = ctx;
  const session = await getSession(ctx);
  if (session && res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(ctx),
    },
  };
};

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

export const Logo = styled("img")(({ theme }) => ({
  height: "80px",
  objectFit: "contain",
  cursor: "pointer",
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
  padding: "10px",
  "&:focus": {
    outline: "none",
  },
}));
