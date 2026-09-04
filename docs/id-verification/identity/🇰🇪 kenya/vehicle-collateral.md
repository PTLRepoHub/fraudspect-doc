---
title: Vehicle Collateral Verification
sidebar_position: 10
---

## Vehicle Collateral Verification

Checks whether a Kenyan vehicle is pledged as collateral, and returns the secured creditors and amounts.

```
POST /api/v1/id-verifications/identity/ke/vehicle-collateral
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The vehicle collateral ID. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

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
    "id": "6ee1e538-a9b6-47fc-85e0-d6ceb62c536f",
    "fullName": "",
    "documentType": "KE_VEHICLE_COLLATERAL",
    "documentCountry": "KE",
    "documentId": "111111111",
    "requestAt": "2026-09-04T06:54:26.556Z",
    "requestUpdatedAt": "2026-09-04T07:36:21.697Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "keVehicleCollateral",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "KE",
    "idNumber": "111111111",
    "lastName": "",
    "metadata": {},
    "checkType": "ke.vehicle-collateral",
    "creditors": [
      {
        "name": "NCBA BANK KENYA PLC",
        "type": "local_company",
        "categoryOfSecuredCreditor": "consensual"
      }
    ],
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "collaterals": [
      {
        "type": "motor_vehicle",
        "serialNo": "GP5-1225288",
        "description": "Make HONDA , FIT\r\n       Reg No. : KDN892V\r\n       Chassis N\u2026"
      }
    ],
    "dateOfBirth": "",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "111111111",
    "currencyAmounts": [
      {
        "amount": "1133890.29",
        "currency": "KES"
      }
    ],
    "imageValidation": false,
    "selfieValidation": false,
    "allValidationPassed": true
  },
  "message": "Successfull!",
  "code": "info"
}
```
