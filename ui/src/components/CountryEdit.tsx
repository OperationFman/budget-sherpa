import {
	Button,
	CircularProgress,
	InputAdornment,
	TextField,
} from "@mui/material";
import styles from "./CountryEdit.module.scss";
import SaveIcon from "@mui/icons-material/Save";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import CardTravelRoundedIcon from "@mui/icons-material/CardTravelRounded";
import TransferWithinAStationRoundedIcon from "@mui/icons-material/TransferWithinAStationRounded";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import { useContext, useEffect, useState } from "react";
import { Entry, EntryDto } from "../types/Entry";
import { EntriesContext } from "./providers/EntriesProvider";
import { ErrorContext } from "./providers/ErrorProvider";

export const CountryEdit = ({
	setModalOpen,
	entry: entry,
}: {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	entry?: Entry;
}) => {
	const store = useContext(EntriesContext);
	const error = useContext(ErrorContext);

	const [countries, setCountries] = useState<undefined | string[]>();
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const getAllCountries = async () => {
			try {
				const response = await fetch(
					"https://budget-sherpa-api.onrender.com/api/entries/countries",
				);

				if (response.status == 200) {
					setCountries(await response.json());
				} else {
					error.setMessage(
						"Something is wrong, We received a list of countries from the server with something unexpected",
					);
				}
			} catch {
				setModalOpen(false);
				error.setMessage("Can't access the server");
			}
		};

		getAllCountries();
	}, []);

	const travelStyles = ["Freeload", "Backpacking", "Average", "Luxury"];
	const travelMethods = ["Flight", "Ferry", "Train", "Bus", "Car", "Foot"];

	const [formCountry, setFormCountry] = useState(entry?.country || "Australia");
	const [formDays, setFormDays] = useState<undefined | number>(entry?.days);
	const [formTravelStyle, setFormTravelStyle] = useState(
		entry?.selectedCountryRate
			? travelStyles[entry.selectedCountryRate]
			: "Backpacking",
	);
	const [formCommuteCost, setFormCommuteCost] = useState<undefined | number>(
		entry?.commuteCost || undefined,
	);
	const [formCommuteMethod, setFormCommuteMethod] = useState(
		entry?.commute ? travelMethods[entry.commute] : "Flight",
	);
	const [formExtraExpenses, setFormExtraExpenses] = useState<
		undefined | number
	>(entry?.extras || undefined);

	const formIsValid = () => {
		return (
			countries !== undefined &&
			countries.includes(formCountry) &&
			formDays !== undefined &&
			formDays > 0 &&
			travelStyles.includes(formTravelStyle) &&
			formCommuteCost !== undefined &&
			formCommuteCost >= 0 &&
			travelMethods.includes(formCommuteMethod)
		);
	};

	const handleFetch = async (finalEntry: EntryDto) => {
		setSaving(true);
		try {
			const options = {
				method: finalEntry.Id === 0 ? "POST" : "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(finalEntry),
			};

			const response = await fetch(
				"https://budget-sherpa-api.onrender.com/api/entries/",
				options,
			);

			if (response.status !== 200 ?? response.status !== 204) {
				console.log(`Status code: ${response.status}, (Should be 200 or 204)`);
				throw "";
			}

			store.setIsLoading(true);
			setModalOpen(false);
		} catch {
			error.setMessage(
				"Something is wrong, we couldn't save this entry to the server",
			);
		}
		setSaving(false);
	};

	const handleSubmit = () => {
		if (formIsValid()) {
			const finalEntry: EntryDto = {
				Id: entry?.id || 0,
				Country: formCountry,
				Days: formDays as number,
				SelectedCountryRate: travelStyles.indexOf(formTravelStyle),
				CommuteCost: formCommuteCost,
				Commute: travelMethods.indexOf(formCommuteMethod),
				Extras: formExtraExpenses,
			};

			handleFetch(finalEntry);
		} else {
			error.setMessage(
				"One or more items are invalid, please amend and try again",
			);
		}
	};

	if (!countries) {
		return <div className={styles.fetchingMessage}>Fetching Data...</div>;
	}

	return (
		<div>
			<div className={styles.heading}>Add New Destination</div>
			<div className={styles.container}>
				<div className={styles.column}>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Country</div>
							<div className={styles.labelSubText}>U.N Recognized</div>
							<TextField
								id='outlined-select-native'
								select
								defaultValue={formCountry}
								SelectProps={{
									native: true,
								}}
								onChange={(event) => setFormCountry(event.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>
												<TravelExploreRoundedIcon fontSize='small' />
											</span>
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}>
								{countries.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</div>
					</div>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Days of Stay</div>
							<TextField
								id='outlined-number'
								type='number'
								defaultValue={formDays}
								onChange={(event) => setFormDays(Number(event.target.value))}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>
												<TodayRoundedIcon fontSize='small' />
											</span>
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}
							/>
						</div>
					</div>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Travel Style</div>
							<div className={styles.labelSubText}>
								Backpacking = Street food & Hostels
							</div>
							<div className={styles.labelSubText}>
								Average = Restaurants & Hotels
							</div>
							<div className={styles.labelSubText}>
								Luxury = High-end Restaurants & Resorts
							</div>
							<TextField
								id='outlined-select-native'
								select
								defaultValue={formTravelStyle}
								SelectProps={{
									native: true,
								}}
								onChange={(event) => setFormTravelStyle(event.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>
												<CardTravelRoundedIcon fontSize='small' />
											</span>
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}>
								{travelStyles.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</div>
					</div>
				</div>
				<div className={styles.column}>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Commute Cost</div>
							<div className={styles.labelSubText}>
								Tickets & Visa Fees To Get To This Country
							</div>
							<TextField
								id='outlined-number'
								type='number'
								defaultValue={formCommuteCost}
								onChange={(event) =>
									setFormCommuteCost(Number(event.target.value))
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span>
												<AirplaneTicketRoundedIcon
													fontSize='small'
													className={styles.inputAdornment}
												/>
											</span>
											$
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}
							/>
						</div>
					</div>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Commute Method</div>
							<TextField
								id='outlined-select-native'
								select
								defaultValue={formCommuteMethod}
								SelectProps={{
									native: true,
								}}
								onChange={(event) => setFormCommuteMethod(event.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>
												<TransferWithinAStationRoundedIcon fontSize='small' />
											</span>
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}>
								{travelMethods.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</div>
					</div>
					<div className={styles.editItem}>
						<div>
							<div className={styles.labelText}>Extra Expenses</div>
							<div className={styles.labelSubText}>
								Total cost of any ‘big ticket’ items, for example:
							</div>
							<div className={styles.labelSubText}>
								Guided tour, Helicopter ride, Game tickets etc
							</div>
							<TextField
								id='outlined-number'
								type='number'
								defaultValue={formExtraExpenses}
								onChange={(event) =>
									setFormExtraExpenses(Number(event.target.value))
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<span className={styles.inputAdornment}>+$</span>
										</InputAdornment>
									),
								}}
								className={styles.numberTextField}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.save}>
				{saving ? (
					<CircularProgress color='success' />
				) : (
					<Button
						variant='contained'
						color='success'
						disabled={!formIsValid()}
						onClick={handleSubmit}
						endIcon={<SaveIcon />}>
						Save
					</Button>
				)}
			</div>
		</div>
	);
};
