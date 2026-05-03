using System;

namespace API.Models;

public class TaskItem
{
public int Id { get; set; }
public string? Titulo { get; set; }
public string? Descricao { get; set; }
public bool Concluida { get; set; }
public DateTime CriadoEm { get; set; }
}
