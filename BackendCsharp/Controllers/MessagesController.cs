using Microsoft.AspNetCore.Mvc;

namespace BackendCsharp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAllMessages()
    {
        var messages = new List<string> { "Hello from C#", "Welcome to React and Csharp"};
        return Ok(messages);
    }

}
