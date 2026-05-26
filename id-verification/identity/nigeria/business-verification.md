# Business Verification

## Verify Business (CAC)

**POST** `{{baseurl}}/v1/api/identity/ng/cac`

#### Request Body

| Name              | Type    | Description                                                      |
|-------------------|---------|------------------------------------------------------------------|
| id*               | String  | Valid CAC Registration Number (RC Number)                        |
| isSubjectConsent* | Boolean | Indicate subject has given consent. Must be true                 |
| validation        | Object  | Validation Object                                                |
| data              | Object  | Data Validation Object                                           |
| companyName       | String  | Company name to compare against CAC records                      |
| registrationDate  | String  | Registration date to compare against CAC records (YYYY-MM-DD)   |

#### Business Verification

Business Verification verifies that a provided Corporate Affairs Commission (CAC) registration number exists in the database. It returns the registered information of the business:

```json
{
    "id": "RC-123456",
    "isSubjectConsent": true
}
```

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "status": "found",
        "reason": null,
        "dataValidation": false,
        "selfieValidation": false,
        "companyName": "ACME ENTERPRISES LIMITED",
        "registrationNumber": "RC-123456",
        "registrationDate": "2015-07-10",
        "companyStatus": "Active",
        "companyType": "Private Company Limited by Shares",
        "address": {
            "street": "10 Commerce Avenue, Victoria Island",
            "city": "Lagos",
            "state": "Lagos",
            "country": "Nigeria"
        },
        "directors": [
            {
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1975-03-15",
                "nationality": "Nigerian"
            }
        ],
        "isConsent": true,
        "idNumber": "RC-123456",
        "allValidationPassed": true,
        "createdAt": "2023-06-20T18:20:11.552Z",
        "updatedAt": "2023-06-20T18:20:11.552Z",
        "country": "NG",
        "metadata": {}
    }
}
```

### Business Validation

Business Validation verifies a CAC registration number and compares provided data parameters against the records in the database:

```json
{
    "id": "RC-123456",
    "isSubjectConsent": true,
    "validations": {
        "data": {
            "companyName": "ACME ENTERPRISES LIMITED",
            "registrationDate": "2015-07-10"
        }
    }
}
```

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "validations": {
            "data": {
                "companyName": {
                    "validated": true,
                    "value": "ACME ENTERPRISES LIMITED"
                },
                "registrationDate": {
                    "validated": true,
                    "value": "2015-07-10"
                }
            },
            "validationMessages": ""
        },
        "status": "found",
        "reason": null,
        "dataValidation": true,
        "selfieValidation": false,
        "companyName": "ACME ENTERPRISES LIMITED",
        "registrationNumber": "RC-123456",
        "registrationDate": "2015-07-10",
        "companyStatus": "Active",
        "companyType": "Private Company Limited by Shares",
        "address": {
            "street": "10 Commerce Avenue, Victoria Island",
            "city": "Lagos",
            "state": "Lagos",
            "country": "Nigeria"
        },
        "directors": [
            {
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1975-03-15",
                "nationality": "Nigerian"
            }
        ],
        "isConsent": true,
        "idNumber": "RC-123456",
        "allValidationPassed": true,
        "country": "NG",
        "createdAt": "2023-06-20T18:24:16.916Z",
        "lastModifiedAt": "2023-06-20T18:24:16.916Z",
        "metadata": {}
    }
}
```

### Error Responses

#### HTTP/1.1 402 Payment Required

```json
{
    "success": false,
    "statusCode": 402,
    "message": "Insufficient fund",
    "name": "PaymentRequiredError",
    "data": {}
}
```

#### HTTP/1.1 500 Internal Server Error

```json
{
    "success": false,
    "statusCode": 500,
    "message": "Service unavailable",
    "name": "Error",
    "data": {}
}
```

#### HTTP/1.1 403 Forbidden

```json
{
    "success": false,
    "statusCode": 403,
    "message": "Permission denied",
    "name": "UnauthorizedError",
    "data": {}
}
```
