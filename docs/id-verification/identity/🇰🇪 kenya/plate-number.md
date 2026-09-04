---
title: Plate Number Verification
sidebar_position: 9
---

## Plate Number Verification

Resolves a Kenyan vehicle registration plate to its vehicle record, registered owner and inspection history.

```
POST /api/v1/id-verifications/identity/ke/plate-number
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The plate number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "KDP250G",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "c2618175-26c2-49ce-92f1-b5240a5b791c",
    "fullName": "",
    "documentType": "KE_PLATE_NUMBER",
    "documentCountry": "KE",
    "documentId": "KDP250G",
    "requestAt": "2026-09-04T06:54:25.766Z",
    "requestUpdatedAt": "2026-09-04T07:36:21.136Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "kePlateNumber",
    "email": "",
    "image": "",
    "owner": {
      "pin": "A006813210H",
      "phone": "0723683398",
      "address": {
        "town": "NAIROBI",
        "postalCode": "00100",
        "postalAddress": "75351"
      },
      "idNumber": "25409483",
      "lastName": "",
      "firstName": "EMMANUEL ODONGO OCHUNG",
      "ownerType": "COMPANY",
      "middleName": ""
    },
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "vehicle": {
      "make": "AUDI",
      "entry": {
        "cpc": "NA",
        "number": "24MBAIM400448715",
        "importerPin": "REGISTERED"
      },
      "model": "A5",
      "logbook": {
        "number": "202402017219607",
        "serialNumber": "N6616614R"
      },
      "purpose": "PRIVATE",
      "bodyType": "SALOON",
      "dutyDate": "",
      "fuelType": "NA",
      "bodyColor": "WHITE",
      "dutyAmount": "1205161",
      "dutyStatus": "PAID",
      "tareWeight": "1610",
      "grossWeight": "1885",
      "vehicleType": "MOTOR VEHICLE",
      "engineNumber": "CYR - 030985",
      "chassisNumber": "WAUZZZF51HA013315",
      "engineCapacity": "1980",
      "registrationDate": "2024-02-01",
      "passengerCapacity": "5",
      "yearOfManufacture": "2017",
      "registrationStatus": "registered"
    },
    "idNumber": "KDP250G",
    "lastName": "",
    "metadata": {},
    "checkType": "ke.plate-number",
    "firstName": "",
    "isConsent": true,
    "inspection": [],
    "middleName": "",
    "dateOfBirth": "",
    "plateNumber": "KDP250G",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "KDP250G",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
