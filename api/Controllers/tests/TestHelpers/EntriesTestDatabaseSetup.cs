using Entries.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace IntegrationTesting
{
    public class EntriesDatabaseTestSetup
    {
        private readonly SqliteConnection _connection;
        private readonly ApiDbContext _context;

        public EntriesDatabaseTestSetup()
        {
            _connection = new SqliteConnection("Filename=:memory:");
            _connection.Open();

            var _contextOptions = new DbContextOptionsBuilder<ApiDbContext>()
                .UseSqlite(_connection)
                .Options;

            _context = new ApiDbContext(_contextOptions);

            _context.Database.ExecuteSqlRaw(@"CREATE TABLE Entry (
                    Id INTEGER PRIMARY KEY,
                    Country TEXT NOT NULL,
                    SelectedCountryRate INTEGER NOT NULL,
                    Days INTEGER NOT NULL,
                    Commute INTEGER NOT NULL,
                    CommuteCost INTEGER NULL,
                    Extras INTEGER NULL
                );");

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

            _context.AddRange(
                new Entry
                {
                    Id = 1,
                    Country = "United States",
                    SelectedCountryRate = SelectedCountryRate.Average,
                    Days = 7,
                    Commute = Commute.Flight,
                    CommuteCost = 100,
                    Extras = 200
                },
                new Entry
                {
                    Id = 2,
                    Country = "Australia",
                    SelectedCountryRate = SelectedCountryRate.Backpacker,
                    Days = 14,
                    Commute = Commute.Bus,
                    CommuteCost = 1000,
                    Extras = 0
                });
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