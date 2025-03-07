using BackendCsharp.Models;

namespace BackendCsharp.Services;
public interface IMessagesService
{
    int Count { get; }
    Task<IEnumerable<Message>> GetAllMessagesAsync();
    Task<Message> GetMessageAsync(int id);
    Task AddMessageAsync(Message message);
    Task UpdateMessageAsync(int id, Message message);
    Task DeleteMessageAsync(int id);
}
