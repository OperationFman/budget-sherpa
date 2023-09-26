using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Data;
using Entries.Models;

namespace Entries.Controller {
    [Route("api/entries")]
    [ApiController]
    public class Entries : ControllerBase {
        [HttpGet]
        public ActionResult<IEnumerable<EntryDto>> GetEntries() {
            return Ok(EntryStore.entryList);
        }

        [HttpGet("id")]
        public ActionResult<EntryDto> GetEntry(int id) {
            if (id == 0) {
                return BadRequest();
            }

            EntryDto? entry = EntryStore.entryList.FirstOrDefault(u=>u.Id==id);
            
            if (entry == null) {
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
    }
}