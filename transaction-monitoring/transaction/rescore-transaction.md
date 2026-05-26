# Rescore Transaction

## Send Transaction for Processing

This action processes a transaction rescoring.

Send a HTTP POST request to:

- `/api/v1/transactions/{transactionServiceKey}/rescore`

The following parameters are used for requests and responses:

| Parameter          | Direction | Description                                                                 |
|--------------------|-----------|-----------------------------------------------------------------------------|
| transactionServiceKey      | path   | the transaction service that triggers the rules                      |
| referenceId    | request   | The referenceId from Bank  |
| customerId    | request   | reference id of the customer  |
| amount    | request   | transaction amount |
| mappedFields    | request   | Other custom field create are usually passed as a json to the mappedFields |

### Request

```json
{
  "referenceId": "a4a4f61d-bd1f-4e8a-b4c2-4c36f9f3a315", // reference Id of the transaction from the banking system
  "customerId": "550", // reference id of the customer
  "amount": 1000,
  "mappedFields": {
    "transactionSubType": "1", // 1 (Incoming Transaction), 0 (Outgoing transaction)
    "merchantId": "12345",
    "bnfName": "Name Surname",
    "remitterName": "Name Surname",
    "cardNumber": "1234567891",
    "deviceId": "123456",
    "recognizedDevice": "0"
  }
}
```

### Response - Successful

```json
{
    "status": 200,
    "message": "Transaction processed successfully",
    "data": {
        "id": "fbdacaf2-1e0a-4292-93d3-09c4f3566328",
        "referenceId": "a4a4f61d-bd1f-4e8a-b4c2-4c36f9f3a315",
        "amount": 800,
        "score": 150,
        "status": "Rejected",
        "organizationId": "0b042d50-fa8d-44d6-b3e5-02ace4c24f8b",
        "customerId": 3,
        "createdAt": "2025-07-04T05:54:37.185Z",
        "updatedAt": "2025-07-04T05:54:37.185Z",
        "externalId": "326",
        "assignedToUserId": null,
        "moduleApiId": 4,
        "meta": {
            "processId": "json"
        },
        "rules": [
            {
                "rule": {
                    "id": "f0730189-62f7-4bf8-acad-27f15ad6b892",
                    "name": "Merchant monthly limit",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 0
                }
            },
            {
                "rule": {
                    "id": "dcb9cb62-742f-4126-b66e-d0f123b76a75",
                    "name": "[Account] First 5 outbound",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 50
                }
            },
            {
                "rule": {
                    "id": "d18ba355-bcaa-461c-bbbb-e60902d080cf",
                    "name": "[73] Number of transactions performed at the same merchant",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 50
                }
            },
            {
                "rule": {
                    "id": "fbcb7fac-0ae2-4dab-a6ae-f940ae427ba5",
                    "name": "[72] Value of loads performed at the same agent daily and over time",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 50
                }
            },
            {
                "rule": {
                    "id": "17686f40-7bac-4e15-8a70-2c640c99cc78",
                    "name": "[AML] Outbound - Criminals and Interpol Check",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 0
                }
            },
            {
                "rule": {
                    "id": "cea949db-7c66-4af2-9536-79aca6855d1e",
                    "name": "[AML] Outbound - PEP Check",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 0
                }
            },
            {
                "rule": {
                    "id": "e7aee336-831a-4203-82d3-e23fc24856a9",
                    "name": "[AML] In/Out - Check Beneficiary/Remitter - recordType: Sanctioned",
                    "description": null,
                    "status": "ACTIVE",
                    "score": 0
                }
            }
        ],
        "moduleApi": {
            "id": 4,
            "name": "Global",
            "serviceIdentifier": "json"
        },
        "mappedFields": [
            {
                "value": "0",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.transactionSubType"
                }
            },
            {
                "value": "12345",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.merchantId"
                }
            },
            {
                "value": "Name Surname",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.bnfName"
                }
            },
            {
                "value": "Name Surname",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.remitterName"
                }
            },
            {
                "value": "1234567891",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.cardNumber"
                }
            },
            {
                "value": "123456",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.deviceId"
                }
            },
            {
                "value": "0",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.recognizedDevice"
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
