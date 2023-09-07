using Microsoft.EntityFrameworkCore;
using ToolManager.Context;
using ToolManager.Model;

namespace ToolManager.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    public async Task<IEnumerable<Employee>> GetAll()
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Employees.ToListAsync();
    }
    
    public async Task<Employee?> GetById(int id)
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
    }
    
    public async Task<Employee?> GetByName(string name)
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Employees.FirstOrDefaultAsync(e => e.Name == name);
    }
    
    public async Task Add(Employee employee)
    {
        using var dbContext = new ToolManagerContext();
        dbContext.Add(employee);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task Delete(int id)
    {
        using var dbContext = new ToolManagerContext();
        Employee employee = await dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
        dbContext.Remove(employee);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task Update(Employee employee)
    {
        using var dbContext = new ToolManagerContext();
        dbContext.Update(employee);
        await dbContext.SaveChangesAsync();
    }
}