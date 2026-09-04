---
title: Advanced Phone Search
sidebar_position: 10
---

## Advanced Phone Search

Resolves a Nigerian phone number against the NIMC database and returns the full NIN record for its owner. Use this when you have only a phone number and need the identity behind it.

```
POST /api/v1/id-verifications/identity/ng/nin-phone
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.
Sending `validations.data` also requires `KYC_DATA_VALIDATE`; sending `validations.selfie.image` also requires `KYC_IMAGE_COMPARE`.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `mobile`* | String | The phone number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `validations` | Object | Optional. Details to compare against the record we find. |
| `validations.data.firstName` | String | First name to compare. |
| `validations.data.lastName` | String | Last name to compare. |
| `validations.data.dateOfBirth` | String | Date of birth to compare, `YYYY-MM-DD`. |
| `validations.selfie.image` | String | Base64 or URL of a selfie to compare against the photo on file. |

Fields marked * are required.

### Example

```json title="Request"
{
  "mobile": "08000000000",
  "isSubjectConsent": true
}
```

:::note Response example coming
Every identity check returns the same envelope — `status`, `data.status` (`found`
or `not_found`), and the fields specific to this check. We have not yet captured a
live response for this endpoint: the provider's upstream source was unavailable
throughout our verification run, so rather than publish an invented payload we
have left it out. The request contract above is confirmed correct.
:::
