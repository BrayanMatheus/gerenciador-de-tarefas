using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// FEITO ATÉ AGORA
// - Estrutura inicial criada
// - Models (Usuario, Categoria, TaskItem)  -- clases e tabelas
// - AppDataContext configurado
// - Banco SQLite criado
// - Primeira Migration aplicada
// - Conexão API ↔ Banco funcionando

// PROXIMOS PASSOS
// - fazer o CRUD das tabelas Usuario, Categorias, TaskItem
// - testar endpoints da api
// - ajustar relacionamentos se necessário

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

// POST: /api/tarefa/cadastrar
app.MapPost("/api/tarefa/cadastrar", ([FromBody] TaskItem tarefa, [FromServices] AppDataContext ctx) =>
{
    tarefa.CriadoEm = DateTime.Now;
    ctx.TaskItem.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created($"/api/tarefa/{tarefa.Id}", tarefa);
});

app.Run();

