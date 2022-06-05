import { Check, SvgIconComponent } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import React from "react";

const GridSection = ({
  title,
  values,
  selecter,
  Icons,
}: {
  title: string;
  values?: (string | number)[];
  Icons?: SvgIconComponent[];
  selecter: number;
}) => {
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
            {title}
          </Typography>
        </Grid>

        {values?.map((value, index) =>
          value != "check" ? (
            <GridCol
              key={index}
              value={value}
              active={selecter == index ? true : false}
            />
          ) : (
            <GridCol
              Icon={Check}
              key={index}
              active={selecter == index ? true : false}
            />
          )
        )}
      </Grid>
    </>
  );
};

export default GridSection;

export const GridCol = ({
  value,
  active,
  Icon,
}: {
  value?: string | number;
  Icon?: SvgIconComponent;
  active?: boolean;
}) => {
  return (
    <Grid item md={2} xs={4}>
      {!Icon ? (
        <Typography
          textAlign="center"
          variant="body2"
          component="p"
          sx={{ color: !active ? grey[600] : red["A400"] }}
        >
          {value}
        </Typography>
      ) : (
        <Box display={"flex"} justifyContent="center">
          <Icon sx={{ color: !active ? grey[600] : red["A400"] }} />
        </Box>
      )}
    </Grid>
  );
};
