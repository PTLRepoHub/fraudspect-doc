# Adverse Media

## Adverse Media Screening

Adverse media screening searches news and online sources for negative coverage linked to an individual or entity. The process is **asynchronous** — you first submit a search request to initiate the screening, then retrieve the results by polling the get endpoint.

### How It Works

```
1. POST /api/v1/adverse-media/search   →  Returns record id (results processing)
2. GET  /api/v1/adverse-media/{id}     →  Poll until result articles are populated
```

---

## 1. Submit Adverse Media Search

**POST** `{{baseurl}}/api/v1/adverse-media/search`

Initiates the adverse media screening. Returns immediately with a record `id`. The article results are populated asynchronously — use the `id` to fetch results via the GET endpoint.

#### Authentication

| Header      | Description  |
|-------------|--------------|
| `x-api-key` | Your API key |

#### Request Body

| Name     | Type     | Required | Description                                                        |
|----------|----------|----------|--------------------------------------------------------------------|
| fullName | String   | Yes      | Full name of the individual or entity to screen                    |
| keywords | String[] | No       | Additional keywords to narrow the search (e.g. `fraud`, `bribery`) |
| country  | String   | No       | ISO country code to scope results to a specific jurisdiction       |
| page     | Number   | No       | Page number for article results. Default: `1`                      |

#### Request Example

```json
{
    "fullName": "John Doe",
    "keywords": ["fraud", "money laundering"],
    "country": "NG",
    "page": 1
}
```

#### Response

The search is queued. The response includes the record `id` to use for polling. The `result` array may be empty at this stage.

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "id": "64f2a3b4c5d6e7f8a9b0c1d2",
        "matches": 0,
        "request": {
            "fullName": "John Doe",
            "keywords": ["fraud", "money laundering"],
            "country": "NG",
            "page": 1
        },
        "result": [],
        "summary": "",
        "advise": "",
        "requestAt": "2024-10-20T11:03:23.000Z",
        "requestedBy": {
            "firstName": "API",
            "lastName": "User"
        }
    }
}
```

---

## 2. Get Adverse Media Result

**GET** `{{baseurl}}/api/v1/adverse-media/{adverseMediaId}`

Retrieves the full result of an adverse media screening record. When results are not yet ready, the API fetches them from the upstream provider, caches them, and returns them in the same response — so this endpoint doubles as the result-polling step.

**Poll this endpoint after a search until the `result` array is populated.**

#### Path Parameters

| Name           | Type   | Required | Description                                           |
|----------------|--------|----------|-------------------------------------------------------|
| adverseMediaId | String | Yes      | The `id` returned from the search endpoint            |

#### Request Example

```
GET {{baseurl}}/api/v1/adverse-media/64f2a3b4c5d6e7f8a9b0c1d2
```

#### Response — Results Ready

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "id": "64f2a3b4c5d6e7f8a9b0c1d2",
        "matches": 2,
        "request": {
            "fullName": "John Doe",
            "keywords": ["fraud", "money laundering"],
            "country": "NG",
            "page": 1
        },
        "summary": "John Doe has been linked to multiple reports of financial misconduct in Nigeria between 2020 and 2023, including allegations of embezzlement and involvement in a Ponzi scheme investigation.",
        "advise": "High risk. Subject appears in credible negative media sources. Further due diligence is recommended before proceeding with onboarding.",
        "result": [
            {
                "title": "Former Finance Director Implicated in Embezzlement Probe",
                "content": "Nigerian authorities have opened an investigation into John Doe, a former finance director, over allegations of misappropriation of public funds amounting to ₦2.3 billion...",
                "url": "https://www.examplenews.com/articles/embezzlement-probe",
                "image": "https://www.examplenews.com/images/article-thumbnail.jpg",
                "host": "examplenews.com",
                "positive": 0.02,
                "neutral": 0.15,
                "negative": 0.83,
                "preCategory": "Financial Crime",
                "category": "Fraud & Embezzlement",
                "entityOne": "John Doe",
                "entityTwo": "Nigerian Financial Intelligence Unit",
                "authors": ["Jane Smith"],
                "publishedAt": "2023-04-12T08:00:00.000Z"
            },
            {
                "title": "Ponzi Scheme Arrests: Five Named Including Former Banking Executive",
                "content": "Five individuals, including John Doe, a former banking executive, have been arrested in connection with a Ponzi scheme that defrauded over 2,000 investors...",
                "url": "https://www.examplenews.com/articles/ponzi-scheme-arrests",
                "image": "https://www.examplenews.com/images/ponzi-thumbnail.jpg",
                "host": "examplenews.com",
                "positive": 0.01,
                "neutral": 0.10,
                "negative": 0.89,
                "preCategory": "Financial Crime",
                "category": "Investment Fraud",
                "entityOne": "John Doe",
                "entityTwo": "Securities and Exchange Commission",
                "authors": ["Michael Obi"],
                "publishedAt": "2022-11-05T10:30:00.000Z"
            }
        ],
        "requestAt": "2024-10-20T11:03:23.000Z",
        "requestedBy": {
            "firstName": "API",
            "lastName": "User"
        }
    }
}
```

