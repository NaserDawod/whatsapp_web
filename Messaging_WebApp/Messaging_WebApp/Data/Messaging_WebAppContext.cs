using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Messaging_WebApp.Models;

namespace Messaging_WebApp.Data
{
    public class Messaging_WebAppContext : DbContext
    {
        public Messaging_WebAppContext (DbContextOptions<Messaging_WebAppContext> options)
            : base(options)
        {
        }

        public DbSet<Messaging_WebApp.Models.User>? User { get; set; }

        public DbSet<Messaging_WebApp.Models.Contact>? Contact { get; set; }

        public DbSet<Messaging_WebApp.Models.Message>? Message { get; set; }
    }
}
