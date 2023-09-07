﻿using System.ComponentModel.DataAnnotations;

namespace ToolManager.Model;

public class Tool
{
    [Key]
    public int? Id { get; init; }
    
    public string Type { get; init; }
    
    public decimal Price { get; init; }
    public Employee? CurrentOwnerEmployee { get; set; }

    public int? CurrentOwnerEmployeeId { get; set; }
    // public Tool(int? id, string type, decimal price)
    // {
    //     Id = id;
    //     Type = type;
    //     Price = price;
    // }
    //
    // public void AssignToolToEmployee(Employee employee)
    // {
    //     CurrentOwnerEmployee = employee;
    // }
}