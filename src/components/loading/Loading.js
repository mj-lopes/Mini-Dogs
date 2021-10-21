import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(125%);
  }
`;

export const LoadBar = styled.div`
  height: 2px;
  background: #252525;
  overflow: hidden;
  width: 25%;
  margin: 2rem auto;

  &::after {
    content: "";
    display: block;
    width: 75%;
    height: 2px;
    background: white;
    animation: ${animation} 0.5s linear forwards infinite;
  }
`;
