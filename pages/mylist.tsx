import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import PageLayout from "../layout/AuthLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { UserInfos } from "../typing";
import VideoCard from "../components/VideoCard";

const Mylist = ({ userInfos }: { userInfos: UserInfos }) => {
  console.log(userInfos);
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>
      <>
        <CustomWrap>
          <Navbar />
          <Container sx={{ paddingTop: "90px" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="start"
              flexWrap="wrap"
              gap="40px"
            >
              {userInfos?.wishlist.map((video) => (
                <VideoCard key={video?.id} info={video} />
              ))}
            </Stack>
          </Container>
        </CustomWrap>
      </>
    </>
  );
};

// Mylist.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Mylist;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req } = ctx;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const userInfos = await (
    await fetch(`${baseUrl}/api/userInfo`, {
      headers: { cookie: String(req.headers.cookie) },
    })
  ).json();

  return {
    props: {
      userInfos,
    },
  };
};

const CustomWrap = styled("div")(({ theme }) => ({
  background: "#111",
  width: "100%",
  minHeight: "100vh",
}));
