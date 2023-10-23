import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DirectionsBoatFilledRoundedIcon from "@mui/icons-material/DirectionsBoatFilledRounded";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import HikingRoundedIcon from "@mui/icons-material/HikingRounded";
import TrainRoundedIcon from "@mui/icons-material/TrainRounded";
import { Entry } from "../../../ui/src/types/Entry";
import { formatCommaEvery3Digits } from "../../../ui/src/utility/format";
import styles from "./CountryCard.module.scss";
import { useContext, useEffect, useState } from "react";
import { EntriesContext } from "./providers/EntriesProvider";
import { FullScreenModal } from "../utility/FullScreenModal";
import { CountryEdit } from "./CountryEdit";
import { ErrorContext } from "./providers/ErrorProvider";
import { CircularProgress } from "@mui/material";
import { ApiDomain } from "../utility/ApiDomain";

export const CountryCard = ({
	entry,
	entryTotal,
	dailyRate,
}: {
	entry: Entry;
	entryTotal: number;
	dailyRate: number;
}) => {
	const store = useContext(EntriesContext);
	const error = useContext(ErrorContext);
	const [deletingElement, setDeletingElement] = useState(false);
	const [modal, setModal] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const commuteIcon = [
		<AirplanemodeActiveRoundedIcon className={styles.flightIcon} />,
		<DirectionsBoatFilledRoundedIcon />,
		<TrainRoundedIcon />,
		<DirectionsBusRoundedIcon />,
		<DirectionsCarRoundedIcon />,
		<HikingRoundedIcon />,
	];

	const handleDelete = () => {
		setDeleting(true);
		try {
			fetch(`${ApiDomain}/api/entries/id?id=${entry.id}`, {
				method: "DELETE",
			}).then(() => {
				setDeletingElement(true);
				store.setIsLoading(true);
			});
		} catch {
			error.setMessage(
				"Something is wrong, we couldn't delete this entry from the server",
			);
		}
		setDeleting(false);
	};

	return (
		<div
			className={`${styles.cardContainer} ${
				deletingElement && styles.deleting
			}`}>
			<div className={styles.clickArea} onClick={() => setModal(true)}>
				<div className={styles.cardInfoContainer}>
					<div className={styles.titleContainer}>
						<div className={styles.title}>{entry.country}</div>
					</div>
					<div className={styles.supplementalInfoContainer}>
						<div className={styles.commute}>
							<div className={styles.commuteIcon}>
								{commuteIcon[entry.commute]}
							</div>
							<div className={styles.commuteText}>
								${formatCommaEvery3Digits(entry.commuteCost ?? 0)}
							</div>
						</div>

						<div className={styles.days}>{entry.days} Days</div>
						<div className={styles.extraCostContainer}>
							<div className={styles.extraCost}>
								<span className={styles.dailyCost}>${dailyRate}</span>
								<span>/day </span>
								{entry.extras !== null &&
									entry.extras !== undefined &&
									entry.extras !== 0 && <span> + ${entry.extras}</span>}
							</div>
						</div>
					</div>
					<div className={styles.costs}>
						<div className={styles.totalCost}>
							${formatCommaEvery3Digits(entryTotal)}
						</div>
					</div>
				</div>
			</div>
			{deleting ? (
				<CircularProgress color='inherit' className={styles.deleteButton} />
			) : (
				<DeleteOutlineRoundedIcon
					className={styles.deleteButton}
					onClick={handleDelete}
				/>
			)}

			<FullScreenModal open={modal} setModalOpen={setModal}>
				<CountryEdit setModalOpen={setModal} entry={entry} />
			</FullScreenModal>
		</div>
	);
};
