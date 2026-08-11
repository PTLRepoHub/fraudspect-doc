---
title: Global ID Validation
sidebar_position: 1
---

## Check an identity outside Nigeria

You have details for a customer — their name, date of birth, address, maybe a national ID
number. This endpoint tells you **whether those details are real and belong together**, by
comparing them against government, authoritative and commercial data sources in the customer's
country.

```
POST /api/v1/id-verifications/identity/global/validate
```

Authenticate with your API key (`x-api-key`) or a bearer token, as with every other identity
endpoint.

### How it differs from the Nigerian checks

The Nigerian checks ([NIN](<../🇳🇬 nigeria/nin.md>), [vNIN](<../🇳🇬 nigeria/vnin.md>),
[BVN](<../🇳🇬 nigeria/bvn.md>)) are **lookups**: you send one ID number and get that person's
record back.

This endpoint is a **comparison**. There is no single ID to look up in most countries, so you
send everything you know about the person and get back a field-by-field verdict — which details
matched, which did not, and how confident the sources are overall.

### Three steps to your first call

1. **Find your customer's country** in [Country coverage](#country-coverage) and note the fields
   it requires.
2. **Send those fields**, plus `countryCode` and `isSubjectConsent: true`. Anything extra you
   know is welcome — more inputs mean a more meaningful match score.
3. **Read `validationDetails`** in the response to see how each field scored.

---

## Request body

