---
title: Driver's Licence Verification
sidebar_position: 4
---

## Driver's Licence Verification

Confirms a Kenyan driver's licence and returns the holder's record, including licence class, issue and expiry dates, blood group and smart-DL booking status.

```
POST /api/v1/id-verifications/identity/ke/drivers-license
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The driver's licence number. |
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
    "id": "f8bbc5e3-7df5-426c-8b81-a07bd4d08b9b",
    "fullName": "JAMES KIPCHOGE KIPROP",
    "documentType": "KE_DRIVERS_LICENSE",
    "documentCountry": "KE",
    "documentId": "111111111",
    "requestAt": "2026-09-04T06:54:18.040Z",
    "requestUpdatedAt": "2026-09-04T07:36:16.508Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "kra": "KRA123456789",
    "type": "keDriversLicense",
    "email": "james.kiprop@email.com",
    "image": "",
    "gender": "famale",
    "mobile": "+254712345678",
    "reason": null,
    "status": "found",
    "address": {
      "lga": null,
      "city": "Eldoret",
      "town": null,
      "state": null,
      "addressLine": "123 Main Street, Eldoret"
    },
    "country": "KE",
    "idNumber": "111111111",
    "lastName": "",
    "metadata": {},
    "checkType": "ke.drivers-license",
    "firstName": "",
    "isConsent": true,
    "bloodGroup": "O+",
    "issuedDate": "2018-05-20",
    "middleName": "",
    "nationalId": "87654321",
    "dateOfBirth": "1983-05-20",
    "expiredDate": "2028-05-20",
    "validations": null,
    "interimNumber": null,
    "licenseNumber": "DL123456789",
    "classOfLicense": "B, C1, C",
    "dataValidation": false,
    "identityNumber": "111111111",
    "smartDlDetails": {
      "hasSmartDl": "Yes",
      "smartDlBookingDate": null,
      "smartDLBookingStatus": null,
      "smartDlBookingStartDate": null,
      "smartDlBookingTestCenter": null
    },
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
