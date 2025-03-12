---
title: Data
sidebar_position: 4
---

The output of an API call is provided by our decision engine - an automated evaluation mechanism which helps us reduce the risk of fraud as well as improving customer experience in non-assisted enrollments. There are several logical units of evaluation which need to be considered in terms of decision mechanisms and these units are called Trust Factors.

## Session Status

To retrieve a status of the session. Very important endpoint to get information about the session to check if 
- it is being processed still (`PENDING`) and it is not possible to get results of it yet. If the transaction wasn’t finished and session validity (default value is 14 days) is expired, the endpoint will return `EXPIRED` status. 
- Additional actions are required after initial processing (WAITING_FOR_MANUAL_APPROVE); it is possible to retrieve transaction results from all endpoints below (`AUTO_APPROVED`, `MANUAL_APPROVED`, `AUTO_REJECTED`, `MANUAL_REJECTED`). 
  
It is recommended to keep a 1-minute interval for all status requests.

**Properties** | **Description**
--- | ---
status | transaction status

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/status`

#### Response
```json
{
  "status": "AUTO_REJECTED"
}
```

## Data Retrieval

When the end user completes the enrolment you can request data and status of the enrolment. 

Every request except Session List must contain sessionId in URL: `{sessionId}`.

#### Use cases

**Use case** | **Description** | **Endpoint**
--- | --- | ---
Decision Results | retrieve verification score and trust factors scores of the onboarding process | `GET /decision/results`
Document Result | retrieve document attributes (OCR, images, MRZ parsing) | GET `/document/result`
Face Result | retrieve face (selfie) properties | `GET /face/result`
Images | retrieve list of available images | `GET /images`
Image Download | download image | `GET /image/{imageName}`
Session List | list of all sessions | `GET /session/list/`
Session Status | current status of the specific session | `GET /{sessionId}/status`
Data Deletion | delete session with all data | `DELETE /{sessionId}`

### Decision Results

To retrieve verification score and trust factors scores. Contains 2 properties:

**Property** | **Description**
--- | ---
verifications | List of Trust Factors scores (each contains score/level pair)
decision | Main output of whole process, contains score/level pair

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/decision/results`

Interpretation of these properties is described in Trust Factors section.

#### Response
```json
{
  "verifications": {
    "dateOfExpiration": {
      "score": 100,
      "level": "HIGH"
    },
    "documentLiveness": {
      "score": 99,
      "level": "HIGH"
    },
    "faceVerification": {
      "score": 71,
      "level": "HIGH"
    },
    "mrzOcrCrossCheck": {
      "fields": [
        {
          "inputFieldName": "firstName",
          "ocrTextValue": "John",
          "mrzTextValue": "John",
          "distance": 0,
          "score": 100
        },
        {
          "inputFieldName": "lastName",
          "ocrTextValue": "Doe",
          "mrzTextValue": "Doe",
          "distance": 0,
          "score": 100
        }
      ],
      "score": 100,
      "level": "HIGH"
    },
    "overallOcrFieldsConfidence": {
      "score": 98,
      "level": "HIGH"
    },
    "passiveLiveness": {
      "score": 97,
      "level": "HIGH"
    },
    "mrzValidity": {
      "score": 100,
      "level": "HIGH"
    }
  },
  "decision": {
    "score": 94,
    "level": "HIGH"
  }
}
```

### Document Result

To retrieve document OCR results & MRZ data:

