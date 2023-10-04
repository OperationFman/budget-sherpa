import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EntriesProvider } from "./components/providers/EntriesProvider";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<React.StrictMode>
		<EntriesProvider>
			<App />
		</EntriesProvider>
	</React.StrictMode>,
);
