using System.ComponentModel.DataAnnotations;

namespace Country.Models
{
    public class CountryRate
    {
        [Key]
        public required string Country { get; set; }

        public int Backpacker { get; set; }

        public int Average { get; set; }

        public int Luxury { get; set; }
    }
}