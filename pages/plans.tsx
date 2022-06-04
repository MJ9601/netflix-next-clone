import { Check } from "@mui/icons-material";
import { Divider, Stack, Container, Typography, Grid } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { signOut } from "next-auth/react";
import React from "react";
import { ImageTag } from "../components/Navbar";
import { CustomeDivider } from "./account";
import { Logo } from "./subscribe";
import { CustomeContainer } from "./verifyRequest";
import { styled } from "@mui/material/styles";
import GridSection from "../components/GridSection";

const Plans = () => {
  return (
    <>
      <CustomeContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px="20px"
          width="100%"
        >
          <Logo src="/images/logo.png" />
          <ImageTag src="/images/face.jpg" isFace onClick={() => signOut()} />
        </Stack>
        <Divider
          sx={{ backgroundColor: grey[900], mb: "10px", padding: "1px 0" }}
        />
        <Container>
          <Typography variant="h5" component="h1">
            Choose the plan that's right for you
          </Typography>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            pl="10px"
            mt="10px"
            gap="5px"
          >
            <Check sx={{ color: red["A400"] }} />
            <Typography variant="body2" component="p">
              Watch all you want. Ad-free
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            pl="10px"
            gap="5px"
          >
            <Check sx={{ color: red["A400"] }} />
            <Typography variant="body2" component="p">
              Recommendations just for you
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            pl="10px"
            gap="5px"
            mb="20px"
          >
            <Check sx={{ color: red["A400"] }} />
            <Typography variant="body2" component="p">
              Change or cancel your plan anytime
            </Typography>
          </Stack>

          <Stack gap="20px">
            <Grid
              container
              spacing={0.5}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item md={6} xs={12} justifyContent="center"></Grid>
              <Grid item md={2} xs={4} justifyContent="center">
                <CustomeWrap>basic</CustomeWrap>
              </Grid>
              <Grid item md={2} xs={4} justifyContent="center">
                <CustomeWrap>basic</CustomeWrap>
              </Grid>
              <Grid item md={2} xs={4} justifyContent="center">
                <CustomeWrap>basic</CustomeWrap>
              </Grid>
            </Grid>
            <>
              <GridSection />

              <GridSection />
              <GridSection />
            </>
          </Stack>
        </Container>
      </CustomeContainer>
    </>
  );
};

export default Plans;

const CustomeWrap = styled("div")(({ theme }) => ({
  margin: "0 auto",
  width: "100px",
  height: "120px",
  backgroundColor: red["A400"],
  color: "#fff",
  display: "grid",
  placeItems: "center",
  borderRadius: "3px",
  position: "relative",
  ":before": {
    content: "''",
    width: "0",
    height: "0",
    left: "40%",
    top: "100%",
    position: "absolute",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: `20px solid ${red["A400"]}`,
  },
}));
