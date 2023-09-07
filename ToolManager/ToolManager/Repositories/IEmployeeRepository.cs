using ToolManager.Model;

namespace ToolManager.Repositories;

public interface IEmployeeRepository
{
    Task<IEnumerable<Employee>> GetAll();
    Task<Employee?> GetById(int id);
    Task<Employee?> GetByName(string name);

    Task Add(Employee employee);
    Task Delete(int id);
    Task Update(Employee employee);
}