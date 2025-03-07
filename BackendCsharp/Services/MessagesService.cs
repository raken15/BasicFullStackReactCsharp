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

    public async Task<IEnumerable<Message>> GetAllMessagesAsync()
    {
        return await Task.Run(() => _messages);
    }

    public async Task<Message> GetMessageAsync(int id)
    {
        return await Task.Run(() =>_messages[id]);
    }

    public async Task AddMessageAsync(Message message)
    {
        await Task.Run(() => _messages.Add(message));
    }

    public async Task UpdateMessageAsync(int id, Message message)
    {
        await Task.Run(() => {
            _messages[id].Text = message.Text;
        });
    }

    public async Task DeleteMessageAsync(int id)
    {
        await Task.Run(() => _messages.RemoveAt(id));
    }
}
