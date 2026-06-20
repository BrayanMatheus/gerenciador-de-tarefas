export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface TaskItem {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  criadoEm: string;
  usuarioId: number;
  categoriaId: number;
  usuario?: Usuario;
  categoria?: Categoria;
}