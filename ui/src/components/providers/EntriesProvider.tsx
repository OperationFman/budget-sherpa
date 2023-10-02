import { createContext, useState } from "react";
import { Entry, entryTypeGuard } from "../../types/Entry";

type ContextType = {
	entries: undefined | Entry[];
	isLoading: boolean;
	refreshData?: () => Promise<void>;
};

export const EntriesContext = createContext<ContextType>({
	entries: undefined,
	isLoading: true,
});

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
	const [entries, setEntries] = useState<undefined | Entry[]>();
	const [isLoading, setIsLoading] = useState(true);

	const refreshData = async () => {
		setIsLoading(true);

		const getAllEntries = async () => {
			const response = await fetch("http://localhost:5165/api/entries");
			return entryTypeGuard(await response.json());
		};

		getAllEntries().then((res) => {
			setEntries(res);
			setIsLoading(false);
		});
	};

	return (
		<EntriesContext.Provider value={{ entries, isLoading, refreshData }}>
			{children}
		</EntriesContext.Provider>
	);
};
