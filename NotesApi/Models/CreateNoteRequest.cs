using System.ComponentModel.DataAnnotations;

namespace NotesApi.Models
{
    public class CreateNoteRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(5000, MinimumLength = 1)]
        public string Content { get; set; } = string.Empty;
    }
}