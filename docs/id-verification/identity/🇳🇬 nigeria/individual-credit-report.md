---
title: Individual Credit Report
sidebar_position: 12
---

## Individual Credit Report

Retrieves a Nigerian individual's credit bureau report — account summary, payment history, delinquencies and address history.

You can search three ways: by identifier, by account number, or by consumer name plus date of birth. Send `""` for the fields you are not searching on.

```
POST /api/v1/id-verifications/identity/ng/credit-report
```

Authenticate with your API key (`x-api-key`) or a bearer token.

Requires the `KYC_NG_VERIFY` and `KYC_RESULT_VIEW` permissions.

### Request body

| Name | Type | Description |
|------|------|-------------|
| `id` | String | BVN, mobile number, National ID, Pencom ID, passport or driver's licence. |
| `accountNumber` | String | Search by account number instead. |
| `consumerName` | String | Search by name — pair with `dateOfBirth`. |
| `dateOfBirth` | String | `YYYY-MM-DD`. |
| `enquiryReason`* | String | Why you are running the check, e.g. `borrower_existing_credit`. |
| `isSubjectConsent`* | Boolean | Confirms the subject consented to the check. **Must be `true`.** Rejected before the provider is called, so a `false` costs you nothing. |

Fields marked * are required.

### Example

```json title="Request"
{
  "id": "22471069115",
  "isSubjectConsent": true,
  "enquiryReason": "borrower_existing_credit",
  "consumerName": "",
  "accountNumber": "",
  "dateOfBirth": ""
}
```

