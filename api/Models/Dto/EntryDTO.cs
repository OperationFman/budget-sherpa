using System.ComponentModel.DataAnnotations;

namespace Entries.Models.Dto {

    public class EntryDto {
        public int Id { get; set; }

        [Required]
        [MaxLength(60)]
        public string Country { get; set; }

        public int Extras { get; set; }
    }
}