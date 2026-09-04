---
title: Proof of Address Verification
sidebar_position: 4
---

## Proof of Address Verification

Checks a proof-of-address document against the address details you supply for a South African customer, and returns a risk outcome.

```
POST /api/v1/id-verifications/identity/za/poa
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_ZA_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The customer's South African ID number. |
| `idType`* | String | Must be `SAID`. |
| `personalInformation`* | Object | `firstName`, `lastName`, `gender`, `email`. |
| `addressDetails`* | Object | The address, plus the document itself. |
| `addressDetails.proofOfAddressImage`* | String | Base64 or URL of the document. |
| `addressDetails.address1`*, `address2`*, `suburb`*, `houseNumber`*, `street`*, `buildingName`*, `unitName`*, `province`*, `city`*, `postalCode`*, `stateCode`*, `duration`*, `propertyType`*, `country`* | String | The address as the customer gave it. `duration` is months at the address. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "2502161858090",
  "idType": "SAID",
  "isSubjectConsent": true,
  "personalInformation": {
    "firstName": "JONAH",
    "lastName": "PILLAY",
    "gender": "M",
    "email": "jonah@example.com"
  },
  "addressDetails": {
    "proofOfAddressImage": "iVBORw0KGgo=",
    "imageName": "image.jpg",
    "address1": "Body Corporate of Cohiba",
    "address2": "Stand NO: 433",
    "suburb": "Radiokop",
    "houseNumber": "1",
    "street": "Beyers Naude",
    "buildingName": "Cohiba",
    "unitName": "12",
    "province": "Gauteng",
    "city": "Radiokop",
    "postalCode": "1752",
    "stateCode": "GP",
    "duration": "13",
    "propertyType": "O",
    "country": "ZA"
  }
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "dcf27898-fc13-40aa-be08-1972ad3031bd",
    "fullName": "",
    "documentType": "ZA_POA",
    "documentCountry": "ZA",
    "documentId": "2502161858090",
    "requestAt": "2026-09-04T06:54:06.731Z",
    "requestUpdatedAt": "2026-09-04T07:36:06.746Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "zaPOA",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "ZA",
    "lastName": "",
    "metadata": {},
    "checkType": "za.poa",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "riskOutcome": "High",
    "validations": null,
    "dataValidation": false,
    "identityNumber": "2502161858090",
    "imageValidation": false,
    "allValidationPassed": false,
    "zaPOAAddressDetails": {
      "city": "Radiokop",
      "street": "Beyers Naude",
      "suburb": "Radiokop",
      "country": "ZA",
      "address1": "Body Corporate of Cohiba",
      "address2": "Stand NO: 433",
      "duration": "13",
      "province": "Gauteng",
      "unitName": "12",
      "imageName": "image.jpg",
      "stateCode": "GP",
      "postalCode": "1752",
      "houseNumber": "1",
      "buildingName": "Cohiba",
      "propertyType": "O",
      "proofOfAddressImage": "iVBORw0KGgo="
    },
    "zaPOAPersonalInformation": {
      "email": "jonah@example.com",
      "gender": "M",
      "lastName": "PILLAY",
      "firstName": "JONAH"
    }
  },
  "message": "Successfull!",
  "code": "info"
}
```
