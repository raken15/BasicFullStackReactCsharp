using BackendCsharp.Models;

namespace BackendCsharp.Services;
public interface IMessagesService
{
    int Count { get; }
    IEnumerable<Message> GetAllMessages();
    Message GetMessage(int id);
    void AddMessage(Message message);
    void UpdateMessage(int id, Message message);
    void DeleteMessage(int id);
}
