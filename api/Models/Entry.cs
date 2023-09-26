namespace Entries.Models
{

    public class Entry
    {
        public int Id { get; set; }
        public required string Country { get; set; }

        public int Extras { get; set; }
    }
}