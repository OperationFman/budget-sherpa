"use client";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { CountryCard } from "./components/CountryCard";
import { Header } from "./components/Header";
import { Entry } from "./types/Entry";
import { getCountryRate } from "./utility/getCountryRate";

import cardStyle from "./components/CountryCard.module.scss";
import styles from "./page.module.scss";

export const Index = ({ entries }: { entries: Entry[] }) => {
	// const [overviewHeadingValue, setOverviewHeadingValue] = useState(0);
	// setOverviewHeadingValue(500);

	const generateCards = () => {
		return entries.map((entry, index) => {
			const countryRate = getCountryRate(
				entry.countryRates,
				entry.selectedCountryRate,
			);

			const extras = entry.extras ?? 0;
			const entryTotal = entry.days * countryRate + extras;

			return <CountryCard entry={entry} entryTotal={entryTotal} key={index} />;
		});
	};

	return (
		<>
			<Header overviewHeadingValue={5000} overviewSubHeadingValue={5000} />
			<div className={styles.pageContainer}>
				{entries && generateCards()}
				<div className={`${cardStyle.cardContainer} ${styles.addCountryCard}`}>
					<AddCircleOutlineRoundedIcon className={styles.addCountryIcon} />
				</div>
			</div>
		</>
	);
};
