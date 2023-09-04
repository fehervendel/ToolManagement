using ToolManager.Model;
using ToolManager.Model.DTOs;
using ToolManager.Service;

namespace ToolManager.Controllers;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly CompanyInventoryService _companyInventoryService;

    public InventoryController(CompanyInventoryService companyInventoryService)
    {
        _companyInventoryService = companyInventoryService;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        return Ok(_companyInventoryService.ListAllTools());
    }

    [HttpPost("AddTool")]
    public IActionResult AddTool([FromBody] ToolDTO tooldto)
    {
        return Ok(_companyInventoryService.AddTool(new Tool(1, tooldto.Type, tooldto.Price)));
    }

    [HttpDelete("DeleteById")]
    public IActionResult RemoveTool(int id)
    {
        return Ok(_companyInventoryService.RemoveToolById(id));
    }
}