---
title: Phone Number Verification
sidebar_position: 2
---

## Phone Number Verification

Confirms a South African phone number is live and returns what is known about it — carrier, line type, region, and a set of risk signals including whether the number is blacklisted or blocked.

```
POST /api/v1/id-verifications/identity/za/phone
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_ZA_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `phoneNumber`* | String | The number, without the dialling code. |
| `phoneCountryCode`* | String | The dialling code, e.g. `+27`. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "phoneNumber": "821112110",
  "phoneCountryCode": "+27",
  "isSubjectConsent": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "ffee8d81-0ab3-427c-b9f3-493950a6d8b7",
    "fullName": "",
    "documentType": "ZA_PHONE",
    "documentCountry": "ZA",
    "documentId": "821112110",
    "requestAt": "2026-09-04T06:54:03.378Z",
    "requestUpdatedAt": "2026-09-04T07:36:05.435Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "zaPhone",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "+27821112110",
    "reason": null,
    "status": "found",
    "carrier": "Vodacom SA",
    "country": "Global",
    "idNumber": "821112110",
    "lastName": "",
    "metadata": {},
    "phoneZip": null,
    "checkType": "za.phone",
    "firstName": "",
    "isConsent": true,
    "phoneCity": "Countrywide",
    "middleName": "",
    "phoneState": null,
    "dateOfBirth": "",
    "phoneCounty": null,
    "phoneNumber": "821112110",
    "validations": null,
    "phoneCountry": "South Africa",
    "phoneTypeCode": "2",
    "dataValidation": false,
    "identityNumber": "821112110",
    "isPhoneBlocked": false,
    "phoneBlockCode": "0",
    "phoneRiskLevel": "low",
    "phoneRiskScore": "200",
    "imageValidation": false,
    "phoneCountryCode": "27",
    "phoneRiskOutcome": "Low",
    "selfieValidation": false,
    "isPhoneNumberValid": true,
    "allValidationPassed": true,
    "phoneCountryCodeISO2": "ZA",
    "phoneCountryCodeISO3": "ZAF",
    "phoneTypeDescription": "MOBILE",
    "phoneBlockDescription": "Not blocked",
    "isBlackListedPhoneType": "NA",
    "phoneRiskRecommendation": null,
    "isBlackListedPhoneNumber": "NA",
    "isBlacklistedCountryCode": "NA"
  },
  "message": "Successfull!",
  "code": "info"
}
```
