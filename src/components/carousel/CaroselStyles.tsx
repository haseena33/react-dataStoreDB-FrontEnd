import styled from 'styled-components';
import { Box, BoxProps } from '@mui/material';

interface DotProps extends BoxProps {
  active?: boolean;
}

export const CustomArrow = styled(Box)`
  &.next, &.prev {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
  }

  &.next {
    right: 0;
  }

  &.prev {
    left: 0;
  }
`;

export const Dot = styled(Box)<DotProps>`
  width: 8px;
  height: 8px;
  background: ${props => props.active ? '#fff' : '#fff'};
  border-radius: 50%;
  transition: background-color 0.3s ease;
  transform: ${props => props.active ? 'scale(1.5)' : 'scale(1)'};
  margin-left: 5px;
`;

export const StyledDotsContainer = styled(Box)`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 1.125rem;
  text-align: center;
  background: #413839;
  width: auto;
  border-radius: 25px;
`;

