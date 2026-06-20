import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Usuario } from "../../types";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    api.get("/api/usuarios/listar")
      .then((res) => setUsuarios(res.data))
      .catch(() => setErro("Erro ao carregar usuários."));
  };

  const remover = (id: number) => {
    if (window.confirm("Deseja remover este usuário?")) {
      api.delete(`/api/usuarios/remover/${id}`)
        .then(() => carregarUsuarios())
        .catch(() => setErro("Erro ao remover usuário."));
    }
  };

  return (
    <div>
      <h2>Usuários</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <a href="/usuarios/cadastrar">Cadastrar novo usuário</a>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                <a href={`/usuarios/editar/${u.id}`}>Editar</a>
                {" | "}
                <button onClick={() => remover(u.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;