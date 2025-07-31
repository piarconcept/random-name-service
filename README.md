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

Local Development

Command	Description
npm run offline	Run API locally with serverless-offline
npm run build	Bundle with esbuild
npm run test	Placeholder – add Jest tests here

No env vars needed in offline mode. For production, adjust serverless.yml.

⸻

Project Layout

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


⸻

Adding / Tweaking Countries
	1.	Create dataset: src/data/<iso>/names-surnames.ts

export const namesSurnames = {
  man: [/* … */],
  woman: [/* … */],
  unisex: [/* … */],
  surnames: [/* … */]
} as const;

	2.	Create country object: src/data/<iso>/index.ts

import { namesSurnames } from './names-surnames';

export const XX = {
  maleNames: namesSurnames.man,
  femaleNames: namesSurnames.woman,
  unisexNames: namesSurnames.unisex,
  surnames: namesSurnames.surnames,
  immigrationRate: 0.12,
  immigrationSources: ['US', 'BR'],
  rules: { firstName: 100, secondName: 40, thirdName: 0, surname1: 100, surname2: 5 }
} as const;

	3.	Register in src/country-data.ts

import { XX } from './data/xx';
export const COUNTRY_DATA = { …, XX };

That’s all – no other code changes needed.

⸻

Testing

Recommended test cases:
	•	Probability distribution for dual surname / second name
	•	Unsupported country error thrown
	•	Ancestry array always length 4 in correct order

Jest + ts-jest works out of the box.

⸻

Deployment

# AWS credentials configured (env vars or ~/.aws/credentials)
npm run deploy          # serverless deploy

Optionally configure a custom domain (API Gateway) in serverless.yml.

⸻

Roadmap
	•	RTL & non-Latin scripts (Arabic, Cyrillic, Han)
	•	Optional seed for reproducible outputs
	•	CLI tool (npx random-name --country=MX)
	•	Docker image for on-prem use
	•	Web playground

⸻

Contributing
	1.	Fork → git checkout -b feat/your-branch
	2.	Commit → git commit -am 'Add 🇨🇦 Canada dataset'
	3.	Push → open PR
	4.	Ensure CI passes

⸻

License

MIT — free for personal & commercial use. Pull requests welcome!
