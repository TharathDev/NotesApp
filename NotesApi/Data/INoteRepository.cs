using NotesApi.Models;

namespace NotesApi.Data
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllNotesAsync(int userId);
        Task<Note?> GetNoteByIdAsync(int id, int userId);
        Task<Note> CreateNoteAsync(Note note);
        Task<Note?> UpdateNoteAsync(int id, Note note, int userId);
        Task<bool> DeleteNoteAsync(int id, int userId);
    }
}