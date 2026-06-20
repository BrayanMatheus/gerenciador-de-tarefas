import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Categoria } from "../../types";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = () => {
    api.get("/api/categorias/listar")
      .then((res) => setCategorias(res.data))
      .catch(() => setErro("Erro ao carregar categorias."));
  };

  const remover = (id: number) => {
    if (window.confirm("Deseja remover esta categoria?")) {
      api.delete(`/api/categorias/remover/${id}`)
        .then(() => carregarCategorias())
        .catch(() => setErro("Erro ao remover categoria."));
    }
  };

  return (
    <div>
      <h2>Categorias</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <a href="/categorias/cadastrar">Cadastrar nova categoria</a>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>
                <a href={`/categorias/editar/${c.id}`}>Editar</a>
                {" | "}
                <button onClick={() => remover(c.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCategorias;