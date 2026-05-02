using API.Data;
using API.Models;
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

// Teste para ver se está conectado com o banco
app.MapGet("/usuarios", (AppDataContext db) =>
{
    return db.Usuario.ToList();
});

app.Run();
