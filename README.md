📋 Gerenciador de Tarefas

Sistema de gerenciamento de tarefas desenvolvido com C# .NET 8 no backend e React com TypeScript no frontend.
👥 Identificação do Projeto

Curso: Análise e Desenvolvimento de Sistemas

Turma: 3º semestre
Integrantes

Brayan Matheus de Godoi Santos

Victor Hugo Ribeiro da Silva
📌 Resumo

Este projeto tem como objetivo o desenvolvimento de um sistema de gerenciamento de tarefas, utilizando tecnologias modernas como C# com .NET 8, Entity Framework e banco de dados SQLite no backend, e React com TypeScript no frontend. A proposta é permitir que usuários organizem suas atividades de forma prática, por meio do cadastro, acompanhamento e gerenciamento de tarefas. O sistema conta com categorias para melhor organização das informações, além de possibilitar a associação entre usuários e suas respectivas tarefas. A aplicação foi desenvolvida seguindo o padrão de API REST com consumo direto pelo frontend, simulando um cenário real de desenvolvimento de software.
🚀 Funcionalidades

✔️ Cadastro de usuários

✔️ Cadastro de categorias

✔️ Cadastro de tarefas

✔️ Listagem de registros

✔️ Atualização de dados

✔️ Exclusão de dados

✔️ Associação de tarefas a usuários

✔️ Organização por categorias

✔️ Interface web com navegação entre telas

✔️ Validações de campos obrigatórios
🔍 Descrição das Funcionalidades
👤 Usuários

Permite o cadastro de usuários no sistema, possibilitando que cada um gerencie suas próprias tarefas.
🗂️ Categorias

Permite a criação de categorias para organizar as tarefas, como trabalho, estudos ou pessoal.
📝 Tarefas

Permite cadastrar tarefas com título, descrição e status de conclusão, vinculando-as a um usuário e a uma categoria.
🔄 Gerenciamento

Inclui operações completas de CRUD (criar, listar, atualizar e excluir), garantindo controle total dos dados tanto pela API quanto pela interface web.
🔗 Relacionamentos

As tarefas estão associadas a usuários e categorias, tornando o sistema funcional e organizado.
🧩 Modelagem do Sistema

O sistema é composto por três entidades principais:

👤 Usuário

📝 Tarefa

🗂️ Categoria
🔗 Relacionamentos

Um usuário pode ter várias tarefas

Uma categoria pode ter várias tarefas

Cada tarefa pertence a um único usuário e a uma única categoria
🛠️ Tecnologias Utilizadas
Backend:

C# (.NET 8 - Minimal API)
Entity Framework
SQLite

Frontend:

React com TypeScript
React Router DOM
Axios
CSS puro

Ferramentas:

GitHub

🔗 Repositório

O projeto está disponível no GitHub para avaliação:

👉 https://github.com/BrayanMatheus/gerenciador-de-tarefas.git
🤖 Uso de IA

Ferramenta utilizada: ChatGPT, Claude (Anthropic)

Forma de uso:

A ferramenta foi utilizada para auxiliar na elaboração da documentação do projeto, incluindo a estruturação do README, organização das funcionalidades e geração dos textos descritivos. Além disso, foi utilizada como apoio no desenvolvimento do código, auxiliando na resolução de erros e na implementação das funcionalidades.

Revisões realizadas:

A equipe revisou todo o conteúdo gerado, ajustando a linguagem, validando as informações e garantindo coerência com o projeto desenvolvido.
