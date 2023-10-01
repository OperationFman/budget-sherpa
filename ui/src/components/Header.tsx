import EditIcon from "@mui/icons-material/Edit";
import { formatCommaEvery3Digits } from "../../../ui/src/utility/format";
import styles from "./Header.module.scss";
import { useState } from "react";
import { FullScreenModal } from "../utility/FullScreenModal";
import { Button, InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const Header = ({
	overviewHeadingValue,
}: {
	overviewHeadingValue: number;
}) => {
	const existingBudget = Number(localStorage.getItem("budget"));
	const [openModal, setModalOpen] = useState(false);
	const [budget, setBudget] = useState(existingBudget || 15000);

	const handleChange = (event: any) => {
		const value = event.target.value;

		if (value > 0) {
			localStorage.setItem("budget", value);
			setBudget(value);
		}
	};

	const budgetRemaining = budget - overviewHeadingValue;

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
								$ {formatCommaEvery3Digits(budget)}
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
						<div>
							<div className={styles.modalLabelText}>
								Enter Your Budget For This Trip
							</div>
							<TextField
								id='outlined-number'
								type='number'
								autoFocus
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>$</span>
										</InputAdornment>
									),
								}}
								className={styles.editBudget}
								onChange={handleChange}
								onKeyDown={(event) =>
									event.keyCode === 13 && setModalOpen(false)
								}
							/>
						</div>
					</FullScreenModal>
				</div>
			</div>
		</div>
	);
};
