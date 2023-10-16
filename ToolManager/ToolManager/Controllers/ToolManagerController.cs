﻿using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ToolManager.Model;
using ToolManager.Model.DTOs;
using ToolManager.Repositories;
using ToolManager.Services.Authentication;

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

    [HttpGet("GetAllEmployees"), Authorize(Roles = "User, Admin")]
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

    [HttpPost("AddEmployee"), Authorize(Roles = "Admin")]
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

    [HttpDelete("DeleteEmployeeById"), Authorize(Roles = "Admin")]
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
    
    [HttpGet("GetEmployeeById"), Authorize(Roles = "Admin")]
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
    
    [HttpGet("GetEmployeeByName"), Authorize(Roles = "Admin")]
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
    
    [HttpGet("GetAllTools"), Authorize(Roles = "Admin, User")]
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
    
    [HttpPost("AddTool"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddTool([FromBody]ToolDTO toolDto)
    {
        try
        {
            Tool toolToAdd = new Tool
            {
                Type = toolDto.Type,
                Price = toolDto.Price,
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

    [HttpDelete("DeleteToolById"), Authorize(Roles = "Admin")]
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

    [HttpGet("GetToolsByName"), Authorize(Roles = "Admin")]
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
    
    [HttpGet("GetToolById"), Authorize(Roles = "Admin, User")]
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

    [HttpPut("AddToolToEmployee"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddToolToEmployee(int employeeId, int toolId)
    {
        try
        {
            await _toolRepository.AddToolToEmployee(employeeId, toolId);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error adding tool to employee");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpPut("UpdateEmployeeSalary"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateEmployeeSalary(int id, decimal salary)
    {
        try
        {
            await _employeeRepository.UpdateSalary(id, salary);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error updating employee salary");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpPut("RemoveToolFromEmployee"), Authorize(Roles = "Admin")]
    public async Task<IActionResult> RemoveToolFromEmployee(int id)
    {
        try
        {
            await _toolRepository.RemoveToolFromEmployee(id);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error removing tool from employee");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpPut("ChangeCheckToTrue"), Authorize(Roles = "Admin, User")]
    public async Task<IActionResult> ChangeCheckToTrue(int id)
    {
        try
        {
            await _toolRepository.ChangeCheckToTrue(id);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error changing check");
            return StatusCode(500, "Internal server Error");
        }
    }
    
    [HttpPut("ChangeCheckToFalse"), Authorize(Roles = "Admin, User")]
    public async Task<IActionResult> ChangeCheckToFalse(int id)
    {
        try
        {
            await _toolRepository.ChangeCheckToFalse(id);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error changing check");
            return StatusCode(500, "Internal server Error");
        }
    }
}