import { CountryCard } from "./components/CountryCard";
import { Header } from "./components/Header";
import { Entry } from "./types/Entry";
import { getCountryRate } from "./utility/getCountryRate";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import cardStyle from "./components/CountryCard.module.scss";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export const Home = ({ entries }: { entries: Entry[] }) => {
	const [overviewHeadingValue, setOverviewHeadingValue] = useState(0);

	let calcOverviewTotal = 0;

	const generateCards = () => {
		return entries.map((entry, index) => {
			const entryTotal =
				entry.days *
					getCountryRate(entry.countryRates, entry.selectedCountryRate) +
				(entry.commuteCost ?? 0) +
				(entry.extras ?? 0);

			calcOverviewTotal += entryTotal;

			return <CountryCard entry={entry} entryTotal={entryTotal} key={index} />;
		});
	};

	useEffect(() => {
		setOverviewHeadingValue(calcOverviewTotal);
	}, [entries]);

	return (
		<div className={styles.body}>
			<Header overviewHeadingValue={overviewHeadingValue} />
			<div className={styles.pageContainer}>
				{entries && generateCards()}
				<div className={`${cardStyle.cardContainer} ${styles.addCountryCard}`}>
					<AddCircleOutlineRoundedIcon
						fontSize='large'
						className={styles.addCountryIcon}
					/>
				</div>
			</div>
		</div>
	);
};
