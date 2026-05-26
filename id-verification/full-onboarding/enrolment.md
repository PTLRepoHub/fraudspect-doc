# Enrolment

## Redirect to Web Enrolment 
After successfully creating a session you should have a valid sessionId and webEnrolmentUrl.

You may initiate a HTTP redirect action for your client to the provided URL, for example:

- `<baseUrl>/id-verification/enrolment?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJhZDkwYzgyMS1lNWVhLTQzODUtYmU1Yi00ZmM5ZjllYTI0ZWU iLCJjdXN0b21lciI6IjEyZjUwMjM1LWFkNmYtNDVmNi1iOGM1LTE2ZGM1N2QwOTI1MyIsIm5iZiI6MTY0Mzk3NDMyMywiZXhwIjoxNjQzOTc3OTIzfQ.t5zU`

![Web enrolment](./img/web-enrolment.png)

The number of steps depends on the configuration; the standard configuration is a document capture followed by a face capture. After completion of these steps, the user is redirected to the URL defined in returnUrl attribute earlier.

## Direct Processing

If you choose to use your own image capture solution, feel free to bypass the steps mentioned above and move straight to the endpoints detailed in the following section. This allows you to integrate your existing system seamlessly with our service.

### Document

Send a HTTP POST request to:

`/api/v1/id-verifications/enrolment/document`

The following parameters are used for requests and responses:

| Parameter | Direction | Description |
| --------- | --------- | ----------- |
| imageBase | request   | onboarded person document, Base64 format or URL link to it |
| sessionId | request   | sessionId of an already created   |
| hasError  | response  | true if there was an error, false if the result is ok |
| error     | response  | optional, available if hasError= true. Error description |
| isTwoSideDocument | response | true if document has 2 sides (ID card, driver license), false if it is not (passport) |
| pageSide  | response  | FRONT or BACK |
| country   | response  | ISO 3166 Alpha-3 country code |
| type      | response  | document type, IDENTITY_CARD, PASSPORT etc. |

If you scan two sides document, you should call this endpoint twice, one call per each side - it is important to start with a front side!


#### List of errors

| Error                    | Description |
| ------------------------ | ----------- |
| DOCUMENT_NOT_RECOGNIZED  | The document image submitted could not be recognized by the API. |
| FACE_QUALITY_LOW         | The quality of the face (on the document) in the image is too low for reliable recognition. |
| INTERNAL_ERROR           | An internal error occurred while processing the submitted document image. |
| SESSION_ALREADY_COMPLETED | The session has already been completed and cannot be reused. |
| WRONG_SIDE               | The wrong side of the document has been submitted to the API. |

**Request:**

```json
{
  "sessionId": "ad90c821-e5ea-4385-be5b-4fc9f9ea24ee",
  "imageBase": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr"
}
```

**Response:**

```json
{
  "hasError": false,
  "isTwoSideDocument": true,
  "pageSide": "FRONT",
  "country": "SVK",
  "type": "IDENTITY_CARD"
}
```

**Example:**

```sh
curl -X POST "https://<domain name>/api/v1/id-verifications/enrolment/document" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiasIn
f5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYmMiLCJ0ZW5hbnQiO
iJkb2NzIiwibmJmIjoxNjY2MjcwNjY1LCJleHAiOjE2NjYyNzQyNjV9.Y4rxrcFYf4nJ6aR3VII7rkPfX69JTKcDVyTDRPgON1w" -H "Content-Type: application/json" -d "{\"imageBase\":\"/9j/4Rd1RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAA
UAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAiAAAAcgEyAAIAAAAUAAAAlI...\""
```

### Face 

Send a HTTP POST request to:

`/api/v1/id-verifications/enrolment/face`

The following parameters are used for requests and responses:

| Parameter | Direction | Description |
| --------- | --------- | ----------- |
| imageBase | request   | onboarded person photo, Base64 format or URL link to it |
| sessionId | request   | sessionId of an already created   |
| hasError  | response  | true if there was an error, false if the result is ok |
| error     | response  | optional, available if hasError= true. Error description |

#### List of errors

| Error                    | Description |
| ------------------------ | ----------- |
| FACE_ANGLE_TOO_LARGE     | Yaw/pitch/roll angle is too big |
| FACE_CLOSE_TO_BORDER     | Face too close to border, face to be placed in the middle of the image |
| FACE_CROPPED             | Part of the face is not visible |
| FACE_IS_OCCLUDED         | Part of the face is covered by some object |
| FACE_NOT_FOUND           | Face not detected |
| FACE_TOO_CLOSE           | Face too close, distance to be increased |
| FACE_TOO_SMALL           | Face too close, distance to be decreased |
| SESSION_ALREADY_COMPLETED | The session has already been completed and cannot be reused. |
| TOO_MANY_FACES           | More than one face on the image |

**Request:**

```json
{
  "sessionId": "ad90c821-e5ea-4385-be5b-4fc9f9ea24ee",
  "imageBase": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr"
}
```

**Response:**

```json
{
  "hasError": false
}
```

**Example:**

```sh
curl -X POST "https://<domain name>/api/v1/id-verifications/enrolment/face" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiasInf5c
CI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYmMiLC
J0ZW5hbnQiOiJkb2NzIiwibmJmIjoxNjY2MjcwNjY1LCJleHAiOjE2NjYyNzQyNjV9.Y4rxrcFYf4nJ6aR3VII7rkPfX69JTKcDVyTDRPgON1w" -H "Content-Type: application/json" -d "{\"imageBase\":\"/9j/4Rd1RXhpZgAATU0AKgAAAAgABwESA
AMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAiAAAAcgEyAAIAAAAUAAAAl\""
```

### Complete

To notify API about the end of the session. Endpoint requires a JWT in header (Authorization: Bearer).

Send a HTTP POST request to:

`/api/v1/id-verifications/enrolment/complete`

The following parameters are used for requests and responses:

| Parameter           | Direction | Description |
| ------------------- | --------- | ----------- |
| customerReturnUrl   | response  | custom page to be displayed by the client solution after completion of the onboarding process |
| sessionId | request   | sessionId of an already created   |

#### List of errors

| Error                    | Description |
| ------------------------ | ----------- |
| INTERNAL_ERROR           | An internal error occurred while processing the session. |
| MISSING_DOCUMENT_AND_FACE | No selfie and/or ID document images were provided in previous calls. These images are required for the operation to proceed. |
| SESSION_ALREADY_COMPLETED | The session has already been completed and cannot be reused. |

**Response:**

```json
{
  "sessionId": "ad90c821-e5ea-4385-be5b-4fc9f9ea24ee",
  "customerReturnUrl": "https://www.customer-sample.com/end-of-session/"
}
```

**Example:**

```sh
curl -X POST "https://<domain name>/api/v1/id-verifications/enrolment/complete" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsI
nR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI0ZmE4NWY2NC01NzE3LTQ1NjItYjNmYy00Yzk2d2
Y2NmFmYTYiLCJ0ZW5hbnQiOiJkb2NzIiwibmJmIjoxNjY2MjgwNDY0LCJleHAiOjE2NjYyODQwNjR9.teoXFWRwlghDSvlGTS9QpA3pl6FF_Yjne3uS2BWgklc" -d ""
```
