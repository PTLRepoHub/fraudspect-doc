---
title: Premium Bank List
sidebar_position: 15
---

## Premium Bank List

Lists the banks accepted by [Premium Bank Account Verification](./premium-bank-account.md). Returns `{ name, code }` — a different shape from the [basic list](./bank-list.md), and the two are not interchangeable.

```
GET /api/v1/id-verifications/identity/ng/premium-bav/banks
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Example

```json title="Response"
{
  "status": 200,
  "data": [
    {
      "name": "Sterling Bank",
      "code": "000001"
    },
    {
      "name": "Bosak Microfinance Bank",
      "code": "090176"
    },
    {
      "name": "Lapo Microfinance Bank",
      "code": "090177"
    },
    {
      "name": "GreenBank Microfinance Bank",
      "code": "090178"
    },
    "\u2026"
  ],
  "message": "Successfull!",
  "code": "info"
}
```
