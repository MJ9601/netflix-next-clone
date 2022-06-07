import React from "react";
import { styled } from "@mui/material/styles";
import { Link, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Logo } from "./subscribe";

const VerifyRequest = () => {
  const router = useRouter();
  return (
    <>
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
      <CustomeContainer>
        <CustomeStack>
          <Paper
            elevation={8}
            variant="outlined"
            sx={{
              backgroundColor: "rgba(0,0,0,.4)",
              color: "#fff",
              border: "1px solid rgba(255,255,255, .5)",
            }}
          >
            <Stack direction="column" alignItems="center" pt={5} pb={2} px={5}>
              <Typography variant="h6" component="h2" textAlign="center">
                An Email with verification link has been sent to your email
                account
              </Typography>
              <Typography variant="h6" component="h6" mb={8}>
                Click on the link to sgin in
              </Typography>
              <Link
                component="button"
                variant="h5"
                onClick={() => router.push("/")}
              >
                Nexflix clone
              </Link>
              <Typography variant="body2" component="h4" mt={2}>
                Check your spam box if email wasn&apos;t in your inbox
              </Typography>
            </Stack>
          </Paper>
        </CustomeStack>
      </CustomeContainer>
    </>
  );
};

export default VerifyRequest;

export const CustomeContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0,0,0, .9)",
  color: "#fff",
}));

const CustomeStack = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100vw",
  display: "grid",
  placeItems: "center",
}));
