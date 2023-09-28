using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Models;
using Mappings;
using Country.Models;

namespace Entries.Controller
{
    [Route("api/entries")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly ILogger<EntriesController> _logger;
        private readonly ApiDbContext _context;

        public EntriesController(ILogger<EntriesController> logger, ApiDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EntryDto>> GetEntries()
        {
            _logger.LogInformation("Getting all entries");

            return Ok(_context.Entry.ToList());
        }

        [HttpGet("countries")]
        public ActionResult<IEnumerable<CountryRate>> GetCountries()
        {
            _logger.LogInformation("Getting all countries names");

            return Ok(_context.CountryRate.Select(e => e.Country).ToList());
        }

        [HttpGet("country-rates")]
        public ActionResult<IEnumerable<CountryRate>> GetCountryRates()
        {
            _logger.LogInformation("Getting all countries and their rates");

            return Ok(_context.CountryRate.ToList());
        }

        [HttpGet("id")]
        public ActionResult<EntryDto> GetEntry(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            Entry? entry = _context.Entry.FirstOrDefault(u => u.Id == id);

            if (entry == null)
            {
                _logger.LogError("Couldn't find entry by id");
                return NotFound();
            }

            ExpandedEntryDto? expandedEntryDto = EntryMapper.MapEntryToExpandedEntryDto(entry, _context);

            if (expandedEntryDto == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(expandedEntryDto);
        }

        [HttpPost]
        public ActionResult<EntryDto> CreateEntry([FromBody] EntryDto entryDto)
        {
            if (entryDto == null || entryDto.Country == null)
            {
                return BadRequest();
            }

            var countryRate = _context.CountryRate.FirstOrDefault(u => u.Country == entryDto.Country);

            if (countryRate == null)
            {
                return NotFound();
            }

            if (entryDto.Id > 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            entryDto.Id = _context.Entry.OrderByDescending(u => u.Id).FirstOrDefault()?.Id + 1 ?? 1;
            Entry mappedEntry = EntryMapper.MapEntryDtoToEntry(entryDto);

            _context.Entry.Add(entity: mappedEntry);
            _context.SaveChanges();


            ExpandedEntryDto? expandedEntryDto = EntryMapper.MapEntryToExpandedEntryDto(mappedEntry, _context);

            if (expandedEntryDto == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(expandedEntryDto);

        }

        [HttpDelete("id")]
        public IActionResult DeleteEntry(int id)
        {

            if (id == 0)
            {
                return BadRequest();
            }

            Entry? entry = _context.Entry.FirstOrDefault(u => u.Id == id);

            if (entry == null)
            {
                return NotFound();
            }

            _context.Entry.Remove(entity: entry);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody] EntryDto entryDto)
        {

            if (entryDto == null)
            {
                return BadRequest();
            }

            Entry? existingEntry = _context.Entry.FirstOrDefault(u => u.Id == entryDto.Id);

            if (existingEntry == null)
            {
                return NotFound();
            }

            _context.Entry.Remove(entity: existingEntry);
            _context.Entry.Add(entity: EntryMapper.MapEntryDtoToEntry(entryDto));
            _context.SaveChanges();

            return NoContent();
        }
    }
}