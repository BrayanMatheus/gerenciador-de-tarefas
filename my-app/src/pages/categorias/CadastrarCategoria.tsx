import React, { useState } from "react";
import api from "../../services/api";

function CadastrarCategoria() {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const cadastrar = () => {
    if (!nome) {
      setErro("Preencha o nome da categoria.");
      return;
    }

    api.post("/api/categorias/cadastrar", { nome })
      .then(() => {
        setSucesso("Categoria cadastrada com sucesso!");
        setErro("");
        setNome("");
      })
      .catch(() => setErro("Erro ao cadastrar categoria."));
  };

  return (
    <div>
      <h2>Cadastrar Categoria</h2>
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
      <button onClick={cadastrar}>Cadastrar</button>
      <a href="/categorias">Voltar</a>
    </div>
  );
}

export default CadastrarCategoria;