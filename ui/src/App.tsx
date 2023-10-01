import { useEffect, useState } from "react";
import { Entry, entryTypeGuard } from "./types/Entry";
import { Home } from "./HomePage";

export const App = () => {
	const [entries, setEntries] = useState<undefined | Entry[]>();

	useEffect(() => {
		const getAllEntries = async () => {
			const response = await fetch("http://localhost:5165/api/entries");
			return entryTypeGuard(await response.json());
		};

		getAllEntries().then((res) => {
			setEntries(res);
		});
	}, []);

	if (entries) {
		return <Home entries={entries} />;
	}

	return <>Error Fetching API Data</>;
};

export default App;
