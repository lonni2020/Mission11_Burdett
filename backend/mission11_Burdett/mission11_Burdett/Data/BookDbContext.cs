using Microsoft.EntityFrameworkCore;

namespace mission11_Burdett.Data
{
    public class BookDbContext: DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
