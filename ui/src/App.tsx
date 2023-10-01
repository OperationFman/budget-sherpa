import { useEffect, useState } from "react";
import { Entry, entryTypeGuard } from "./types/Entry";
import { Home } from "./Home";

export const App = () => {
	const [entries, setEntries] = useState([] as Entry[]);

	const getAllEntries = async () => {
		const response = await fetch("http://localhost:5165/api/entries");
		return entryTypeGuard(await response.json());
	};

	useEffect(() => {
		const fetchEntries = async () => {
			const entries = await getAllEntries();
			setEntries(entries);
		};

		fetchEntries();
	}, []);

	return <Home entries={entries} />;
};

export default App;
