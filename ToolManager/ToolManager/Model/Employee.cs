namespace ToolManager.Model;

public class Employee
{
    public int? Id { get; init; }
    public string Name { get; init; }
    public decimal Salary { get; set; } //Can change salary later
    public List<Tool> Tools { get; init; }
    public List<Permission> Permissions { get; set; }

    public Employee(int? id, string name, decimal salary)
    {
        Id = id;
        Name = name;
        Salary = salary;
        Tools = new List<Tool>();
        Permissions = new List<Permission>();
    }

    public void AddTool(Tool tool)
    {
        Tools.Add(tool);
    }
    
    public void RemoveTool(Tool tool)
    {
        if (this.Tools.Contains(tool))
        {
            Tools.Remove(tool);
        }
        else
        {
            throw new Exception("Employee does not own this tool!");
        }
    }

    public void AddPermission(Permission permission)
    {
        Permissions.Add(permission);
    }
    
    public void RemovePermission(Permission permission)
    {
        if (this.Permissions.Contains(permission))
        {
            Permissions.Remove(permission);
        }
        else
        {
            throw new Exception("Employee does not have this permission!");
        }
    }
}