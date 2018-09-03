import styled from 'styled-components';
import { keyframes } from 'styled-components';

const scale = keyframes`
  100% { transform: scale(1); }
`;

const TokenOption = styled.li`
  animation: ${scale} .3s ease forwards;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  transform: scale(0);
`;

export default TokenOption;
