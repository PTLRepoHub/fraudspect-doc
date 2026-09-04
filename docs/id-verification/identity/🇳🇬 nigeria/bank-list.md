---
title: Bank List
sidebar_position: 13
---

## Bank List

Lists the banks accepted by [Bank Account Verification](./bank-account.md). Returns `{ id, name }` — **not** interchangeable with the [premium list](./premium-bank-list.md).

```
GET /api/v1/id-verifications/identity/ng/bav/banks
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Example

```json title="Response"
{
  "status": 200,
  "data": [
    {
      "id": 879,
      "name": "78 Finance Company Ltd",
      "slug": "78-finance-company-ltd-ng",
      "code": "40195",
      "longCode": "110072",
      "gateway": null,
      "active": true,
      "country": "Nigeria",
      "currency": "NGN",
      "type": "nuban"
    },
    {
      "id": 707,
      "name": "9jaPay Microfinance Bank",
      "slug": "9japay-microfinance-bank-ng",
      "code": "090629",
      "longCode": "090629",
      "gateway": null,
      "active": true,
      "country": "Nigeria",
      "currency": "NGN",
      "type": "nuban"
    },
    {
      "id": 302,
      "name": "9mobile 9Payment Service Bank",
      "slug": "9mobile-9payment-service-bank-ng",
      "code": "120001",
      "longCode": "120001",
      "gateway": "",
      "active": true,
      "country": "Nigeria",
      "currency": "NGN",
      "type": "nuban"
    },
    {
      "id": 174,
      "name": "Abbey Mortgage Bank",
      "slug": "abbey-mortgage-bank-ng",
      "code": "404",
      "longCode": "",
      "gateway": null,
      "active": true,
      "country": "Nigeria",
      "currency": "NGN",
      "type": "nuban"
    },
    "\u2026"
  ],
  "message": "Successfull!",
  "code": "info"
}
```
