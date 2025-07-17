using NotesApi.Models;

namespace NotesApi.Data
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<User?> GetUserByIdAsync(int id);
    }
}