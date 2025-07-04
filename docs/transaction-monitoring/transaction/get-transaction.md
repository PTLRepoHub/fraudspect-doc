---
title: Get Transaction
sidebar_position: 3
---

Get Customer by referenceId

## API Call

To get customer.

Send an HTTP POST request to:

- `/api/v1/transactions/{reference_id}`

The following parameters are used for requests and responses:

| Parameter      | Direction | Description                                                                 |
|----------------|-----------|-----------------------------------------------------------------------------|
| reference_id      | path   | referenceId of the transaction |

### Response - Successful

```json
{
    "message": "Customer with ID 556 not found",
    "error": "Not Found",
    "statusCode": 404
}
```