import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalShowState } from "../atoms/generalAtoms";
import tbdbRequests from "../backend/lib/tbdbRequests";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import TrailerModal from "../components/TrailerModal";
import PageLayout from "../layout/AuthLayout";
import { MovieRespObj, MoviesObject, MoviesRespObj } from "../typing";
import styled from "@emotion/styled";
import MovieCard from "../components/MovieCard";
import { makeStyles } from "@mui/styles";

const Home = ({ moviesObject }: { moviesObject: MoviesObject }) => {
  const [randomMovie, setRandomMovie] = useState<MovieRespObj | null>(null);

  const [isOpend, setIsOpend] = useRecoilState(modalShowState);

  useEffect(() => {
    setRandomMovie(
      Object.values(moviesObject)[
        Math.floor(Math.random() * Object.values(moviesObject).length)
      ].results[Math.floor(Math.random() * 20)]
    );
  }, [moviesObject]);

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

export const getServerSideProps = async () => {
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

  return {
    props: {
      moviesObject,
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
