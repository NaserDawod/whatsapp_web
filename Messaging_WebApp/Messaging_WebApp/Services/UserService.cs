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
    }
}
