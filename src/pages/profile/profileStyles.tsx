import styled from 'styled-components';
import { Grid, Typography } from "@mui/material";

export const InnerContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    border: '1px solid black ',
    padding: '15px',
    margin: '65px',
    height:'auto',
    borderRadius: '15px '

});


export const profileImageStyle = {
    width: 250,
    height: 250,
    borderRadius: '50%',
  marginLeft:'50px'
};

export const StyleTypography = styled(Typography)({

    lineHeight: '2.5',
    fontSize: '1.2rem',
    fontFamily: 'Arial, sans-serif',
});
export const StyleTypographyName = styled(Typography)({
    marginTop: '15px',
    paddingBottom: '30px',
    fontWeight: 'bold',
    fontSize: '2rem',
    fontFamily: 'Arial, sans-serif',
});