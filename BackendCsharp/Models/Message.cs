using System.ComponentModel.DataAnnotations;

namespace BackendCsharp.Models;

public class Message
{
    [Required]
    public required string Text { get; set; }
    public DateTime CreatedAt { get; set; }
}