---
title: Driver's Licence Verification
sidebar_position: 7
---

## Driver's Licence Verification

Confirms a Nigerian driver's licence number and returns the holder's record.

```
POST /api/v1/id-verifications/identity/ng/drivers-license
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The licence number. |
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
  "id": "AAA00000AA00",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "9f33360c-da69-4f66-856c-a709f339a5f2",
    "fullName": "John Doe",
    "documentType": "NG_DRIVERS_LICENSE",
    "documentCountry": "NG",
    "documentId": "AAA00000AA00",
    "requestAt": "2026-09-04T09:25:15.566Z",
    "requestUpdatedAt": "2026-09-04T09:29:18.870Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ndl",
    "email": "",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEB\u2026",
    "gender": "female",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "NG",
    "idNumber": "AAA00000AA00",
    "lastName": "Doe",
    "metadata": {},
    "checkType": "ng.drivers-license",
    "firstName": "John",
    "isConsent": true,
    "issuedDate": "2020-06-12",
    "middleName": "",
    "dateOfBirth": "1988-04-04",
    "expiredDate": "2023-11-09",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "AAA00000AA00",
    "imageValidation": false,
    "stateOfIssuance": "BENUE",
    "selfieValidation": false,
    "notifyWhenIdExpire": false,
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
    "id": "4ebe9ffb-d804-4639-8157-862c53ddb33f",
    "fullName": "",
    "documentType": "NG_DRIVERS_LICENSE",
    "documentCountry": "NG",
    "documentId": "AAA11111AA11",
    "requestAt": "2026-09-04T09:25:16.172Z",
    "requestUpdatedAt": "2026-09-04T09:29:19.680Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ndl",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": "Data not found",
    "status": "not_found",
    "country": "NG",
    "idNumber": "AAA11111AA11",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.drivers-license",
    "firstName": "",
    "isConsent": true,
    "issuedDate": null,
    "middleName": "",
    "dateOfBirth": "",
    "expiredDate": null,
    "validations": null,
    "dataValidation": false,
    "identityNumber": "AAA11111AA11",
    "imageValidation": false,
    "stateOfIssuance": null,
    "selfieValidation": false,
    "notifyWhenIdExpire": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
