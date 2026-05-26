# TIN Verification

## Verify Tax Identification Number (TIN)

**POST** `{{baseurl}}/v1/api/identity/ng/tin`

#### Request Body

| Name              | Type    | Description                                      |
|-------------------|---------|--------------------------------------------------|
| id*               | String  | Valid TIN issued by FIRS                         |
| isSubjectConsent* | Boolean | Indicate subject has given consent. Must be true |
| validation        | Object  | Validation Object                                |
| data              | Object  | Data Validation Object                           |
| lastName          | String  | Last name to compare against ID                  |
| firstName         | String  | First name to compare against ID                 |
| dateOfBirth       | String  | Date of birth to compare against ID              |

#### TIN Verification

TIN verification verifies that a provided Tax Identification Number issued by the Federal Inland Revenue Service (FIRS) exists in the database. It returns the registered information of the TIN holder:

```json
{
    "id": "12345678-0001",
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
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "email": "sarah.doe@example.com",
        "mobile": "08000000000",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "12345678-0001",
        "taxOffice": "Lagos Island",
        "registrationDate": "2018-09-15",
        "taxpayerStatus": "Active",
        "allValidationPassed": true,
        "createdAt": "2023-06-20T18:20:11.552Z",
        "updatedAt": "2023-06-20T18:20:11.552Z",
        "country": "NG",
        "metadata": {}
    }
}
```

### TIN Validation

TIN Validation verifies a TIN and compares provided data parameters against the records in the database:

```json
{
    "id": "12345678-0001",
    "isSubjectConsent": true,
    "validations": {
        "data": {
            "lastName": "Doe",
            "firstName": "Sarah",
            "dateOfBirth": "1988-04-04"
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
                "lastName": {
                    "validated": true,
                    "value": "Doe"
                },
                "dateOfBirth": {
                    "validated": true,
                    "value": "1988-04-04"
                },
                "firstName": {
                    "validated": true,
                    "value": "Sarah"
                }
            },
            "validationMessages": ""
        },
        "status": "found",
        "reason": null,
        "dataValidation": true,
        "selfieValidation": false,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "email": "sarah.doe@example.com",
        "mobile": "08000000000",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "12345678-0001",
        "taxOffice": "Lagos Island",
        "registrationDate": "2018-09-15",
        "taxpayerStatus": "Active",
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
