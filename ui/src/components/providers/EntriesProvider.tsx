import { createContext, useContext, useEffect, useState } from "react";
import { Entry, entryTypeGuard } from "../../types/Entry";
import { ErrorContext, ErrorProvider } from "./ErrorProvider";

type ContextType = {
	entries: undefined | Entry[];
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EntriesContext = createContext<ContextType>({
	entries: undefined,
	isLoading: true,
	setIsLoading: () => {},
});

export const EntriesProvider = ({ children }: { children: JSX.Element }) => {
	const error = useContext(ErrorContext);

	const [entries, setEntries] = useState<undefined | Entry[]>();
	const [isLoading, setIsLoading] = useState(true);

	const refreshData = async () => {
		// TODO: Automatic refresh

		try {
			const response = await fetch("http://localhost:5165/api/entries");

			if (response.status !== 200) {
				error.setMessage("Server responded with something unexpected");
				throw `Status code: ${response.status}, (Should be 200)`;
			}

			const validatedResponse = entryTypeGuard(await response.json());

			setEntries(validatedResponse);
		} catch {
			error.setMessage("Can't access the server");

			setEntries(undefined);
		}
	};

	useEffect(() => {
		refreshData();
		setIsLoading(false);
	}, [isLoading]);

	return (
		<EntriesContext.Provider value={{ entries, isLoading, setIsLoading }}>
			{children}
		</EntriesContext.Provider>
	);
};
