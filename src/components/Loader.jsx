import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Loader = ({ message }) => {
  return (
    <LoadingContainer>
      <StyledSpin tip={message ?? "Loading..."} />
    </LoadingContainer>
  );
};

export default Loader;

const LoadingContainer = styled.div.attrs({
  "data-testid": "loading",
})`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
`;

const StyledSpin = styled(Spin)`
  color: white;
`;
