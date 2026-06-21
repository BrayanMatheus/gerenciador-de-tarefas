import { useEffect, useState } from "react";
import api from "../../services/api";
import { Usuario, Categoria } from "../../types";

function EditarTarefa() {
  const id = window.location.pathname.split("/").pop();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [concluida, setConcluida] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const tarefaResponse = await api.get(`/api/tarefas/${id}`);
      const usuariosResponse = await api.get("/api/usuarios/listar");
      const categoriasResponse = await api.get("/api/categorias/listar");

      setTitulo(tarefaResponse.data.titulo);
      setDescricao(tarefaResponse.data.descricao);
      setConcluida(tarefaResponse.data.concluida);
      setUsuarioId(String(tarefaResponse.data.usuarioId));
      setCategoriaId(String(tarefaResponse.data.categoriaId));

      setUsuarios(usuariosResponse.data);
      setCategorias(categoriasResponse.data);
    } catch {
      setErro("Erro ao carregar dados da tarefa.");
    }
  }

  async function editar(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !usuarioId || !categoriaId) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }

    try {
      await api.put(`/api/tarefas/atualizar/${id}`, {
        id: Number(id),
        titulo,
        descricao,
        concluida,
        usuarioId: Number(usuarioId),
        categoriaId: Number(categoriaId)
      });

      setMensagem("Tarefa atualizada com sucesso!");
      setErro("");
    } catch {
      setErro("Erro ao atualizar tarefa.");
    }
  }

  return (
    <div className="container">
      <h2>Editar Tarefa</h2>

      {erro && <p className="error">{erro}</p>}
      {mensagem && <p className="success">{mensagem}</p>}

      <form onSubmit={editar}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        >
          <option value="">Selecione um usuário</option>

          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>

        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={concluida}
            onChange={(e) => setConcluida(e.target.checked)}
          />
          Tarefa concluída
        </label>

        <button type="submit">Salvar alterações</button>
      </form>
    </div>
  );
}

export default EditarTarefa;