---
title: Create/Update Customer
sidebar_position: 1
---

Create or update customer.

## API Call

To create/update customer.

Send a HTTP POST request to:

- `/api/v1/customers`

The following parameters are used for requests and responses:

| Parameter          | Direction | Description                                                                 |
|--------------------|-----------|-----------------------------------------------------------------------------|
| name          | request   | Full name of the customer on your  |
| referenceId      | request   | it`s ID from BANK system, later we will use it to send with transactions.                      |
| accountTypeId    | request   | Account type, where 0 indicates a person, and 1 indicates a company. |
| mappedFields    | request   | Other custom field create are usually passed as a json to the mappedFields |

### Request

```json
{
    "name": "Sylvernus Akubo",
    "referenceId": "550",
    "accountTypeId": 1,
    "mappedFields": {}
}
```

### Response - Successful

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
        "customerMappedField": []
    },
    "code": "info"
}
```
