using System.ComponentModel.DataAnnotations;

namespace BackendCsharp.Models;

public class Message
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "The message text is required.")]
    public string Text { get; set; } = string.Empty;
    public DateTime? CreatedDate { get; set; } = DateTime.Now;
}