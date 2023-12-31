using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Models;
using Mappings;

namespace Entries.Controller
{
    [Route("api/entries")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public EntriesController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ExpandedEntryDto>> GetEntries()
        {

            List<Entry> entries = _context.Entry.ToList();

            List<ExpandedEntryDto?> expandedEntries = entries.Select(i => EntryMapper.MapEntryToExpandedEntryDto(i, _context)).ToList();

            if (expandedEntries == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(expandedEntries);
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
            if (entryDto == null || entryDto.Country == null || entryDto.Id > 0)
            {
                return BadRequest();
            }

            var countryRate = _context.CountryRate.FirstOrDefault(u => u.Country == entryDto.Country);

            if (countryRate == null)
            {

                return NotFound();
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

            if (entryDto == null || entryDto.Id == 0)
            {
                return BadRequest();
            }

            Entry? existingEntry = _context.Entry.FirstOrDefault(u => u.Id == entryDto.Id);

            if (existingEntry == null)
            {
                return NotFound();
            }

            Entry entry = EntryMapper.MapEntryDtoToEntry(entryDto);

            _context.Entry.Remove(entity: existingEntry);
            _context.Entry.Add(entity: entry);
            _context.SaveChanges();

            ExpandedEntryDto? expandedEntryDto = EntryMapper.MapEntryToExpandedEntryDto(entry, _context);

            if (expandedEntryDto == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(expandedEntryDto);
        }

        
        
    }
}