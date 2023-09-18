using Microsoft.EntityFrameworkCore;
using ToolManager.Model;
using DotNetEnv;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToolManager.Context;

public class ToolManagerContext : IdentityUserContext<Employee, int>
{
    public DbSet<Tool> Tools { get; set; }
    
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        DotNetEnv.Env.Load();
        string connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        optionsBuilder.UseSqlServer(
            connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Tool>()
            .HasOne(t => t.CurrentOwnerEmployee)
            .WithMany(e => e.Tools)
            .HasForeignKey(t => t.CurrentOwnerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<Employee>()
            .Property(e => e.Salary)
            .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Tool>()
            .Property(t => t.Price)
            .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Employee>().ToTable("Employees");
    }
}