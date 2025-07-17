using Dapper;
using MySql.Data.MySqlClient;
using NotesApi.Models;
using System.Data;

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
    }
}