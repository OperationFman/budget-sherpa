using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Data;
using Entries.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Entries.Controller
{
    [Route("api/entries")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly ILogger<EntriesController> _logger;
        private readonly ApiDbContext _context;

        public EntriesController(ILogger<EntriesController> Logger, ApiDbContext context)
        {
            _logger = Logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EntryDto>> GetEntries()
        {
            _logger.LogInformation("Getting all entries");

            return Ok(_context.Entry.ToList());
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

            return Ok(entry);
        }

        [HttpPost]
        public ActionResult<EntryDto> CreateEntry([FromBody] EntryDto entryDto)
        {
            if (entryDto == null)
            {
                return BadRequest();
            }
            if (entryDto.Id > 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            entryDto.Id = _context.Entry.OrderByDescending(u => u.Id).FirstOrDefault()?.Id + 1 ?? 1;

            Entry validatedEntry = new()
            {
                Id = entryDto.Id,
                Country = entryDto.Country,
                Days = entryDto.Days,
                Commute = entryDto.Commute,
                CommuteCost = entryDto.CommuteCost,
                Extras = entryDto.Extras,
                DailyCost = entryDto.DailyCost
            };

            _context.Entry.Add(entity: validatedEntry);
            _context.SaveChanges();

            return Ok(validatedEntry);
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

            Entry validatedEntry = new()
            {
                Id = entryDto.Id,
                Country = entryDto.Country,
                Days = entryDto.Days,
                Commute = entryDto.Commute,
                CommuteCost = entryDto.CommuteCost,
                Extras = entryDto.Extras,
                DailyCost = entryDto.DailyCost
            };

            _context.Entry.Remove(entity: existingEntry);
            _context.Entry.Add(entity: validatedEntry);
            _context.SaveChanges();

            return NoContent();
        }
    }
}