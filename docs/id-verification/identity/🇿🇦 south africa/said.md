---
title: SAID Verification
sidebar_position: 1
---

## SAID Verification

Confirms a South African ID number exists on the national population register, and returns the record held against it — names, date of birth, marital and deceased status, and whether the holder appears on HANIS and the NPR.

```
POST /api/v1/id-verifications/identity/za/said
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_ZA_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The South African ID number (SAID). |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |
| `validations.selfie.image` | String | Base64 or URL of a selfie to compare against the photo on file. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "8012185201081",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "416eb01e-9e28-47fe-8cfe-82d5956e6c8c",
    "fullName": "LAVEN PILLAY",
    "documentType": "ZA_SAID",
    "documentCountry": "ZA",
    "documentId": "8012185201081",
    "requestAt": "2026-09-04T06:54:01.201Z",
    "requestUpdatedAt": "2026-09-04T07:36:03.925Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "zaSAID",
    "email": "",
    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBw\u2026",
    "onNPR": "yes",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "ZA",
    "onHANIS": "yes",
    "idNumber": "8012185201081",
    "lastName": "PILLAY",
    "metadata": {},
    "checkType": "za.said",
    "firstName": "LAVEN",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "dateOfDeath": "",
    "idIssueDate": "20150708",
    "validations": null,
    "maritalStatus": "SINGLE",
    "countryOfBirth": "SOUTH AFRICA",
    "dataValidation": false,
    "dateOfMarriage": "",
    "deceasedStatus": "alive",
    "hanisReference": "2306078375127",
    "identityNumber": "8012185201081",
    "imageValidation": false,
    "idSequenceNumber": "1",
    "selfieValidation": false,
    "isSmartCardIssued": "Yes",
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
