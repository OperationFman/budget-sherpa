using Country.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;

namespace ReferenceData.Controller
{

    [Route("api/v1/reference")]
    [ApiController]
    public class ReferenceDataController : ControllerBase
    {

        private readonly ApiDbContext _context;

        public ReferenceDataController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet("countries")]
        public ActionResult<IEnumerable<CountryRate>> GetCountries()
        {

            return Ok(_context.CountryRate.Select(e => e.Country).ToList());
        }

        [HttpGet("country-rates")]
        public ActionResult<IEnumerable<CountryRate>> GetCountryRates()
        {

            return Ok(_context.CountryRate.ToList());
        }
    }
}
