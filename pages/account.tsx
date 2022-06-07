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
import { blue, green, grey, red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { UserInfos } from "../typing";

const timeConverter = (time?: string) => {
  if (time) {
    const updatedTime: string[] = time.split("-");
    updatedTime[1] = String(`0${Number(time.split("-")[1]) + 1}`);
    const dueTime = new Date(updatedTime.join("-"));
    return dueTime;
  }
  return null;
};

const Account = ({ userInfos }: { userInfos: UserInfos }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dueTime = timeConverter(userInfos?.updatedAt);
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
            <Logo src="/images/logo.png" onClick={() => router.push("/")} />
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
                    Your next billing date is{" "}
                    <Typography
                      variant="body2"
                      component="span"
                      sx={(theme) => ({ color: green[600] })}
                    >
                      {userInfos.updatedAt && dueTime?.toDateString()}
                    </Typography>
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
                    {userInfos.plan}
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
                <CustomeLink onClick={() => router.push("/plans")}>
                  Change plan
                </CustomeLink>
              </Grid>
            </Grid>
          </Container>
        </CustomeContainer>
      </>
    </div>
  );
};

export default Account;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req } = ctx;

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const userInfos = await (
    await fetch(`${baseUrl}/api/userInfo`, {
      headers: {
        cookie: String(req.headers.cookie),
      },
    })
  ).json();

  if (!userInfos)
    return {
      props: {
        userInfos: null,
      },
    };

  return { props: { userInfos } };
};

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
