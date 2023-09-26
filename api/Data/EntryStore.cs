using Entries.Models.Dto;

namespace Entries.Data {
    public static class EntryStore {
        public static List<EntryDto> entryList = new List<EntryDto> {
                new EntryDto{Id=1, Country="Japan", Extras=0},
                new EntryDto{Id=2, Country="Australia", Extras=250},
                new EntryDto{Id=3, Country="Germany", Extras=0},
                new EntryDto{Id=4, Country="Canada", Extras=100},
                new EntryDto{Id=5, Country="Japan", Extras=0},
                new EntryDto{Id=6, Country="Kurdistan", Extras=400}
        };
    }
}