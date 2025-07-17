using NotesApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Register repository with connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddScoped<INoteRepository>(provider => new NoteRepository(connectionString!));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Add Notes API endpoint
app.MapGet("/api/notes", async (INoteRepository repository) =>
{
    var notes = await repository.GetAllNotesAsync();
    return Results.Ok(notes);
})
.WithName("GetAllNotes")
.WithOpenApi();

app.Run();
