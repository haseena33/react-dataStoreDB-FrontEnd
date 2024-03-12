import { styled } from "@mui/system";
import { FormGroup, Typography } from "@mui/material";
import { Button, Box } from "@mui/material";


export const PageContainer = styled(Box)`
  background: linear-gradient( #77c3ec, #BF40BF);
  min-height: 105vh;
`;
export const StyledFormGroup = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
export const FormContainer = styled(Box)({
  paddingTop:"10px",
  backgroundImage:""
})
export const OuterContainer = styled(Box)({
  border: "1px solid black",
  padding: "0px",
  margin: "50px auto",
  marginBottom: "10px",
  maxHeight: "900px",
  borderRadius: "15px",
  textAlign: "center",
  backgroundColor:"white",
  width:"70%"
});

export const Horizantal = styled(Box)({
  borderRadius: "15px 15px 0 0",
  color: "white",
  background: "linear-gradient(to right,#322514,#be1558, #e75874, #be1558,#322514)",
  width: "100%",
  borderBottom: "1px solid black",
  paddingTop: "10px",
});

export const CustomButton = styled(Button)({
  padding: "10px",
  width: "500px",
  borderRadius: "50px",
  background: "linear-gradient(to right,#322514,#be1558, #e75874, #be1558,#322514)",
});

export const ButtonGrid = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Type = styled(Typography)({
  textAlign: "left",
});

