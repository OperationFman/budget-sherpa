using Entries.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace IntegrationTesting
{
    public class ReferenceDataTestDatabaseSetup
    {
        private readonly SqliteConnection _connection;
        private readonly ApiDbContext _context;

        public ReferenceDataTestDatabaseSetup()
        {
            _connection = new SqliteConnection("Filename=:memory:");
            _connection.Open();

            var _contextOptions = new DbContextOptionsBuilder<ApiDbContext>()
                .UseSqlite(_connection)
                .Options;

            _context = new ApiDbContext(_contextOptions);

            _context.Database.ExecuteSqlRaw(@"CREATE TABLE CountryRate (
                    Country TEXT PRIMARY KEY,
                    Backpacker INTEGER NOT NULL,
                    Average INTEGER NOT NULL,
                    Luxury INTEGER NOT NULL
                );");

            _context.Database.ExecuteSqlRaw(@"
                INSERT INTO CountryRate (
                    Country, Backpacker, Average, Luxury) 
                    VALUES ('United States', 1000, 2000, 3000);
                INSERT INTO CountryRate (
                    Country, Backpacker, Average, Luxury) 
                    VALUES ('Australia', 2000, 3000, 4000);
                INSERT INTO CountryRate (
                    Country, Backpacker, Average, Luxury) 
                    VALUES ('Peru', 10, 20, 30);
            ");
            
            _context.SaveChanges();
        }

        public ApiDbContext GetContext()
        {
            return _context;
        }

        public void Dispose()
        {
            _connection.Dispose();
            _context.Dispose();
        }
    }
}