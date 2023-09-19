using System.ComponentModel.DataAnnotations;

namespace ToolManager.Contracts;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Username, 
    [Required]string Password
    );