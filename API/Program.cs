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

app.MapPost("/usuarios", async (Usuario usuario, AppDataContext context) =>
{
    context.Usuario.Add(usuario);
    await context.SaveChangesAsync();
    return Results.Created($"/usuarios/{usuario.Id}", usuario);
});

app.MapGet("/usuarios", async (AppDataContext context) =>
{
    return Results.Ok(await context.Usuario.ToListAsync());
});

app.MapGet("/usuarios/{id}", async (int id, AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);
    return usuario is not null ? Results.Ok(usuario) : Results.NotFound("Usuário não encontrado.");
});

app.MapPut("/usuarios/{id}", async (int id, Usuario usuarioAtualizado, AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);

    if (usuario == null)
        return Results.NotFound("Usuário não encontrado.");

    usuario.Nome = usuarioAtualizado.Nome;
    usuario.Email = usuarioAtualizado.Email;

    await context.SaveChangesAsync();
    return Results.Ok(usuario);
});

app.MapDelete("/usuarios/{id}", async (int id, AppDataContext context) =>
{
    var usuario = await context.Usuario.FindAsync(id);

    if (usuario == null)
        return Results.NotFound("Usuário não encontrado.");

    context.Usuario.Remove(usuario);
    await context.SaveChangesAsync();
    return Results.Ok("Usuário removido com sucesso.");
});


// CATEGORIAS
app.MapPost("/categorias", async (Categoria categoria, AppDataContext context) =>
{
    context.Categoria.Add(categoria);
    await context.SaveChangesAsync();
    return Results.Created($"/categorias/{categoria.Id}", categoria);
});

app.MapGet("/categorias", async (AppDataContext context) =>
{
    return Results.Ok(await context.Categoria.ToListAsync());
});

app.MapGet("/categorias/{id}", async (int id, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);
    return categoria is not null ? Results.Ok(categoria) : Results.NotFound("Categoria não encontrada.");
});

app.MapPut("/categorias/{id}", async (int id, Categoria categoriaAtualizada, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);

    if (categoria == null)
        return Results.NotFound("Categoria não encontrada.");

    categoria.Nome = categoriaAtualizada.Nome;

    await context.SaveChangesAsync();
    return Results.Ok(categoria);
});

app.MapDelete("/categorias/{id}", async (int id, AppDataContext context) =>
{
    var categoria = await context.Categoria.FindAsync(id);

    if (categoria == null)
        return Results.NotFound("Categoria não encontrada.");

    context.Categoria.Remove(categoria);
    await context.SaveChangesAsync();
    return Results.Ok("Categoria removida com sucesso.");
});

app.Run();
