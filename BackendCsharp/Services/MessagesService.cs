using BackendCsharp.Models;

namespace BackendCsharp.Services;

public class MessagesService : IMessagesService
{
    private List<Message> _messages = new List<Message>();
    private int _nextId = 3;

    public MessagesService()
    {
        _messages.Add(new Message { Id = 1, Text = "Hello from C#", CreatedDate = DateTime.Now });
        _messages.Add(new Message { Id = 2, Text = "Welcome to React and Csharp", CreatedDate = DateTime.Now });
    }

    public int Count => _messages.Count;

    public async Task<IEnumerable<Message>> GetAllMessagesAsync()
    {
        return await Task.Run(() => _messages);
    }

    public async Task<Message> GetMessageAsync(int id)
    {
        var message = FindMessage(id);

        await Task.CompletedTask; // Maintains async signature consistency

        return message;
    }

    public async Task AddMessageAsync(Message message)
    {
        VerifyMessage(message);

        var messageToAdd = new Message
        {
            Id = Interlocked.Increment(ref _nextId), // Ensures thread-safe increment
            Text = message.Text,
            CreatedDate = DateTime.UtcNow // Ensures time zone consistency
        };

        // Adding to the list is fast and doesn't require async/await
        _messages.Add(messageToAdd);

        // Simulate async delay only if needed (e.g., database call)
        await Task.CompletedTask;
    }

    public async Task UpdateMessageAsync(int id, Message message)
    {
        VerifyMessage(message);
        var messageToUpdate = FindMessage(id);
        messageToUpdate.Text = message.Text;
        await Task.CompletedTask;
    }

    public async Task DeleteMessageAsync(int id)
    {
        var messageToRemove = FindMessage(id);
        _messages.Remove(messageToRemove);
        await Task.CompletedTask;
    }
    private Message FindMessage(int id)
    {
        var message = _messages.SingleOrDefault(m => m.Id == id);

        if (message == null)
        {
            throw new KeyNotFoundException($"Message with ID {id} was not found.");
        }
        return message;
    }
    private void VerifyMessage(Message message)
    {
        if (message == null)
        {
            throw new ArgumentNullException(nameof(message), "Message cannot be null.");
        }

        if (string.IsNullOrWhiteSpace(message.Text))
        {
            throw new ArgumentException("Message text cannot be empty.", nameof(message));
        }
    }
}
