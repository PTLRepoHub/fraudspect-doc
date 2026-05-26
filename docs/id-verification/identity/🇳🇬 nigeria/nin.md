---
title: NIN Verification
sidebar_position: 5

---

## Verify National Identification Number (NIN)

**POST** `{{baseurl}}/v1/api/identity/ng/nin`

#### Request Body

| Name              | Type    | Description                                      |
|-------------------|---------|--------------------------------------------------|
| id*               | String  | Valid NIN                                        |
| isSubjectConsent* | Boolean | Indicate subject has given consent. Must be true |
| validation        | Object  | Validation Object                                |
| data              | Object  | Validation Object                                |
| lastName          | String  | lastname to compare against ID                   |
| firstName         | String  | firstname to compare against ID                  |
| dateOfBirth       | String  | date of birth to compare against ID              |
| selfie            | Object  | Selfie Validation Object                         |
| image             | String  | Selfie image to compare against ID               |
| premiumNIN        | Boolean | Whether to perform a premium (high priority) call. Default value: false |

#### NIN Verification

NIN verification verifies that a provided National Identity Number exists in the database. It shows the full information of the NIN holder:

```json
{
    "id": "11111111111",
    "premiumNin": true,
    "isSubjectConsent": true
}
```

```json
{
    "success": true,
    "statusCode": 200,
    "message": "success",
    "data": {
        "address": {
            "town": "SULEJA",
            "lga": "Suleja",
            "state": "Niger",
            "addressLine": "13B Fake Street, Ilupeju Niger State"
        },
        "status": "found",
        "reason": null,
        "dataValidation": false,
        "selfieValidation": false,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgip3OR/1n/9k=",
        "signature": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIcSUNREQEREH/9k=",
        "mobile": "08000000000",
        "email": null,
        "birthState": "Edo",
        "nokState": "Niger",
        "religion": "christianity",
        "birthLGA": "Esan West",
        "birthCountry": "nigeria",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "11111111111",
        "allValidationPassed": true,
        "gender": "f",
        "createdAt": "2023-06-20T18:20:11.552Z",
        "updatedAt": "2023-06-20T18:20:11.552Z",
        "country": "NG",
        "metadata": {},
    },
}
```

### NIN Facial Matching

NIN Facial matching is used to verify that a NIN is valid and also that the image provided matches with the image in the database. This includes a confidence score of the Facial matching:

```json
{
    "id": "11111111111",
    "premiumNin": true,
    "isSubjectConsent": true,
    "validations": {
        "selfie": {
            "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//CABEIAZgCZAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//aAAgBAQAAAABbPVqIdrFJa52jaexpGtEUGEEVCtSYRSYAPLo5v6Q9vR1b914oIQAhXVVUTRQx0BtGmgptam8qoIdSFIaxjlNp6jzBJmIGsDEyM"
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
        "id": "6491ee6e239381344487a5ff",
        "address": {
            "town": "SULEJA",
            "lga": "Suleja",
            "state": "Niger",
            "addressLine": "13B Fake Street, Ilupeju Niger State"
        },
        "validations": {
            "selfie": {
                "selfieVerification": {
                    "confidenceLevel": 49,
                    "threshold": 80,
                    "match": false,
                    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//CABEIAZgCZAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//aAAgBAQAAAABbPVqIdrFJa52jaexpGtEUGEEVCtSYRSYAPLo5v6Q9vR1b914oIQAhXVVUTRQx0BtGmgptam8qoIdSFIaxjlNp6jzBJmIGsDEyM"
                }
            },
            "validationMessages": "Provided image does not match ID image"
        },
        "parentId": null,
        "status": "found",
        "reason": null,
        "dataValidation": false,
        "selfieValidation": true,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoICAgLCgoLD4/k4dLip3OR/1n/9k=",
        "signature": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtEQEREH/9k=",
        "mobile": "08000000000",
        "email": null,
        "birthState": "Edo",
        "nokState": "Niger",
        "religion": "christianity",
        "birthLGA": "Esan West",
        "birthCountry": "nigeria",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "11111111111",
        "businessId": "62c2a4868d319373a6280152",
        "type": "nin",
        "allValidationPassed": false,
        "gender": "f",
        "requestedAt": "2023-06-20T18:22:39.966Z",
        "requestedById": "62c2a4868d3193700828014e",
        "country": "NG",
        "createdAt": "2023-06-20T18:22:40.000Z",
        "lastModifiedAt": "2023-06-20T18:22:40.000Z",
        "metadata": {},
        "requestedBy": {
            "firstName": "API",
            "lastName": "User",
            "middleName": "",
            "id": "62c2a4868d3193700828014e"
        }
    }
}
```

