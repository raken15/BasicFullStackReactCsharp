using BackendCsharp.Services;
using BackendCsharp.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendCsharp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private readonly IMessagesService _messages;
    public MessagesController(IMessagesService messages)
    {
        _messages = messages;
    }
    // private List<string> _messages = new List<string> { "Hello from C#", "Welcome to React and Csharp" };
    [HttpGet]
    public async Task<IActionResult> GetAllMessagesAsync()
    {
        return Ok( await _messages.GetAllMessagesAsync());
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMessageAsync(int id)
    {
        return Ok( await _messages.GetMessageAsync(id));
    }
    [HttpPost]
    public async Task<IActionResult> AddMessageAsync([FromBody] string message)
    {
        await _messages.AddMessageAsync(new Message { Text = message, CreatedDate = DateTime.Now });
        return CreatedAtAction(nameof(GetMessageAsync), new { id = _messages.Count - 1 }, message);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMessageAsync(int id, [FromBody] Message message)
    {
        await _messages.UpdateMessageAsync(id, message);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessageAsync(int id)
    {
        await _messages.DeleteMessageAsync(id);
        return NoContent();
    }
}
