namespace ToolManager.Model;

public class CompanyInventory
{
    public List<Tool> CompanyTools { get; init; }

    public CompanyInventory()
    {
        CompanyTools = new List<Tool>();
    }

    public void AddTool(Tool tool)
    {
        CompanyTools.Add(tool);
    }

    public void RemoveTool(Tool tool)
    {
        if (CompanyTools.Contains(tool))
        {
            CompanyTools.Remove(tool);
        }
        else
        {
            throw new Exception("This tool does not exist.");
        }
    }
}