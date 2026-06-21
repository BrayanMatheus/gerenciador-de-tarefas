import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { TaskItem } from "../../types";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState<TaskItem[]>([]);
  const [erro, setErro] = useState("");

  async function carregarTarefas() {
    try {
      const response = await api.get("/api/tarefas/listar");
      setTarefas(response.data);
    } catch {
      setErro("Erro ao carregar tarefas.");
    }
  }

  async function removerTarefa(id: number) {
    if (!window.confirm("Deseja remover esta tarefa?")) return;

    try {
      await api.delete(`/api/tarefas/remover/${id}`);
      carregarTarefas();
    } catch {
      setErro("Erro ao remover tarefa.");
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="container">
      <h2>Tarefas</h2>

      <Link to="/tarefas/cadastrar">Cadastrar nova tarefa</Link>

      {erro && <p className="error">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Usuário</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tarefas.length === 0 ? (
            <tr>
              <td colSpan={7}>Nenhuma tarefa cadastrada.</td>
            </tr>
          ) : (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.concluida ? "Concluída" : "Pendente"}</td>
                <td>{tarefa.usuario?.nome || tarefa.usuarioId}</td>
                <td>{tarefa.categoria?.nome || tarefa.categoriaId}</td>
                <td>
                  <Link to={`/tarefas/editar/${tarefa.id}`}>Editar</Link>{" "}
                  <button onClick={() => removerTarefa(tarefa.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaTarefas;