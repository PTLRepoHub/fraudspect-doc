---
title: Alien ID Verification
sidebar_position: 3
---

## Alien ID Verification

Confirms a Kenyan alien registration ID exists and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ke/alien-id
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The alien registration ID number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "111111111",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "ee098214-a034-4d16-857c-991c54cc3c1c",
    "fullName": "UWAYO AMANI DIEUDONNE",
    "documentType": "KE_ALIEN_ID",
    "documentCountry": "KE",
    "documentId": "111111111",
    "requestAt": "2026-09-04T06:54:16.962Z",
    "requestUpdatedAt": "2026-09-04T07:36:15.920Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "keAlienId",
    "email": "",
    "image": "",
    "gender": "female",
    "idType": "id",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "111111111",
    "lastName": "UWAYO",
    "metadata": {},
    "checkType": "ke.alien-id",
    "firstName": "AMANI",
    "isConsent": true,
    "middleName": "DIEUDONNE",
    "dateOfBirth": "1992-11-19",
    "nationality": "Alien",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "111111111",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
