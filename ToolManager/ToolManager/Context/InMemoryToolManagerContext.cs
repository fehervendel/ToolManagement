using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using ToolManager.Model;

namespace ToolManager.Context;

public class InMemoryToolManagerContext : DbContext
{
    public DbSet<Employee> Employees { get; set; }
    
    public DbSet<Tool> Tools { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("TestDatabase");
    }
}