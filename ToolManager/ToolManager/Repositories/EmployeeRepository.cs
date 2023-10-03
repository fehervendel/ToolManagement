using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToolManager.Context;
using ToolManager.Model;

namespace ToolManager.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly UserManager<IdentityUser> _userManager;

    public EmployeeRepository(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }
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

        
        Tool tool = await dbContext.Tools.FirstOrDefaultAsync(t => t.CurrentOwnerEmployeeId == id);
        tool.CurrentOwnerEmployeeId = null;
        dbContext.Update(tool);
        await dbContext.SaveChangesAsync();
        
        Employee employeeToDelete = await dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
        var stringId = employeeToDelete.IdentityUserId;
        var identityUser = await _userManager.FindByIdAsync(stringId);

        var result = await _userManager.DeleteAsync(identityUser);
         employeeToDelete.IdentityUserId = null;
         dbContext.Remove(employeeToDelete);
        
        await dbContext.SaveChangesAsync();
    }
    
    public async Task Update(Employee employee)
    {
        using var dbContext = new ToolManagerContext();
        dbContext.Update(employee);
        await dbContext.SaveChangesAsync();
    }
    
}