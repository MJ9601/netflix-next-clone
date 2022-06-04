import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import { styled } from "@mui/material/styles";
import { ImageTag } from "../components/Navbar";
import { Logo } from "./subscribe";
import { signOut, useSession } from "next-auth/react";
import { CustomeContainer } from "./verifyRequest";
import { FileCopyOutlined } from "@mui/icons-material";
import { blue, grey, red } from "@mui/material/colors";
import { useRouter } from "next/router";

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>account</title>
      </Head>
      <>
        <CustomeContainer>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px="20px"
            width="100%"
            mb="30px"
          >
            <Logo src="/images/logo.png" />
            <ImageTag src="/images/face.jpg" isFace onClick={() => signOut()} />
          </Stack>
          <Container>
            <Stack direction="column">
              <Stack direction="row" alignItems="center" gap="20px">
                <Typography variant="h4">Account</Typography>
                <Stack direction="row" alignItems="center" gap="10px">
                  <FileCopyOutlined sx={{ color: red[800] }} />
                  <CustomeTypo>date</CustomeTypo>
                </Stack>
              </Stack>
            </Stack>
            <CustomeDivider />
            <Grid container spacing={2}>
              <Grid item sm={4} xs={6}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ color: grey[600] }}
                  pb="7px"
                >
                  Membership & Billing
                </Typography>
                <Button
                  sx={{
                    color: grey[700],
                    backgroundColor: "#fff",
                    textTransform: "capitalize",
                    borderRadius: "0",
                  }}
                >
                  Cancel Membership
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body2" component="p">
                  {session?.user?.email}
                </Typography>
                <CustomeDivider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Typography variant="body2" component="p">
                    Your next billing date is {"date"}
                  </Typography>
                  <Stack direction="column" alignItems="end" gap="2px">
                    <CustomeLink>Manage Payment info</CustomeLink>
                    <CustomeLink>Add backup payment method</CustomeLink>
                    <CustomeLink>Billing Details</CustomeLink>
                    <CustomeLink>Change billing day</CustomeLink>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <CustomeDivider />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" sx={{ color: grey[600] }}>
                  Plan Details
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" component="p">
                    Premium
                  </Typography>
                  <CustomeLink onClick={() => router.push("/plans")}>
                    Change plan
                  </CustomeLink>
                </Stack>
              </Grid>
            </Grid>
            <CustomeDivider />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" sx={{ color: grey[600] }}>
                  Settings
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomeLink>Change plan</CustomeLink>
              </Grid>
            </Grid>
          </Container>
        </CustomeContainer>
      </>
    </div>
  );
};

export default Account;

export const CustomeTypo = styled("p")(({ theme }) => ({
  color: grey[600],
  fontSize: "12px",
}));

export const CustomeDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: grey[200],
  marginTop: "12px",
  marginBottom: "22px",
}));

const CustomeLink = styled(Link)(({ theme }) => ({
  color: blue[500],
  fontSize: "13px",
  cursor: "pointer",
}));
