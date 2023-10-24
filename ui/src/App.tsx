import { useContext, useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { EntriesContext } from "./components/providers/EntriesProvider";

import styles from "./HomePage.module.scss";
import { ErrorContext } from "./components/providers/ErrorProvider";

export const App = () => {
	const store = useContext(EntriesContext);
	const error = useContext(ErrorContext);

	const [longWait, setLongWait] = useState(false);

	setTimeout(() => {
		setLongWait(true);
	}, 5000);

	useEffect(() => {
		setTimeout(() => {
			error.message && window.location.reload();
		}, 8000);
	}, [error.message]);

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
				<div className={styles.errorContainer}>
					<div className={styles.errorText}>Retrying...</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.body}>
			<div className={styles.errorContainer}>
				<div className={styles.errorText}>Fetching Data...</div>
				{longWait && (
					<div className={styles.longWait}>
						Server startup time can be up to 30 seconds if it hasn't been run in
						a while
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
