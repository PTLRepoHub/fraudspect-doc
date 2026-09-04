---
title: Individual Tax ID Verification
sidebar_position: 11
---

## Individual Tax ID Verification

Resolves and verifies an individual's Nigerian Tax ID from their NIN.

```
POST /api/v1/id-verifications/identity/ng/tax-id
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `nin`* | String | The subject's National Identification Number. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |
| `metadata` | Object | Anything you like. Returned to you untouched. |

Fields marked * are required.

### Example

```json title="Request"
{
  "nin": "11111111111",
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
