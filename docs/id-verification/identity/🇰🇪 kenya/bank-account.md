---
title: Bank Account Verification
sidebar_position: 12
---

## Bank Account Verification

Confirms a Kenyan bank account and returns the account name and bank details.

```
POST /api/v1/id-verifications/identity/ke/bav
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `accountNumber`* | String | The account number. |
| `bankId` | String | Bank id from [Bank List](./bank-list.md). |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |

Fields marked * are required.

### Example

```json title="Request"
{
  "bankId": "1",
  "accountNumber": "111111111",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "fb6aca8e-1ab9-44e8-bea7-fa955701576d",
    "fullName": "",
    "documentType": "KE_BAV",
    "documentCountry": "KE",
    "documentId": "111111111",
    "requestAt": "2026-09-04T06:54:27.847Z",
    "requestUpdatedAt": "2026-09-04T07:36:22.522Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "keBAV",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "bankCode": "1",
    "idNumber": "111111111",
    "lastName": "",
    "metadata": {},
    "checkType": "ke.bav",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "bankDetails": {
      "bankName": "KCB",
      "accountName": "JOHN DOE",
      "accountType": null,
      "accountNumber": "111111111",
      "accountCurrency": null
    },
    "dateOfBirth": "",
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
