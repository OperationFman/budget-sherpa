using Entries.Controller;
using Entries.Models;
using Entries.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace IntegrationTesting
{
    public class EntriesControllerTests
    {
        private readonly EntriesDatabaseTestSetup _databaseTestSetup;

        public EntriesControllerTests()
        {
            _databaseTestSetup = new EntriesDatabaseTestSetup();
        }

        [Fact]
        public void EntriesController_GetAllEntries()
        // Retrieve all entries from the API with Status Code 200
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.GetEntries().Result as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);

            var entries = Assert.IsType<List<ExpandedEntryDto>>(okResult.Value);
            Assert.NotNull(result);
            Assert.Equal(2, entries.Count);
            Assert.Equal(1, entries[0].Id);
            Assert.Equal("United States", entries[0].Country);
            Assert.Equal(SelectedCountryRate.Average, entries[0].SelectedCountryRate);
            Assert.Equal(7, entries[0].Days);
            Assert.Equal(Commute.Flight, entries[0].Commute);
            Assert.Equal(100, entries[0].CommuteCost);
            Assert.Equal(200, entries[0].Extras);
            Assert.Equal(2, entries[1].Id);
            Assert.Equal("Australia", entries[1].Country);
            Assert.Equal(SelectedCountryRate.Backpacker, entries[1].SelectedCountryRate);
            Assert.Equal(14, entries[1].Days);
            Assert.Equal(Commute.Bus, entries[1].Commute);
            Assert.Equal(1000, entries[1].CommuteCost);
            Assert.Equal(0, entries[1].Extras);


            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_GetEntryById()
        // Retrieve a single entry by ID from the API
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.GetEntry(2).Result as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);

            var entry = Assert.IsType<ExpandedEntryDto>(okResult.Value);
            Assert.NotNull(result);
            Assert.Equal(2, entry.Id);
            Assert.Equal("Australia", entry.Country);
            Assert.Equal(SelectedCountryRate.Backpacker, entry.SelectedCountryRate);
            Assert.Equal(14, entry.Days);
            Assert.Equal(Commute.Bus, entry.Commute);
            Assert.Equal(1000, entry.CommuteCost);
            Assert.Equal(0, entry.Extras);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailGettingEntryById0()
        // Receive Bad Request status 400 when fetching with an ID of 0
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.GetEntry(0).Result as BadRequestResult;
            }

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailGettingEntryByUnavailableId()
        // Receive Not Found status 404 when fetching with an ID that does not exist in the database
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.GetEntry(99).Result as NotFoundResult;
            }

            var badResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_CreateEntry()
        // Update the DB & Retrieve Expanded Entry DTO from the API with Status Code 200
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 0,
                    Country = "Peru",
                    SelectedCountryRate = SelectedCountryRate.Luxury,
                    Days = 5,
                    Commute = Commute.Ferry,
                    CommuteCost = 2000,
                    Extras = 500
                };
                var controller = new EntriesController(context);
                result = controller.CreateEntry(newEntry).Result as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);

            var entry = Assert.IsType<ExpandedEntryDto>(okResult.Value);
            Assert.NotNull(result);
            Assert.Equal(3, entry.Id);
            Assert.Equal("Peru", entry.Country);
            Assert.Equal(10, entry.CountryRates.Backpacker);
            Assert.Equal(20, entry.CountryRates.Average);
            Assert.Equal(30, entry.CountryRates.Luxury);
            Assert.Equal(SelectedCountryRate.Luxury, entry.SelectedCountryRate);
            Assert.Equal(5, entry.Days);
            Assert.Equal(Commute.Ferry, entry.Commute);
            Assert.Equal(2000, entry.CommuteCost);
            Assert.Equal(500, entry.Extras);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailCreateEntryWithByProvidingId()
        // Receive Bad Request 400 when POSTing entryDto with an ID
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 1,
                    Country = "Syria",
                    SelectedCountryRate = SelectedCountryRate.Backpacker,
                    Days = 200,
                    Commute = Commute.Foot,
                    CommuteCost = 0,
                    Extras = 0
                };
                var controller = new EntriesController(context);
                result = controller.CreateEntry(newEntry).Result as BadRequestResult;
            }

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailCreateEntryWithBadCountry()
        // Receive Not Found 404 when POSTing entryDto with a country that doesn't exist in the CountryRates database
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 0,
                    Country = "Austria-Hungary",
                    SelectedCountryRate = SelectedCountryRate.Backpacker,
                    Days = 200,
                    Commute = Commute.Foot,
                    CommuteCost = 0,
                    Extras = 0
                };
                var controller = new EntriesController(context);
                result = controller.CreateEntry(newEntry).Result as NotFoundResult;
            }

            var badResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_DeleteEntryByID()
        // Receive No Content 204 when an entry is deleted by ID
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.DeleteEntry(1) as NoContentResult;
            }

            var okResult = Assert.IsType<NoContentResult>(result);
            Assert.Equal(204, okResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailDeleteEntryByIDOf0()
        // Receive Bad Request 400 when when DELETEing with an id of 0
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.DeleteEntry(0) as BadRequestResult;
            }

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailDeleteEntryByIDIfNotFound()
        // Receive Not Found 404 when when DELETEing and entry with by an id that doesn't exist
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new EntriesController(context);
                result = controller.DeleteEntry(99) as NotFoundResult;
            }

            var badResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_UpdateEntry()
        // Receive Status Code ok 200 when changing the values of an existing entry
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 1,
                    Country = "Peru",
                    SelectedCountryRate = SelectedCountryRate.Luxury,
                    Days = 2,
                    Commute = Commute.Foot,
                    CommuteCost = 999,
                    Extras = 999
                };
                var controller = new EntriesController(context);
                result = controller.UpdateEntry(newEntry) as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);

            var entry = Assert.IsType<ExpandedEntryDto>(okResult.Value);
            Assert.NotNull(result);
            Assert.Equal(1, entry.Id);
            Assert.Equal("Peru", entry.Country);
            Assert.Equal(10, entry.CountryRates.Backpacker);
            Assert.Equal(20, entry.CountryRates.Average);
            Assert.Equal(30, entry.CountryRates.Luxury);
            Assert.Equal(SelectedCountryRate.Luxury, entry.SelectedCountryRate);
            Assert.Equal(2, entry.Days);
            Assert.Equal(Commute.Foot, entry.Commute);
            Assert.Equal(999, entry.CommuteCost);
            Assert.Equal(expected: 999, entry.Extras);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailUpdatingEntryWithId0()
        // Receive Bad Request 400 when when UPDATEing with an id of 0
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 0,
                    Country = "Peru",
                    SelectedCountryRate = SelectedCountryRate.Luxury,
                    Days = 2,
                    Commute = Commute.Foot,
                    CommuteCost = 999,
                    Extras = 999
                };
                var controller = new EntriesController(context);
                result = controller.UpdateEntry(newEntry) as BadRequestResult;
            }

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }

        [Fact]
        public void EntriesController_FailUpdatingEntryIfNotFound()
        // Receive Not Found 404 if the entry could not be found to be updated
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var newEntry = new EntryDto
                {
                    Id = 99,
                    Country = "Kenya",
                    SelectedCountryRate = SelectedCountryRate.Backpacker,
                    Days = 4,
                    Commute = Commute.Car,
                    CommuteCost = 123,
                    Extras = 123
                };
                var controller = new EntriesController(context);
                result = controller.UpdateEntry(newEntry) as NotFoundResult;
            }

            var badResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, badResult.StatusCode);

            _databaseTestSetup.Dispose();
        }
    }
}