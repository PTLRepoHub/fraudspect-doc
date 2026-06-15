---
title: Create/Update Customer
sidebar_position: 1
---

Create or update a customer record. If a customer with the same `referenceId` already exists for your organisation, this endpoint performs an update instead of creating a duplicate.

:::info Flat field format
Custom fields are sent **flat at the root** of the request body — do not wrap them in a `mappedFields` object. Any key that is not `name`, `referenceId`, `accountTypeId`, or `connects` is automatically treated as a customer field and matched against your organisation's field definitions.
:::

## API Call

Send an HTTP **POST** request to:

```
POST /api/v1/customers
```

### Request parameters

| Parameter      | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `name`         | string   | ✅       | Full name of the customer |
| `referenceId`  | string   | ✅       | Your internal customer ID. Used in all subsequent transaction calls |
| `accountTypeId`| number   | ✅       | `1` for Person, `2` for Company |
| *(any other key)* | any   | —        | Any additional customer fields defined in your organisation, sent flat at the root |
| `connects`     | array    | —        | List of related customers and their roles (see [Customer Connections](./customer-connections)) |

### `connects` item fields

| Field         | Type   | Required | Description |
|---------------|--------|----------|-------------|
| `referenceId` | string | ✅       | The `referenceId` of the related customer |
| `role`        | string | ✅       | Relationship role — one of `UBO`, `DIRECTOR`, `SHAREHOLDER`, `AUTHORIZED_PERSON`, `BANK_ACCOUNT`, `ACCOUNT_HOLDER` |

### Connection roles

| Role               | Applies to          | Description |
|--------------------|---------------------|-------------|
| `UBO`              | Person only         | Ultimate Beneficial Owner |
| `DIRECTOR`         | Person only         | Person who manages the company |
| `SHAREHOLDER`      | Person or Company   | Holds shares of the company |
| `AUTHORIZED_PERSON`| Person only         | Authorised representative or signatory |
| `BANK_ACCOUNT`     | Any                 | Linked bank account |
| `ACCOUNT_HOLDER`   | Any                 | Linked account holder |

### Request

```json
{
  "name": "Sylvernus Akubo",
  "referenceId": "550",
  "accountTypeId": 1,
  "phone": "08012345678",
  "bvn": "22012345678",
  "connects": [
    { "referenceId": "COMP-001", "role": "DIRECTOR" },
    { "referenceId": "TRUST-002", "role": "UBO" }
  ]
}
```

### Response — Created

```json
{
  "status": 201,
  "message": "Customers created successfully",
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
    "customerMappedField": [
      {
        "value": "08012345678",
        "CustomerFieldDefinition": { "name": "Phone" }
      }
    ]
  },
  "code": "info"
}
```

:::info
Connections are stored separately from the core customer record. To read or update connections after creation, use the [Customer Connections](./customer-connections) endpoint.
:::