#### Response — Results Pending

If upstream processing is not yet complete, `result` will be an empty array. Continue polling.

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "id": "64f2a3b4c5d6e7f8a9b0c1d2",
        "matches": 0,
        "request": {
            "fullName": "John Doe",
            "keywords": ["fraud", "money laundering"],
            "country": "NG"
        },
        "summary": "",
        "advise": "",
        "result": [],
        "requestAt": "2024-10-20T11:03:23.000Z",
        "requestedBy": {
            "firstName": "API",
            "lastName": "User"
        }
    }
}
```

#### Result Fields

| Field                | Type     | Description                                                              |
|----------------------|----------|--------------------------------------------------------------------------|
| id                   | String   | Unique identifier for this adverse media record                          |
| matches              | Number   | Total number of adverse media articles found                             |
| request              | Object   | Original search parameters                                               |
| summary              | String   | AI-generated narrative summary of findings                               |
| advise               | String   | AI-generated risk advisory                                               |
| result               | Array    | Matched articles. Empty while results are pending                        |
| result[].title       | String   | Article headline                                                         |
| result[].content     | String   | Article excerpt                                                          |
| result[].url         | String   | Link to source article                                                   |
| result[].image       | String   | Thumbnail image URL                                                      |
| result[].host        | String   | Source domain                                                            |
| result[].positive    | Number   | Positive sentiment score (0–1)                                           |
| result[].neutral     | Number   | Neutral sentiment score (0–1)                                            |
| result[].negative    | Number   | Negative sentiment score (0–1)                                           |
| result[].preCategory | String   | Broad topic classification                                               |
| result[].category    | String   | Specific category (e.g. Fraud & Embezzlement, Money Laundering)          |
| result[].entityOne   | String   | Primary entity identified in the article                                 |
| result[].entityTwo   | String   | Secondary entity identified in the article                               |
| result[].authors     | String[] | Article authors                                                          |
| result[].publishedAt | String   | ISO 8601 publication date                                                |
| requestAt            | String   | Timestamp when the search was submitted                                  |
| requestedBy          | Object   | User who submitted the search                                            |

---

## 3. List Adverse Media Records

**GET** `{{baseurl}}/api/v1/adverse-media`

Returns a paginated list of all adverse media screening records for your organisation. Article-level `result` data is excluded from the list — use the get endpoint to retrieve full details for a specific record.

#### Query Parameters

| Name | Type   | Required | Default | Description                 |
|------|--------|----------|---------|-----------------------------|
| skip | Number | No       | `0`     | Number of records to skip   |
| take | Number | No       | `20`    | Number of records to return |

#### Request Example

```
GET {{baseurl}}/api/v1/adverse-media?skip=0&take=20
```

#### Response

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "total": 45,
        "data": [
            {
                "id": "64f2a3b4c5d6e7f8a9b0c1d2",
                "matches": 2,
                "request": {
                    "fullName": "John Doe",
                    "keywords": ["fraud", "money laundering"],
                    "country": "NG"
                },
                "requestAt": "2024-10-20T11:03:23.000Z",
                "requestedBy": {
                    "firstName": "API",
                    "lastName": "User"
                }
            },
            {
                "id": "64f2a3b4c5d6e7f8a9b0c1d3",
                "matches": 0,
                "request": {
                    "fullName": "Jane Smith",
                    "country": "GH"
                },
                "requestAt": "2024-10-19T09:15:00.000Z",
                "requestedBy": {
                    "firstName": "API",
                    "lastName": "User"
                }
            }
        ]
    }
}
```

---

### Error Responses

#### HTTP/1.1 401 Unauthorized

```json
{
    "success": false,
    "statusCode": 401,
    "message": "Invalid or missing API key",
    "name": "UnauthorizedError",
    "data": {}
}
```

#### HTTP/1.1 402 Payment Required

```json
{
    "success": false,
    "statusCode": 402,
    "message": "Insufficient fund",
    "name": "PaymentRequiredError",
    "data": {}
}
```

#### HTTP/1.1 403 Forbidden

```json
{
    "success": false,
    "statusCode": 403,
    "message": "Permission denied",
    "name": "UnauthorizedError",
    "data": {}
}
```

#### HTTP/1.1 404 Not Found

```json
{
    "success": false,
    "statusCode": 404,
    "message": "Adverse media not found",
    "name": "NotFoundError",
    "data": {}
}
```

#### HTTP/1.1 500 Internal Server Error

```json
{
    "success": false,
    "statusCode": 500,
    "message": "Service unavailable",
    "name": "Error",
    "data": {}
}
```
