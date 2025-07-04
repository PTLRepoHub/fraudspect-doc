---
title: Get Customer
sidebar_position: 2
---

Get Customer by referenceId

## API Call

To get customer.

Send an HTTP POST request to:

- `/api/v1/customers/{reference_id}`

The following parameters are used for requests and responses:

| Parameter      | Direction | Description                                                                 |
|----------------|-----------|-----------------------------------------------------------------------------|
| reference_id      | path   |  The ID from the BANK system, which will be used for subsequent transaction |

### Response - Successful

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
        "customerMappedField": []
    },
    "code": "info"
}
```

### Response - Not Found

```json
{
    "message": "Customer with ID 556 not found",
    "error": "Not Found",
    "statusCode": 404
}
```