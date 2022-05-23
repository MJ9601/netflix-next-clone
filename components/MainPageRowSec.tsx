import { Stack } from "@mui/material";
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
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      
    </Stack>
  );
};

export default MainPageRowSec;
