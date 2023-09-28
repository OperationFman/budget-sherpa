using Microsoft.EntityFrameworkCore;

public class ApiDbContext : DbContext
{
    public virtual DbSet<Entries.Models.Entry> Entry { get; set; }
    public virtual DbSet<CountryRate.Models.CountryRate> CountryRate { get; set; }

    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    { }
}