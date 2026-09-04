---
title: SSNIT Verification
sidebar_position: 2
---

## SSNIT Verification

Confirms a Ghanaian Social Security and National Insurance Trust number and returns the holder's record.

```
POST /api/v1/id-verifications/identity/gh/ssnit
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_GH_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The SSNIT number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |
| `validations.selfie.image` | String | Base64 or URL of a selfie to compare against the photo on file. |
| `metadata` | Object | Anything you like. Returned to you untouched. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "C037363637123",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "90ab4fd4-177f-4a3a-a0f5-f59fea758b1a",
    "fullName": "DEDE ARTHUR",
    "documentType": "GH_SSNIT",
    "documentCountry": "GH",
    "documentId": "C037363637123",
    "requestAt": "2026-09-04T06:54:31.955Z",
    "requestUpdatedAt": "2026-09-04T07:36:26.246Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ghSSNIT",
    "email": "",
    "fssno": "C037363637123",
    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4RDcRXhpZg\u2026",
    "gender": "female",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "GH",
    "idNumber": "C037363637123",
    "lastName": "ARTHUR",
    "metadata": {},
    "checkType": "gh.ssnit",
    "firstName": "DEDE",
    "isConsent": true,
    "cardSerial": "00000014521458",
    "middleName": "",
    "dateOfBirth": "1990-06-12",
    "nationality": "GHANAIAN",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "C037363637123",
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
    "id": "69f11d9f-8d4f-402e-9914-753e4fc2bc96",
    "fullName": "",
    "documentType": "GH_SSNIT",
    "documentCountry": "GH",
    "documentId": "C000000000000",
    "requestAt": "2026-09-04T06:54:32.522Z",
    "requestUpdatedAt": "2026-09-04T07:36:27.808Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ghSSNIT",
    "email": "",
    "fssno": null,
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "No person found",
    "status": "not_found",
    "country": "GH",
    "idNumber": "C000000000000",
    "lastName": "",
    "metadata": {},
    "checkType": "gh.ssnit",
    "firstName": "",
    "isConsent": true,
    "cardSerial": null,
    "middleName": "",
    "dateOfBirth": "",
    "nationality": null,
    "validations": null,
    "dataValidation": false,
    "identityNumber": "C000000000000",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
