using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BackendCsharp.Filters;

public class MessagesExceptionFilter : IExceptionFilter
{
    private readonly ILogger<MessagesExceptionFilter> _logger;
    public MessagesExceptionFilter(ILogger<MessagesExceptionFilter> logger)
    {
        _logger = logger;
    }
    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "An error occurred in the controller.");

        // Customize the response based on exception type
        context.Result = new ObjectResult(new 
        { 
            message = context.Exception.Message
        })
        {
            StatusCode = context.Exception switch
            {
                ArgumentNullException => StatusCodes.Status400BadRequest,
                KeyNotFoundException => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError
            }
        };
    }
}
