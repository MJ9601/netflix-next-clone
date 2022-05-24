import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { IMAGE_BASE_URL } from "../backend/lib/tbdbRequests";
import { MovieRespObj } from "../typing";
import { styled as MuiSyled } from "@mui/material/styles";
import { InfoOutlined, PlayArrow, PlayArrowRounded } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { modalShowState } from "../atoms/generalAtoms";

const Hero = ({ movie }: { movie: MovieRespObj }) => {
  const [show, setShow] = useRecoilState(modalShowState);
  return (
    <Box position="relative" width="100%" height="100vh">
      <ImageTag src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`} />
      <Wrapper>
        <Box position="absolute" bottom="30%" width="100%" px="40px">
          <Typography
            variant="h2"
            component="h1"
            fontWeight={700}
            textAlign="left"
            mb="20px"
          >
            {movie?.title || movie?.name || movie?.original_title}
          </Typography>
          <Typography_ variant="h6" fontWeight={400} width="70%">
            {movie?.overview}
          </Typography_>
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
              onClick={() => setShow(true)}
            >
              More Info
            </CustomeButton>
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

const Typography_ = MuiSyled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "17px",
    width: "90%",
    height: "200px",
    overflow: "auto",
  },
}));

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
