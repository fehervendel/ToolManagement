using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToolManager.Model;

public class Employee
{
    [Key]
    public int Id { get; init; }
    public string Name { get; set; }
    public decimal Salary { get; set; } //Can change salary later
    
    [JsonIgnore]
    public List<Tool> Tools { get; set; }
    
    [NotMapped]
    public List<Permission> Permissions { get; set; } //Need to remove this
    public string EmailAddress { get; set; }
    
    public string? IdentityUserId { get; set; }
    public IdentityUser IdentityUser { get; set; }
}