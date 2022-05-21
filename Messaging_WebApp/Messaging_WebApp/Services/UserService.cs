using Messaging_WebApp.Data;
using Messaging_WebApp.Models;

namespace Messaging_WebApp.Services
{
    public class UserService : IUserService
    {
        private readonly Messaging_WebAppContext _context;
        public static List<User> Users;
        public UserService(Messaging_WebAppContext context) {
            _context = context;
            var contacts = _context.Contact.ToList();
            var messages = _context.Message.ToList();
            foreach (var user in Users)
            {
                user.Contacts = contacts.Where(x => x.UserId == user.Username).ToList();
                foreach (var contact in user.Contacts)
                {
                    contact.Messages = messages.Where(x => x.ContactId == contact.Id).ToList();
                }
            }
        }

        public User getUser(string username) {
            var user = _context.User.Where(x => x.Username == username);
            if (user == null) {
                return null;
            }
            return user.First();
        }

        public List<Contact> getContacts(string userName) {
            var user = Users.Find(x => x.Username == userName);
            if (user == null) {
                return null;
            }
            return user.Contacts;
        }

        public Contact getContact(string userName, string contId) {
            var user = getUser(userName);
            if (user == null) {
                return null;
            }
            var contact = user.Contacts.Find(x => x.Contname == contId);
            if (contact == null)
            {
                return null;
            }
            return contact;
        }

        public List<Message> getMessages(string userName, string contId) {
            var contact = getContact(userName, contId);
            if (contact == null)
            {
                return null;
            }
            return contact.Messages;
        }

        public Message getMessage(string userName, string contId, int msgId) {
            var contact = getContact(userName, contId);
            if (contact == null) {
                return null;
            }
            var msgs = getMessages(userName, contId);
            var msg = contact.Messages.Find(x => x.Id == msgId);
            if (msg == null){
                return null;
            }
            return msg;
        }

        public async void addContact(string userName, string contId, string name, string server) {
            var user = getUser(userName);
            if (user == null) {

            }
            Contact contact = new Contact()
            {
                UserId = userName,
                Name = name,
                Server = server,
                Contname = contId,
                Last = null,
                Lastdate = null
            };
            user.Contacts.Add(contact);
            _context.Add(contact);
            await _context.SaveChangesAsync();
        }

        public async void removeContact(string userName, string contId) {
            var user = getUser(userName);
            if (user == null) {

            }
            var contact = getContact(userName, contId);
            if (contact == null) {

            }
            user.Contacts.Remove(contact);
            _context.Remove(contact);
            await _context.SaveChangesAsync();
        }
        public async void editContact(string userName, string contId, string name, string server) {
            var contact = getContact(userName, contId);
            if (contact == null) {

            }
            contact.Name = name;
            contact.Server = server;
            _context.Contact.Update(contact);
            await _context.SaveChangesAsync();
        }

        public async void addMessage(string userName, string contId, Message message) {
            var contact = getContact(userName, contId);
            if (contact == null) {

            }
            contact.Messages.Add(message);
            contact.Last = message.Content.Trim();
            contact.Lastdate = message.Created;
            _context.Add(message);
            _context.Update(contact);
            await _context.SaveChangesAsync();
        }

        public async void removeMessage(string userName, string contId, Message message) {
            var contact = getContact(userName, contId);
            if (contact == null) {

            }
            contact.Messages.Remove(message);
            _context.Remove(message);
            await _context.SaveChangesAsync();
        }

        public async void editMessage(string userName, string contId, int msgID, string content) {
            var contact = getContact(userName, contId);
            if (contact == null) {

            }
            var msg = getMessage(userName, contId, msgID);
            msg.Content = content;
            _context.Update(msg);
            await _context.SaveChangesAsync();
        }
    }
}
