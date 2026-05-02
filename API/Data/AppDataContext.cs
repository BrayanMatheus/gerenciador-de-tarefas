using System;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDataContext : DbContext
{
    public DbSet<Usuario> Usuario { get;set; }
    public DbSet<Categoria> Categoria { get;set; }
    public DbSet<TaskItem> TaskItem { get;set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=GerenciadorTarefasDb.db");
    }

}
