import styles from "./Header.module.scss";
import EditIcon from "@mui/icons-material/Edit";

export const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.pageContainer}>
				<h3 className={styles.banner}>Budget 🎒 Sherpa</h3>

				<div className={styles.overviewContainer}>
					<div className={styles.overviewNumbersContainer}>
						<div>
							<span className={styles.overviewHeading}>$ 8,300</span>
							<span className={styles.overviewSlash}>/</span>
							<span className={styles.overviewSubheading}>$ 15,000</span>
						</div>

						<div className={styles.headerMobileEditButton}>
							<EditIcon fontSize='medium' className={styles.editButton} />
						</div>
					</div>
					<div className={styles.budgetRemainingText}>$6,700 Under-Budget</div>
					<div className={styles.headerDesktopEditButton}>
						<EditIcon fontSize='medium' className={styles.editButton} />
					</div>
				</div>
			</div>
		</div>
	);
};
