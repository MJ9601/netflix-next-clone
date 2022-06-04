import { Divider, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const GridSection = () => {
  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12} justifyContent="center">
          <Typography
            variant="body2"
            component="p"
            sx={(theme) => ({
              textAlign: "start",
              [theme.breakpoints.down("md")]: {
                textAlign: "center",
              },
            })}
          >
            Monthly price
          </Typography>
        </Grid>
        <Grid item md={2} xs={4}>
          <Typography
            textAlign="center"
            variant="body2"
            component="p"
            sx={{ color: grey[600] }}
          >
            $50
          </Typography>
        </Grid>
        <Grid item md={2} xs={4}>
          <Typography
            textAlign="center"
            variant="body2"
            component="p"
            sx={{ color: grey[600] }}
          >
            $50
          </Typography>
        </Grid>
        <Grid item md={2} xs={4}>
          <Typography
            textAlign="center"
            variant="body2"
            component="p"
            sx={{ color: grey[600] }}
          >
            $50
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default GridSection;
