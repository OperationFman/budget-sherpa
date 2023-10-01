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

export const CountryCard = ({
	entry,
	entryTotal,
}: {
	entry: Entry;
	entryTotal: number;
}) => {
	const commuteIcon = [
		<AirplanemodeActiveRoundedIcon className={styles.flightIcon} />,
		<DirectionsBoatFilledRoundedIcon />,
		<TrainRoundedIcon />,
		<DirectionsBusRoundedIcon />,
		<DirectionsCarRoundedIcon />,
		<HikingRoundedIcon />,
	];

	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardInfoContainer}>
				<div className={styles.titleContainer}>
					<div className={styles.title}>{entry.country}</div>
				</div>
				<div className={styles.supplementalInfoContainer}>
					{entry.commuteCost && (
						<div className={styles.commute}>
							<div className={styles.commuteIcon}>
								{commuteIcon[entry.commute]}
							</div>
							<div className={styles.commuteText}>
								${formatCommaEvery3Digits(entry.commuteCost)}
							</div>
						</div>
					)}
					<div className={styles.days}>{entry.days} Days</div>
					<div className={styles.extraCostContainer}>
						{entry.extras !== null &&
							entry.extras !== undefined &&
							entry.extras !== 0 && (
								<div className={styles.extraCost}>+${entry.extras}</div>
							)}
					</div>
				</div>
				<div className={styles.costs}>
					<div className={styles.totalCost}>
						${formatCommaEvery3Digits(entryTotal)}
					</div>
				</div>
			</div>

			<DeleteOutlineRoundedIcon className={styles.deleteButton} />
		</div>
	);
};