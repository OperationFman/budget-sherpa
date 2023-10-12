import { CountryCard } from "./components/CountryCard";
import { Header } from "./components/Header";
import { Entry } from "./types/Entry";
import { getCountryRate } from "./utility/getCountryRate";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import cardStyle from "./components/CountryCard.module.scss";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { FullScreenModal } from "./utility/FullScreenModal";
import { CountryEdit } from "./components/CountryEdit";

export const HomePage = ({ entries }: { entries: Entry[] }) => {
	const [overviewHeadingValue, setOverviewHeadingValue] = useState(0);
	const [openModal, setModalOpen] = useState(false);

	let calcOverviewTotal = 0;

	const generateCards = () => {
		return entries.map((entry, index) => {
			const dailyRate = getCountryRate(
				entry.countryRates,
				entry.selectedCountryRate,
			);
			const entryTotal =
				entry.days * dailyRate + (entry.commuteCost ?? 0) + (entry.extras ?? 0);

			calcOverviewTotal += entryTotal;

			return (
				<CountryCard
					entry={entry}
					entryTotal={entryTotal}
					dailyRate={dailyRate}
					key={index}
				/>
			);
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
				<div
					className={`${cardStyle.cardContainer} ${cardStyle.clickArea} ${styles.addCountryCard}`}
					onClick={() => setModalOpen(true)}>
					<AddCircleOutlineRoundedIcon
						fontSize='large'
						className={styles.addCountryIcon}
					/>
				</div>
				<FullScreenModal open={openModal} setModalOpen={setModalOpen}>
					<CountryEdit setModalOpen={setModalOpen} />
				</FullScreenModal>
			</div>
		</div>
	);
};