Only `countryCode` and `isSubjectConsent` are required on every request. The rest are optional
in general — but [your customer's country](#country-coverage) will require some of them.

| Name                | Type    | Description |
|---------------------|---------|-------------|
| `countryCode`*      | String  | ISO 3166-1 alpha-2 country code for the validation. Must match the ID issuing country. The table in [Country coverage](#country-coverage) lists every code. |
| `isSubjectConsent`* | Boolean | Indicates the subject has given consent. **Must be `true`.** |
| `id`                | String  | Candidate's national ID. Required for some countries — see [Country coverage](#country-coverage). |
| `firstName`         | String  | First name to compare against the ID and/or credit file. |
| `lastName`          | String  | Last name to compare against the ID and/or credit file. |
| `fullName`          | String  | Full name to compare against the ID and/or credit file. `firstName` + `lastName` are accepted wherever `fullName` is required. |
| `dateOfBirth`       | String  | Date of birth, `YYYY-MM-DD`. |
| `mobile`            | String  | Phone number to compare against the ID and/or credit file. |
| `email`             | String  | Email address. |
| `advanced`          | Boolean | Search multiple data sources simultaneously for wider coverage. Not offered in every country — see [Advanced search](#advanced-search). |
| `addressDetails`    | Object  | Address object. |

### `addressDetails`

| Name           | Type   | Description |
|----------------|--------|-------------|
| `addressLine1` | String | Address line to compare against the ID and/or credit file. Assembled from `houseNumber` + `street` when omitted. |
| `addressLine2` | String | Second address line. |
| `houseNumber`  | String | House or street number. |
| `street`       | String | Street or thoroughfare name. |
| `city`         | String | City or locality. |
| `postalCode`   | String | Postal or ZIP code. |
| `state`        | String | State or province. |
| `countryCode`  | String | ISO 3166-1 alpha-2 code of the address. Defaults to the top-level `countryCode`. |

---

## Country coverage

Every country asks for a different set of details. Find your customer's country below and send
the fields listed for it — that is the minimum for the check to run.

FraudSpect validates these **before** calling the provider, so a request missing a required
field fails instantly with `400` and **costs you no credit**.

:::tip Send more than the minimum
The required fields are the floor, not the target. Every extra detail you send is another field
scored in `validationDetails`, which makes the result far more useful.
:::

### What each country requires

| Country | Code | Identity fields | Address fields (in `addressDetails`) | Advanced search |
|---------|------|-----------------|--------------------------------------|-----------------|
| Argentina | `AR` | `id`, `firstName`, `lastName` | — | Yes |
| Australia | `AU` | `firstName`, `lastName` | `houseNumber`, `street`, `postalCode`, `state` | Yes |
| Austria | `AT` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode`, `state` | Yes |
| Belgium | `BE` | `firstName`, `lastName`, `dateOfBirth` | — | Yes |
| Brazil | `BR` | `id`, `fullName` | — | Yes |
| Canada | `CA` | `firstName`, `lastName` | `houseNumber`, `street`, `postalCode`, `state` | Yes |
| Chile | `CL` | `id`, `fullName`, `dateOfBirth` | — | Yes |
| China | `CN` | `id`, `fullName` | — | Yes |
| Colombia | `CO` | `id`, `fullName` | — | Yes |
| Czech Republic | `CZ` | `firstName`, `lastName` | `city` | No |
| Denmark | `DK` | `id` | — | Yes |
| Finland | `FI` | `id`, `firstName`, `lastName` | — | Yes |
| France | `FR` | `firstName`, `lastName` | `addressLine1`, `houseNumber`, `city`, `postalCode` | Yes |
| Germany | `DE` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode` | Yes |
| Ghana | `GH` | — | — | No |
| Gibraltar | `GI` | `firstName`, `lastName` | — | No |
| Greece | `GR` | — | — | No |
| Hong Kong | `HK` | `firstName`, `lastName`, `dateOfBirth` | — | No |
| India | `IN` | `id` | — | Yes |
| Ireland | `IE` | `firstName`, `lastName`, `dateOfBirth` | `houseNumber`, `street`, `city`, `postalCode`, `state` | No |
| Italy | `IT` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode`, `state` | Yes |
| Japan | `JP` | `firstName`, `lastName` | — | No |
| Kenya | `KE` | — | — | No |
| Luxembourg | `LU` | `firstName`, `lastName` | — | No |
| Malaysia | `MY` | `id`, `firstName`, `lastName`, `dateOfBirth` | `city`, `postalCode`, `state` | No |
| Mexico | `MX` | `id` | — | Yes |
| Netherlands | `NL` | `firstName`, `lastName`, `dateOfBirth` | `houseNumber`, `postalCode` | Yes |
| New Zealand | `NZ` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode` | Yes |
| Nigeria | `NG` | — | — | No |
| Norway | `NO` | `id`, `firstName`, `lastName`, `mobile` | `houseNumber`, `city`, `postalCode` | Yes |
| Philippines | `PH` | `firstName`, `lastName`, `dateOfBirth`, `mobile` | — | Yes |
| Poland | `PL` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode` | Yes |
| Portugal | `PT` | `firstName`, `lastName` | `houseNumber`, `street`, `city`, `postalCode` | Yes |
| Singapore | `SG` | `id`, `fullName`, `dateOfBirth` | — | No |
| Slovakia | `SK` | `firstName`, `lastName` | `city` | No |
| South Africa | `ZA` | `id` | — | Yes |
| Spain | `ES` | `firstName`, `lastName` | `street`, `postalCode` | No |
| Sweden | `SE` | `id` | — | Yes |
| Switzerland | `CH` | `firstName`, `lastName` | `postalCode` | No |
| Thailand | `TH` | — | — | No |
| Turkey | `TR` | `id`, `firstName`, `lastName`, `dateOfBirth` | — | No |
| United Kingdom | `GB` | `firstName`, `lastName` | `addressLine1`, `city`, `postalCode` | No |
| United States | `US` | `id`, `firstName`, `lastName` | `addressLine1`, `city`, `postalCode` | Yes |

**Reading this table**

- **Identity fields** go at the root of the request body. **Address fields** go inside
  `addressDetails`.
- **&mdash;** means nothing is required beyond `countryCode` and `isSubjectConsent`.
- Wherever `fullName` is listed, `firstName` + `lastName` work just as well — we join them for you.
- Wherever `addressLine1` is listed, `houseNumber` + `street` work just as well.
- **Your country is not listed?** It is still supported. It simply has no mandatory field beyond
  `countryCode` and `isSubjectConsent`.
- An **empty string counts as not sending the field at all**. `"state": ""` will not satisfy a
  country that requires `state` — send a real value or expect a `400`.

:::note Two country quirks
**Malaysia** wants only the **last 4 digits** of the national ID, not the whole number.
**Spain** coverage includes the Canary Islands, Ceuta and Melilla.
:::

### Advanced search

Setting `advanced: true` widens the search across several data sources at once, for better
coverage and accuracy. Not every country offers it — check the **Advanced search** column above.

If you set it for a country marked **No**, the request returns `400`. We would rather tell you
than quietly run a narrower search than the one you asked for.

---

## Sample request

```json
{
    "countryCode": "AU",
    "isSubjectConsent": true,
    "firstName": "TOM",
    "lastName": "CLARKE",
    "dateOfBirth": "1990-01-01",
    "advanced": true,
    "addressDetails": {
        "houseNumber": "19",
        "street": "CASUARINA",
        "city": "KILMORE",
        "postalCode": "3764",
        "state": "VIC"
    }
}
```

## Response — Successful

```json
{
    "message": "Successfull!",
    "status": 200,
    "code": "info",
    "data": {
        "id": "9f1c2b7e-4c31-4d0f-9d2a-6b1f0c8e5a11",
        "documentType": "GLOBAL_EIDV",
        "documentCountry": "AU",
        "documentId": "12345678",
        "fullName": "TOM CLARKE",
        "requestAt": "2026-08-10T09:00:00.000Z",
        "requestUpdatedAt": "2026-08-10T09:00:00.000Z",
        "requestedBy": {
            "id": "7c2e1a44-0f3b-4a8d-91c6-2d4e5f6a7b88",
            "firstName": "API",
            "lastName": "User"
        },
        "firstName": "TOM",
        "lastName": "CLARKE",
        "dateOfBirth": "1990-01-01",
        "mobile": "",
        "email": "",
        "addressDetails": {
            "addressLine1": "19 CASUARINA",
            "houseNumber": "19",
            "street": "CASUARINA",
            "city": "KILMORE",
            "postalCode": "3764",
            "state": "VIC",
            "countryCode": "AU"
        },
        "validationDetails": {
            "fullName": {
                "status": "partial_matched",
                "value": "TOM CLARKE",
                "validationMessage": "Partial match made on Complete Name"
            },
            "lastName": {
                "status": "full_matched",
                "value": "CLARKE",
                "validationMessage": "Full match made on Last Name/Surname"
            },
            "city": {
                "status": "full_matched",
                "value": "KILMORE",
                "validationMessage": "Full match made on City/Locality"
            },
            "postalCode": {
                "status": "full_matched",
                "value": "3764",
                "validationMessage": "Full match made on Postal Code/Zip Code"
            },
            "dateOfBirth": {
                "status": "not_matched",
                "value": "1990-01-01",
                "validationMessage": "No match made on Date of Birth"
            },
            "percentage": {
                "percentageFullyMatched": 36,
                "percentageNotMatched": 40,
                "percentagePartialMatched": 24
            }
        },
        "addressReliability": { "reliability": "10", "adaptation": "30" },
        "identityReliability": { "reliability": "30", "adaptation": "0" },
        "overallReliability": { "reliability": "30", "adaptation": "30" },
        "dataValidation": true,
        "isConsent": true,
        "status": "found",
        "reason": null,
        "identityNumber": "12345678",
        "country": "AU",
        "advanced": true
    }
}
```

### Reading the result

| Field                 | What it tells you |
|-----------------------|-------------------|
| `status`              | `found` when the subject was located in a data source, `not_found` otherwise. |
| `validationDetails`   | Per-field outcome — `full_matched`, `partial_matched` or `not_matched` — with a human-readable message. Which keys appear depends on the country and on what you submitted. |
| `percentage`          | Share of the submitted fields that fully, partially and did not match. |
| `identityReliability` | Confidence in the identity match. |
| `addressReliability`  | Confidence in the address match. |
| `overallReliability`  | Combined confidence across identity and address. |

:::note Repeat checks
Results are stored against `documentId` + country. Re-running a check for the same person in the
same country **updates** the existing record rather than creating a duplicate, so the record `id`
stays stable across retries.
:::

---

## Error Responses

#### HTTP/1.1 400 Bad Request — missing country-required field

Raised before the provider is called, so **no credit is charged**. See
[Country coverage](#country-coverage) for what each country requires.

```json
{
    "message": "US global identity validation requires: id, addressDetails.addressLine1 (or addressDetails.houseNumber and addressDetails.street), addressDetails.city, addressDetails.postalCode.",
    "error": "Bad Request",
    "statusCode": 400
}
```

#### HTTP/1.1 400 Bad Request — advanced search unavailable

Also raised before the provider is called. No credit is charged. See
[Advanced search](#advanced-search).

```json
{
    "message": "Advanced search is not available for GB. Retry without \"advanced\".",
    "error": "Bad Request",
    "statusCode": 400
}
```

#### HTTP/1.1 400 Bad Request — invalid payload

Body validation failures return every problem at once, as an array.

```json
{
    "message": [
        "isSubjectConsent must be true to run a global identity validation",
        "countryCode must be an ISO 3166-1 alpha-2 code",
        "dateOfBirth must be in the format YYYY-MM-DD"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

#### HTTP/1.1 400 Bad Request — insufficient credit

```json
{
    "message": "Insufficient credit",
    "error": "Bad Request",
    "statusCode": 400
}
```

#### HTTP/1.1 403 Forbidden

Returned when your API key or user lacks the KYC verification permissions.

```json
{
    "message": "You cannot run this KYC verification check",
    "error": "Forbidden",
    "statusCode": 403
}
```

#### HTTP/1.1 400 Bad Request — service disabled

The Identity Verification module is not enabled for your organisation. Contact support.

```json
{
    "message": "Id verification service is disabled for organization",
    "error": "Bad Request",
    "statusCode": 400
}
```
