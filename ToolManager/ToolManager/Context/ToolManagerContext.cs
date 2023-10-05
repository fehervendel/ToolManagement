using Microsoft.EntityFrameworkCore;
using ToolManager.Model;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToolManager.Context;

public class ToolManagerContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<Tool> Tools { get; set; }
    public DbSet<Employee> Employees { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // DotNetEnv.Env.Load();
        // string connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        
        var configBuilder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddUserSecrets<Program>();
        IConfiguration configuration = configBuilder.Build();

        string connectionString = configuration["ConnectionStrings:Db1"];
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
        
        modelBuilder.Entity<Employee>()
            .HasOne(e => e.IdentityUser)
            .WithMany()
            .HasForeignKey(e => e.IdentityUserId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired(false);
    }
}