---
title: Voter's Card Verification
sidebar_position: 3
---

## Voter's Card Verification

Confirms a Ghanaian voter card number and returns the holder's record and polling station.

```
POST /api/v1/id-verifications/identity/gh/voter
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_GH_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The voter card number. |
| `type`* | String | One of `old_voter_card`, `new_voter_card`. |
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
  "id": "9001330456",
  "type": "old_voter_card",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "5a09eca8-b6be-4aba-8502-67e9e1c7d6b7",
    "fullName": "Sarah Doe",
    "documentType": "GH_VOTER",
    "documentCountry": "GH",
    "documentId": "9001330456",
    "requestAt": "2026-09-04T06:54:33.386Z",
    "requestUpdatedAt": "2026-09-04T07:36:28.983Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "age": 18,
    "type": "ghVoter",
    "email": "",
    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBw\u2026",
    "gender": "m",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "GH",
    "idNumber": "9001330456",
    "lastName": "Doe",
    "metadata": {},
    "checkType": "gh.voter",
    "firstName": "Sarah",
    "isConsent": true,
    "voterType": "old_voter_card",
    "middleName": "",
    "dateOfBirth": "",
    "nationality": "GHANAIAN",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "9001330456",
    "pollingStation": "G161602",
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
    "id": "2c8e41cc-297f-438d-852e-2d67463a5b16",
    "fullName": "",
    "documentType": "GH_VOTER",
    "documentCountry": "GH",
    "documentId": "0000000000",
    "requestAt": "2026-09-04T06:54:33.924Z",
    "requestUpdatedAt": "2026-09-04T07:36:29.704Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "age": null,
    "type": "ghVoter",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "No person found",
    "status": "not_found",
    "country": "GH",
    "idNumber": "0000000000",
    "lastName": "",
    "metadata": {},
    "checkType": "gh.voter",
    "firstName": "",
    "isConsent": true,
    "voterType": "old_voter_card",
    "middleName": "",
    "dateOfBirth": "",
    "nationality": null,
    "validations": null,
    "dataValidation": false,
    "identityNumber": "0000000000",
    "pollingStation": null,
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
