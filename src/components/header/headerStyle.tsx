import styled from "styled-components";
import { AppBar } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
width:'100%';
  background-color: #f8f8f8;
  position: sticky;
  top: 0;
  z-index: 1000; /* To ensure it appears above other content */
`;


export const LogoImage = styled.img`
  width: 100px;
  height: 50px;
  mix-blend-mode: multiply;
`;
