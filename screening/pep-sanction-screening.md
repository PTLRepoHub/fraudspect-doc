# PEP & Sanction Screening

## Search Persons — PEP & Sanctions

**POST** `{{baseurl}}/api/v1/persons`

By default, person search returns results from Criminal, Sanctions, PEP, and Offshores databases simultaneously.

#### Request Body

| Name             | Type    | Required | Description                                                                           |
|------------------|---------|----------|---------------------------------------------------------------------------------------|
| query            | Object  | Yes      | Search query object                                                                   |
| firstName        | String  | Yes      | Subject's first name                                                                  |
| lastName         | String  | Yes      | Subject's last name                                                                   |
| dob              | Object  | No       | Date of birth object                                                                  |
| day              | Number  | No       | Day of birth                                                                          |
| month            | Number  | No       | Month of birth                                                                        |
| year             | Number  | No       | Year of birth                                                                         |
| document         | String  | No       | Identity document number                                                              |
| country          | String  | No       | ISO country code to narrow results                                                    |
| category         | String  | No       | Filter by category (e.g. `PEP`, `Sanction`)                                          |
| algorithm        | String  | No       | Matching algorithm: `SorensenDice`, `Phonetic`, or `Exact`. Default: `SorensenDice`  |
| matchThreshold   | Number  | No       | Match sensitivity (0–1). Higher values return fewer but more precise results. Recommended: `0.6`–`0.7` |
| monitoring       | Boolean | No       | Enable ongoing monitoring for this subject                                            |
| page             | String  | No       | Page number for paginated results                                                     |

#### Request Example

```json
{
    "query": {
        "firstName": "John",
        "lastName": "Doe",
        "dob": {
            "day": 15,
            "month": 3,
            "year": 1975
        },
        "country": "NG"
    },
    "algorithm": "SorensenDice",
    "matchThreshold": 0.7,
    "monitoring": false,
    "page": "1"
}
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
                    }
                ],
                "countries": [
                    {
                        "type": "Citizenship",
                        "code": "NG",
                        "_id": "64f1a2b3c4d5e6f7a8b9c0d4"
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

#### Match Score

The `score` field indicates the confidence of the name match on a scale from `0` to `1`. A score of `1.0` is an exact match. The recommended threshold range is `0.6`–`0.7` — values above this threshold are returned in the results.

#### Category Types

| Category   | Description                                        |
|------------|----------------------------------------------------|
| PEP        | Politically Exposed Person                         |
| Sanction   | Subject on a government or international sanctions list |
| Criminal   | Individual with criminal records                   |
| Offshore   | Subject linked to offshore financial activity      |

#### PEP Levels

| Level         | Description                                                |
|---------------|------------------------------------------------------------|
| EU            | Politically exposed at EU level                            |
| International | Politically exposed at international/global level          |

### Error Responses

#### HTTP/1.1 400 Bad Request

```json
{
    "status": 400,
    "message": "firstName and lastName are required",
    "code": "error"
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
