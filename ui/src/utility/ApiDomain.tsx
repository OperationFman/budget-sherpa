export const ApiDomain =
	process.env.NODE_ENV === "development"
		? "http://localhost:5165"
		: "https://budget-sherpa-api.onrender.com";
