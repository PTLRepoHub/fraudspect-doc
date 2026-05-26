# Transaction Statuses

List of possible transaction statuses and their corresponding ID / ENUMs.

| ID | Status Name                | Type         | Description                                                                                                   |
|----|---------------------------|--------------|---------------------------------------------------------------------------------------------------------------|
| 0  | Created                   | Technical    | Initial status when the transaction is created. This is an intermediate status and should be updated shortly. |
| 1  | Hold                      | Other/Intermediate | The transaction was held due to one of the rules being triggered or the Hold threshold was reached due to multiple rules triggered. |
| 2  | Accepted                  | Final        | No matches were found in the screening database, and none of the rules triggered a hold or reject.            |
| 3  | Rejected                  | Final        | The transaction was rejected due to one of the rules or because the rejection score threshold was exceeded.   |
| 4  | AML Hold                  | Intermediate | The transaction was held due to matches found during screening. It requires manual approval or rejection.     |
| 5  | Under review              | Intermediate | This status is set manually by the AML officer, indicating that the transaction or customer is under due diligence. |
| 6  | Deleted                   | Final        | The transaction was deleted through the API.                                                                  |
| 7  | Checking with Crystal     | Intermediate | This status is for crypto payments only, indicating that the sender/recipient crypto address has been sent to Crystal for verification. |
| 8  | AML Check failed          | Technical    | This is an error status, meaning that the screening could not be conducted due to technical reasons. Please report it if you notice this. |
