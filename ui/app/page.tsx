import { CountryCard } from "./components/CountryCard";
import cardStyle from "./components/CountryCard.module.scss";
import { Header } from "./components/Header";
import styles from "./page.module.scss";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { entryTypeGuard } from "./types/Entry";

export default async function Home() {
	const getAllEntries = async () => {
		const response = await fetch(`${process.env.REST_API_URI}/entries`);
		return entryTypeGuard(await response.json());
	};

	const entries = await getAllEntries();

	return (
		<>
			<Header />
			<div className={styles.pageContainer}>
				{entries &&
					entries.map((entry, index) => {
						return <CountryCard entry={entry} key={index} />;
					})}
				<div className={`${cardStyle.cardContainer} ${styles.addCountryCard}`}>
					<AddCircleOutlineRoundedIcon className={styles.addCountryIcon} />
				</div>
			</div>
		</>
	);
}
