import styled from "@emotion/styled";
import { Box, Container, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <AppWrap>
      {children}
      <Footer>
        <ImageLogo src="/images/logo.png" />
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          })}
        >
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="start"
            gap="5px"
            mx="auto"
            width="180px"
          >
            <CustomeButton>Home</CustomeButton>
            <CustomeButton>TV shows</CustomeButton>
            <CustomeButton>Movies</CustomeButton>
            <CustomeButton>News & Popular</CustomeButton>
            <CustomeButton>My List</CustomeButton>
          </Stack>
          <Stack
            direction="column"
            alignItems="start"
            justifyContent="start"
            gap="5px"
            mx="auto"
            width="180px"
          >
            <CustomeButton>Contact Us</CustomeButton>
            <CustomeButton>Policy</CustomeButton>
            <CustomeButton>Netflix for Kids</CustomeButton>
          </Stack>
        </Box>
      </Footer>
      <CopyRightTag>
        <Typography variant="body2" textAlign="center">
          This website is only a demonstration of the developer&apos;s
          capabilities NOTHING more!
        </Typography>
      </CopyRightTag>
    </AppWrap>
  );
};

export default PageLayout;
const AppWrap = styled("div")`
  background-color: #000;
  color: #fff;
`;

const Footer = styled(Container)`
  margin-top: 20px;
  height: fit-content;
  width: 100%;
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageLogo = styled("img")`
  width: 250px;
  height: fit-content;
`;
const CustomeButton = styled("button")(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
  color: "rgba(255,255, 255, .6)",
  transition: "all .3s ease",
  padding: "0 25px",
  ":hover": {
    color: "#fff",
    letterSpacing: 1,
  },
}));

const CopyRightTag = styled("div")`
  width: 100%;
  background-color: #000;
  color: #fff;
  display: grid;
  place-items: center;
  padding: 15px 10px;
`;
