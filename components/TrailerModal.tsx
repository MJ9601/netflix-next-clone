import { Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalShowState, videoSrcState } from "../atoms/generalAtoms";
import { urlForMovieWithId } from "../backend/lib/tbdbRequests";
import { MovieObjectOnPage } from "../typing";
import ReactPalyer from "react-player/youtube";
import { makeStyles } from "@mui/styles";
import { PlayArrowRounded } from "@mui/icons-material";

const TrailerModal = () => {
  const [videoId, setVideoId] = useRecoilState(videoSrcState);
  const [videoInfo, setVideoInfo] = useState<MovieObjectOnPage | null>(null);
  const [open, setOpen] = useRecoilState(modalShowState);

  const index = 1;

  useEffect(() => {
    const getVideoInfo = async () => {
      setVideoInfo(await (await fetch(urlForMovieWithId(videoId))).json());
    };
    if (videoId) getVideoInfo();
  }, [videoId]);

  const classes = useStyles();
  return (
    <>
      <CustomeModal open={open} onClose={() => setOpen(false)}>
        <Wrapper>
          <ReactPalyer
            url={
              `https://www.youtube.com/watch?v=${
                videoInfo?.videos?.results?.map(
                  (element) => element.type == "Trailer" && element.key
                )[1]
              }` || ""
            }
            playIcon={<PlayArrowRounded />}
            height="100%"
            width="100%"
            playing={open}
            className={classes.root}
          />
        </Wrapper>
      </CustomeModal>
    </>
  );
};

export default TrailerModal;

const CustomeModal = styled(Modal)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
}));

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#111",
  position: "relative",
  padding: 0,
  width: "70vw",
  height: "80vh",
}));

const VideoTag = styled("video")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
}));

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "fit-content",
    objectFit: "contain",
  },
});
