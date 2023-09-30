import { CountryRates, SelectedCountryRate } from "../types/Entry";

export const getCountryRate = (
	countryRates: CountryRates,
	selectedCountryRate: SelectedCountryRate,
) => {
	switch (selectedCountryRate) {
		case 1:
			return countryRates.backpacker;
		case 2:
			return countryRates.average;
		case 3:
			return countryRates.luxury;
		default:
			return 1;
	}
};
