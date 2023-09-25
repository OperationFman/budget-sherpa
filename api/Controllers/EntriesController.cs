using Microsoft.AspNetCore.Mvc;
using Entries.Models;

namespace Entries.Controller {
    [Route("api/entries")]
    [ApiController]
    public class Entries : ControllerBase {
        [HttpGet]
        public IEnumerable<Entry> getEntries() {
            return new List<Entry> {
                new Entry{Id=1, Country="Japan"},
                new Entry{Id=2, Country="Australia"}
            };
        }
    }
}