export enum Commute {
	Flight,
	Ferry,
	Train,
	Bus,
	Car,
	Foot,
}

export enum SelectedCountryRate {
	Free,
	Backpacker,
	Average,
	Luxury,
}

export type Entry = {
	id: number;
	country: string;
	countryRates: CountryRates;
	selectedCountryRate: SelectedCountryRate;
	days: number;
	commute: Commute;
	commuteCost?: number;
	extras?: number;
};

export type EntryDto = {
	Id: number;
	Country: string;
	SelectedCountryRate: SelectedCountryRate;
	Days: number;
	Commute: Commute;
	CommuteCost?: number;
	Extras?: number;
};

export type CountryRates = {
	backpacker: number;
	average: number;
	luxury: number;
};

export const entryTypeGuard = (expandedEntryDto: any): Entry[] | false => {
	return expandedEntryDto.id !== undefined &&
		expandedEntryDto.country !== undefined &&
		expandedEntryDto.countryRates !== undefined &&
		expandedEntryDto.days !== undefined
		? false
		: expandedEntryDto;
};
