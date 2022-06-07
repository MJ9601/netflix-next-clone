import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { IMAGE_BASE_URL } from "../backend/lib/tbdbRequests";
import { MovieObjectOnPage, MovieRespObj } from "../typing";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const VideoCard = ({ info }: { info: MovieObjectOnPage | MovieRespObj }) => {
  const releaseDate = new Date(info?.release_date || "");
  const router = useRouter();
  return (
    <Card sx={{ backgroundColor: "#000", color: "#fff", maxWidth: "270px" }}>
      <CardMedia
        component="img"
        height="140"
        image={
          `${IMAGE_BASE_URL}${info?.backdrop_path}` ||
          `${IMAGE_BASE_URL}${info?.poster_path}`
        }
      />
      <CardContent sx={{ padding: "2px 5px" }}>
        <Typography variant="body2" color={grey[500]}>
          {releaseDate.toDateString()}
        </Typography>
        <Typography variant="h6" pt="10px">
          {info?.original_title || info?.title || info?.name}
        </Typography>
        <CustomTypo>{info?.overview}</CustomTypo>
        <Stack direction="row" justifyContent="space-between"></Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Play</Button>
        <Button size="small" onClick={() => router.push(`/video/${info?.id}`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default VideoCard;

const CustomTypo = styled("p")(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  fontSize: "14px",
}));
