# random-name-service <!-- omit in toc -->

_Generate culturally-consistent full names (given names, surnames & ancestry) from an ISO country, age range and sex._  
_Built with **TypeScript**, **AWS Lambda** (Serverless Framework) and designed for easy extension._

---

## Table of Contents
1. [Features](#features)  
2. [Quick Start](#quick-start)  
3. [Request & Response](#request--response)  
4. [Local Development](#local-development)  
5. [Project Layout](#project-layout)  
6. [Adding / Tweaking Countries](#adding--tweaking-countries)  
7. [Testing](#testing)  
8. [Deployment](#deployment)  
9. [Roadmap](#roadmap)  
10. [Contributing](#contributing)  
11. [License](#license)

---

## Features
- **Country-aware** – names, surnames and immigration rates per ISO-3166 country.  
- **Realistic ancestry** – returns the four grandparents’ nationalities in fixed order.  
- **Probability rules** – control likelihood of second/third given names and dual surnames.  
- **100 % TypeScript** – strict typings (`as const`) for compile-time safety.  
- **Serverless** – deploy to AWS Lambda/API Gateway with a single command.  
- **Zero external deps** – small bundle; lists live in plain TS.


## Quick Start

```bash
git clone https://github.com/your-org/random-name-service.git
cd random-name-service

npm install
npm run offline                 # → http://localhost:3000
```
# Example
To generate a name, make a POST request to `/random-name-service/generate-name` with JSON body:

```bash
curl -X POST http://localhost:3000/random-name-service/generate-name \
     -H "Content-Type: application/json" \
     -d '{ "country":"ES", "minAge":25, "maxAge":40, "sex":"F" }' | jq
```

Sample response:

```json
{
  "sex": "F",
  "age": 34,
  "firstName": "María",
  "secondName": "Isabel",
  "surname1": "García",
  "surname2": "López",
  "nationality": "ES",
  "ancestry": ["ES", "ES", "MA", "ES"]
}
```

## Local Development

Command	Description

```bash
npm run offline	Run API locally with serverless-offline
npm run build	Bundle with esbuild
npm run test	Placeholder – add Jest tests here
```

No env vars needed in offline mode. For production, adjust serverless.yml.

## Project Layout

```bash
.
├── serverless.yml          # Lambda/API definition
├── src
│   ├── country-data.ts     # map of supported countries → data object
│   ├── naming.service.ts   # core business logic
│   ├── handler.ts          # Lambda entry (HTTP POST /random-name-service/generate-name)
│   ├── types.ts            # shared TS interfaces
│   └── data                # datasets
│       ├── es / ma / us …  # one folder per ISO country
│       │   ├── index.ts
│       │   └── names-surnames.ts
│       └── latam
│           ├── index.ts
│           └── names-surnames.ts
└── test.sh
```

## Adding / Tweaking Countries

To add or modify a country:
1. Create a new folder in `src/data/` named after the ISO country code (e.g., `es`, `ma`, `us`).
2. Add `index.ts` with the country data structure.
3. Add `names-surnames.ts` with arrays of names and surnames.
4. Update `src/country-data.ts` to include your new country.

License

MIT — free for personal & commercial use. Pull requests welcome!
