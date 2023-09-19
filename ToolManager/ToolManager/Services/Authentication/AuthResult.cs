namespace ToolManager.Services.Authentication;

public record AuthResult(
    bool Success,
    string Email,
    string UserName,
    string Token,
    string IdentityUserId)
{
    public readonly Dictionary<string, string> ErrorMessages = new();
} 