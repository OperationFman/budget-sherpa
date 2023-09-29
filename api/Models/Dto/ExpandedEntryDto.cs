using System.ComponentModel.DataAnnotations;

namespace Entries.Models.Dto
{

    public class ExpandedEntryDto
    {
        [Required]
        public required int Id { get; set; }

        [Required]
        public required string Country { get; set; }

        [Required]
        public required CountryRatesDto CountryRates { get; set; }

        [Required]
        public required int Days { get; set; }

        public Commute? Commute { get; set; }

        public int? CommuteCost { get; set; }

        public int? Extras { get; set; }
    }

    public class CountryRatesDto
    {
        public int Backpacker { get; set; }

        public int Average { get; set; }

        public int Luxury { get; set; }
    }
}