---
title: Address Verification
sidebar_position: 8
---

## Address Verification

Returns the address information held against a Kenyan identity number.

```
POST /api/v1/id-verifications/identity/ke/address
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id`* | String | The identity number. |
| `idType`* | String | One of `national-id`, `passport`. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "1234567",
  "idType": "national-id",
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
