using BackendCsharp.Models;

namespace BackendCsharp.Services;

public class MessagesService : IMessagesService
{
    private List<Message> _messages = new List<Message>();

    public MessagesService()
    {
        _messages.Add(new Message { Id = 0, Text = "Hello from C#", CreatedDate = DateTime.Now });
        _messages.Add(new Message { Id = 1, Text = "Welcome to React and Csharp", CreatedDate = DateTime.Now });
    }

    public int Count => _messages.Count;

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
