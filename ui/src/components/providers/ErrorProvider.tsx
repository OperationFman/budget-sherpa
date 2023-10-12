import React from "react";
import { createContext, useState } from "react";

import styles from "./ErrorProvider.module.scss";

type ErrorContextType = {
	message: string | undefined;
	setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const ErrorContext = createContext<ErrorContextType>({
	message: undefined,
	setMessage: () => {},
});

export const ErrorProvider = ({ children }: { children: JSX.Element }) => {
	const [message, setMessage] = useState<string | undefined>(undefined);

	setTimeout(() => {
		setMessage(undefined);
	}, 8000);

	return (
		<ErrorContext.Provider value={{ message, setMessage }}>
			{message && <div className={styles.errorContainer}>{message}</div>}
			{children}
		</ErrorContext.Provider>
	);
};
