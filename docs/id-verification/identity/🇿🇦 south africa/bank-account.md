---
title: Bank Account Verification
sidebar_position: 3
---

## Bank Account Verification

Confirms a South African bank account belongs to the identity number you supply, and reports whether it is open, whether it accepts credits and debits, and an overall risk outcome.

```
POST /api/v1/id-verifications/identity/za/bav
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_ZA_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The account holder's South African ID number. |
| `accountDetails`* | Object | The account being checked. |
| `accountDetails.bankBranchCode`* | String | Branch code. |
| `accountDetails.accountNumber`* | String | Account number. |
| `accountDetails.accountType`* | String | e.g. `Savings`, `Cheque`. |
| `accountDetails.bank` | String | Bank name. Optional. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "8203170496089",
  "accountDetails": {
    "bankBranchCode": "470010",
    "bank": "",
    "accountNumber": "1443535328",
    "accountType": "Savings"
  },
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "026a5ad1-0e4a-4ad4-a00a-ee98653444ee",
    "fullName": "",
    "documentType": "ZA_BAV",
    "documentCountry": "ZA",
    "documentId": "1443535328",
    "requestAt": "2026-09-04T06:54:04.461Z",
    "requestUpdatedAt": "2026-09-04T07:36:06.014Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "zaBAV",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "ZA",
    "idNumber": "8203170496089",
    "lastName": "",
    "metadata": {},
    "checkType": "za.bav",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "acceptsDebits": "Yes",
    "accountNumber": "1443535328",
    "accountStatus": "Open",
    "acceptsCredits": "Yes",
    "bavRiskOutcome": "Low",
    "dataValidation": false,
    "identityNumber": "8203170496089",
    "imageValidation": false,
    "accountTypeValid": "Yes",
    "accountNumberValid": "Yes",
    "allValidationPassed": true,
    "identityNumberValid": "No"
  },
  "message": "Successfull!",
  "code": "info"
}
```
