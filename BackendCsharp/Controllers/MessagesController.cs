using Microsoft.AspNetCore.Mvc;

namespace BackendCsharp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private List<string> _messages = new List<string> { "Hello from C#", "Welcome to React and Csharp" };
    [HttpGet]
    public IActionResult GetAllMessages()
    {
        return Ok(_messages);
    }
    [HttpGet("{id}")]
    public IActionResult GetMessage(int id)
    {
        return Ok(_messages[id]);
    }
    [HttpPost]
    public IActionResult PostMessage([FromBody] string message)
    {
        _messages.Add(message);
        return CreatedAtAction(nameof(GetMessage), new { id = _messages.Count - 1 }, message);
    }
    [HttpPut("{id}")]
    public IActionResult PutMessage(int id, [FromBody] string message)
    {
        _messages[id] = message;
        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteMessage(int id)
    {
        _messages.RemoveAt(id);
        return NoContent();
    }
}
