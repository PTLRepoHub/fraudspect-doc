---
title: Bank Account Verification
sidebar_position: 14
---

## Bank Account Verification

Confirms a Nigerian bank account and returns the account name.

```
POST /api/v1/id-verifications/identity/ng/bav
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `accountNumber`* | String | The account number. |
| `bankCode`* | String | Bank code from [Bank List](./bank-list.md). |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "accountNumber": "1000000000",
  "bankCode": "058",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "d23f106f-e1e7-49ff-a25d-8807a4e4d913",
    "fullName": "",
    "documentType": "NG_BAV",
    "documentCountry": "NG",
    "documentId": "1000000000",
    "requestAt": "2026-09-04T09:25:21.390Z",
    "requestUpdatedAt": "2026-09-04T09:29:28.217Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "bav",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "NG",
    "idNumber": "1000000000",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.bav",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "bankDetails": {
      "bankName": "Guaranty Trust Bank",
      "accountName": "MICHAEL JOHN DOE",
      "accountType": null,
      "accountNumber": "1000000000",
      "accountCurrency": null
    },
    "dateOfBirth": "",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "1000000000",
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
    "id": "325608b9-3d67-424f-85bc-ca7ba53f6291",
    "fullName": "",
    "documentType": "NG_BAV",
    "documentCountry": "NG",
    "documentId": "1111111111",
    "requestAt": "2026-09-04T09:25:24.291Z",
    "requestUpdatedAt": "2026-09-04T09:29:32.351Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "bav",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "not_found",
    "country": "NG",
    "idNumber": "1111111111",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.bav",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "bankDetails": {
      "bankName": null,
      "accountName": null,
      "accountType": null,
      "accountNumber": null,
      "accountCurrency": null
    },
    "dateOfBirth": "",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "1111111111",
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": false
  },
  "message": "Successfull!",
  "code": "info"
}
```