**Properties** | **Description**
--- | ---
availableImages | list of parsed document images
applicant | This field represents general information about the document holder, extracted from the best combination of various sources on an identity document, such as the MRZ, VIZ, or barcode.
applicant/dateOfBirth | This field specifies the date of birth (ISO 8601 format) of the document holder. It is a crucial piece of information for age verification.
applicant/firstName | This field contains the first name or given name of the document holder. All the letters are in uppercase.
applicant/lastName | This field includes the last name or family name of the document holder. All the letters are in uppercase.
applicant/surnameAndGivenNames | This field combines the surname (last name) and given names (first and middle names, if any) of the document holder. This comprehensive field is useful for full name verification. All the letters are in uppercase.
country | document country code, ISO 3166 Alpha-3 country code
documentBarcodeResults | parsed barcode fields (if barcode presents)
documentMrzResults | parsed MRZ fields (if MRZ presents)
documentReleaseYear | denotes the year in which the particular model of the identification document was first issued. This field is critical to distinguish features that are available or not available on specific releases of the same type of document.
documentType | document type, PASSPORT, DRIVER_LICENSE etc.
documentVisualResults | represents the visual attributes of an identification document. This includes data like document number, sex and other visual elements that are essential for verifying the authenticity of the document.

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/document/result`

#### Response
```json
{
  "country": "SVK",
  "documentType": "IDENTITY_CARD",
  "documentReleaseYear": "2018",
  "applicant": {
    "firstName": "JOHN",
    "lastName": "DOE",
    "dateOfBirth": "1991-01-01",
    "surnameAndGivenNames": "DOE JOHN"
  },
  "documentVisualResults": [
    {
      "name": "authority",
      "value": "Main Passport Office, Dublin",
      "confidence": 90,
      "pageSide": "BACK"
    },
    {
      "name": "date_of_issue",
      "normalizedDateValue": "2018-08-01T00:00:00",
      "value": "2018-08-01",
      "confidence": 90,
      "pageSide": "BACK"
    },
    {
      "name": "height",
      "value": "175 cm",
      "confidence": 100,
      "pageSide": "BACK"
    },
    {
      "name": "sex",
      "value": "M",
      "confidence": 100,
      "pageSide": "BACK"
    },
    {
      "name": "date_of_birth",
      "normalizedDateValue": "1991-01-01T00:00:00",
      "value": "1991-01-01",
      "confidence": 100,
      "pageSide": "FRONT"
    },
    {
      "name": "date_of_expiry",
      "normalizedDateValue": "2023-08-01T00:00:00",
      "value": "2023-08-01",
      "confidence": 90,
      "pageSide": "FRONT"
    },
    {
      "name": "document_number",
      "value": "PA2219234",
      "confidence": 90,
      "pageSide": "FRONT"
    },
    {
      "name": "given_name",
      "value": "JOHN",
      "confidence": 100,
      "pageSide": "FRONT"
    },
    {
      "name": "nationality",
      "value": "LATVIJAS",
      "confidence": 91,
      "pageSide": "FRONT"
    },
    {
      "name": "personal_number",
      "value": "01019111111",
      "confidence": 100,
      "pageSide": "FRONT"
    },
    {
      "name": "surname",
      "value": "DOE",
      "confidence": 95,
      "pageSide": "FRONT"
    }
  ],
  "documentMrzResults": [
    {
      "name": "composite_check_digit",
      "value": "1"
    },
    {
      "name": "date_of_birth",
      "value": "1991-01-01"
    },
    {
      "name": "date_of_birth_check_digit",
      "value": "2"
    },
    {
      "name": "date_of_expiry",
      "value": "2023-08-01"
    },
    {
      "name": "date_of_expiry_check_digit",
      "value": "6"
    },
    {
      "name": "document_code",
      "value": "I"
    },
    {
      "name": "document_number",
      "value": "PA2219234"
    },
    {
      "name": "document_number_check_digit",
      "value": "4"
    },
    {
      "name": "full_string",
      "value": "I<IRLPA22197234010191<11102<<<^9103122M2308146IRL<<<<<<<<<<<1^DOE<<<<<<<<JOHN<<<<<<<<<<<<<<<"
    },
    {
      "name": "issuing_state_or_organization",
      "value": "IRL"
    },
    {
      "name": "mrz_type",
      "value": "ID-1"
    },
    {
      "name": "nationality",
      "value": "IRL"
    },
    {
      "name": "personal_number_or_optional_data",
      "value": "01019111111"
    },
    {
      "name": "primary_identifier",
      "value": "JOHN"
    },
    {
      "name": "secondary_identifier",
      "value": "DOE"
    },
    {
      "name": "sex",
      "value": "M"
    }
  ],
  "documentBarcodeResults": [
    {
      "name": "sex",
      "value": "M"
    },
    {
      "name": "document_code",
      "value": "03"
    },
    {
      "name": "secondary_identifier",
      "value": "DOE"
    },
    {
      "name": "date_of_birth",
      "value": "1991-01-01"
    },
    {
      "name": "document_number",
      "value": "PA2219234"
    },
    {
      "name": "primary_identifier",
      "value": "JOHN"
    }
  ],
  "availableImages": [
    "primary_face",
    "signature",
    "original_normalized_BACK",
    "original_normalized_FRONT"
  ]
}
```

### Face Result

To retrieve face (selfie) properties.

**Properties** | **Description**
--- | ---
passiveLivenessScore | the face attribute for evaluating the passive liveness score of a face. Passive liveness score values are within the interval [0,100]. Values between 0 and 50 indicate ‘face not live’, values over 50 indicate face live
verificationScore | result of document image and selfie comparison within the interval [0;100]. Values between 0 and 50 indicate ‘no match’, values over 50 indicate ‘match’
availableImages | list of face images

`/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/face/result`

#### Response
```json
{
  "age": 34,
  "gender": -10000,
  "passiveLivenessScore": 100,
  "verificationScore": 92,
  "availableImages": [
    "face_cropped"
  ]
}
```

### Images

Retrieve list of available images taken during onboarding process.

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/images`

