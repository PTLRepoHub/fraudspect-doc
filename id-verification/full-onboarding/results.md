# Results

The output of an API call is provided by our decision engine - an automated evaluation mechanism which helps us reduce the risk of fraud as well as improve customer experience in non-assisted enrollments. There are several logical units of evaluation which need to be considered in terms of decision mechanisms and these units are called Trust Factors.

## Trust Factors

An output consists of (a) Verification (set of "Trust factors" - logical units of the decision engine could result in one out of four possible levels - `HIGH` / `MEDIUM` / `LOW` / `UNAVAILABLE` / `UNKNOWN`) and (b) Decision (summary of Trust Factors providing summarized result). Following Trust Factors might be included in the verification:

| Trust Factor       | Description                                                                                                                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cross Check        | This Trust Factor verifies the consistency and accuracy of different data points within the same document. It ensures that all the information presented on the document, such as names, dates, and other personal details, matches and is internally consistent, which is crucial for detecting alterations or discrepancies in the document itself. |
| Date of Expiration | This Trust Factor checks the expiry date of an identification document to ensure it is still valid. It helps prevent the use of outdated documents in verification processes.                                                     |
| Document Liveness  | Similar to face liveness, document liveness checks aim to verify that the identification document being presented is real and not a forged or digital copy. It helps in combating document fraud.                                |
| Face Liveness      | Face liveness detection is designed to ensure that the individual presenting themselves for verification is physically present and not a photograph, video, or any other form of spoof. This is key in preventing fraud in remote identification processes. |
| Face Verification  | This process involves comparing the face on an ID document with a live image or photo of the person presenting the document. It's used to confirm that the individual holding the document is its rightful owner.                 |
| Field Confidence   | This metric measures the reliability of the data extracted from identification documents. High field confidence indicates that the information, such as names, dates, and other personal details, has been accurately recognized and extracted. |
| MRZ Validity       | The Machine Readable Zone (MRZ) validity check involves verifying the MRZ found on passports and other ID documents. This check ensures that the MRZ is authentic and matches the document's printed information, which is crucial for international verification standards. |

### Decision

Single outcome of the onboarding process. Usually, it is sufficient to operate with this response only, without digging into Verifications.

#### Expected values:

| Decision         | Description                                                                                                           |
|------------------|-----------------------------------------------------------------------------------------------------------------------|
| HIGH (GREEN)     | Onboarding process passed successfully                                                                                |
| MEDIUM (YELLOW)  | Some verifications are suspicious, we recommend implementing additional checks, depending on the business case or customer preferences |
| LOW (RED)        | Onboarding process not passed                                                                                         |

### Verifications

Number of Verifications (Trust Factors) depends on the configuration of the solution, and usually includes verifications like Liveness, Age, Cross- and Face verification checks. Trust Factors that are evaluated can be divided into three main categories; Biometric Trust Factors, Document Trust Factors, and Data Cross Check. Data Cross Check is an internal Trust Factor, and its outputs are fused into the other two Trust Factors on the Customer Dashboard. Each Trust Factor has its own mechanism of capturing possible fraud attacks. Each Trust Factor provides an output (Score). Low scores represent a high likelihood of a fraud attack. Each Trust Factor has a different range of scores, so we have a normalization table for each of them.

#### Expected values:

  | Trust Factor scores | Description                                                                                                                                            |
  |---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
  | HIGH (GREEN)        | Minimum value for successful onboarding with low percentage risk of possible fraud - should be automatically approved                                   |
  | MEDIUM (YELLOW)     | Minimum value for suspicious evaluation - all suspicious cases should be considered for manual review, depending on the business case or customer preferences |
  | LOW (RED)           | Minimum value for negative evaluation which represents high percentage risk of possible fraud - all cases should be considered for automatic rejection  |
  | UNKNOWN             | No value returned, probably due to processing error                                                                                                    |
  | UNAVAILABLE         | No part of the evaluation process. Feature not available for given onboarding application                                                              |
