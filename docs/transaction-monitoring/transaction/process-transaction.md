---
title: Process Transaction
sidebar_position: 1
---

Submit a transaction for fraud scoring. Rules configured for the selected service are evaluated and a risk score is returned.

:::info Flat field format
Transaction fields are sent **flat at the root** of the request body — do not wrap them in a `mappedFields` object. Any key that is not `referenceId`, `customerId`, or `amount` is automatically treated as a transaction field and matched against your organisation's field definitions.
:::

## API Call

Send an HTTP **POST** request to:

```
POST /api/v1/transactions/{transactionServiceKey}/process
```

:::note
If a transaction with the same `referenceId` has already been processed, the previous result is returned without re-evaluation.
:::

### Parameters

| Parameter              | Location | Required | Description |
|------------------------|----------|----------|-------------|
| `transactionServiceKey`| path     | ✅       | Identifier of the transaction service that defines which rules to run |
| `referenceId`          | body     | ✅       | Your internal transaction ID |
| `customerId`           | body     | ✅       | `referenceId` of the customer initiating the transaction |
| `amount`               | body     | ✅       | Transaction amount |
| *(any other key)*      | body     | —        | Any additional transaction fields defined in your organisation (sent flat, not nested) |

### Request

```json
{
  "referenceId": "a4a4f61d-bd1f-4e8a-b4c2-4c36f9f3a315",
  "customerId": "550",
  "amount": 1000,
  "transactionSubType": "1",
  "merchantId": "12345",
  "bnfName": "Name Surname",
  "remitterName": "Name Surname",
  "cardNumber": "1234567891",
  "deviceId": "123456",
  "recognizedDevice": "0"
}
```

:::tip Field naming
Use the **alias** you configured for each field in your transaction field definitions (e.g. `bankName`, `channel`, `ipAddress`). The system resolves aliases automatically — no wrapper object is needed.
:::

### Response — Successful

```json
{
  "status": 200,
  "message": "Transaction fetched successfully",
  "data": {
    "id": "5bec4c49-a017-4f5d-85a7-e9623c8d6529",
    "referenceId": "a4a4f61d-bd1f-4e8a-b4c2-4c36f9f3a315",
    "amount": 1000,
    "score": 140,
    "status": "Rejected",
    "organizationId": "0b042d50-fa8d-44d6-b3e5-02ace4c24f8b",
    "customerId": 3,
    "createdAt": "2025-06-27T09:32:40.036Z",
    "updatedAt": "2025-06-27T09:32:40.036Z",
    "externalId": "259",
    "assignedToUserId": null,
    "moduleApiId": 3,
    "meta": {
      "processId": "Transaction_Limit"
    },
    "rules": [
      {
        "rule": {
          "id": "ce4eedca-2aae-4b3f-8c73-8542a178575f",
          "name": "Minimum limits",
          "description": null,
          "status": "ACTIVE",
          "score": 60
        }
      },
      {
        "rule": {
          "id": "eb702ab0-b6bd-4aa2-b8f8-a360dd96e86d",
          "name": "25k+ Transaction Limit",
          "description": null,
          "status": "ACTIVE",
          "score": 80
        }
      }
    ],
    "moduleApi": {
      "id": 3,
      "name": "Transaction Limit",
      "serviceIdentifier": "Transaction_Limit"
    },
    "mappedFields": [
      {
        "value": "12345",
        "TransactionFieldDefinition": {
          "aliases": "merchantId"
        }
      },
      {
        "value": "Name Surname",
        "TransactionFieldDefinition": {
          "aliases": "bnfName"
        }
      }
    ],
    "assignedToUser": null,
    "customer": {
      "referenceId": "550",
      "name": "Sylvernus Akubo"
    }
  },
  "code": "info"
}
```

### Response — Not Found

```json
{
  "message": "Transaction not found",
  "error": "Not Found",
  "statusCode": 404
}
```
