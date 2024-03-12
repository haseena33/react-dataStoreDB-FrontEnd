import styled from '@emotion/styled';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';

interface ArrowProps {
  disabled?: boolean;
}

export const PrevArrow: React.FC<ArrowProps> = ({ disabled = false, ...rest }) => {
  return (
    <StyledArrowBackIos disabled={disabled} {...rest} />
  );
};

export const NextArrow: React.FC<ArrowProps> = ({ disabled = false, ...rest }) => {
  return (
    <StyledArrowForwardIos disabled={disabled} {...rest} />
  );
};

const StyledArrowBackIos = styled(ArrowBackIos)<ArrowProps>`
  color: ${(props) => (props.disabled ? 'gray' : 'black')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const StyledArrowForwardIos = styled(ArrowForwardIos, { shouldForwardProp: (prop) => prop !== 'disabled' })<ArrowProps>`
  color: ${(props) => (props.disabled ? 'gray' : 'black')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const CarouselContainer = styled(Box)`
  margin: 30px;
`;

export const BrandCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  @media (max-width: 1200px) {
    padding: 5px;
  }
`;

export const BrandImage = styled.img`
  width: 100%;
  object-fit: cover;
`;
export const Container = styled(Grid)`
  width: 90%;
 margin:auto;
`;