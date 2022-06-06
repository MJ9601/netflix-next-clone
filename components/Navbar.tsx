import { Box, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Notifications, Search, Settings } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [darkBg, setDarkBg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setDarkBg(true) : setDarkBg(false);
    });
    window.removeEventListener("scroll", () => {});
  }, []);
  return (
    <CustomeBox darkBg={darkBg}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="left"
        gap="10px"
      >
        <ImageTag src="/images/logo.png" />
        <CustomeButton>Home</CustomeButton>
        <CustomeButton>TV Shows</CustomeButton>
        <CustomeButton>Movies</CustomeButton>
        <CustomeButton>News & Popular</CustomeButton>
        <CustomeButton onClick={() => router.push("/mylist")}>
          My List
        </CustomeButton>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="right"
        gap="4px"
      >
        <IconButton sx={{ color: "#fff" }}>
          <Search />
        </IconButton>
        <CustomeButton>Kids</CustomeButton>
        <IconButton sx={{ color: "#fff" }}>
          <Notifications />
        </IconButton>
        <IconButton onClick={() => router.push("/account")}>
          <Settings sx={{ color: "#fff" }} />
        </IconButton>
        <ImageTag src="/images/face.jpg" isFace onClick={() => signOut()} />
      </Stack>
    </CustomeBox>
  );
};

export default Navbar;

type CustomeBg = {
  darkBg: boolean;
};

const CustomeBox = styled(Box)<CustomeBg>(({ theme, darkBg }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: "0",
  height: "60px",
  backgroundColor: darkBg ? "#000" : "transparent",
  padding: "20px 10px",
  zIndex: "110",
  width: "100%",
  transition: "all .3s ease",
}));

export type ImgType = {
  isFace?: boolean;
};
export const ImageTag = styled("img")<ImgType>(({ theme, isFace }) => ({
  height: !isFace ? "50px" : "25px",
  objectFit: "contain",
  cursor: "pointer",
}));

const CustomeButton = styled("button")(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
  color: "rgba(255,255, 255, .6)",
  transition: "all .3s ease",
  ":hover": {
    color: "#fff",
    letterSpacing: 1,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
