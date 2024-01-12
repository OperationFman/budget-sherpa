using Country.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using ReferenceData.Controller;
using Xunit;

namespace IntegrationTesting
{
    public class ReferenceDataControllerTests
    {
        private readonly ReferenceDataTestDatabaseSetup _databaseTestSetup;

        public ReferenceDataControllerTests()
        {
            _databaseTestSetup = new ReferenceDataTestDatabaseSetup();
        }

        [Fact]
        public void ReferenceData_GetCountries()
        // Retrieve all country names from the API with Status Code 200
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new ReferenceDataController(context);
                result = controller.GetCountries().Result as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            var countries = Assert.IsType<List<string>>(okResult.Value);
            string[] expected = { "Australia", "Peru", "United States", };

            Assert.Equal(200, okResult.StatusCode);
            Assert.NotNull(result);
            Assert.Equal(3, countries.Count);
            Assert.Equal(expected, countries);
        }

        [Fact]
        public void ReferenceData_GetCountryRates()
        // Retrieve all country names from the API with Status Code 200
        {
            IActionResult? result;
            using (var context = _databaseTestSetup.GetContext())
            {
                var controller = new ReferenceDataController(context);
                result = controller.GetCountryRates().Result as OkObjectResult;
            }

            var okResult = Assert.IsType<OkObjectResult>(result);
            var countries = Assert.IsType<List<CountryRate>>(okResult.Value);

            Assert.Equal(200, okResult.StatusCode);
            Assert.NotNull(countries);
            Assert.Equal("United States", countries[0].Country);
            Assert.Equal(2000, countries[0].Average);
            Assert.Equal(1000, countries[0].Backpacker);
            Assert.Equal(3000, countries[0].Luxury);
            Assert.Equal("Australia", countries[1].Country);
            Assert.Equal(3000, countries[1].Average);
            Assert.Equal(2000, countries[1].Backpacker);
            Assert.Equal(4000, countries[1].Luxury);
            Assert.Equal("Peru", countries[2].Country);
            Assert.Equal(20, countries[2].Average);
            Assert.Equal(10, countries[2].Backpacker);
            Assert.Equal(30, countries[2].Luxury);
        }
    }
}