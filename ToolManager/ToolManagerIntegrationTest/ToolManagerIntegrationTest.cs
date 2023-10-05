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
        Assert.IsTrue(employees is { Count: > 0 });
    }
    
    
    
    [Test]
    public async Task GetAllTools_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/api/ToolManager/GetAllTools");

        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var tools = JsonSerializer.Deserialize<List<Tool>>(content);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
        Assert.IsNotNull(tools);
        Assert.IsTrue(tools is { Count: > 0 });
    }
    
    [Test]
    public async Task GetEmployeeById_ShouldReturnOk()
    {
        int id = 1;
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var response = await _client.GetAsync($"/api/ToolManager/GetEmployeeById?id={id}");

        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var employee = JsonSerializer.Deserialize<Employee>(content, options);
        var employeeToGet = new Employee
        {
            Id = 1,
            Name = "user1",
            Salary = (decimal)10.00,
            EmailAddress = "email@email.com",
            IdentityUserId = "7f254662-3d21-4d50-a8b9-55fa19862775"
        };

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
        Assert.IsNotNull(employee);
        Assert.That(employeeToGet.Id, Is.EqualTo(employee.Id));
        Assert.That(employeeToGet.Salary, Is.EqualTo(employee.Salary));
        Assert.That(employeeToGet.EmailAddress, Is.EqualTo(employee.EmailAddress));
        Assert.That(employeeToGet.IdentityUserId, Is.EqualTo(employee.IdentityUserId));
        Assert.That(employeeToGet.Name, Is.EqualTo(employee.Name));
    }
    
    [Test]
    public async Task GetEmployeeById_ShouldReturnNoContent()
    {
        int id = 9999999;
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var response = await _client.GetAsync($"/api/ToolManager/GetEmployeeById?id={id}");
        
        response.EnsureSuccessStatusCode();
        
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }
    
    [Test]
    public async Task GettoolById_ShouldReturnNoContent()
    {
        int id = 9999999;
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var response = await _client.GetAsync($"/api/ToolManager/GetToolById?id={id}");
        
        response.EnsureSuccessStatusCode();
        
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }
    
    [Test]
    public async Task GetToolById_ShouldReturnOk()
    {
        int id = 1;
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var response = await _client.GetAsync($"/api/ToolManager/GetToolById?id={id}");

        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var tool = JsonSerializer.Deserialize<Tool>(content, options);
        var toolToGet = new Tool
        {
            Id = 1,
            Type = "Crowbar",
            Price = (decimal)20.00,
            CurrentOwnerEmployeeId = null
        };

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
        Assert.IsNotNull(tool);
        Assert.That(toolToGet.Id, Is.EqualTo(tool.Id));
        Assert.That(toolToGet.Type, Is.EqualTo(tool.Type));
        Assert.That(toolToGet.Price, Is.EqualTo(tool.Price));
        Assert.That(toolToGet.CurrentOwnerEmployeeId, Is.EqualTo(tool.CurrentOwnerEmployeeId));
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