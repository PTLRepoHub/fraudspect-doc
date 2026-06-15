---
title: Get Customer
sidebar_position: 2
---

Retrieve a customer record by their `referenceId`.

## API Call

Send an HTTP **GET** request to:

```
GET /api/v1/customers/{referenceId}
```

### Path parameters

| Parameter      | Direction | Description |
|----------------|-----------|-------------|
| `referenceId`  | path      | Your internal customer ID |

### Response — Successful

```json
{
  "status": 200,
  "message": "Customers fetched successfully",
  "data": {
    "id": 3,
    "name": "Sylvernus Akubo",
    "referenceId": "550",
    "riskScore": 50,
    "riskScoreName": "High risk",
    "lastIpAddress": null,
    "lastUserAgent": null,
    "usualUserAgent": null,
    "lastScreeningDate": null,
    "accountTypeId": 1,
    "createdAt": "2025-06-27T09:23:00.790Z",
    "updatedAt": "2025-06-27T09:23:00.790Z",
    "organizationId": "0b042d50-fa8d-44d6-b3e5-02ace4c24f8b",
    "externalId": "456",
    "accountType": {
      "id": 1,
      "name": "personal"
    },
    "customerMappedField": [
      {
        "value": "08012345678",
        "CustomerFieldDefinition": {
          "name": "Phone",
          "aliases": "phone"
        }
      }
    ]
  },
  "code": "info"
}
```

:::tip
To fetch a customer's connections (directors, UBOs, shareholders, etc.), use the dedicated [Customer Connections](./customer-connections) endpoint: `GET /api/v1/customers/{referenceId}/connections`
:::

### Response — Not Found

```json
{
  "message": "Customer with ID 556 not found",
  "error": "Not Found",
  "statusCode": 404
}
```
