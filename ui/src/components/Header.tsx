import EditIcon from "@mui/icons-material/Edit";
import { formatCommaEvery3Digits } from "../../../ui/src/utility/format";
import styles from "./Header.module.scss";

export const Header = ({
	overviewHeadingValue,
	overviewSubHeadingValue,
}: {
	overviewHeadingValue: number;
	overviewSubHeadingValue: number;
}) => {
	const budgetRemaining = overviewSubHeadingValue - overviewHeadingValue;

	return (
		<div className={styles.header}>
			<div className={styles.pageContainer}>
				<h3 className={styles.banner}>Budget 🎒 Sherpa</h3>

				<div className={styles.overviewContainer}>
					<div className={styles.overviewNumbersContainer}>
						<div>
							<span className={styles.overviewHeading}>
								$ {formatCommaEvery3Digits(overviewHeadingValue)}
							</span>
							<span className={styles.overviewSlash}>/</span>
							<span className={styles.overviewSubheading}>
								$ {formatCommaEvery3Digits(overviewSubHeadingValue)}
							</span>
						</div>

						<div className={styles.headerMobileEditButton}>
							<EditIcon fontSize='medium' className={styles.editButton} />
						</div>
					</div>
					<div
						className={`${styles.budgetRemainingText} ${
							budgetRemaining < 0 && styles.budgetRemainingTextOver
						}`}>
						${formatCommaEvery3Digits(Math.abs(budgetRemaining))}{" "}
						{budgetRemaining < 0 ? "Over" : "Under"}-Budget
					</div>
					<div className={styles.headerDesktopEditButton}>
						<EditIcon fontSize='medium' className={styles.editButton} />
					</div>
				</div>
			</div>
		</div>
	);
};
