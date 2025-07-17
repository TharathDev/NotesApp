using Dapper;
using MySql.Data.MySqlClient;
using NotesApi.Models;

namespace NotesApi.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "SELECT Id, Username, Email, PasswordHash, CreatedAt, UpdatedAt FROM Users WHERE Username = @Username";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "SELECT Id, Username, Email, PasswordHash, CreatedAt, UpdatedAt FROM Users WHERE Email = @Email";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User> CreateUserAsync(User user)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = @"
                INSERT INTO Users (Username, Email, PasswordHash, CreatedAt, UpdatedAt) 
                VALUES (@Username, @Email, @PasswordHash, @CreatedAt, @UpdatedAt);
                SELECT LAST_INSERT_ID();";
            
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            
            var id = await connection.QuerySingleAsync<int>(sql, user);
            user.Id = id;
            return user;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string sql = "SELECT Id, Username, Email, PasswordHash, CreatedAt, UpdatedAt FROM Users WHERE Id = @Id";
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
        }
    }
}