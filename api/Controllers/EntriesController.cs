using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Data;
using Entries.Models;

namespace Entries.Controller {
    [Route("api/entries")]
    [ApiController]
    public class EntriesController : ControllerBase {
        private readonly ILogger<EntriesController> _logger;

        public EntriesController(ILogger<EntriesController> Logger) {
            _logger = Logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EntryDto>> GetEntries() {
            _logger.LogInformation("Getting all entries");

            return Ok(EntryStore.entryList);
        }

        [HttpGet("id")]
        public ActionResult<EntryDto> GetEntry(int id) {
            if (id == 0) {
                return BadRequest();
            }

            EntryDto? entry = EntryStore.entryList.FirstOrDefault(u=>u.Id==id);
            
            if (entry == null) {
                _logger.LogError($"Couldn't find entry with id: {id}");
                return NotFound();
            }

            return Ok(entry);
        }

        [HttpPost]
        public ActionResult<EntryDto> CreateEntry([FromBody]EntryDto entryDto) {
            if (entryDto == null) {
                return BadRequest();
            }
            if (entryDto.Id > 0) {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            entryDto.Id = EntryStore.entryList.OrderByDescending(u => u.Id).FirstOrDefault()?.Id + 1 ?? 1;

            EntryStore.entryList.Add(entryDto);

            return Ok(entryDto);
        }

        [HttpDelete("id")]
        public IActionResult DeleteEntry(int id) {
            
            if (id == 0) {
                return BadRequest();
            }

            EntryDto? entryDto = EntryStore.entryList.FirstOrDefault(u => u.Id == id);
            
            if (entryDto == null) {
                return NotFound();
            }
            
            EntryStore.entryList.Remove(entryDto);

            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateEntry([FromBody]EntryDto entryDto) {
            
            if (entryDto == null) {
                return BadRequest();
            }

            EntryDto? existingEntryDto = EntryStore.entryList.FirstOrDefault(u => u.Id == entryDto.Id);

            if (existingEntryDto == null) {
                return NotFound();
            }

            EntryStore.entryList.Remove(existingEntryDto);
            EntryStore.entryList.Add(entryDto);

            return NoContent();
        }
    }
}