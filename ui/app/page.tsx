import { Index } from ".";
import { entryTypeGuard } from "./types/Entry";

export default async function Home() {
	const getAllEntries = async () => {
		const response = await fetch(`${process.env.REST_API_URI}/entries`);
		return entryTypeGuard(await response.json());
	};

	const entries = await getAllEntries();

	return <Index entries={entries} />;
}
