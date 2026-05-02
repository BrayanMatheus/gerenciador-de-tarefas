using System;

namespace API.Models;

public class TaskItem
{
public int Id { get; set; }
public string? Titulo { get; set; }
public string? Descricao { get; set; }
public bool Concluida { get; set; }
public DateTime CriadoEm { get; set; } = DateTime.Now;

public int UsuarioId { get; set; }
public Usuario? Usuario { get; set; }
public int CategoriaId { get; set; }
public Categoria? Categoria { get; set; }
}
