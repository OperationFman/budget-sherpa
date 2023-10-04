import { createContext, useEffect, useState } from "react";
import { Entry, entryTypeGuard } from "../../types/Entry";

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
	const [entries, setEntries] = useState<undefined | Entry[]>();
	const [isLoading, setIsLoading] = useState(true);

	const refreshData = async () => {
		const response = await fetch("http://localhost:5165/api/entries");
		const validatedResponse = entryTypeGuard(await response.json());

		setEntries(validatedResponse);
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
