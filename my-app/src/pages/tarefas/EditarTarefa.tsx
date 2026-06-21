import React, { useEffect, useState } from "react";
import api from "../../services/api";

function EditarCategoria() {
  const id = window.location.pathname.split("/").pop();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    api.get(`/api/categorias/${id}`)
      .then((res) => setNome(res.data.nome))
      .catch(() => setErro("Erro ao carregar categoria."));
  }, []);

  const atualizar = () => {
    if (!nome) {
      setErro("Preencha o nome da categoria.");
      return;
    }

    api.put(`/api/categorias/atualizar/${id}`, { nome })
      .then(() => {
        setSucesso("Categoria atualizada com sucesso!");
        setErro("");
      })
      .catch(() => setErro("Erro ao atualizar categoria."));
  };

  return (
    <div>
      <h2>Editar Categoria</h2>
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
      <button onClick={atualizar}>Salvar</button>
      <a href="/categorias">Voltar</a>
    </div>
  );
}

export default EditarCategoria;