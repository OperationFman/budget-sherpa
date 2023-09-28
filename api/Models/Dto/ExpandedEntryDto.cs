using System.ComponentModel.DataAnnotations;
using Country.Models;

namespace Entries.Models.Dto
{

    public class ExpandedEntryDto
    {
        [Required]
        public required int Id { get; set; }

        [Required]
        public required CountryRate CountryRates { get; set; }

        [Required]
        public required int Days { get; set; }

        public Commute? Commute { get; set; }

        public int? CommuteCost { get; set; }

        public int? Extras { get; set; }
    }
}