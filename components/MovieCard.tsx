import { Box, Typography } from "@mui/material";
import React from "react";
import { IMAGE_BASE_URL } from "../backend/lib/tbdbRequests";
import { MovieRespObj } from "../typing";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const MovieCard = ({ info }: { info: MovieRespObj }) => {
  const router = useRouter();
  return (
    <Box onClick={() => router.push(`/video/${String(info.id)}`)}>
      <ImageTag src={`${IMAGE_BASE_URL}${info?.backdrop_path}`} />
    </Box>
  );
};

export default MovieCard;

const ImageTag = styled("img")(({ theme }) => ({
  width: "180px",
  objectFit: "contain",
  cursor: "pointer",
  transition: "all .3s ease-in-out",
  borderRadius: "3px",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));
