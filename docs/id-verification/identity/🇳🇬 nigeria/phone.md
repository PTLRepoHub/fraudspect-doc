---
title: Phone Number Verification
sidebar_position: 9
---

## Phone Number Verification

Resolves the owner of a Nigerian phone number.

```
POST /api/v1/id-verifications/identity/ng/phone
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `mobile`* | String | The phone number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `metadata` | Object | Anything you like. Returned to you untouched. |

Fields marked * are required.

### Example

```json title="Request"
{
  "mobile": "08000000000",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "156a0362-cb47-4e68-a438-ce772b7d1d5a",
    "fullName": "",
    "documentType": "NG_PHONE",
    "documentCountry": "NG",
    "documentId": "08000000000",
    "requestAt": "2026-09-04T09:25:17.863Z",
    "requestUpdatedAt": "2026-09-04T09:29:22.063Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "phone",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "NG",
    "idNumber": "08000000000",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.phone",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "phoneDetails": [
      {
        "gender": null,
        "address": {},
        "fullName": "JOHN MICHAEL DOE",
        "dateOfBirth": "1988-04-04"
      },
      {
        "gender": null,
        "address": {},
        "fullName": "JOHN  DOE",
        "dateOfBirth": "1988-04-03"
      }
    ],
    "advanceSearch": false,
    "dataValidation": false,
    "identityNumber": "08000000000",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```

### When there is no match

A check that reaches the provider but finds nothing still returns `200`. Read `data.status` — it is `found` or `not_found` — rather than relying on the HTTP code.

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "0e3d5d6c-49ad-4fba-9ed4-0cce136c101a",
    "fullName": "",
    "documentType": "NG_PHONE",
    "documentCountry": "NG",
    "documentId": "08000000001",
    "requestAt": "2026-09-04T09:25:18.360Z",
    "requestUpdatedAt": "2026-09-04T09:29:24.493Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "phone",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "Data not found",
    "status": "not_found",
    "country": "NG",
    "idNumber": "08000000001",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.phone",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "phoneDetails": [],
    "advanceSearch": false,
    "dataValidation": false,
    "identityNumber": "08000000001",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
