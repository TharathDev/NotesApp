using NotesApi.Data;
using NotesApi.Models;

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

// GET /api/notes - Get all notes
app.MapGet("/api/notes", async (INoteRepository repository) =>
{
    var notes = await repository.GetAllNotesAsync();
    return Results.Ok(notes);
})
.WithName("GetAllNotes")
.WithOpenApi();

// GET /api/notes/{id} - Get note by ID
app.MapGet("/api/notes/{id:int}", async (int id, INoteRepository repository) =>
{
    var note = await repository.GetNoteByIdAsync(id);
    return note is not null ? Results.Ok(note) : Results.NotFound();
})
.WithName("GetNoteById")
.WithOpenApi();

// POST /api/notes - Create new note
app.MapPost("/api/notes", async (CreateNoteRequest request, INoteRepository repository) =>
{
    var note = new Note
    {
        Title = request.Title,
        Content = request.Content
    };
    
    var createdNote = await repository.CreateNoteAsync(note);
    return Results.Created($"/api/notes/{createdNote.Id}", createdNote);
})
.WithName("CreateNote")
.WithOpenApi();

// PUT /api/notes/{id} - Update existing note
app.MapPut("/api/notes/{id:int}", async (int id, UpdateNoteRequest request, INoteRepository repository) =>
{
    var note = new Note
    {
        Title = request.Title,
        Content = request.Content
    };
    
    var updatedNote = await repository.UpdateNoteAsync(id, note);
    return updatedNote is not null ? Results.Ok(updatedNote) : Results.NotFound();
})
.WithName("UpdateNote")
.WithOpenApi();

// DELETE /api/notes/{id} - Delete note
app.MapDelete("/api/notes/{id:int}", async (int id, INoteRepository repository) =>
{
    var deleted = await repository.DeleteNoteAsync(id);
    return deleted ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteNote")
.WithOpenApi();

app.Run();
