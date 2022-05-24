import styled from "@emotion/styled";
import React, { ReactElement } from "react";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  return (
    <AppWrap>
      {children}
      <Footer>footer</Footer>
    </AppWrap>
  );
};

export default AuthLayout;
const AppWrap = styled("div")`
  background-color: #000;
`;

const Footer = styled("footer")`
  margin-top: 20px;
  height: 100px;
  width: 100%;
  padding: 20px;
  color: #fff;
`;
