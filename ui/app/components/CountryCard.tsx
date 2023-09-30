import styles from "./CountryCard.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";
import { Entry as Entry } from "../types/Entry";
import { formatCommaEvery3Digits } from "../utility/format";
import { getCountryRate } from "../utility/getCountryRate";

export const CountryCard = ({ entry }: { entry: Entry }) => {
	const calculateTotalEntryCost = () => {
		const countryRate = getCountryRate(
			entry.countryRates,
			entry.selectedCountryRate,
		);

		const extras = entry.extras ?? 0;

		return formatCommaEvery3Digits(entry.days * countryRate + extras);
	};

	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardInfoContainer}>
				<div className={styles.titleContainer}>
					<div className={styles.title}>{entry.country}</div>
				</div>
				<div className={styles.commuteAndDays}>
					{entry.commuteCost && (
						<div className={styles.commute}>
							<AirplanemodeActiveRoundedIcon className={styles.commuteIcon} />
							<div className={styles.commuteText}>
								${formatCommaEvery3Digits(entry.commuteCost)}
							</div>
						</div>
					)}
					<div className={styles.days}>{entry.days} Days</div>
				</div>
				<div className={styles.costs}>
					{entry.extras !== null &&
						entry.extras !== undefined &&
						entry.extras !== 0 && (
							<div className={styles.extraCost}>+${entry.extras}</div>
						)}
					<div className={styles.totalCost}>${calculateTotalEntryCost()}</div>
				</div>
			</div>

			<div className={styles.buttons}>
				<EditIcon fontSize='large' />
				<DeleteOutlineRoundedIcon
					fontSize='large'
					className={styles.deleteButton}
				/>
			</div>
		</div>
	);
};
