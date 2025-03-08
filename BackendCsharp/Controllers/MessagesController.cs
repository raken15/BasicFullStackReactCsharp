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
    [HttpGet("{id:int}", Name = "GetMessageById")]
    public async Task<IActionResult> GetMessageAsync(int id)
    {
        var message = await _messages.GetSingleMessageAsync(id);
        if (message == null)
        {
            return NotFound();
        }
        return Ok(message);
    }
    [HttpPost]
    public async Task<IActionResult> AddMessageAsync([FromBody] Message message)
    {
        if (message == null)
        {
            return BadRequest("Message cannot be null.");
        }
        await _messages.AddMessageAsync(message);
        return CreatedAtRoute("GetMessageById", new { id = message.Id }, message);
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
