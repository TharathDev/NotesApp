using NotesApi.Models;

namespace NotesApi.Data
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllNotesAsync();
    }
}