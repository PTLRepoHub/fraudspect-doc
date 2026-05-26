# Process Transaction

## Send Transaction for Processing

To Send Transaction for Processing.

Send a HTTP POST request to:

- `/api/v1/transactions/{transactionServiceKey}/process`

The following parameters are used for requests and responses:

| Parameter          | Direction | Description                                                                 |
|--------------------|-----------|-----------------------------------------------------------------------------|
| transactionServiceKey      | path   | the transaction service that triggers the rules                      |
| referenceId    | request   | The referenceId from Bank  |
| customerId    | request   | reference id of the customer  |
| amount    | request   | transaction amount |
| mappedFields    | request   | Other custom field create are usually passed as a json to the mappedFields |

Note: If a transaction is sent with the same document ID, it will not be rechecked and previous results will be returned.

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
    "message": "Transaction fetched successfully",
    "data": {
        "id": "5bec4c49-a017-4f5d-85a7-e9623c8d6529",
        "referenceId": "d8a4f61d-bd1f-4e9a-b4c2-2c36f9f2b584",
        "amount": 100000,
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
                "value": "102",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.ipAddress"
                }
            },
            {
                "value": "fidelity bank",
                "TransactionFieldDefinition": {
                    "aliases": "mappedFields.bankName"
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

### Response - Not found

```json
{
    "message": "Transaction  not found",
    "error": "Not Found",
    "statusCode": 404
}
```
