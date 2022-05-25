import { Box } from "@mui/material";
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
      <Box position="relative" height="200vh">
        <Navbar />
        <Hero movie={randomMovie} />
        {isOpend && <TrailerModal />}
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
