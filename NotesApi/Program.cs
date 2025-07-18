using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NotesApi.Data;
using NotesApi.Models;
using NotesApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000", // Local development
                "http://frontend:3000"   // Docker container
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Register repositories and services
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddScoped<INoteRepository>(provider => new NoteRepository(connectionString!));
builder.Services.AddScoped<IUserRepository>(provider => new UserRepository(connectionString!));
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Use CORS - IMPORTANT: This must be before UseAuthentication and UseAuthorization
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Helper method to get current user ID
static int GetCurrentUserId(ClaimsPrincipal user)
{
    var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return int.Parse(userIdClaim!);
}

// AUTH ENDPOINTS

// POST /api/auth/register
app.MapPost("/api/auth/register", async (RegisterRequest request, IAuthService authService) =>
{
    var result = await authService.RegisterAsync(request);
    return result is not null ? Results.Ok(result) : Results.BadRequest("Username or email already exists");
})
.WithName("Register")
.WithOpenApi();

// POST /api/auth/login
app.MapPost("/api/auth/login", async (LoginRequest request, IAuthService authService) =>
{
    var result = await authService.LoginAsync(request);
    return result is not null ? Results.Ok(result) : Results.Unauthorized();
})
.WithName("Login")
.WithOpenApi();

// NOTES ENDPOINTS (Protected)

// GET /api/notes - Get all notes for current user
app.MapGet("/api/notes", async (ClaimsPrincipal user, INoteRepository repository) =>
{
    var userId = GetCurrentUserId(user);
    var notes = await repository.GetAllNotesAsync(userId);
    return Results.Ok(notes);
})
.WithName("GetAllNotes")
.RequireAuthorization()
.WithOpenApi();

// GET /api/notes/{id} - Get note by ID for current user
app.MapGet("/api/notes/{id:int}", async (int id, ClaimsPrincipal user, INoteRepository repository) =>
{
    var userId = GetCurrentUserId(user);
    var note = await repository.GetNoteByIdAsync(id, userId);
    return note is not null ? Results.Ok(note) : Results.NotFound();
})
.WithName("GetNoteById")
.RequireAuthorization()
.WithOpenApi();

// POST /api/notes - Create new note for current user
app.MapPost("/api/notes", async (CreateNoteRequest request, ClaimsPrincipal user, INoteRepository repository) =>
{
    var userId = GetCurrentUserId(user);
    var note = new Note
    {
        Title = request.Title,
        Content = request.Content,
        UserId = userId
    };
    
    var createdNote = await repository.CreateNoteAsync(note);
    return Results.Created($"/api/notes/{createdNote.Id}", createdNote);
})
.WithName("CreateNote")
.RequireAuthorization()
.WithOpenApi();

// PUT /api/notes/{id} - Update existing note for current user
app.MapPut("/api/notes/{id:int}", async (int id, UpdateNoteRequest request, ClaimsPrincipal user, INoteRepository repository) =>
{
    var userId = GetCurrentUserId(user);
    var note = new Note
    {
        Title = request.Title,
        Content = request.Content
    };
    
    var updatedNote = await repository.UpdateNoteAsync(id, note, userId);
    return updatedNote is not null ? Results.Ok(updatedNote) : Results.NotFound();
})
.WithName("UpdateNote")
.RequireAuthorization()
.WithOpenApi();

// DELETE /api/notes/{id} - Delete note for current user
app.MapDelete("/api/notes/{id:int}", async (int id, ClaimsPrincipal user, INoteRepository repository) =>
{
    var userId = GetCurrentUserId(user);
    var deleted = await repository.DeleteNoteAsync(id, userId);
    return deleted ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteNote")
.RequireAuthorization()
.WithOpenApi();

app.Run();
