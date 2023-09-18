using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToolManager.Model;

public class Employee : IdentityUser<int>
{
    public string Name { get; init; }
    public decimal Salary { get; set; } //Can change salary later
    public List<Tool> Tools { get; set; }
    
    [NotMapped]
    public List<Permission> Permissions { get; set; }
    public string EmailAddress { get; init; }
    
}