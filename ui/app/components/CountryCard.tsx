import styles from "./CountryCard.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";

export const CountryCard = () => {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardInfoContainer}>
				<div className={styles.titleContainer}>
					<div className={styles.title}>
						Democratic peoples republic of the Congo
					</div>
				</div>
				<div className={styles.commuteAndDays}>
					<div className={styles.commute}>
						<AirplanemodeActiveRoundedIcon className={styles.commuteIcon} />
						<div className={styles.commuteText}>$1,000</div>
					</div>
					<div className={styles.days}>25 Days</div>
				</div>
				<div className={styles.costs}>
					<div className={styles.extraCost}>+$500</div>
					<div className={styles.totalCost}>$3500</div>
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
