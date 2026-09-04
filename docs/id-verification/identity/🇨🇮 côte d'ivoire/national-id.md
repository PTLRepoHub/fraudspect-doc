---
title: National ID Verification
sidebar_position: 1
---

## National ID Verification

Confirms an Ivorian national ID (NNI) number and returns the holder's record, including their parents' names and dates of birth.

```
POST /api/v1/id-verifications/identity/ci/national-id
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
    "id": "ebf7ef59-6508-421f-9f65-f66850a6c530",
    "fullName": "LONZO HENOCH ANGE MICHAEL KOFFI",
    "documentType": "CI_NATIONAL_ID",
    "documentCountry": "CI",
    "documentId": "11978031809",
    "requestAt": "2026-09-04T06:54:34.643Z",
    "requestUpdatedAt": "2026-09-04T07:36:30.926Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ciNationalId",
    "email": "",
    "image": "",
    "gender": "Male",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "CI",
    "idNumber": "C0117721704",
    "lastName": "KOFFI",
    "metadata": {},
    "checkType": "ci.national-id",
    "firstName": "LONZO HENOCH ANGE MICHAEL",
    "isConsent": true,
    "issuedDate": null,
    "middleName": "",
    "dateOfBirth": "1999-05-26",
    "expiredDate": null,
    "nationality": "CIV",
    "validations": null,
    "dataValidation": false,
    "fatherLastName": "KOFFI",
    "identityNumber": "C0117721704",
    "motherLastName": "TOUKOURA",
    "fatherFirstName": "KOUADIO LAMBERT",
    "imageValidation": false,
    "motherFirstName": "PIERRE ALICE",
    "selfieValidation": false,
    "fatherDateOfBirth": "1965-02-27",
    "motherDateOfBirth": "1902-02-27",
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