**Properties** | **Description**
--- | ---
document | list of document images, usually contains images of the whole document, face image; sometimes additional images like signature, QR code, etc.
face | list of face images, usually contains original and cropped images

#### Response
```json
{
  "document": [
    "primary_face",
    "original_normalized_FRONT",
    "original_normalized_BACK"
  ],
  "face": [
    "face_cropped"
  ]
}
```

### Image Download

Download a specific image taken during onboarding process and available as a line in Images endpoint.

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c/images/primary_face`

In response, content type will be image/jpeg:

```
content-length: 61505
content-type: image/jpeg
```

### Session List

To retrieve a list of all sessions. Contains the following input parameters:

**Properties** | **Description**
--- | ---
pageNumber | number of the page
pageSize | size of the page, i.e. maximal number of records in response
totalRecords | number of records in specific page, usually equal to pageSize, but for the last page will return a smaller number
data | set of session attributes
data/id | sessionId
data/createdDateUtc | session creation time in UTC
data/expiryDateUtc | session expiry date. Just created session is limited in time, default value is 1 hour, UTC format
data/documentType | document type, PASSPORT, DRIVER_LICENSE etc.
data/verificationStatus | verification status
data/completedDateUtc | session completion date, UTC format
data/country | document country code, ISO 3166 Alpha-3 country code

- `/api/v1/id-verifications/data/session/list`

#### Response
```json
{
  "pageNumber": 1,
  "pageSize": 10,
  "totalRecords": 1,
  "data": [
    {
      "id": "4fa85f64-5717-4562-b3fc-4c963f66afa6",
      "createdDateUtc": "2022-10-20T15:41:04.5605519+00:00",
      "expiryDateUtc": "2022-10-20T16:41:04.5585871+00:00",
      "documentType": "PASSPORT",
      "verificationStatus": "AUTO_REJECTED",
      "completedDateUtc": "2022-10-20T15:42:41.1875114+00:00",
      "country": "UKR"
    }
  ]
}
```

## Data Deletion

Delete onboarding data belonging to you. This endpoint removes all person data including photos (document, face), parsed document information, trust factors, scores etc.

The API currently supports basic authentication.


Send an HTTP DELETE request to:

- `/api/v1/id-verifications/data/fa389839-d740-42cc-ab31-f1cc1804992c`

No input properties for this endpoint.