### NIN Validation

NIN Validation verifies a NIN and compares given data parameters against the data present in the database. For example, a first name and last name can be provided and this will validate as true or false as to whether it matches with the names in the database or not:

```json
{
    "id": "11111111111",
    "premiumNin": true,
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
        "id": "6491eed02393815e9f87a603",
        "address": {
            "town": "SULEJA",
            "lga": "Suleja",
            "state": "Niger",
            "addressLine": "13B Fake Street, Ilupeju Niger State"
        },
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
        "parentId": null,
        "status": "found",
        "reason": null,
        "dataValidation": true,
        "selfieValidation": false,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoIR/1n/9k=",
        "signature": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIcSUNDX1BSTQEREH/9k=",
        "mobile": "08000000000",
        "email": null,
        "birthState": "Edo",
        "nokState": "Niger",
        "religion": "christianity",
        "birthLGA": "Esan West",
        "birthCountry": "nigeria",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "11111111111",
        "businessId": "62c2a4868d319373a6280152",
        "type": "nin",
        "allValidationPassed": true,
        "gender": "f",
        "requestedAt": "2023-06-20T18:24:16.891Z",
        "requestedById": "62c2a4868d3193700828014e",
        "country": "NG",
        "createdAt": "2023-06-20T18:24:16.916Z",
        "lastModifiedAt": "2023-06-20T18:24:16.916Z",
        "metadata": {},
        "requestedBy": {
            "firstName": "API",
            "lastName": "User",
            "middleName": "",
            "id": "62c2a4868d3193700828014e"
        }
    }
}
```

### NIN Full Sample Request

This is a sample request that contains all the parameters as described above, all in one call:

```json
{
    "id": "11111111111",
    "premiumNin": true,
    "metadata": {
        "requestId": "1209348756"
    },
    "isSubjectConsent": true,
    "validations": {
        "data": {
            "lastName": "Citizen",
            "firstName": "Proud",
            "dateOfBirth": "1988-04-04"
        },
        "selfie": {
            "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//CABEIAZgCZAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//aAAgBAQAAAABbPVqIdrFJa52jaexpGtEUGEEVCtSYRSYAPLo5v6Q9vR1b914oIQAhXVVUTRQx0BtGmgptam8qoIdSFIaxjlNp6jzBJmIGsDEyM"
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
        "id": "6491ef1a239381781b87a607",
        "address": {
            "town": "SULEJA",
            "lga": "Suleja",
            "state": "Niger",
            "addressLine": "13B Fake Street, Ilupeju Niger State"
        },
        "validations": {
            "data": {
                "lastName": {
                    "validated": false,
                    "value": "Ehichioya"
                },
                "dateOfBirth": {
                    "validated": false,
                    "value": "2000-01-01"
                },
                "firstName": {
                    "validated": false,
                    "value": "Prior"
                }
            },
            "selfie": {
                "selfieVerification": {
                    "confidenceLevel": 49,
                    "threshold": 80,
                    "match": false,
                    "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//CABEIAZgCZAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//aAAgBAQAAAABbPVqIdrFJa52jaexpGtEUGEEVCtSYRSYAPLo5v6Q9vR1b914oIQAhXVVUTRQx0BtGmgptam8qoIdSFIaxjlNp6jzBJmIGsDEyM"
                }
            },
            "validationMessages": "First name does not match, Last name does not match, Date of birth does not match, Provided image does not match ID image"
        },
        "parentId": null,
        "status": "found",
        "reason": null,
        "dataValidation": true,
        "selfieValidation": true,
        "firstName": "Sarah",
        "middleName": "Jane",
        "lastName": "Doe",
        "image": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wCEAAoHBwgHBgoIp3OR/1n/9k=",
        "signature": "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIcSUNDX1BSTEH/9k=",
        "mobile": "08000000000",
        "email": null,
        "birthState": "Edo",
        "nokState": "Niger",
        "religion": "christianity",
        "birthLGA": "Esan West",
        "birthCountry": "nigeria",
        "dateOfBirth": "1988-04-04",
        "isConsent": true,
        "idNumber": "11111111111",
        "businessId": "62c2a4868d319373a6280152",
        "type": "nin",
        "allValidationPassed": false,
        "gender": "f",
        "requestedAt": "2023-06-20T18:25:31.415Z",
        "requestedById": "62c2a4868d3193700828014e",
        "country": "NG",
        "createdAt": "2023-06-20T18:25:31.460Z",
        "lastModifiedAt": "2023-06-20T18:25:31.460Z",
        "metadata": {},
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
