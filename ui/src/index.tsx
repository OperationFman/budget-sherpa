import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EntriesProvider } from "./components/providers/EntriesProvider";
import { ErrorProvider } from "./components/providers/ErrorProvider";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<React.StrictMode>
		<ErrorProvider>
			<EntriesProvider>
				<App />
			</EntriesProvider>
		</ErrorProvider>
	</React.StrictMode>,
);
