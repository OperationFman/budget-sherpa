using Microsoft.AspNetCore.Mvc;
using Entries.Models.Dto;
using Entries.Data;

namespace Entries.Controller {
    [Route("api/entries")]
    [ApiController]
    public class Entries : ControllerBase {
        [HttpGet]
        public IEnumerable<EntryDto> GetEntries() {
            return EntryStore.entryList;
        }
    }
}