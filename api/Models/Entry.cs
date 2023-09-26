using System.ComponentModel.DataAnnotations;

namespace Entries.Models
{

    public class Entry
    {
        [Key]
        public required int Id { get; set; }
        public required string Country { get; set; }
        public required int Days { get; set; }
        public Commute? Commute { get; set; }
        public int? CommuteCost { get; set; }
        public int? Extras { get; set; }
        public int? DailyCost { get; set; }
    }
}