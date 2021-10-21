import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { login } from "../../store/login";
import { Input, Button } from "../../components";

export const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <FormEl onSubmit={handleSubmit}>
      <Input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      >
        Login
      </Input>
      <Input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      >
        Senha
      </Input>
      <Button>Entrar</Button>
    </FormEl>
  );
};

const animeLeft = keyframes`
  from {
    transform: translateX(-30px);
  } 
  to {
    transform: translateX(0px);
  }
`;

const FormEl = styled.form`
  width: 100%;

  animation: ${animeLeft} 0.3s forwards;
`;
