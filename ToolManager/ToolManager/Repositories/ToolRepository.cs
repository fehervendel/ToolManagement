using Microsoft.EntityFrameworkCore;
using ToolManager.Context;
using ToolManager.Model;

namespace ToolManager.Repositories;

public class ToolRepository : IToolRepository
{
    public async Task<IEnumerable<Tool>> GetAll()
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Tools.ToListAsync();
    }
    
    public async Task<Tool?> GetById(int id)
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Tools.FirstOrDefaultAsync(e => e.Id == id);
    }
    
    public async Task<IEnumerable<Tool?>> GetToolsByName(string name)
    {
        using var dbContext = new ToolManagerContext();
        return await dbContext.Tools.Where(t => t.Type == name).ToListAsync();
    }
    
    public async Task Add(Tool tool)
    {
        using var dbContext = new ToolManagerContext();
        dbContext.Add(tool);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task Delete(int id)
    {
        using var dbContext = new ToolManagerContext();
        Tool tool = await dbContext.Tools.FirstOrDefaultAsync(t => t.Id == id);
        dbContext.Remove(tool);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task Update(Tool tool)
    {
        using var dbContext = new ToolManagerContext();
        dbContext.Update(tool);
        await dbContext.SaveChangesAsync();
    }
}