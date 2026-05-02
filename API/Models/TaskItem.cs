using System;

namespace API.Models;

public class TaskItem
{
public int Id { get; set; }
public string? Titulo { get; set; }
public string? descricao { get; set; }
public bool Concluida { get; set; }
public DateTime CriadoEm { get; set; }
}
