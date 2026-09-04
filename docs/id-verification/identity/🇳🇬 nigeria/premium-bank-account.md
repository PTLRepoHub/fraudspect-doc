---
title: Premium Bank Account Verification
sidebar_position: 16
---

## Premium Bank Account Verification

Confirms a Nigerian bank account against the premium data source.

```
POST /api/v1/id-verifications/identity/ng/premium-bav
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `accountNumber`* | String | The account number. |
| `bankCode`* | String | Bank code from [Premium Bank List](./premium-bank-list.md). |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "accountNumber": "2057664202",
  "bankCode": "033",
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
