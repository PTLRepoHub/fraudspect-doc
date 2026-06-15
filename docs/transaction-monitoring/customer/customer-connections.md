---
title: Customer Connections
sidebar_position: 3
---

Link customers to related entities — directors, UBOs, shareholders, and more. Connections are synced to Finchecker and used in relationship mapping during screening and transaction monitoring.

## Connection roles

| Role               | Value                | Applies to          | Description |
|--------------------|----------------------|---------------------|-------------|
| UBO                | `UBO`                | Person only         | Ultimate Beneficial Owner |
| Director           | `DIRECTOR`           | Person only         | Person who manages the company |
| Shareholder        | `SHAREHOLDER`        | Person or Company   | Holds shares of the company |
| Authorised Person  | `AUTHORIZED_PERSON`  | Person only         | Authorised representative or signatory |
| Bank Account       | `BANK_ACCOUNT`       | Any                 | Linked bank account |
| Account Holder     | `ACCOUNT_HOLDER`     | Any                 | Linked account holder |

:::note
Both the customer and the connected customer must already exist in your organisation before creating a connection. The API validates this and returns a `400` if either `referenceId` is not found.
:::

---

## Get connections

Retrieve all connections for a customer.

```
GET /api/v1/customers/{referenceId}/connections
```

### Path parameters

| Parameter     | Description |
|---------------|-------------|
| `referenceId` | Your internal ID of the customer whose connections to retrieve |

### Response — Successful

```json
{
  "status": 200,
  "message": "Customer connections fetched successfully",
  "data": [
    {
      "id": "clxyz123",
      "role": "DIRECTOR",
      "createdAt": "2025-06-27T09:23:00.790Z",
      "updatedAt": "2025-06-27T09:23:00.790Z",
      "connectedCustomer": {
        "name": "Acme Ltd",
        "referenceId": "COMP-001"
      }
    },
    {
      "id": "clxyz456",
      "role": "UBO",
      "createdAt": "2025-06-27T09:23:00.790Z",
      "updatedAt": "2025-06-27T09:23:00.790Z",
      "connectedCustomer": {
        "name": "Jane Doe",
        "referenceId": "TRUST-002"
      }
    }
  ],
  "code": "info"
}
```

---

## Update connections

Replace the full list of connections for a customer. Any connections not included in the request are removed.

```
PUT /api/v1/customers/{referenceId}/connections
```

### Path parameters

| Parameter     | Description |
|---------------|-------------|
| `referenceId` | Your internal ID of the customer whose connections to update |

### Request parameters

| Parameter              | Type   | Required | Description |
|------------------------|--------|----------|-------------|
| `connects`             | array  | ✅       | Full replacement list of connections. Send an empty array to remove all |
| `connects[].referenceId` | string | ✅     | `referenceId` of the related customer |
| `connects[].role`      | string | ✅       | One of `UBO`, `DIRECTOR`, `SHAREHOLDER`, `AUTHORIZED_PERSON`, `BANK_ACCOUNT`, `ACCOUNT_HOLDER` |

### Request

```json
{
  "connects": [
    { "referenceId": "COMP-001", "role": "DIRECTOR" },
    { "referenceId": "TRUST-002", "role": "UBO" },
    { "referenceId": "SHARE-003", "role": "SHAREHOLDER" }
  ]
}
```

### Response — Successful

```json
{
  "status": 200,
  "message": "Customer connections updated successfully",
  "data": [
    {
      "id": "clxyz123",
      "role": "DIRECTOR",
      "createdAt": "2025-06-27T09:23:00.790Z",
      "updatedAt": "2025-06-27T09:23:00.790Z",
      "connectedCustomer": {
        "name": "Acme Ltd",
        "referenceId": "COMP-001"
      }
    },
    {
      "id": "clxyz456",
      "role": "UBO",
      "createdAt": "2025-06-27T09:23:00.790Z",
      "updatedAt": "2025-06-27T09:23:00.790Z",
      "connectedCustomer": {
        "name": "Jane Doe",
        "referenceId": "TRUST-002"
      }
    },
    {
      "id": "clxyz789",
      "role": "SHAREHOLDER",
      "createdAt": "2025-06-27T09:23:00.790Z",
      "updatedAt": "2025-06-27T09:23:00.790Z",
      "connectedCustomer": {
        "name": "Green Capital",
        "referenceId": "SHARE-003"
      }
    }
  ],
  "code": "info"
}
```

### Response — Customer not found

```json
{
  "message": "Customer not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Response — Connected customer not found

```json
{
  "message": "Connected customer(s) not found: UNKNOWN-REF",
  "error": "Bad Request",
  "statusCode": 400
}
```

### Response — Role incompatible with account type

```json
{
  "message": "Role UBO is only valid for Person customers (COMP-001)",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## Connections in bulk upload

When using the [bulk customer upload](../customer/create-update-customer) Excel template, include a `connects` column with a JSON string value:

```
connects = [{"referenceId":"COMP-001","role":"DIRECTOR"},{"referenceId":"TRUST-002","role":"UBO"}]
```

Rows with invalid or unresolvable `referenceId` values are skipped without failing the entire upload. Download the template from `GET /api/v1/customers/download-template` — the `connects` column is included automatically.
