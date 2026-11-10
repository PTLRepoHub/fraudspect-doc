---
title: Business Tax ID Lookup
sidebar_position: 4.5
---

## Verify Business Tax ID

**POST** `{{baseurl}}/api/v1/id-verifications/business/ng/tax-id`

Resolves a Nigerian company's Tax Identification Number from its Corporate
Affairs Commission (CAC) registration number. It is the reverse of
[TIN Verification](./tin): there you start from the TIN and get the business;
here you start from the registration number and get the TIN.

Use it when onboarding a business that has given you its RC/BN number but not
its tax ID, or to confirm that a tax ID a customer supplied belongs to the
registered entity.

#### Headers

| Name        | Description                                   |
|-------------|-----------------------------------------------|
| x-api-key*  | Your secret API key (`fsp_live_sk_…`)         |

#### Request Body

| Name                | Type    | Description                                                                                  |
|---------------------|---------|----------------------------------------------------------------------------------------------|
| registrationNumber* | String  | CAC registration number with its prefix: `RCxxxx`, `BNxxxxx`, `ITxxxxx`, `LPxxxxx` or `LLPxxxxx`. Spaces and hyphens are ignored. |
| isConsent*          | Boolean | Indicate the subject has given consent. Must be `true`                                       |

#### Sample Request

```json
{
    "registrationNumber": "RC1234567",
    "isConsent": true
}
```

#### Sample Response

`status` is `found` when the registry has a tax ID on record for the company,
otherwise `not_found`. A lookup is billed either way.

```json
{
    "data": {
        "id": "7f3c1d0e-5b2a-4c9e-9a1f-2d4e6b8c0a12",
        "verificationNumber": "RC1234567",
        "name": "ACME ENTERPRISES LIMITED",
        "type": "TAX_ID",
        "country": "NG",
        "requestAt": "2026-11-10T09:12:44.102Z",
        "requestUpdatedAt": "2026-11-10T09:12:44.102Z",
        "meta": null,
        "requestedBy": {
            "id": "62c2a4868d3193700828014e",
            "firstName": "API",
            "lastName": "User"
        },
        "status": "found",
        "registrationNumber": "RC1234567",
        "taxId": "12345678-0001",
        "searchTerm": "RC1234567"
    },
    "message": "Successfull!",
    "status": 200,
    "code": "info"
}
```

Repeating the lookup for the same registration number refreshes the existing
record instead of creating a new one, so your history shows one entry per
company. The stored result can be downloaded as a PDF from
`GET {{baseurl}}/api/v1/id-verifications/business/{id}/report`.

#### Permissions

Dashboard users need `KYB_TIN_VERIFY` together with `KYB_RESULT_VIEW`. API keys
inherit the permissions of the user that owns them.

### Error Responses

#### HTTP/1.1 400 Bad Request

```json
{
    "data": {},
    "message": "Invalid registration number. Valid format: RCxxxx, BNxxxxx, ITxxxxx, LPxxxxx or LLPxxxxx",
    "status": 400,
    "code": "BadRequestError"
}
```

#### HTTP/1.1 402 Payment Required

```json
{
    "data": {},
    "message": "Insufficient fund",
    "status": 402,
    "code": "PaymentRequiredError"
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

#### HTTP/1.1 500 Internal Server Error

```json
{
    "data": {},
    "message": "Service unavailable",
    "status": 500,
    "code": "Error"
}
```
