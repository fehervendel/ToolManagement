using Microsoft.AspNetCore.Mvc;
using ToolManager.Contracts;
using ToolManager.Model;
using ToolManager.Repositories;
using ToolManager.Services.Authentication;

namespace ToolManager.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;
    private readonly IEmployeeRepository _employeeRepository;

    public AuthController(IAuthService authenticationService, IEmployeeRepository employeeRepository)
    {
        _authenticationService = authenticationService;
        _employeeRepository = employeeRepository;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authenticationService.RegisterAsync(request.Email, request.Username, request.Password);
        
        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        } 
        
        Employee employee = new Employee
        {
            Name = request.Username,
            EmailAddress = request.Email,
            IdentityUserId = result.IdentityUserId
        };
        
        await _employeeRepository.Add(employee);
        
        return CreatedAtAction(nameof(Register), new RegistrationResponse(result.Email, result.UserName));
    }

    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authenticationService.LoginAsync(request.Email, request.Password);

        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }

        return Ok(new AuthResponse(result.Email, result.UserName, result.Token));
    }
}