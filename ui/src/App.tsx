import { useContext } from "react";
import { HomePage } from "./HomePage";
import { EntriesContext } from "./components/providers/EntriesProvider";

export const App = () => {
	const store = useContext(EntriesContext);

	if (store.entries) {
		return <HomePage entries={store.entries} />;
	}

	return <>Error Fetching API Data</>;
};

export default App;
