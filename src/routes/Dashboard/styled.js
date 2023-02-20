import { Input } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import styled from "styled-components";

const { Search } = Input;

export const StyledHeader = styled(Header)`
  height: 60px;
  background: #7dbcea;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledContent = styled(Content)`
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export const StyledFooter = styled(StyledHeader)`
  background-color: black;
  justify-content: center;
`;

export const StyledSearch = styled(Search).attrs({
  "data-testid": "search-input",
})`
  width: 200px;
`;

export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`;
