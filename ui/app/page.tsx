import { CountryCard } from "./components/CountryCard";
import { Header } from "./components/Header";
import styles from "./page.module.scss";
import cardStyle from "./components/CountryCard.module.scss";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function Home() {
	return (
		<>
			<Header />
			<div className={styles.pageContainer}>
				<CountryCard />
				<CountryCard />
				<CountryCard />
				<div className={`${cardStyle.cardContainer} ${styles.addCountryCard}`}>
					<AddCircleOutlineRoundedIcon className={styles.addCountryIcon} />
				</div>
			</div>
		</>
	);
}
