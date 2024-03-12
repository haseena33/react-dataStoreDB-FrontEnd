import { styled } from '@mui/system';
import { Grid, Button, Box } from '@mui/material';

export const FormContainer = styled(Grid)({
    border: '1px solid #ccc',
    borderRadius: '15px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
     maxWidth: '500px',
     

});

export const TitleBox = styled(Box)({
    borderRadius: " 15px 15px 0 0",
    background: 'linear-gradient(105deg,#77c3ec,#BF40BF)',
    padding: "40px",
    
})

export const InnerContainer=styled(Grid)({
    padding:'30px'
})

export const ButtonComponent=styled(Button)({
    background: 'linear-gradient(75deg, #77c3ec, #BF40BF)',
    marginTop:'10px',
    color:'white',
  borderRadius:'50px'
})