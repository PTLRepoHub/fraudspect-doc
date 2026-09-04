---
title: Residence Card Verification
sidebar_position: 3
---

## Residence Card Verification

Confirms an Ivorian residence card number and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ci/residence-card
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_CI_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The document number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "11978031809",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "931b66b0-7891-4417-ba9b-1720d4e25f5d",
    "fullName": "ETTIEN KAMENAN LAURIS GERVAIS KOUAKOU",
    "documentType": "CI_RESIDENCE_CARD",
    "documentCountry": "CI",
    "documentId": "11978031809",
    "requestAt": "2026-09-04T06:54:36.417Z",
    "requestUpdatedAt": "2026-09-04T07:36:32.698Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ciResidenceCard",
    "email": "",
    "image": "",
    "gender": "Male",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "CI",
    "idNumber": "I003549637",
    "lastName": "KOUAKOU",
    "metadata": {},
    "checkType": "ci.residence-card",
    "firstName": "ETTIEN KAMENAN LAURIS GERVAIS",
    "isConsent": true,
    "issuedDate": null,
    "middleName": "",
    "dateOfBirth": "1997-01-02",
    "expiredDate": null,
    "nationality": "CIV",
    "validations": null,
    "dataValidation": false,
    "fatherLastName": "KOUAKOU",
    "identityNumber": "I003549637",
    "motherLastName": "YAO",
    "fatherFirstName": "VINCENT KOUASSI",
    "imageValidation": false,
    "motherFirstName": "AHOU ALICE",
    "selfieValidation": false,
    "fatherDateOfBirth": "1966-12-27",
    "motherDateOfBirth": "1900-01-01",
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
