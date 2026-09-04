---
title: Bank List
sidebar_position: 11
---

## Bank List

Lists the Kenyan banks accepted by [Bank Account Verification](./bank-account.md). Call this first to get the `bankId` you need.

```
GET /api/v1/id-verifications/identity/ke/banks
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_KE_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Example

```json title="Response"
{
  "status": 200,
  "data": [
    {
      "id": "1",
      "name": "KCB"
    },
    {
      "id": "2",
      "name": "Standard Chartered Bank"
    },
    {
      "id": "3",
      "name": "Absa Bank"
    },
    {
      "id": "4",
      "name": "Bank of India"
    },
    "\u2026"
  ],
  "message": "Successfull!",
  "code": "info"
}
```
