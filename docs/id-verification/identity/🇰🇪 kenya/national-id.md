---
title: National ID Verification
sidebar_position: 1
---

## National ID Verification

Confirms a Kenyan national ID number exists and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ke/national-id
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The national ID number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "25219798",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "5e5a7a6b-b3a2-43ce-b770-aa6c1825b9c5",
    "fullName": "MUTEMI MARITA MWENDE",
    "documentType": "KE_NATIONAL_ID",
    "documentCountry": "KE",
    "documentId": "25219798",
    "requestAt": "2026-09-04T06:54:07.771Z",
    "requestUpdatedAt": "2026-09-04T07:36:07.325Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "keNationalId",
    "email": "",
    "image": "",
    "gender": "female",
    "idType": "id",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "25219798",
    "lastName": "MWENDE",
    "metadata": {},
    "checkType": "ke.national-id",
    "firstName": "MUTEMI",
    "isConsent": true,
    "middleName": "MARITA",
    "dateOfBirth": "1987-06-03",
    "nationality": "KENYAN",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "25219798",
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
    "id": "11480c3f-2f04-4d27-afae-270d6f9bcf4c",
    "fullName": "PETER NYANGERI ONDARI",
    "documentType": "KE_NATIONAL_ID",
    "documentCountry": "KE",
    "documentId": "00000000",
    "requestAt": "2026-09-04T06:54:08.380Z",
    "requestUpdatedAt": "2026-09-04T07:36:07.926Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "keNationalId",
    "email": "",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAAEA/gD+AAD//gAcQ3JlY\u2026",
    "gender": "m",
    "idType": "id",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "00000000",
    "lastName": "ONDARI",
    "metadata": {},
    "checkType": "ke.national-id",
    "firstName": "PETER",
    "isConsent": true,
    "middleName": "NYANGERI",
    "dateOfBirth": "1975-12-31",
    "nationality": "KENYAN",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "00000000",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
