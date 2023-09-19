using Microsoft.AspNetCore.Identity;
using ToolManager.Model;

namespace ToolManager.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;

    public AuthService(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<AuthResult> RegisterAsync(string email, string username, string password)
    {
        var user = new IdentityUser
        {
            UserName = username,
            Email = email
        };
        
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return FailedRegistration(result, email, username);
        }

        return new AuthResult(true, email, username, "", user.Id);
    }

    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false, email, username, "", null);

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }
}