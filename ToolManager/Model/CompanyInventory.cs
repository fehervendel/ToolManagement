using System.Runtime.CompilerServices;

namespace ToolManager.Model;

public class CompanyInventory
{
    public List<Tool> CompanyTools { get; init; }

    public CompanyInventory()
    {
        CompanyTools = new List<Tool>();
    }

    public Tool AddTool(Tool tool)
    {
        CompanyTools.Add(tool);
        return tool;
    }

    public Tool RemoveToolById(int id)
    {

        Tool tool = CompanyTools.First(t => t.Id == id);
        CompanyTools.Remove(tool);
        return tool;
    }
}