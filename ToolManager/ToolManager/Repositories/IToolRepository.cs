using ToolManager.Model;

namespace ToolManager.Repositories;

public interface IToolRepository
{
    Task<IEnumerable<Tool>> GetAll();
    Task<Tool?> GetById(int id);
    Task<IEnumerable<Tool>> GetToolsByName(string name);
    Task Add(Tool tool);
    Task Delete(int id);
    Task Update(Tool tool);
    Task AddToolToEmployee(int employeeId, int toolId);
}