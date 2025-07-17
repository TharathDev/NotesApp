using NotesApi.Models;

namespace NotesApi.Data
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllNotesAsync();
        Task<Note?> GetNoteByIdAsync(int id);
        Task<Note> CreateNoteAsync(Note note);
        Task<Note?> UpdateNoteAsync(int id, Note note);
        Task<bool> DeleteNoteAsync(int id);
    }
}