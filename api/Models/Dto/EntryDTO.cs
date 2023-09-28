using System.ComponentModel.DataAnnotations;

namespace Entries.Models.Dto
{

    public class EntryDto
    {
        [Required]
        public required int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public required string Country { get; set; }

        [Required]
        public required int Days { get; set; }

        public Commute? Commute { get; set; }

        public int? CommuteCost { get; set; }

        public int? Extras { get; set; }
    }
}