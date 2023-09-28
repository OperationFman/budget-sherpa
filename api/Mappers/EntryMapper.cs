using Entries.Models;
using Entries.Models.Dto;

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

        public static ExpandedEntryDto? MapEntryToExpandedEntryDto(Entry entry, ApiDbContext _context)
        {
            var countryRate = _context.CountryRate.FirstOrDefault(u => u.Country == entry.Country);

            if (countryRate == null)
            {
                return null;
            }

            return new ExpandedEntryDto
            {
                Id = entry.Id,
                CountryRates = countryRate,
                Days = entry.Days,
                Commute = entry.Commute,
                CommuteCost = entry.CommuteCost,
                Extras = entry.Extras
            };
        }
    }
}