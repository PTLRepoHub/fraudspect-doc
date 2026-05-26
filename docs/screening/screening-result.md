---
title: Get Screening Result
sidebar_position: 2
---

## Get Person Result Details

**GET** `{{baseurl}}/api/v1/persons/{id}`

Retrieves the full profile details for a specific person record returned from a prior screening search. Use the `uid` from the search response as the `id` path parameter.

#### Path Parameters

| Name | Type   | Required | Description                                     |
|------|--------|----------|-------------------------------------------------|
| id   | String | Yes      | The unique identifier (`uid`) of the person record |

#### Request Example

```
GET {{baseurl}}/api/v1/persons/abc123xyz
```

#### Response

```json
{
    "status": 200,
    "message": "persons fetched successfully",
    "code": "info",
    "data": {
        "date": "2024-10-20T11:03:23+00:00",
        "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "matchesCount": 1,
        "persons": [
            {
                "uid": "abc123xyz",
                "score": 0.94,
                "deceased": false,
                "gender": "Male",
                "names": [
                    {
                        "type": "Primary",
                        "firstName": "John",
                        "lastName": "Doe",
                        "fullName": "John Doe",
                        "lang": "en",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d1"
                    },
                    {
                        "type": "Alias",
                        "firstName": "Johnny",
                        "lastName": "Doe",
                        "fullName": "Johnny Doe",
                        "lang": "en",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d2"
                    },
                    {
                        "type": "Translation",
                        "firstName": "جون",
                        "lastName": "دو",
                        "fullName": "جون دو",
                        "lang": "ar",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d6"
                    }
                ],
                "dobs": [
                    {
                        "day": 15,
                        "month": 3,
                        "year": 1975
                    }
                ],
                "category": [
                    {
                        "type": "PEP",
                        "level": "International",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d3"
                    },
                    {
                        "type": "Sanction",
                        "level": "International",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d7"
                    }
                ],
                "countries": [
                    {
                        "type": "Citizenship",
                        "code": "NG",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d4"
                    },
                    {
                        "type": "Residence",
                        "code": "GB",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d8"
                    }
                ],
                "organizations": [
                    {
                        "name": "Federal Government of Nigeria",
                        "position": "Minister of Finance",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d5"
                    }
                ],
                "addresses": [
                    {
                        "type": "Primary",
                        "line": "3 Eagle Square, Abuja",
                        "country": "NG",
                        "state": "FCT"
                    },
                    {
                        "type": "Birth place",
                        "line": "",
                        "country": "NG",
                        "state": "Lagos"
                    }
                ],
                "images": [
                    "https://example.com/images/john-doe.jpg"
                ],
                "sources": [
                    "UN Consolidated List",
                    "OFAC SDN List"
                ],
                "links": [
                    {
                        "title": "Reuters Article",
                        "url": "https://www.reuters.com/article/example"
                    },
                    {
                        "title": "BBC Profile",
                        "url": "https://www.bbc.com/news/example"
                    }
                ],
                "description": [
                    {
                        "type": "Description",
                        "value": "Former Minister of Finance, included on international sanctions list since 2021."
                    }
                ],
                "extra": [
                    {
                        "key": "Passport Number",
                        "value": "A12345678"
                    },
                    {
                        "key": "National ID",
                        "value": "11111111111"
                    }
                ],
                "relations": [],
                "contactDetails": [],
                "documents": []
            }
        ]
    }
}
```

#### Response Fields

| Field              | Type    | Description                                                        |
|--------------------|---------|--------------------------------------------------------------------|
| uid                | String  | Unique identifier for this person record                          |
| score              | Number  | Match confidence score (0–1)                                      |
| deceased           | Boolean | Whether the person is recorded as deceased                        |
| gender             | String  | `Male`, `Female`, or other recorded value                         |
| names              | Array   | All known names (Primary, Alias, Translation, Transliteration)    |
| dobs               | Array   | Known dates of birth                                              |
| category           | Array   | Screening categories the person appears in (PEP, Sanction, etc.) |
| countries          | Array   | Countries associated with the person (Citizenship, Residence)     |
| organizations      | Array   | Organisations and positions held                                  |
| addresses          | Array   | Known addresses (Primary, Secondary, Birth place)                 |
| images             | Array   | URLs to profile images                                            |
| sources            | Array   | Watchlist or database sources where this person appears           |
| links              | Array   | External reference URLs (news, official records)                  |
| description        | Array   | Narrative descriptions from source databases                      |
| extra              | Array   | Additional key-value metadata (document numbers, identifiers)     |
| relations          | Array   | Known associates or related persons                               |
| contactDetails     | Array   | Contact information if available                                  |
| documents          | Array   | Identity documents on record                                      |

### Error Responses

#### HTTP/1.1 404 Not Found

```json
{
    "status": 404,
    "message": "Person not found",
    "code": "error"
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
