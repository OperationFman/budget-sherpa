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
API on an SQLite database sourcing data from various external APIs.

&nbsp;

## Tech Stack

Frontend - React 18 - Typescript Backend - .NET - C#

&nbsp;

## Running Locally

1. Clone this repository
   `git clone https://github.com/OperationFman/budget-sherpa.git`

&nbsp;

2. Install dependencies: TBD

&nbsp;

3. Database migration: Database Migration Steps

- `export PATH="$PATH:$HOME/.dotnet/tools/"`
- `dotnet ef migrations add "initial_migrations"`
- `dotnet ef database update`

&nbsp; &nbsp;

## Endpoints

Backend endpoints available to consume with example payloads:

**GET - All expanded Endpoints** `http://localhost:5165/api/entries`

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

**GET - Expanded entry by ID** `http://localhost:5165/api/entries/id?id=4`

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
`http://localhost:5165/api/entries/countries`

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
travelers** `http://localhost:5165/api/entries/country-rates`

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

**POST - Create new entry** `http://localhost:5165/api/entries/`

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

**PUT - Update existing entry** `http://localhost:5165/api/entries/`

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
`http://localhost:5165/api/entries/id?id=4`
