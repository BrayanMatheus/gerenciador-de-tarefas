import React from "react";

function Navbar() {
  return (
    <nav>
      <h1>Gerenciador de Tarefas</h1>
      <ul>
        <li><a href="/usuarios">Usuários</a></li>
        <li><a href="/categorias">Categorias</a></li>
        <li><a href="/tarefas">Tarefas</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;