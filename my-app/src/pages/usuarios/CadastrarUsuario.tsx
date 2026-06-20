import React, { useState } from "react";
import api from "../../services/api";

function CadastrarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const cadastrar = () => {
    if (!nome || !email) {
      setErro("Preencha todos os campos.");
      return;
    }

    api.post("/api/usuarios/cadastrar", { nome, email })
      .then(() => {
        setSucesso("Usuário cadastrado com sucesso!");
        setErro("");
        setNome("");
        setEmail("");
      })
      .catch(() => setErro("Erro ao cadastrar usuário."));
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={cadastrar}>Cadastrar</button>
      <a href="/usuarios">Voltar</a>
    </div>
  );
}

export default CadastrarUsuario;