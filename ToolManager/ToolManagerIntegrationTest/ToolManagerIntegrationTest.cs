using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToolManager.Context;
using ToolManager.Contracts;
using ToolManager.Controllers;
using ToolManager.Model;
using ToolManager.Repositories;
using ToolManager.Services.Authentication;

namespace ToolManagerIntegrationTest;

[TestFixture]
public class ToolManagerIntegrationTest : WebApplicationFactory<Program>
{
    private HttpClient _client;
    private InMemoryToolManagerContext _context;


    [SetUp]
    public void Setup()
    {
        _context = new InMemoryToolManagerContext();

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
        _context.Dispose();
    }

    [Test]
    public async Task GetAllEmployees_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/ToolManager/GetAllEmployees");

        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var employees = JsonSerializer.Deserialize<List<Employee>>(content);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
        Assert.IsNotNull(employees);
        Assert.IsTrue(employees.Count > 0);
    }

    [Test]
    public async Task AddEmployee_ShouldReturnOk()
    {
        RegistrationRequest requestContent = new RegistrationRequest("example@example.com", "JohnDoe", "password123");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        await using InMemoryToolManagerContext context = new InMemoryToolManagerContext();
        Employee addedEmployee = new Employee
        {
            Name = requestContent.Username,
            EmailAddress = requestContent.Email
        };

        context.Employees.Add(addedEmployee);
        await context.SaveChangesAsync();

        var retrievedEmployee = await context.Employees.FindAsync(addedEmployee.Id);

        Assert.IsNotNull(retrievedEmployee);
        Assert.That(retrievedEmployee?.Name, Is.EqualTo(requestContent.Username));
        Assert.That(retrievedEmployee?.EmailAddress, Is.EqualTo(requestContent.Email));
    }
}