import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const MainPageRowSec = ({
  load,
  url,
  isleft,
}: {
  load: { headline: string; content: string };
  url: string;
  isleft?: boolean;
}) => {
  return (
    <Stack_ direction={isleft ? "row" : "row-reverse"}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography
          variant="h4"
          component="h2"
          fontWeight={700}
          textAlign="center"
        >
          {load.headline}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={500}
          textAlign="center"
        >
          {load.content}
        </Typography>
      </Stack>
      <ImageTag src={url} />
    </Stack_>
  );
};

export default MainPageRowSec;

const ImageTag = styled("img")(({ theme }) => ({
  width: "50%",
  objectFit: "contain",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));

const Stack_ = styled(Stack)(({ theme }) => ({
  padding: "20px 0",
  gap: "20px",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "35px",
    padding: "30px 0",
  },
}));
