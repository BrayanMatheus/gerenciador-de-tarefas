using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(opt =>
{
    opt.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});
var app = builder.Build();

// RAIZ da API
// GET: /api
app.MapGet("/api", () =>
{
    return Results.Ok("API funcionando");
});

// ---------- ÁREA USUÁRIO ----------

// CADASTRAR
// POST: api/usuarios/cadastrar
app.MapPost("/api/usuarios/cadastrar", async (Usuario usuario, AppDataContext context) =>
{
    context.Usuario.Add(usuario);
    await context.SaveChangesAsync();
    return Results.Created($"/usuarios/{usuario.Id}", usuario);
});

// LISTAR TODOS OS USUÁRIOS
// GET: api/usuarios/listar
app.MapGet("/api/usuarios/listar", async (AppDataContext context) =>
{
    return Results.Ok(await context.Usuario.ToListAsync());
});

// Listar por ID
// GET /api/usuarios/{id}
app.MapGet("/api/usuarios/{id}", async (int id, AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);
    return usuario is not null ? Results.Ok(usuario) : Results.NotFound("Usuário não encontrado.");
});

// Atualizar USUÁRIO POR ID
// PUT: api/usuarios/{id}
app.MapPut("/api/usuarios/atualizar/{id}", async ([FromRoute] int id, [FromBody] Usuario usuarioAtualizado,AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);

    if (usuario == null)
        return Results.NotFound("Usuário não encontrado.");

    usuario.Nome = usuarioAtualizado.Nome;
    usuario.Email = usuarioAtualizado.Email;

    await context.SaveChangesAsync();

    return Results.Ok(usuario);
});

// REMOVER USUÁRIO
// DELETE: api/usuarios/remover/{id}
app.MapDelete("/api/usuarios/remover/{id}", async (int id, AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);

    if (usuario == null)
        return Results.NotFound("Usuário não encontrado.");

    context.Usuario.Remove(usuario);
    await context.SaveChangesAsync();
    return Results.Ok("Usuário removido com sucesso.");
});


// --------- ÁREA CATEGORIAS -----------

// CADASTRAR CATEGORIA
// POST: /api/categorias/cadastrar
app.MapPost("/api/categorias/cadastrar", async (Categoria categoria, AppDataContext context) =>
{
    context.Categoria.Add(categoria);
    await context.SaveChangesAsync();
    return Results.Created($"/categorias/{categoria.Id}", categoria);
});

// LISTAR TODAS AS CATEGORIAS
// GET: api/categorias/listar
app.MapGet("api/categorias/listar", async (AppDataContext context) =>
{
    return Results.Ok(await context.Categoria.ToListAsync());
});

// LISTAR CATEGORIA POR ID
// GET: api/categorias/{id}
app.MapGet("/api/categorias/{id}", async (int id, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);
    return categoria is not null ? Results.Ok(categoria) : Results.NotFound("Categoria não encontrada.");
});

// ATUALIZAR CATEGORIA POR ID
// PUT: /api/categorias/atualizar/{id}
app.MapPut("/api/categorias/atualizar/{id}", async (int id, Categoria categoriaAtualizada, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);

    if (categoria == null)
        return Results.NotFound("Categoria não encontrada.");

    categoria.Nome = categoriaAtualizada.Nome;

    await context.SaveChangesAsync();
    return Results.Ok(categoria);
});

// REMOVER CATEGORIA
// DELETE: /api/categorias/remover/{id}
app.MapDelete("/api/categorias/remover/{id}", async (int id, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);

    if (categoria == null)
        return Results.NotFound("Categoria não encontrada.");

    context.Categoria.Remove(categoria);
    await context.SaveChangesAsync();
    return Results.Ok("Categoria removida com sucesso.");
});

// --------- ÁREA TAREFAS -----------

// Cadastrar tarefa
// POST: /api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", async (TaskItem taskItem, AppDataContext context) =>
{
    var usuarioExiste = await context.Usuario.FindAsync(taskItem.UsuarioId);
    if (usuarioExiste == null)
        return Results.NotFound("Usuário não encontrado.");

    var categoriaExiste = await context.Categoria.FindAsync(taskItem.CategoriaId);
    if (categoriaExiste == null)
        return Results.NotFound("Categoria não encontrada.");

    context.TaskItem.Add(taskItem);
    await context.SaveChangesAsync();
    return Results.Created($"/tarefas/{taskItem.Id}", taskItem);
});

// Listar todas a tarefas
// GET: /api/tarefas/listar
app.MapGet("/api/tarefas/listar", async (AppDataContext context) =>
{
    var tarefas = await context.TaskItem
        .Include(t => t.Usuario)
        .Include(t => t.Categoria)
        .ToListAsync();

    return Results.Ok(tarefas);
});

// Listar tarefas por ID
// Get: /api/tarefas/{id}
app.MapGet("/api/tarefas/{id}", async (int id, AppDataContext context) =>
{
    var tarefa = await context.TaskItem
        .Include(t => t.Usuario)
        .Include(t => t.Categoria)
        .FirstOrDefaultAsync(t => t.Id == id);

    return tarefa is not null ? Results.Ok(tarefa) : Results.NotFound("Tarefa não encontrada.");
});

// Atualizar tarefa por ID
// PUT: /api/tarefas/atualizar/{id}
app.MapPut("/api/tarefas/atualizar/{id}", async (int id, TaskItem taskAtualizado, AppDataContext context) =>
{
    var tarefa = await context.TaskItem.FindAsync(id);

    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    tarefa.Titulo = taskAtualizado.Titulo;
    tarefa.Descricao = taskAtualizado.Descricao;
    tarefa.Concluida = taskAtualizado.Concluida;
    tarefa.UsuarioId = taskAtualizado.UsuarioId;
    tarefa.CategoriaId = taskAtualizado.CategoriaId;

    await context.SaveChangesAsync();
    return Results.Ok(tarefa);
});

// Remover tarefa
// DELETE: /api/tarefas/remover/{id}
app.MapDelete("/api/tarefas/remover/{id}", async (int id, AppDataContext context) =>
{
    var tarefa = await context.TaskItem.FindAsync(id);

    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    context.TaskItem.Remove(tarefa);
    await context.SaveChangesAsync();
    return Results.Ok("Tarefa removida com sucesso.");
});

app.Run();