using BackendCsharp.Models;

namespace BackendCsharp.Services;

public class MessagesService
{
    private List<Message> _messages = new List<Message>();

    public MessagesService()
    {
        _messages.Add(new Message { Text = "Hello from C#", CreatedAt = DateTime.Now });
        _messages.Add(new Message { Text = "Welcome to React and Csharp", CreatedAt = DateTime.Now });
    }

    public IEnumerable<Message> GetAllMessages()
    {
        return _messages;
    }

    public Message GetMessage(int id)
    {
        return _messages[id];
    }

    public void AddMessage(Message message)
    {
        _messages.Add(message);
    }

    public void UpdateMessage(int id, Message message)
    {
        _messages[id] = message;
    }

    public void DeleteMessage(int id)
    {
        _messages.RemoveAt(id);
    }
}