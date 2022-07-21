using Microsoft.EntityFrameworkCore;
using webApp.Entities;

namespace webApp.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) :base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
    }
}
