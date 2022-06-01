import styled from "@emotion/styled";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { IMAGE_BASE_URL } from "../backend/lib/tbdbRequests";
import { MovieObjectOnPage, MovieRespObj } from "../typing";
import {
  styled as MuiSyled,
} from "@mui/material/styles";
import {
  Add,
  InfoOutlined,
  PlayArrowRounded,
} from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { modalShowState, videoSrcState } from "../atoms/generalAtoms";

const Hero = ({
  movie,
}: {
  movie: MovieRespObj | null | MovieObjectOnPage;
}) => {
  const [show, setShow] = useRecoilState(modalShowState);
  const [videoId, setVideoId] = useRecoilState(videoSrcState);

  return (
    <Box position="relative" width="100%" height="100vh">
      <ImageTag src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`} />
      <Wrapper>
        <Box position="absolute" bottom="30%" width="100%" px="40px">
          <CustomeTypo
            variant="h2"
            fontWeight={700}
            textAlign="left"
            mb="20px"
            fSize={35}
            fWeight={600}
          >
            {movie?.title || movie?.original_title}
          </CustomeTypo>
          <CustomeTypo
            variant="h6"
            width="70%"
            w="90%"
            fSize="17px"
            champ
            // sx={(theme) => ({
            //   [theme.breakpoints.down("md")]: {
            //     display: "-webkit-box",
            //     fontSize: "17px",
            //     width: "90%",
            //     WebkitLineClamp: 3,
            //     WebkitBoxOrient: "vertical",
            //     overflow: "hidden",
            //     textOverflow: "ellipsis",
            //   },
            // })}
          >
            {movie?.overview}
          </CustomeTypo>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="left"
            mt={2}
          >
            <CustomeButton
              forColor="#000"
              bgColor="#fff"
              startIcon={<PlayArrowRounded fontSize="large" />}
            >
              Play
            </CustomeButton>
            <CustomeButton
              forColor="#fff"
              bgColor="rgba(255,255,255, .3)"
              startIcon={<InfoOutlined />}
              onClick={() => {
                setShow(true);
                setVideoId(movie?.id || "");
              }}
            >
              More Info
            </CustomeButton>
            <IconButton>
              <Add
                sx={{
                  color: "#fff",
                  fontSize: 40,
                  borderRadius: "50%",
                  transition: "all .3s ease",
                  backgroundColor: "rgba(255,255,255, .4)",
                  outline: "2px solid rgba(255,255,255, .4)",
                  ":hover": {
                    outline: "2px solid #fff",
                    backgroundColor: "rgba(255,255, 255, .2)",
                  },
                }}
              />
            </IconButton>
          </Stack>
        </Box>
      </Wrapper>
    </Box>
  );
};

export default Hero;

const ImageTag = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Wrapper = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to top,
    #000,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.5),
    transparent
  );
`;

type TextProps = {
  fSize: string | number;
  fWeight?: string | number;
  w?: string | number;
  champ?: boolean;
};

const CustomeTypo = MuiSyled(Typography)<TextProps>(
  ({ theme, fSize, fWeight, w, champ }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: fSize,
      width: w && w,
      fontWeight: fWeight && fWeight,
      display: champ && "-webkit-box",
      overflow: champ && "hidden",
      textOverflow: champ && "ellipsis",
      WebkitLineClamp: champ && 3,
      WebkitBoxOrient: champ && "vertical",
    },
  })
);

type DivProps = {
  bgColor: string;
  forColor: string;
};

const CustomeButton = MuiSyled(Button)<DivProps>(
  ({ theme, bgColor, forColor }) => ({
    backgroundColor: bgColor,
    color: forColor,
    padding: "7px 20px",
    fontSize: "16px",
    textTransform: "capitalize",
    fontWeight: 500,
    borderRadius: "3px",
    ":hover": {
      color: bgColor,
      outline: `1px solid ${bgColor}`,
    },
  })
);
