using Entries.Models;
using Entries.Models.Dto;
using CoreLogic;

namespace Mappings
{
    public class EntryMapper
    {
        public static Entry MapEntryDtoToEntry(EntryDto entryDto)
        {
            return new Entry
            {
                Id = entryDto.Id,
                Country = entryDto.Country,
                Days = entryDto.Days,
                Commute = entryDto.Commute,
                CommuteCost = entryDto.CommuteCost,
                Extras = entryDto.Extras
            };
        }
    }
}