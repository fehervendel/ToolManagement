using System.ComponentModel.DataAnnotations;

namespace ToolManager.Model.DTOs;

public class EmployeeDTO
{ 
        [Required] 
        public string Name { get; set; }
    
        [Required]
        public decimal Salary { get; set; }
        
        [Required]
        public string EmailAddress { get; set; }
}