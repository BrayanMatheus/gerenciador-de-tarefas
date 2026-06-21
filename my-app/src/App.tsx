import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ListaUsuarios from "./pages/usuarios/ListaUsuarios";
import CadastrarUsuario from "./pages/usuarios/CadastrarUsuario";
import EditarUsuario from "./pages/usuarios/EditarUsuario";
import ListaCategorias from "./pages/categorias/ListaCategorias";
import CadastrarCategoria from "./pages/categorias/CadastrarCategoria";
import EditarCategoria from "./pages/categorias/EditarCategoria";
import ListaTarefas from "./pages/tarefas/ListaTarefas";
import CadastrarTarefa from "./pages/tarefas/CadastrarTarefa";
import EditarTarefa from "./pages/tarefas/EditarTarefa";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/usuarios" element={<ListaUsuarios />} />
        <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
        <Route path="/categorias" element={<ListaCategorias />} />
        <Route path="/categorias/cadastrar" element={<CadastrarCategoria />} />
        <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
        <Route path="/tarefas" element={<ListaTarefas />} />
        <Route path="/tarefas/cadastrar" element={<CadastrarTarefa />} />
        <Route path="/tarefas/editar/:id" element={<EditarTarefa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;