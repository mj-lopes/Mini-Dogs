// Utilizando os conceitos e funções ensinadas (createAsyncSlice, Thunk, localStorage).
// Crie um mini aplicativo utilizando a API do Dogs.
// Crie um formulário para a autenticação do usuário
// Após o usuário ser autenticado, remova o formulário
// e mostre uma lista com as fotos mais recentes
// const api_photos = {
//   url: `https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=3&_user=0`,
//   options: {
//     method: "GET",
//     cache: "no-store",
//   },
// };
// permita que o usuário carregue mais fotos ao clicar em um botão
// crie a funcionalidade de logout

import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Form, PhotosList, Header, LoadBar } from "./components";

function App() {
  const { user, token } = useSelector((state) => state.login);

  function contentHandle() {
    return user.loading || token.loading ? <LoadBar /> : isLoged();
  }

  function isLoged() {
    return user.data ? <PhotosList /> : <Form />;
  }

  return (
    <Principal>
      <Header />
      {contentHandle()}
    </Principal>
  );
}

const Principal = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-height: 90vh;
  max-width: 30rem;
  margin: auto;
`;

export default App;
