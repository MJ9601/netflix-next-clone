import { Box } from "@mui/material";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import tbdbRequests, {
  urlForMovieWithId,
} from "../../backend/lib/tbdbRequests";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import TrailerModal from "../../components/TrailerModal";
import { MovieObjectOnPage, MoviesRespObj } from "../../typing";

const VideoPage = ({ movie }: { movie: MovieObjectOnPage }) => {
  return (
    <div>
      <Head>
        <title>{movie?.title || movie?.original_title}</title>
      </Head>
      <Navbar />
      <Box sx={{ color: "#fff" }}>
        <Hero movie={movie} />
        <TrailerModal />
      </Box>
    </div>
  );
};

export default VideoPage;

export const getStaticPaths = async () => {
  const videos = await Promise.all(
    (
      await Promise.all(Object.values(tbdbRequests).map((url) => fetch(url)))
    ).map((element) => element.json())
  );

  const ids: number[] = videos.reduce((acc, videolist: MoviesRespObj) => {
    return [...acc, ...videolist.results.map((video) => video.id)];
  }, []);

  const paths = ids.map((id) => ({
    params: {
      id: String(id),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = urlForMovieWithId(String(params?.id));

  const movie = await (await fetch(url)).json();
  if (!movie) return { notFound: true };

  return {
    props: {
      movie,
    },
    revalidate: 3600 * 60 * 24,
  };
};
