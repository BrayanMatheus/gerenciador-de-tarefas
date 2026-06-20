import React, { useEffect, useState } from "react";
import api from "../../services/api";

function EditarUsuario() {
  const id = window.location.pathname.split("/").pop();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    api.get(`/api/usuarios/${id}`)
      .then((res) => {
        setNome(res.data.nome);
        setEmail(res.data.email);
      })
      .catch(() => setErro("Erro ao carregar usuário."));
  }, []);

  const atualizar = () => {
    if (!nome || !email) {
      setErro("Preencha todos os campos.");
      return;
    }

    api.put(`/api/usuarios/atualizar/${id}`, { nome, email })
      .then(() => {
        setSucesso("Usuário atualizado com sucesso!");
        setErro("");
      })
      .catch(() => setErro("Erro ao atualizar usuário."));
  };

  return (
    <div>
      <h2>Editar Usuário</h2>
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
      <button onClick={atualizar}>Salvar</button>
      <a href="/usuarios">Voltar</a>
    </div>
  );
}

export default EditarUsuario;