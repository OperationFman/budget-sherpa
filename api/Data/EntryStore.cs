using Entries.Models.Dto;

namespace Entries.Data {
    public static class EntryStore {
        public static List<EntryDto> entryList = new List<EntryDto> {
                new EntryDto{Id=1, Country="Japan"},
                new EntryDto{Id=2, Country="Australia"},
                new EntryDto{Id=3, Country="Germany"},
                new EntryDto{Id=4, Country="Canada"},
                new EntryDto{Id=5, Country="Japan"},
                new EntryDto{Id=6, Country="Kurdistan"}
        };
    }
}