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
    public IActionResult GetAllMessages()
    {
        return Ok(_messages.GetAllMessages());
    }
    [HttpGet("{id}")]
    public IActionResult GetMessage(int id)
    {
        return Ok(_messages.GetMessage(id));
    }
    [HttpPost]
    public IActionResult PostMessage([FromBody] string message)
    {
        _messages.AddMessage(new Message { Text = message, CreatedAt = DateTime.Now });
        return CreatedAtAction(nameof(GetMessage), new { id = _messages.Count - 1 }, message);
    }
    [HttpPut("{id}")]
    public IActionResult PutMessage(int id, [FromBody] Message message)
    {
        _messages.UpdateMessage(id, message);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteMessage(int id)
    {
        _messages.DeleteMessage(id);
        return NoContent();
    }
}
