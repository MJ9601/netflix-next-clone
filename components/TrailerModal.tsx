import { IconButton, Modal, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modalShowState,
  videoSrcState,
  wishListState,
} from "../atoms/generalAtoms";
import { urlForMovieWithId } from "../backend/lib/tbdbRequests";
import { MovieObjectOnPage } from "../typing";
import ReactPalyer from "react-player/youtube";
import { makeStyles } from "@mui/styles";
import {
  AddCircle,
  AddCircleOutline,
  AddCircleTwoTone,
  Close,
  HdTwoTone,
  Pause,
  PauseCircle,
  PlayArrowRounded,
  RemoveCircleOutline,
  RemoveCircleTwoTone,
  VolumeMute,
  VolumeOff,
  VolumeOffTwoTone,
  VolumeUpRounded,
  VolumeUpTwoTone,
} from "@mui/icons-material";

const TrailerModal = () => {
  const videoId = useRecoilValue(videoSrcState);
  const [videoInfo, setVideoInfo] = useState<MovieObjectOnPage | null>(null);
  const [open, setOpen] = useRecoilState(modalShowState);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [wishlist, setWishlist] = useRecoilState(wishListState);
  const [isOnlist, setIsOnlist] = useState(false);

  const handleToggleWishlist = () => {};

  useEffect(() => {
    const getVideoInfo = async () => {
      setVideoInfo(await (await fetch(urlForMovieWithId(videoId))).json());
    };
    if (videoId) getVideoInfo();
  }, [videoId]);

  const releaseDate = new Date(videoInfo?.release_date || Date.now());
  const classes = useStyles();
  return (
    <>
      <CustomeModal open={open} onClose={() => setOpen(false)}>
        <Wrapper>
          <ReactPalyer
            url={
              `https://www.youtube.com/watch?v=${
                videoInfo?.videos?.results?.filter(
                  (element) => element.type == "Trailer"
                )[0]?.key
              }` || ""
            }
            muted={isMuted}
            width="100%"
            height="70%"
            playing={open && isPlaying}
            className={classes.root}
          />

          <Stack
            direction="column"
            spacing={2}
            alignItems="start"
            color={"#fff"}
            py="20px"
            px="30px"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="left"
            >
              <span className={classes.spanGreen}>
                {Math.floor(Number(videoInfo?.vote_average || 0) * 10)}%
                Popularity{" "}
              </span>
              <span className={classes.spanWhite}>
                {releaseDate.toLocaleDateString()}
              </span>
              <HdTwoTone className={classes.spanWhite} />
            </Stack>
            <Stack
              direction="row"
              alignItems="start"
              justifyContent="left"
              sx={(theme) => ({
                gap: "10px",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Typography
                variant="body2"
                component="p"
                width="70%"
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                    width: "98%",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  },
                })}
              >
                {videoInfo?.overview}
              </Typography>
              <Stack
                direction="column"
                spacing={2}
                alignItems="start"
                justifyContent="flex-start"
              >
                <div className="">
                  <span className={classes.spanGray}>Genres: </span>
                  {videoInfo?.genres?.map((genre) => (
                    <span className={classes.spanWh}>{genre.name}, </span>
                  ))}
                </div>
                <div className="">
                  <span className={classes.spanGray}>Original alnguage: </span>
                  <span className={classes.spanWh}>
                    {videoInfo?.original_language}
                  </span>
                </div>
                <div className="">
                  <span className={classes.spanGray}>Total votes: </span>
                  <span className={classes.spanWh}>
                    {videoInfo?.vote_count}
                  </span>
                </div>
              </Stack>
            </Stack>
          </Stack>

          <VideoController>
            <div className={classes.closeWrap}>
              <IconButton onClick={() => setOpen(false)}>
                <Close className={classes.icons} />
              </IconButton>
            </div>
            <div className={classes.controllWrap}>
              <div className="">
                <IconButton onClick={() => setIsPlaying(!isPlaying)}>
                  {!isPlaying ? (
                    <PlayArrowRounded className={classes.icons} />
                  ) : (
                    <Pause className={classes.icons} />
                  )}
                </IconButton>
                <IconButton onClick={() => handleToggleWishlist()}>
                  {isOnlist ? (
                    <RemoveCircleTwoTone className={classes.icons} />
                  ) : (
                    <AddCircleTwoTone className={classes.icons} />
                  )}
                </IconButton>
              </div>
              <div className="">
                <IconButton onClick={() => setIsMuted(!isMuted)}>
                  {!isMuted ? (
                    <VolumeOffTwoTone className={classes.icons} />
                  ) : (
                    <VolumeUpTwoTone className={classes.icons} />
                  )}
                </IconButton>
              </div>
            </div>
          </VideoController>
        </Wrapper>
      </CustomeModal>
    </>
  );
};

export default TrailerModal;

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    width: "100%",
    objectFit: "contain",
  },
  closeWrap: {
    display: "flex",
    justifyContent: "end",
    background: "transparent",
  },
  controllWrap: {
    display: "flex",
    justifyContent: "space-between",
    background: "transparent",
  },
  playWrap: {},
  volumeWrap: {},
  icons: {
    fontSize: "30px",
    color: "#fff",
  },
  spanGreen: {
    fontSize: 14,
    color: "#58D68D",
    fontWeight: 500,
  },
  spanWh: {
    fontSize: 15,
  },
  spanWhite: {
    fontSize: 14,
    fontWeight: 500,
  },
  spanGray: {
    fontSize: 15,
    color: "gray",
  },
});

const CustomeModal = styled(Modal)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
}));

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#111",
  position: "relative",
  padding: 0,
  width: "80%",
  height: "90vh",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));

const VideoController = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "70%",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: "999",
  display: "flex",
  flexDirection: "column",
  padding: "10px 5px",
  justifyContent: "space-between",
  background: "transparent",
}));
