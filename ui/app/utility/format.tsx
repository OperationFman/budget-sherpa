export const formatCommaEvery3Digits = (number: number): string => {
	const regexp = /(\d+)(\d{3})(?!\.\d)/g;

	const formattedNumber = `${number}`.replace(regexp, "$1,$2");
	return formattedNumber;
};
