using Entries.Controller;
using Entries.Models;
using Entries.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace IntegrationTesting
{
    public class EntriesControllerTests
    {
        private readonly DatabaseTestSetup _databaseTestSetup;

        public EntriesControllerTests()
        {
            _databaseTestSetup = new DatabaseTestSetup();
        }

        [Fact]
        public void EntriesController_GetAllEntries()
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


    }
}