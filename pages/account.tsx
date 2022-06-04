import { Stack } from "@mui/material";
import Head from "next/head";
import React from "react";
import { styled } from "@mui/material/styles";
import { ImageTag } from "../components/Navbar";
import { Logo } from "./subscribe";
import { signOut } from "next-auth/react";
import { CustomeContainer } from "./verifyRequest";

const Account = () => {
  return (
    <div>
      <Head>
        <title>account</title>
      </Head>
      <>
        <CustomeContainer>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px="20px"
            width="100%"
            mb="30px"
          >
            <Logo src="/images/logo.png" />
            <ImageTag src="/images/face.jpg" isFace onClick={() => signOut()} />
          </Stack>
        </CustomeContainer>
      </>
    </div>
  );
};

export default Account;
