using Entries.Models;
using Entries.Models.Dto;

namespace Entries.Data
{
    public static class EntryStore
    {
        public static List<EntryDto> entryList = new List<EntryDto> {
                new EntryDto{Id=1, Country="Japan", Days=20, Commute=Commute.Flight, CommuteCost=1000, Extras=500},
                new EntryDto{Id=2, Country="Italy", Days=14, Commute=Commute.Flight, CommuteCost=500, Extras=140},
                new EntryDto{Id=3, Country="Germany", Days=7, Commute=Commute.Train, CommuteCost=20, Extras=0}
        };
    }
}