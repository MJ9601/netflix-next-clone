import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalShowState, wishListState } from "../atoms/generalAtoms";
import tbdbRequests from "../backend/lib/tbdbRequests";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrailerModal from "../components/TrailerModal";
import PageLayout from "../layout/AuthLayout";
import { MovieRespObj, MoviesObject, UserInfos } from "../typing";
import styled from "@emotion/styled";
import MovieCard from "../components/MovieCard";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Home = ({
  moviesObject,
  userInfos,
}: {
  moviesObject: MoviesObject;
  userInfos: UserInfos;
}) => {
  const [randomMovie, setRandomMovie] = useState<MovieRespObj | null>(null);
  const setWishlist = useSetRecoilState(wishListState);

  const isOpend = useRecoilValue(modalShowState);

  useEffect(() => {
    setRandomMovie(
      Object.values(moviesObject)[
        Math.floor(Math.random() * Object.values(moviesObject).length)
      ].results[Math.floor(Math.random() * 20)]
    );
    setWishlist(userInfos.wishlist);
  }, []);
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      <Box position="relative">
        <Navbar />
        <Hero movie={randomMovie} />
        {isOpend && <TrailerModal />}
        <Stack direction="column" mt={-20} alignItems="start" px="20px">
          {Object.values(moviesObject).map((movielist, index) => (
            <>
              <Typography variant="h6" fontWeight={500} zIndex={99} pl="20px">
                {Object.keys(moviesObject)[index]}
              </Typography>
              <CustomeStack key={index}>
                {movielist.results.map((movie) => (
                  <MovieCard key={movie.id} info={movie} />
                ))}
              </CustomeStack>
            </>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const rowHeadLines = Object.keys(tbdbRequests);
  const rowValueResp = await Promise.all(
    Object.values(tbdbRequests).map((url) => fetch(url))
  );
  const rowValues = await Promise.all(
    rowValueResp.map((element) => element.json())
  );
  const moviesObject = rowHeadLines.reduce((acc, headline, index) => {
    return { ...acc, [headline]: rowValues[index] };
  }, {});

  const { req } = ctx;
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const userInfos = await (
    await fetch(`${baseUrl}/api/userInfo`, {
      headers: {
        cookie: String(req.headers.cookie),
      },
    })
  ).json();

  return {
    props: {
      moviesObject,
      userInfos,
    },
  };
};

const CustomeStack = styled.div`
  display: flex;
  margin: 10px auto;
  overflow-x: auto;
  justify-content: left;
  padding: 10px;
  align-items: center;
  gap: 10px;
  width: 95%;
  z-index: 101;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// const useStyles = makeStyles(() => ({
//   customeDiv: {
//     display: "flex",
//     overflowX: "auto",
//     padding: "20px",
//     width: "100%",
//     justifyContent: "start",
//     gap: "4px",
//     WebkitOverflowScrolling: "",
//   },
// }));
