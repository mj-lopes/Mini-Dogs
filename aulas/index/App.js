import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementar, reduzir } from "./store/contador";
import { login } from "./store/login";
import { autoLogin } from "./store/login";

function App() {
  const { contador } = useSelector((state) => state);
  // const stateModal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ username, password }));
  }

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Total: {contador.total}</h1>
        <button onClick={() => dispatch(incrementar())}>Adicionar</button>
        <button onClick={() => dispatch(reduzir())}>Reduzir</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Login
          <input
            type="text"
            id="username"
            style={{ display: "block" }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            type="password"
            id="senha"
            style={{ display: "block" }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>Enviar</button>
      </form>
    </>
  );
}

export default App;
