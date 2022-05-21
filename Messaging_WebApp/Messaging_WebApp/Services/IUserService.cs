using Messaging_WebApp.Models;

namespace Messaging_WebApp.Services
{
    public interface IUserService
    {
        public User getUser(string username);

        public List<Contact> getContacts(string userName);
        public Contact getContact(string userName, string contId);

        public List<Message> messages(string userName, string contId);

        public void addContact(string userName, string contId, string name, string server);

        public void removeContact(string userName, string contId);

        public void editContact(string userName, string contId, string name, string server);

        public void addMessage(string userName, string contId, Message message);

        public void removeMessage(string userName, string contId, Message message);

        public void editMessage(string userName, string contId, string content);
    }
}