```json title="Response"
{
  "status": 200,
  "data": {
    "id": "1496dbce-8237-4a98-8b1b-930afdf9d006",
    "fullName": "",
    "documentType": "NG_CREDIT_REPORT",
    "documentCountry": "NG",
    "documentId": "22471069115",
    "requestAt": "2026-09-04T09:26:13.570Z",
    "requestUpdatedAt": "2026-09-04T09:29:27.433Z",
    "requestedBy": {
      "id": "dcd1e472-2be7-41b3-b812-cdec840225a0",
      "firstName": "sylvernus",
      "lastName": "akubo"
    },
    "type": "ngIndividualCreditReport",
    "email": "",
    "image": "",
    "gender": "",
    "mobile": "",
    "reason": null,
    "status": "found",
    "country": "NG",
    "idNumber": "22471069115",
    "lastName": "",
    "metadata": {},
    "checkType": "ng.credit-report",
    "firstName": "",
    "isConsent": true,
    "middleName": "",
    "dateOfBirth": "",
    "validations": null,
    "addressHistory": [
      {
        "_id": "6a9a8f76e80c8939a90c7f18",
        "address1": null,
        "address2": null,
        "address3": null,
        "address4": null,
        "upDateDate": null,
        "upDateOnDate": null,
        "addressTypeInd": null
      }
    ],
    "dataValidation": false,
    "guarantorCount": [
      {
        "_id": "6a9a8f76e80c8939a90c7f14",
        "accounts": "0",
        "guarantorsSecured": "0"
      }
    ],
    "identityNumber": "22471069115",
    "imageValidation": false,
    "guarantorDetails": [
      {
        "_id": "6a9a8f76e80c8939a90c7f15",
        "guarantorGender": "",
        "guarantorOtherID": "",
        "guarantorAddress1": "",
        "guarantorAddress2": "",
        "guarantorAddress3": "",
        "guarantorPassport": "",
        "guarantorFirstName": "",
        "guarantorOtherName": "",
        "guarantorPENCOMIDNo": "",
        "guarantorDateOfBirth": "",
        "guarantorNationalIDNo": "",
        "guarantorHomeTelephone": "",
        "guarantorworkTelephone": "",
        "guarantorDriverLicenceNo": "",
        "guarantorMobileTelephone": ""
      }
    ],
    "telephoneHistory": [],
    "employmentHistory": [
      {
        "_id": "6a9a8f76e80c8939a90c7f19",
        "occupation": null,
        "upDateDate": null,
        "upDateOnDate": null,
        "employerDetail": null
      }
    ],
    "enquiryHistoryTop": [
      {
        "_id": "6a9a8f76e80c8939a90c7f16",
        "dateRequested": null,
        "enquiryReason": null,
        "subscriberName": null,
        "companyTelephoneNo": null,
        "subscriberEnquiryResultID": null
      }
    ],
    "allValidationPassed": false,
    "creditAccountRating": [
      {
        "_id": "6a9a8f76e80c8939a90c7f05",
        "noOfOtherAccountsBad": "0",
        "noOfOtherAccountsGood": "6",
        "noOfRetailAccountsBad": "0",
        "noOfRetailAccountsGood": "0",
        "noOfTelecomAccountsBad": "0",
        "noOfAutoLoanAccountsBad": "0",
        "noOfAutoLoanccountsGood": "0",
        "noOfHomeLoanAccountsBad": "0",
        "noOfTelecomAccountsGood": "0",
        "noOfHomeLoanAccountsGood": "0",
        "noOfJointLoanAccountsBad": "0",
        "noOfStudyLoanAccountsBad": "0",
        "noOfCreditCardAccountsBad": "0",
        "noOfJointLoanAccountsGood": "0",
        "noOfStudyLoanAccountsGood": "0",
        "noOfCreditCardAccountsGood": "0",
        "noOfPersonalLoanAccountsBad": "0",
        "noOfPersonalLoanAccountsGood": "0"
      }
    ],
    "creditAccountSummary": [
      {
        "_id": "6a9a8f76e80c8939a90c7f04",
        "rating": "118",
        "amountarrear": "0.00",
        "amountarrear1": "0.00",
        "totalAccounts": "7",
        "totalAccounts1": "0",
        "lastJudgementDate": "-",
        "lastJudgementDate1": "-",
        "totalAccountarrear": "2",
        "totalAccountarrear1": "0",
        "totalJudgementAmount": "0",
        "totalOutstandingdebt": "0.00",
        "totalJudgementAmount1": "0",
        "totalOutstandingdebt1": "0.00",
        "lastBouncedChequesDate": null,
        "totalDishonouredAmount": "0.00",
        "totalMonthlyInstalment": "17,205.00",
        "totalNumberofJudgement": "0",
        "lastBouncedChequesDate1": null,
        "totalDishonouredAmount1": "0.00",
        "totalMonthlyInstalment1": "0.00",
        "totalNumberofJudgement1": "0",
        "totalNumberofDishonoured": "0",
        "totalNumberofDishonoured1": "0",
        "totalaccountinBadcondition": "0",
        "totalaccountinGodcondition": "6",
        "totalaccountinGodcondition1": "0",
        "totalaccountinGoodcondition": "6"
      }
    ],
    "deliquencyInformation": [
      {
        "_id": "6a9a8f76e80c8939a90c7f03",
        "accountNo": "",
        "periodNum": "",
        "subscriberName": "",
        "monthsinArrears": ""
      }
    ],
    "identificationHistory": [
      {
        "_id": "6a9a8f76e80c8939a90c7f17",
        "upDateDate": null,
        "upDateOnDate": null,
        "identificationType": null,
        "identificationNumber": null
      }
    ],
    "creditAgreementSummary": [
      {
        "_id": "6a9a8f76e80c8939a90c7f06",
        "currency": "NGN",
        "accountNo": "032SPLG212310004",
        "closedDate": "21/03/2022",
        "loanDuration": "214",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastUpdatedDate": "21/04/2023",
        "instalmentAmount": null,
        "currentBalanceAmt": null,
        "dateAccountOpened": "19/08/2021",
        "openingBalanceAmt": "150,000.00",
        "performanceStatus": "Performing",
        "repaymentFrequency": "We",
        "indicatorDescription": null,
        "currentBalanceDebitInd": null
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f07",
        "currency": "NGN",
        "accountNo": "032SPLI000000088",
        "closedDate": "18/05/2021",
        "loanDuration": "151",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastUpdatedDate": "21/04/2023",
        "instalmentAmount": null,
        "currentBalanceAmt": null,
        "dateAccountOpened": "18/11/2020",
        "openingBalanceAmt": "85,298.25",
        "performanceStatus": "Watchlist",
        "repaymentFrequency": "We",
        "indicatorDescription": null,
        "currentBalanceDebitInd": null
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f08",
        "currency": "NGN",
        "accountNo": "5014734231",
        "closedDate": "04/04/2018",
        "loanDuration": "7",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastUpdatedDate": "30/08/2018",
        "instalmentAmount": "2,406.06",
        "currentBalanceAmt": "0.00",
        "dateAccountOpened": "31/08/2017",
        "openingBalanceAmt": "60,000.00",
        "performanceStatus": "Performing",
        "repaymentFrequency": "Weekly",
        "indicatorDescription": null,
        "currentBalanceDebitInd": null
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f09",
        "currency": "NGN",
        "accountNo": "5015245293",
        "closedDate": "21/11/2018",
        "loanDuration": "7",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastUpdatedDate": "11/01/2019",
        "instalmentAmount": "3,615.23",
        "currentBalanceAmt": "0.00",
        "dateAccountOpened": "17/04/2018",
        "openingBalanceAmt": "90,000.00",
        "performanceStatus": "Performing",
        "repaymentFrequency": "Weekly",
        "indicatorDescription": null,
        "currentBalanceDebitInd": null
      },
      "\u2026"
    ],
    "personalDetailsSummary": [
      {
        "_id": "6a9a8f76e80c8939a90c7f02",
        "gender": "Female",
        "header": "PERSONAL DETAILS SUMMARY: Amos Testi ",
        "surname": "Amos",
        "birthDate": "26/01/1977",
        "firstName": "Testi",
        "otheridNo": "",
        "cellularNo": "",
        "consumerID": "2599049",
        "dependants": "0",
        "otherNames": "",
        "passportNo": null,
        "pencomIDNo": "",
        "nationality": "Nigeria",
        "referenceNo": null,
        "emailAddress": "",
        "nationalIDNo": "",
        "maritalStatus": null,
        "employerDetail": null,
        "postalAddress1": null,
        "postalAddress2": null,
        "postalAddress3": null,
        "postalAddress4": null,
        "homeTelephoneNo": null,
        "workTelephoneNo": null,
        "driversLicenseNo": null,
        "propertyOwnedType": "",
        "bankVerificationNo": "22471069115",
        "residentialAddress1": "College Road Abaro Aladje",
        "residentialAddress2": "Delta",
        "residentialAddress3": "",
        "residentialAddress4": " "
      }
    ],
    "accountMonthlyPaymentHistory": [
      {
        "_id": "6a9a8f76e80c8939a90c7f0d",
        "currency": "NGN",
        "accountNo": "032SPLG212310004",
        "closedDate": "21/03/2022",
        "accountNote": "",
        "loanDuration": "214 Day(s)",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastPaymentDate": null,
        "lastUpdatedDate": "21/04/2023",
        "currentBalanceAmt": null,
        "dateAccountOpened": "19/08/2021",
        "openingBalanceAmt": "150,000.00",
        "performanceStatus": "Performing",
        "subscriberTypeInd": "M",
        "indicatorDescription": null,
        "monthlyInstalmentAmt": null,
        "currentBalanceDebitInd": null,
        "repaymentFrequencyCode": "We"
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f0e",
        "currency": "NGN",
        "accountNo": "032SPLI000000088",
        "closedDate": "18/05/2021",
        "accountNote": "",
        "loanDuration": "151 Day(s)",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastPaymentDate": null,
        "lastUpdatedDate": "21/04/2023",
        "currentBalanceAmt": null,
        "dateAccountOpened": "18/11/2020",
        "openingBalanceAmt": "85,298.25",
        "performanceStatus": "Watchlist",
        "subscriberTypeInd": "M",
        "indicatorDescription": null,
        "monthlyInstalmentAmt": null,
        "currentBalanceDebitInd": null,
        "repaymentFrequencyCode": "We"
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f0f",
        "currency": "NGN",
        "accountNo": "5014734231",
        "closedDate": "04/04/2018",
        "accountNote": "",
        "loanDuration": "7 Day(s)",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastPaymentDate": null,
        "lastUpdatedDate": "30/08/2018",
        "currentBalanceAmt": "2,406.06",
        "dateAccountOpened": "31/08/2017",
        "openingBalanceAmt": "60,000.00",
        "performanceStatus": "Performing",
        "subscriberTypeInd": "M",
        "indicatorDescription": null,
        "monthlyInstalmentAmt": "0.00",
        "currentBalanceDebitInd": null,
        "repaymentFrequencyCode": "Weekly"
      },
      {
        "_id": "6a9a8f76e80c8939a90c7f10",
        "currency": "NGN",
        "accountNo": "5015245293",
        "closedDate": "21/11/2018",
        "accountNote": "",
        "loanDuration": "7 Day(s)",
        "subAccountNo": "",
        "accountStatus": "Closed",
        "amountOverdue": "0.00",
        "subscriberName": "LAPO Microfinance Bank Limited Edo",
        "lastPaymentDate": null,
        "lastUpdatedDate": "11/01/2019",
        "currentBalanceAmt": "3,615.23",
        "dateAccountOpened": "17/04/2018",
        "openingBalanceAmt": "90,000.00",
        "performanceStatus": "Performing",
        "subscriberTypeInd": "M",
        "indicatorDescription": null,
        "monthlyInstalmentAmt": "0.00",
        "currentBalanceDebitInd": null,
        "repaymentFrequencyCode": "Weekly"
      },
      "\u2026"
    ]
  },
  "message": "Successfull!",
  "code": "info"
}
```
