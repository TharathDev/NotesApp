using Dapper;
using MySql.Data.MySqlClient;
using NotesApi.Models;

namespace NotesApi.Data
{
    public class NoteRepository : INoteRepository
    {
        private readonly string _connectionString;

        public NoteRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Note>> GetAllNotesAsync()
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "SELECT Id, Title, Content, CreatedAt, UpdatedAt FROM Notes ORDER BY CreatedAt DESC";
            return await connection.QueryAsync<Note>(sql);
        }

        public async Task<Note?> GetNoteByIdAsync(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "SELECT Id, Title, Content, CreatedAt, UpdatedAt FROM Notes WHERE Id = @Id";
            return await connection.QueryFirstOrDefaultAsync<Note>(sql, new { Id = id });
        }

        public async Task<Note> CreateNoteAsync(Note note)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = @"
                INSERT INTO Notes (Title, Content, CreatedAt, UpdatedAt) 
                VALUES (@Title, @Content, @CreatedAt, @UpdatedAt);
                SELECT LAST_INSERT_ID();";
            
            note.CreatedAt = DateTime.UtcNow;
            note.UpdatedAt = DateTime.UtcNow;
            
            var id = await connection.QuerySingleAsync<int>(sql, note);
            note.Id = id;
            return note;
        }

        public async Task<Note?> UpdateNoteAsync(int id, Note note)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = @"
                UPDATE Notes 
                SET Title = @Title, Content = @Content, UpdatedAt = @UpdatedAt 
                WHERE Id = @Id";
            
            note.UpdatedAt = DateTime.UtcNow;
            
            var rowsAffected = await connection.ExecuteAsync(sql, new 
            { 
                Id = id, 
                Title = note.Title, 
                Content = note.Content, 
                UpdatedAt = note.UpdatedAt 
            });
            
            return rowsAffected > 0 ? await GetNoteByIdAsync(id) : null;
        }

        public async Task<bool> DeleteNoteAsync(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "DELETE FROM Notes WHERE Id = @Id";
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}