using System.ComponentModel.DataAnnotations;

namespace ToolManager.Model.DTOs;

public class ToolDTO
{
    [Required]
    public string Type { get; set; }
    
    [Required]
    public decimal Price { get; set; }
}