using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ToolManager.Model;
using ToolManager.Model.DTOs;
using ToolManager.Repositories;

namespace ToolManager.Controllers;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ToolManagerController : ControllerBase
{
    private readonly ILogger<ToolManagerController> _logger;
    private IEmployeeRepository _employeeRepository;
    private IToolRepository _toolRepository;
    

    public ToolManagerController(ILogger<ToolManagerController> logger, IEmployeeRepository employeeRepository, IToolRepository toolRepository)
    {
        _logger = logger;
        _employeeRepository = employeeRepository;
        _toolRepository = toolRepository;
    }

    [HttpGet("GetAllEmployees"), Authorize]
    public async Task<IActionResult> GetAllEmployees()
    {
        var employees = await _employeeRepository.GetAll();
        try
        {
            return Ok(employees);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting employees :(");
            return NotFound("Error getting employees :(");
        }
    }

    [HttpPost("AddEmployee")]
    public async Task<IActionResult> AddEmployee(string name, decimal salary, string emailAddress)
    {
        try
        {
            Employee employeeToAdd = new Employee
            {
                Name = name,
                Salary = salary,
                EmailAddress = emailAddress,
            };
        
             await _employeeRepository.Add(employeeToAdd);
            
            return Ok(employeeToAdd);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error adding new employee :("); 
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete("DeleteEmployee")]
    public async Task<IActionResult> DeleteEmployeeById(int id)
    {
        try
        {
            await _employeeRepository.Delete(id);
            return Ok($"Employee with id: {id} has been deleted!");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error deleting employee:(");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpGet("GetEmployeeById")]
    public async Task<IActionResult> GetEmployeeById(int id)
    {
        try
        {
            var employee = await _employeeRepository.GetById(id);
            return Ok(employee);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting tools:(");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpGet("GetEmployeeByName")]
    public async Task<IActionResult> GetEmployeeByName(string name)
    {
        try
        {
            var employee = await _employeeRepository.GetByName(name);
            return Ok(employee);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting tools:(");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpGet("GetAllTools")]
    public async Task<IActionResult> GetAllTools()
    {
        var tools = await _toolRepository.GetAll();
        try
        {
            return Ok(tools);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting tools :(");
            return NotFound("Error getting tools :(");
        }
    }
    
    [HttpPost("AddTool")]
    public async Task<IActionResult> AddTool(string type, decimal price)
    {
        try
        {
            Tool toolToAdd = new Tool
            {
                Type = type,
                Price = price,
            };
        
            await _toolRepository.Add(toolToAdd);
            
            return Ok(toolToAdd);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error adding new tool :("); 
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete("DeleteToolById")]
    public async Task<IActionResult> DeleteToolById(int id)
    {
        try
        {
            await _toolRepository.Delete(id);
            return Ok($"Tool with id: {id} has been deleted!");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error deleting tool:(");
            return StatusCode(500, "Internal server Error");
        }
    }

    [HttpGet("GetToolsByName")]
    public async Task<IActionResult> GetToolsByName(string name)
    {
        try
        {
            var tools = await _toolRepository.GetToolsByName(name);
            return Ok(tools);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting tools:(");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpGet("GetToolById")]
    public async Task<IActionResult> GetToolById(int id)
    {
        try
        {
            var tool = await _toolRepository.GetById(id);
            return Ok(tool);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting tool:(");
            return StatusCode(500, "Internal server Error");
        }
    }
}