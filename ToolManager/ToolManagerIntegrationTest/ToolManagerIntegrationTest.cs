using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using ToolManager.Model;
using ToolManager.Services.Authentication;

namespace ToolManagerIntegrationTest;

[TestFixture]
public class ToolManagerIntegrationTest : WebApplicationFactory<Program>
{
    private HttpClient _client;
    private IAuthService _authService;
    

    [SetUp]
    public void Setup()
    {
        DotNetEnv.Env.Load();
        string connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        Environment.SetEnvironmentVariable("CONNECTION_STRING", connectionString);
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        
        _client = CreateClient();
        AuthRequest authRequest = new AuthRequest("admin@admin.com", "admin123");
        string jsonString = JsonSerializer.Serialize(authRequest);
        StringContent jsonStringContent = new StringContent(jsonString);
        jsonStringContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        var response = _client.PostAsync("Auth/Login", jsonStringContent).Result;
        var content = response.Content.ReadAsStringAsync().Result;
        var desContent = JsonSerializer.Deserialize<AuthResponse>(content, options);
        var token = desContent.Token;
       _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
    }

    [OneTimeTearDown]
    public void TearDown()
    {
        _client.Dispose();
    }
    
    [Test]
    public async Task GetAllEmployees_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/ToolManager/GetAllEmployees");

        response.EnsureSuccessStatusCode();
        
        Assert.AreEqual(System.Net.HttpStatusCode.OK, response.StatusCode);
    }
}