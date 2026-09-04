---
title: Voter's Card (PVC) Verification
sidebar_position: 8
---

## Voter's Card (PVC) Verification

Confirms a Nigerian Permanent Voter's Card number and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ng/pvc
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The PVC number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |
| `metadata` | Object | Anything you like. Returned to you untouched. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "00A0A0A000000000000",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "e0f85fba-7b95-4424-8815-975e49014483",
    "fullName": "John Doe",
    "documentType": "NG_PVC",
    "documentCountry": "NG",
    "documentId": "00A0A0A000000000000",
    "requestAt": "2026-09-04T09:25:16.866Z",
    "requestUpdatedAt": "2026-09-04T09:29:20.325Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "pvc",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "NG",
    "idNumber": "00A0A0A000000000000",
    "lastName": "Doe",
    "metadata": {},
    "checkType": "ng.pvc",
    "firstName": "John",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "1990-04-04",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "00A0A0A000000000000",
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
    "id": "4b798afe-8344-4ae0-bdb9-860b3404d7d7",
    "fullName": "",
    "documentType": "NG_PVC",
    "documentCountry": "NG",
    "documentId": "11A1A1A111111111111",
    "requestAt": "2026-09-04T09:25:17.344Z",
    "requestUpdatedAt": "2026-09-04T09:29:21.190Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "pvc",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "ID data not found",
    "status": "not_found",
    "country": "NG",
    "idNumber": "11A1A1A111111111111",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.pvc",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "11A1A1A111111111111",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
