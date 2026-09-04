---
title: Tax PIN Verification
sidebar_position: 6
---

## Tax PIN Verification

Confirms a Kenyan KRA tax PIN and returns the taxpayer's name, registration status and tax obligations.

```
POST /api/v1/id-verifications/identity/ke/pin-check
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The KRA PIN. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `metadata` | Object | Anything you like. Returned to you untouched. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "A009274632R",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "94758d24-8337-4c6e-93d9-e0e104969cce",
    "fullName": "",
    "documentType": "KE_PIN_CHECK",
    "documentCountry": "KE",
    "documentId": "A009274632R",
    "requestAt": "2026-09-04T06:54:19.738Z",
    "requestUpdatedAt": "2026-09-04T07:36:18.302Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "pin": "A009274632R",
    "type": "kePinCheck",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "A009274632R",
    "lastName": "",
    "metadata": {},
    "checkType": "ke.pin-check",
    "firstName": "",
    "isConsent": true,
    "pinStatus": "Active",
    "itaxStatus": "iPage Updated",
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "taxpayerName": "Remmy S***** W*****",
    "dataValidation": false,
    "identityNumber": "A009274632R",
    "obligationName": "Income Tax - Resident Individual",
    "effectiveToDate": null,
    "imageValidation": false,
    "pinCurrentStatus": "Registered",
    "selfieValidation": false,
    "effectiveFromDate": null,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
