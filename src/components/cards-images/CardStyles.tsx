import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export const CarouselContainer = styled(Box)`
 
  && {
    display: block !important;
  }
`;

export const Cart = styled(Box)`
margin-top:10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  padding: 15px ;
  transition: transform 0.3s ease-in-out;
 
  &:hover {
    transform: scale(1.0);
  }
  @media (max-width: 1200px) {
    padding: 5px;
  }
`;

export const CardsImage = styled.img`
width: 100%;
object-fit: cover;
  padding-left: 0px;
  transition: transform 0.3s ease-in-out;
   &:hover {
    transform: scale(0.98);
  }
  @media (max-width: 600px) {
    max-height: 130px;
    max-width : 100px
  }
  @media (min-width: 601px) and (max-width:900px) {
    max-height: 200px;
    max-width : 150px
  }
`;

export const NextArrow = styled(ArrowForwardIos)`
  color: #333;
  position: absolute;
  top: 3px;
right:0;
left:unset;
  &:hover {
    color: #555;
  }
`;

export const PrevArrow = styled(ArrowBackIos)`
  color: #333;
  position: absolute;
  top: 3px;
  right: 40px;
  left: unset; 
  &:hover {
    color: #555;
  }
`;

export const Container = styled(Grid)`
  width: 90%;
 margin:auto;
`;