<img width="1715" alt="Screenshot 2023-10-25 at 1 15 01 pm" src="https://github.com/OperationFman/budget-sherpa/assets/42459707/346ffad8-eb5e-4cf2-9734-afb6b330ad84">

&nbsp;

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [Endpoints](#endpoints)

&nbsp;

## Overview

Plan your next trip with confidence with this innovative travel budgeting app.

The app combines data about countries' cost of living (food, activities,
accommodation, etc) with your preferences and travel style to give you a
personalized overview of your 'financial runway'.

This means you can avoid any surprises from expensive countries in your
itinerary and travel with peace of mind.

Currently a simple proof of concept built using a React frontend and .NET REST
API on an SQLite database sourcing data from various external APIs and language models


<img width="1711" alt="Screenshot 2023-10-25 at 1 16 26 pm" src="https://github.com/OperationFman/budget-sherpa/assets/42459707/4ef6e21b-77f6-4cc1-b231-15ddc9d542ad">
<img width="1712" alt="Screenshot 2023-10-25 at 1 15 14 pm" src="https://github.com/OperationFman/budget-sherpa/assets/42459707/9405e5d3-a4e3-4912-a40c-fb57358f110d">

&nbsp;

## Tech Stack

Frontend - React 18 - Typescript 

Backend - .NET 7 - C# & Docker

Database - SQLite

Cloud - OnRender 


<img width="1720" alt="Screenshot 2023-10-25 at 1 16 58 pm" src="https://github.com/OperationFman/budget-sherpa/assets/42459707/ef67c08a-747f-40c0-a156-9102f15029da">

&nbsp;

## Running Locally

&nbsp;

1. Download and install dependencies:
   - Git https://git-scm.com/downloads
   - Homebrew https://brew.sh/
   - Node 20.9.0 https://nodejs.org/en
   - .NET 7 SDK https://dotnet.microsoft.com/en-us/download/dotnet/7.0
   - Optional: Docker https://www.docker.com/products/docker-desktop/

2. Clone this repository
   `git clone https://github.com/OperationFman/budget-sherpa.git`
  
3. Front end:
   - `brew install yarn`
   - From the cloned repo root, `cd ui` then `yarn install`
   - To run, do `yarn start`
  
4. Back end:
   - Build and run the included Docker container, or
   - From the cloned repo root, `cd api` then `dotnet restore`
   - To run, do `dotnet run`
  
This should start the front end on `http://localhost:3000` and the backend on `http://localhost:5165`

5. Optional: Database migration: Database Migration Steps

- `export PATH="$PATH:$HOME/.dotnet/tools/"` if dotnet tools aren't setup in your path
- from /api, `dotnet ef migrations add "initial_migrations"`
- from /api, `dotnet ef database update` As needed for changes

&nbsp; &nbsp;

## Endpoints
You can use any of the below endpoints right now or run the backend locally and replace `https://budget-sherpa-api.onrender.com` with `http://localhost:5165`

### Example payloads:

**GET - All expanded Endpoints** `https://budget-sherpa-api.onrender.com/api/entries`

```
[
	{
		"id": 1,
		"country": "Argentina",
		"countryRates": {
			"backpacker": 35,
			"average": 70,
			"luxury": 140
		},
		"selectedCountryRate": 1,
		"days": 20,
		"commute": 0,
		"commuteCost": 2500,
		"extras": 0
	},
	{
		"id": 2,
		"country": "Uruguay",
		"countryRates": {
			"backpacker": 50,
			"average": 100,
			"luxury": 200
		},
		"selectedCountryRate": 1,
		"days": 5,
		"commute": 3,
		"commuteCost": 25,
		"extras": 0
	}
]
```

&nbsp;

**GET - Expanded entry by ID** `https://budget-sherpa-api.onrender.com/api/entries/id?id=4`

```
{
	"id": 4,
	"country": "Canada",
	"countryRates": {
		"backpacker": 75,
		"average": 150,
		"luxury": 300
	},
	"selectedCountryRate": 2,
	"days": 21,
	"commute": 1,
	"commuteCost": 1200,
	"extras": 500
}
```

&nbsp;

**GET - List of all available countries stored in the database**
`https://budget-sherpa-api.onrender.com/api/entries/countries`

```
[
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
    ...etc
]
```

&nbsp;

**GET - All countries AND their daily costs for backpackers, average and luxury
travelers** `https://budget-sherpa-api.onrender.com/api/entries/country-rates`

```
[
	{
		"country": "Afghanistan",
		"backpacker": 25,
		"average": 50,
		"luxury": 100
	},
	{
		"country": "Albania",
		"backpacker": 30,
		"average": 60,
		"luxury": 120
	},
	{
		"country": "Algeria",
		"backpacker": 25,
		"average": 50,
		"luxury": 100
	}
    ...etc
]
```

&nbsp;

**POST - Create new entry** `https://budget-sherpa-api.onrender.com/api/entries`

Request:

```
{
	"Id": 0,
	"Country": "Laos",
	"SelectedCountryRate": 3,
	"Days": 45,
	"Commute": 4,
	"CommuteCost": 200,
	"Extras": 0
}
```

Response:

```
{
	"id": 5,
	"country": "Laos",
	"countryRates": {
		"backpacker": 25,
		"average": 50,
		"luxury": 100
	},
	"selectedCountryRate": 3,
	"days": 45,
	"commute": 4,
	"commuteCost": 200,
	"extras": 0
}
```

&nbsp;

**PUT - Update existing entry** `https://budget-sherpa-api.onrender.com/api/entries`

Request:

```
{
	"Id": 5,
	"Country": "Brazil",
	"SelectedCountryRate": 1,
	"Days": 31,
	"commute": 4,
	"CommuteCost": 100,
	"Extras": 500
}
```

Response:

```
{
	"id": 5,
	"country": "Brazil",
	"countryRates": {
		"backpacker": 35,
		"average": 70,
		"luxury": 140
	},
	"selectedCountryRate": 1,
	"days": 31,
	"commute": 4,
	"commuteCost": 100,
	"extras": 500
}
```

&nbsp;

**DELETE - Delete existing entry by ID**
`https://budget-sherpa-api.onrender.com/api/entries/id?id=4`
