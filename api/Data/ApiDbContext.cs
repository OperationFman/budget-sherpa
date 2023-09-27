using Entries.Models;
using Microsoft.EntityFrameworkCore;

public class ApiDbContext : DbContext
{
    public virtual DbSet<Entry> Entry { get; set; }

    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {

    }
}