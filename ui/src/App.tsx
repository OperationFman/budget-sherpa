import { useContext } from "react";
import { HomePage } from "./HomePage";
import { EntriesContext } from "./components/providers/EntriesProvider";

import styles from "./HomePage.module.scss";
import { ErrorContext } from "./components/providers/ErrorProvider";

export const App = () => {
	const store = useContext(EntriesContext);
	const error = useContext(ErrorContext);

	if (store.entries) {
		return (
			<div className={styles.body}>
				<HomePage entries={store.entries} />
			</div>
		);
	}

	if (error.message) {
		return (
			<div className={styles.body}>
				<div className={styles.errorText}>Uh oh!</div>
			</div>
		);
	}

	return (
		<div className={styles.body}>
			<div className={styles.errorText}>Fetching Data...</div>
		</div>
	);
};

export default App;
