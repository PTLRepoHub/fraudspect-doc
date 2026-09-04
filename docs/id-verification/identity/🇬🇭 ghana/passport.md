---
title: Passport Verification
sidebar_position: 1
---

## Passport Verification

Confirms a Ghanaian international passport number and returns the holder's record, including issue and expiry dates and place of birth.

```
POST /api/v1/id-verifications/identity/gh/passport
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_GH_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The passport number. |
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
  "id": "G0000603",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "80419ecd-69f0-40d7-aa17-863f4f30005b",
    "fullName": "Sarah Doe",
    "documentType": "GH_PASSPORT",
    "documentCountry": "GH",
    "documentId": "G0000603",
    "requestAt": "2026-09-04T06:54:30.152Z",
    "requestUpdatedAt": "2026-09-04T07:36:25.006Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ghPassport",
    "email": "",
    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBw\u2026",
    "gender": "female",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "GH",
    "idNumber": "G0000603",
    "issuedAt": "ACCRA",
    "lastName": "Doe",
    "metadata": {},
    "checkType": "gh.passport",
    "firstName": "Sarah",
    "isConsent": true,
    "signature": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBw\u2026",
    "issuedDate": "2010-03-31",
    "middleName": "",
    "dateOfBirth": "1968-01-26",
    "expiredDate": "2015-03-30",
    "nationality": "GHANAIAN",
    "validations": null,
    "placeOfbirth": "BANSO",
    "dataValidation": false,
    "identityNumber": "G0000603",
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
    "id": "c6ab9219-051e-46d0-8b09-39fba8deb50a",
    "fullName": "",
    "documentType": "GH_PASSPORT",
    "documentCountry": "GH",
    "documentId": "G0000000",
    "requestAt": "2026-09-04T06:54:31.210Z",
    "requestUpdatedAt": "2026-09-04T07:36:25.601Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ghPassport",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "No person found",
    "status": "not_found",
    "country": "GH",
    "idNumber": "G0000000",
    "issuedAt": null,
    "lastName": "",
    "metadata": {},
    "checkType": "gh.passport",
    "firstName": "",
    "isConsent": true,
    "signature": null,
    "issuedDate": null,
    "middleName": "",
    "dateOfBirth": "",
    "expiredDate": null,
    "nationality": null,
    "validations": null,
    "placeOfbirth": null,
    "dataValidation": false,
    "identityNumber": "G0000000",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
