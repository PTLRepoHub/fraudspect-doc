---
title: Business Verification
sidebar_position: 4
---

## Verify Business (CAC)

**POST** `{{baseurl}}/api/v1/id-verifications/business/advance-business-verification`

Advanced Business Verification (KYB) looks up a company by its Corporate Affairs
Commission (CAC) registration number and returns the full registered profile of
the business — including tax identifiers, addresses, key personnel and filings.

#### Request Body

| Name                | Type    | Description                                                       |
|---------------------|---------|-------------------------------------------------------------------|
| registrationNumber* | String  | Valid CAC registration number (RC number)                         |
| isConsent*          | Boolean | Indicate subject has given consent. Must be `true`                |
| countryCode*        | String  | ISO country code of the business, e.g. `NG`                       |
| premium             | Boolean | Perform a premium (high-priority) lookup. Default value: `false`  |

#### Sample Request

```json
{
    "registrationNumber": "RC-123456",
    "isConsent": true,
    "countryCode": "NG"
}
```

#### Sample Response

```json
{
    "data": {
        "id": "6491ee6e239381344487a5ff",
        "verificationNumber": "RC-123456",
        "name": "ACME ENTERPRISES LIMITED",
        "type": "ADVANCE_COMPANY_VERIFICATION",
        "country": "NG",
        "requestAt": "2023-06-20T18:20:11.552Z",
        "requestUpdatedAt": "2023-06-20T18:20:11.552Z",
        "requestedBy": {
            "id": "62c2a4868d3193700828014e",
            "firstName": "API",
            "lastName": "User"
        },
        "parentId": null,
        "searchBusinessName": "ACME ENTERPRISES LIMITED",
        "formerName": "",
        "registrationNumber": "RC-123456",
        "registryNumber": "",
        "vatNumber": "",
        "registrationDate": "2015-07-10",
        "registrationSubmissionDate": "2015-07-08",
        "dateDisolved": "",
        "tin": "12345678-0001",
        "jtbTin": "",
        "taxOffice": "Victoria Island MSTO",
        "email": "info@acme.example",
        "phone": "08000000000",
        "websiteEmail": "",
        "typeOfEntity": "Private Company Limited by Shares",
        "activity": "Wholesale and retail trade",
        "activityDescription": "General merchandise trading",
        "address": "10 Commerce Avenue, Victoria Island",
        "state": "Lagos",
        "lga": "Eti-Osa",
        "city": "Lagos",
        "branchAddress": "",
        "headOfficeAddress": "10 Commerce Avenue, Victoria Island",
        "objectives": "To carry on the business of general merchandise trading",
        "status": "Active",
        "companyStatus": "Active",
        "isConsent": true,
        "lastUpdatedAt": "2023-06-20T18:20:11.552Z",
        "shareCapitalInWords": "One Million Naira",
        "paidShareCapital": "1000000",
        "subscribedShareCapital": "1000000",
        "sharesValue": "1000000",
        "sharesIssued": "1000000",
        "parentCountry": "",
        "countryCode": "NG",
        "companyContactPersons": [
            {
                "name": "John Doe",
                "contacts": {
                    "email": ["john.doe@acme.example"],
                    "phone": ["08000000001"]
                }
            }
        ],
        "keyPersonnel": [
            {
                "name": "John Doe",
                "designation": "Director",
                "isCorporate": false,
                "appointedOn": "2015-07-10",
                "resignedOn": null,
                "sharesType": "Ordinary",
                "sharesValue": 500000,
                "sharesCount": 500000,
                "occupation": "Businessman",
                "nationality": "Nigerian",
                "dateOfBirth": "1975-03-15",
                "gender": "male",
                "address": "10 Commerce Avenue, Victoria Island",
                "countryOfResidence": "Nigeria",
                "status": "ACTIVE",
                "companies": []
            }
        ],
        "legalEntityIdentifierRegister": [],
        "centralIndexKeyRegister": [],
        "filings": [
            {
                "date": "2022-01-15",
                "name": "Annual Return",
                "type": "Return",
                "status": "Filed"
            }
        ],
        "affiliates": []
    },
    "message": "Successfull!",
    "status": 200,
    "code": "info"
}
```

### Error Responses

#### HTTP/1.1 402 Payment Required

```json
{
    "data": {},
    "message": "Insufficient fund",
    "status": 402,
    "code": "PaymentRequiredError"
}
```

#### HTTP/1.1 500 Internal Server Error

```json
{
    "data": {},
    "message": "Service unavailable",
    "status": 500,
    "code": "Error"
}
```

#### HTTP/1.1 403 Forbidden

```json
{
    "data": {},
    "message": "Permission denied",
    "status": 403,
    "code": "UnauthorizedError"
}
```
