---
title: vNIN Verification
sidebar_position: 2
---

## Verify Virtual National Identification Number (vNIN)

**POST** `{{baseurl}}/api/v1/id-verifications/identity/ng/vnin`

#### Request Body

| Name              | Type    | Description                                      |
|-------------------|---------|--------------------------------------------------|
| id*               | String  | Valid vNIN (16-character alphanumeric)            |
| isSubjectConsent* | Boolean | Indicate subject has given consent. Must be true |
| validation        | Object  | Validation Object                                |
| data              | Object  | Data Validation Object                           |
| lastName          | String  | Last name to compare against ID                  |
| firstName         | String  | First name to compare against ID                 |
| dateOfBirth       | String  | Date of birth to compare against ID              |
| selfie            | Object  | Selfie Validation Object                         |
| image             | String  | Selfie image to compare against ID               |

#### vNIN Verification

vNIN (Virtual NIN) is a tokenised, non-permanent alias of a NIN generated via the NIMC app or USSD. vNIN verification verifies that the provided virtual NIN is valid and returns the holder's information:

```json
{
    "id": "AB123456789012CD",
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
        "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoH...",
        "mobile": "08000000000",
        "email": null,
        "birthState": "Edo",
        "birthLGA": "Esan West",
        "birthCountry": "nigeria",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "AB123456789012CD",
        "allValidationPassed": true,
        "gender": "f",
        "createdAt": "2023-06-20T18:20:11.552Z",
        "updatedAt": "2023-06-20T18:20:11.552Z",
        "country": "NG",
        "metadata": {}
    }
}
```

### vNIN Facial Matching

vNIN Facial Matching verifies that the vNIN is valid and that the provided image matches the image in the database. A confidence score is returned:

```json
{
    "id": "AB123456789012CD",
    "isSubjectConsent": true,
    "validations": {
        "selfie": {
            "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoH..."
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
            "selfie": {
                "selfieVerification": {
                    "confidenceLevel": 91,
                    "threshold": 80,
                    "match": true,
                    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoH..."
                }
            },
            "validationMessages": ""
        },
        "status": "found",
        "reason": null,
        "dataValidation": false,
        "selfieValidation": true,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "mobile": "08000000000",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "AB123456789012CD",
        "allValidationPassed": true,
        "gender": "f",
        "country": "NG",
        "createdAt": "2023-06-20T18:22:40.000Z",
        "lastModifiedAt": "2023-06-20T18:22:40.000Z",
        "metadata": {}
    }
}
```

### vNIN Validation

vNIN Validation verifies a vNIN and compares provided data parameters against the records in the database:

```json
{
    "id": "AB123456789012CD",
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
        "mobile": "08000000000",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "AB123456789012CD",
        "allValidationPassed": true,
        "gender": "f",
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
