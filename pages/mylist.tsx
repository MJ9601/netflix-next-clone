import { Box } from "@mui/material";
import Head from "next/head";
import React, { ReactElement } from "react";
import Navbar from "../components/Navbar";
import PageLayout from "../layout/AuthLayout";

const Mylist = () => {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>
      <Box position="relative">
        <Navbar />
      </Box>
    </>
  );
};

Mylist.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Mylist;
