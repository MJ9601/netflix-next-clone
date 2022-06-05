import { Check } from "@mui/icons-material";
import {
  Divider,
  Stack,
  Container,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { ImageTag } from "../components/Navbar";
import { Logo } from "./subscribe";
import { CustomeContainer } from "./verifyRequest";
import { styled } from "@mui/material/styles";
import GridSection from "../components/GridSection";
import { plansInfo } from "../backend/lib/pageLoads";

const converter = (obj: object) =>
  Object.values(obj).map((value) =>
    Object.keys(value).reduce((acc, key, index) => {
      return {
        ...acc,
        [key]: Object.values(obj).map(
          (value) => value[Object.keys(value)[index]]
        ),
      };
    }, {})
  )[0];

const Plans = () => {
  const [selecter, setSelecter] = useState(2);
  const asSorted = converter(plansInfo);
  console.log(asSorted);
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
              mb={1}
            >
              <Grid item md={6} xs={12} justifyContent="center"></Grid>
              {Object.keys(plansInfo).map((name, index) => (
                <Grid item md={2} xs={4} justifyContent="center">
                  <CustomeWrap
                    key={index}
                    onClick={() => setSelecter(index)}
                    active={selecter == index ? true : false}
                  >
                    {name}
                  </CustomeWrap>
                </Grid>
              ))}
            </Grid>
            <>
              {Object.entries(asSorted).map((element, index) => (
                <>
                  <GridSection
                    key={index}
                    title={element[0]}
                    values={element[1] as (string | number)[]}
                    selecter={selecter}
                  />
                  {Object.entries(asSorted).length - index > 1 && (
                    <Divider
                      sx={{ backgroundColor: grey[800], marginTop: "-14px" }}
                    />
                  )}
                </>
              ))}
            </>
          </Stack>

          <Box display="flex" justifyContent="center" mt="20px">
            <CustomButton sx={{ ":hover": { width: "100%" } }}>
              submit
            </CustomButton>
          </Box>
        </Container>
      </CustomeContainer>
    </>
  );
};

export default Plans;

type CustomWrap = {
  active?: boolean;
};

const CustomeWrap = styled("div")<CustomWrap>(({ theme, active }) => ({
  margin: "0 auto",
  width: "100px",
  height: "120px",
  backgroundColor: !active ? red[900] : red["A400"],
  color: "#fff",
  display: "grid",
  placeItems: "center",
  borderRadius: "3px",
  position: "relative",
  cursor: "pointer",
  ":before": {
    content: "''",
    width: "0",
    height: "0",
    left: "40%",
    top: "100%",
    position: "absolute",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: `20px solid ${!active ? red[900] : red["A400"]}`,
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: red["900"],
  transition: "all .7s ease-in-out",
  width: "50%",
  ":hover": {
    color: "#fff",
    backgroundColor: red["A400"],
    transform: "scale(1)",
  },
}));
