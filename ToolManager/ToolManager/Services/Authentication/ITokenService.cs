using Microsoft.AspNetCore.Identity;

namespace ToolManager.Services.Authentication;

public interface ITokenService
{
    public string CreateToken(IdentityUser user);
}
