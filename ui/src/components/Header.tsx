import EditIcon from "@mui/icons-material/Edit";
import { formatCommaEvery3Digits } from "../../../ui/src/utility/format";
import styles from "./Header.module.scss";
import { useState } from "react";
import { FullScreenModal } from "../utility/FullScreenModal";

export const Header = ({
	overviewHeadingValue,
}: {
	overviewHeadingValue: number;
}) => {
	const [openModal, setModalOpen] = useState(false);

	const overviewSubHeadingValue = 5000;

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
							<EditIcon
								fontSize='medium'
								className={styles.editButton}
								onClick={() => setModalOpen(true)}
							/>
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
						<EditIcon
							fontSize='medium'
							className={styles.editButton}
							onClick={() => setModalOpen(true)}
						/>
					</div>
					<FullScreenModal open={openModal} setModalOpen={setModalOpen}>
						<h1>Hello World</h1>
						<h3>
							Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar Foo bar
							Foo bar{" "}
						</h3>
					</FullScreenModal>
				</div>
			</div>
		</div>
	);
};
