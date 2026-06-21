import { useEffect, useState } from "react";
import api from "../../services/api";
import { Usuario, Categoria } from "../../types";

function CadastrarTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
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
      const usuariosResponse = await api.get("/api/usuarios/listar");
      const categoriasResponse = await api.get("/api/categorias/listar");

      setUsuarios(usuariosResponse.data);
      setCategorias(categoriasResponse.data);
    } catch {
      setErro("Erro ao carregar usuários e categorias.");
    }
  }

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !usuarioId || !categoriaId) {
      setErro("Preencha os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/api/tarefas/cadastrar", {
        titulo,
        descricao,
        concluida: false,
        usuarioId: Number(usuarioId),
        categoriaId: Number(categoriaId)
      });

      setMensagem("Tarefa cadastrada com sucesso!");
      setErro("");

      setTitulo("");
      setDescricao("");
      setUsuarioId("");
      setCategoriaId("");
    } catch {
      setErro("Erro ao cadastrar tarefa.");
    }
  }

  return (
    <div className="container">
      <h2>Cadastrar Tarefa</h2>

      {erro && <p className="error">{erro}</p>}
      {mensagem && <p className="success">{mensagem}</p>}

      <form onSubmit={cadastrar}>
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

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarTarefa;