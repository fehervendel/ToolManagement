using ToolManager.Model;

namespace ToolManager.Service;

public class CompanyInventoryService
{
    public CompanyInventory CompanyInventory { get; init; }
    

    public CompanyInventoryService(CompanyInventory companyInventory)
    {
        CompanyInventory = companyInventory;
    }
    
    public Tool AddTool(Tool tool)
    {
       return CompanyInventory.AddTool(tool);
    }

    public Tool RemoveToolById(int id)
    {
        return CompanyInventory.RemoveToolById(id);
    }

    public List<Tool> ListAllTools()
    {
        return CompanyInventory.CompanyTools;
    }

    public List<Tool>? ListByType(string toolType)
    {
        if (CompanyInventory.CompanyTools.Any(t => t.Type == toolType))
        {
            return CompanyInventory.CompanyTools.Where(t => t.Type == toolType).ToList();
        }

        return null;
    }
}