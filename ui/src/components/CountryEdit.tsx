import { Button, InputAdornment, TextField } from "@mui/material";
import styles from "./CountryEdit.module.scss";
import SaveIcon from "@mui/icons-material/Save";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import CardTravelRoundedIcon from "@mui/icons-material/CardTravelRounded";
import TransferWithinAStationRoundedIcon from "@mui/icons-material/TransferWithinAStationRounded";
import AirplaneTicketRoundedIcon from "@mui/icons-material/AirplaneTicketRounded";
import { useEffect, useState } from "react";

export const CountryEdit = () => {
	const [countries, setCountries] = useState<undefined | string[]>();

	useEffect(() => {
		const getAllCountries = async () => {
			const response = await fetch(
				"http://localhost:5165/api/entries/countries",
			);
			return await response.json();
		};

		getAllCountries().then((res) => {
			setCountries(res);
		});
	}, []);

	const [entryId, setEntryId] = useState(0);
	const [formCountry, setFormCountry] = useState("Australia");
	const [formDays, setFormDays] = useState<undefined | number>(undefined);
	const [formTravelStyle, setFormTravelStyle] = useState("Backpacking");
	const [formCommuteCost, setFormCommuteCost] = useState<undefined | number>(
		undefined,
	);
	const [formCommuteMethod, setFormCommuteMethod] = useState("Flight");
	const [formExtraExpenses, setFormExtraExpenses] = useState<
		undefined | number
	>(undefined);

	const travelStyles = ["Freeload", "Backpacking", "Average", "Luxury"];
	const travelMethods = ["Flight", "Ferry", "Train", "Bus", "Car", "Foot"];

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

	const handleSubmit = () => {
		console.log(
			{ entryId },
			{ formCountry },
			{ formDays },
			{ formTravelStyle },
			{ formCommuteCost },
			{ formCommuteMethod },
			{ formExtraExpenses },
		);
	};

	if (!countries) {
		return <>Could not load countries</>;
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
			<Button
				className={styles.save}
				variant='contained'
				color='success'
				disabled={!formIsValid()}
				onClick={handleSubmit}
				endIcon={<SaveIcon />}>
				Save
			</Button>
		</div>
	);
};
