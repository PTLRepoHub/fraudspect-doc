---
title: BVN Premium Verification
sidebar_position: 6
---

## BVN Premium Verification

Verifies a Nigerian BVN against the premium record, which adds gender, address and watchlist information on top of the standard result.

This is a **separate endpoint** from the `premiumBVN` flag on [BVN Verification](./bvn.md). The flag enriches a standard BVN result in place; this route is its own product, priced and permissioned separately, and its result is stored apart so a premium check never overwrites a standard one.

```
POST /api/v1/id-verifications/identity/ng/bvn-premium
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The BVN. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `premiumBVN` | Boolean | Defaults to `false`. |
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
  "id": "11111111111",
  "isSubjectConsent": true,
  "premiumBVN": true
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "a35bd496-8911-45e6-8ecb-821437821024",
    "fullName": "John Doe",
    "documentType": "NG_BVN_PREMIUM",
    "documentCountry": "NG",
    "documentId": "11111111111",
    "requestAt": "2026-09-04T09:25:09.400Z",
    "requestUpdatedAt": "2026-09-04T09:29:15.963Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "nin": "11111111111",
    "type": "bvn",
    "email": "",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEB\u2026",
    "title": "Mr",
    "gender": "Male",
    "mobile": "08000000000",
    "reason": null,
    "status": "found",
    "address": {
      "lga": null,
      "town": null,
      "state": "Kano State",
      "addressLine": "18 Main road"
    },
    "country": "NG",
    "idNumber": "11111111111",
    "lastName": "Doe",
    "metadata": {},
    "checkType": "ng.bvn-premium",
    "firstName": "John",
    "isConsent": true,
    "middleName": "",
    "nameOnCard": "John Doe Tim",
    "dateOfBirth": "1988-04-04",
    "fullDetails": true,
    "lgaOfOrigin": "Orlu",
    "otherMobile": null,
    "validations": null,
    "watchListed": "NO",
    "maritalStatus": "Single",
    "stateOfOrigin": "Lagos State",
    "dataValidation": false,
    "identityNumber": "11111111111",
    "levelOfAccount": "Level 1 - Low Level Accounts",
    "imageValidation": false,
    "enrollmentBranch": null,
    "registrationDate": null,
    "selfieValidation": false,
    "shouldRetrivedNin": true,
    "allValidationPassed": true,
    "enrollmentInstitution": null
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
    "id": "bb63566a-4266-45eb-8c91-22481c7969d6",
    "fullName": "",
    "documentType": "NG_BVN_PREMIUM",
    "documentCountry": "NG",
    "documentId": "00000000000",
    "requestAt": "2026-09-04T09:25:13.421Z",
    "requestUpdatedAt": "2026-09-04T09:29:17.294Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "nin": null,
    "type": "bvn",
    "email": "",
    "image": "",
    "title": null,
    "gender": "",
    "mobile": "",
    "reason": "BVN data not found",
    "status": "not_found",
    "address": {
      "lga": null,
      "town": null,
      "state": null,
      "addressLine": null
    },
    "country": "NG",
    "idNumber": "00000000000",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.bvn-premium",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "nameOnCard": null,
    "dateOfBirth": "",
    "fullDetails": true,
    "lgaOfOrigin": null,
    "otherMobile": null,
    "validations": null,
    "watchListed": null,
    "maritalStatus": null,
    "stateOfOrigin": null,
    "dataValidation": false,
    "identityNumber": "00000000000",
    "levelOfAccount": null,
    "imageValidation": false,
    "enrollmentBranch": null,
    "registrationDate": null,
    "selfieValidation": false,
    "shouldRetrivedNin": true,
    "allValidationPassed": false,
    "enrollmentInstitution": null
  },
  "message": "Successfull!",
  "code": "info"
}
```
