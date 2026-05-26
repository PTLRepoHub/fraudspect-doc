---
title: BVN Verification
sidebar_position: 1
---

## Verify Bank Verification Number (BVN)

**POST** `{{baseurl}}/v1/api/identity/ng/bvn`

#### Request Body

| Name              | Type    | Description                                      |
|-------------------|---------|--------------------------------------------------|
| id*               | String  | Valid BVN (11 digits)                            |
| isSubjectConsent* | Boolean | Indicate subject has given consent. Must be true |
| validation        | Object  | Validation Object                                |
| data              | Object  | Data Validation Object                           |
| lastName          | String  | Last name to compare against ID                  |
| firstName         | String  | First name to compare against ID                 |
| dateOfBirth       | String  | Date of birth to compare against ID              |
| selfie            | Object  | Selfie Validation Object                         |
| image             | String  | Selfie image to compare against ID               |

#### BVN Verification

BVN verification verifies that a provided Bank Verification Number exists in the database. It returns the full information of the BVN holder:

```json
{
    "id": "22222222222",
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
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "22222222222",
        "allValidationPassed": true,
        "gender": "f",
        "enrollmentBank": "044",
        "enrollmentBranch": "IKEJA BRANCH",
        "levelOfAccount": "3",
        "lgaOfOrigin": "Esan West",
        "lgaOfResidence": "Alimosho",
        "maritalStatus": "Single",
        "nameOnCard": "DOE SARAH JANE",
        "nin": "11111111111",
        "registrationDate": "2015-03-20",
        "stateOfOrigin": "Edo",
        "stateOfResidence": "Lagos",
        "watchListed": "NO",
        "createdAt": "2023-06-20T18:20:11.552Z",
        "updatedAt": "2023-06-20T18:20:11.552Z",
        "country": "NG",
        "metadata": {}
    }
}
```

### BVN Facial Matching

BVN Facial Matching verifies that a BVN is valid and that the image provided matches the image in the database. A confidence score is returned:

```json
{
    "id": "22222222222",
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
                    "confidenceLevel": 94,
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
        "idNumber": "22222222222",
        "allValidationPassed": true,
        "gender": "f",
        "country": "NG",
        "createdAt": "2023-06-20T18:22:40.000Z",
        "lastModifiedAt": "2023-06-20T18:22:40.000Z",
        "metadata": {}
    }
}
```

### BVN Validation

BVN Validation verifies a BVN and compares given data parameters against the data present in the database:

```json
{
    "id": "22222222222",
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
        "idNumber": "22222222222",
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
