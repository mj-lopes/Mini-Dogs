import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { logout } from "../../store/login";

export const Header = () => {
  const dispatch = useDispatch();

  const estaLogado = useSelector((state) => state.login.user.data);
  const loadingUser = useSelector((state) => state.login.user.loading);
  const loadingToken = useSelector((state) => state.login.token.loading);

  const loading = loadingToken || loadingUser;

  return (
    <Container>
      <h1>Dogs Mini</h1>
      <Btn
        isLoading={loading}
        isLoged={estaLogado}
        onClick={() => dispatch(logout())}
      ></Btn>
    </Container>
  );
};

const Btn = styled.button`
  border: 2px solid black;
  width: 16px;
  height: 16px;
  border-radius: 100%;

  cursor: pointer;
  transition: 0.3s;

  background: ${(prop) => (prop.isLoading ? "tomato" : "white")};
  background: ${(prop) => (prop.isLoged ? "green" : "")};
`;

const animeLeft = keyframes`
  from {
    transform: translateX(-30px);
  } 
  to {
    transform: translateX(0px);
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  animation: ${animeLeft} 0.3s forwards;
`;
