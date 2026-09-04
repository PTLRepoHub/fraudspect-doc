---
title: Passport Verification
sidebar_position: 2
---

## Passport Verification

Confirms a Kenyan international passport number exists and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ke/passport
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.
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
  "id": "A2081731",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "4f925c2b-6ed7-4995-94e1-1f8e3d5fb55b",
    "fullName": "MARITA MWENDE",
    "documentType": "KE_PASSPORT",
    "documentCountry": "KE",
    "documentId": "A2081731",
    "requestAt": "2026-09-04T06:54:09.366Z",
    "requestUpdatedAt": "2026-09-04T07:36:08.550Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "kePassport",
    "email": "",
    "image": "",
    "gender": "female",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "A2081731",
    "lastName": "MWENDE",
    "metadata": {},
    "checkType": "ke.passport",
    "firstName": "MARITA",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "nationality": "KENYAN",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "A2081731",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
