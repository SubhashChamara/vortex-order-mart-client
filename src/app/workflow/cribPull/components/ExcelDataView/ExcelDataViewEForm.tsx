import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { CribPullEFormInfo } from "../../@types/CribPullEFormInfo";

interface ExcelDataViewPLLGProps {
  data: CribPullEFormInfo | null;
}

const ExcelDataViewEForm: React.FC<ExcelDataViewPLLGProps> = ({ data }) => {
  const renderTableRow = (label: string, value: string | undefined) => (
    <TableRow>
      <TableCell style={{ fontWeight: "bold" }}>{label}</TableCell>
      <TableCell>{value || ""}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">E-Form</h1>
      </div>
      <TableContainer>
        {data && (
          <Table>
            <TableBody>
              {renderTableRow("FORM ID", data.formId)}
              {renderTableRow("FORM NAME", data.formName)}
              {renderTableRow("FORM VERSION", data.formVersion)}
              {renderTableRow("FORM URL", data.formUrl)}
              {renderTableRow("COUNTRY", data.country)}
              {renderTableRow("TIME ZONE", data.timeZone)}
              {renderTableRow("PRODUCT TYPE", data.productType)}
              {renderTableRow("XSD IDENTIFIER", data.xsdIdentifier)}
              {renderTableRow("STATUS", data.status)}
              {renderTableRow("DELIVERY MODE", data.deliveryMode)}
              {renderTableRow("DATA FORMAT", data.dataFormat)}
              {renderTableRow("EMAIL SUBJECT", data.emailSubject)}
              {renderTableRow("EMAIL FROM", data.emailFrom)}
              {renderTableRow("EMAIL TO", data.emailTo)}
              {renderTableRow("SUBMISSION DETAILS", data.submissionDetails)}
              {renderTableRow(
                "SUBMISSION REFERENCE ID",
                data.submissionReferenceId
              )}
              {renderTableRow("SUBMISSION TIMESTAMP", data.submissionTimeStamp)}
              {renderTableRow(
                "EMAIL DELIVERY TIMESTAMP",
                data.emailDeliveryTimeStamp
              )}
              {renderTableRow("SUBMISSION STATUS", data.submissionStatus)}
              {renderTableRow("PRODUCT APPLIED", data.productApplied)}
              {renderTableRow("TYPE OF LOAN", data.typeOfLoan)}
              {renderTableRow("SOLE OR JOINT", data.soleOrJoint)}
              {renderTableRow("LOAN TENOR", data.loanTenor)}
              {renderTableRow(
                "LOAN AMOUNT IN NUMBERS",
                data.loanAmountInNumbers
              )}
              {renderTableRow("INTEREST RATE", data.interestRate)}
              {renderTableRow("NO OF INSTALLMENTS", data.noOfInstallments)}
              {renderTableRow("PURPOSE OF LOAN", data.purposeOfLoan)}
              {renderTableRow("REPAYMENT METHOD", data.repaymentMethod)}
              {renderTableRow(
                "ACCOUNT LOAN STANDING ORDER",
                data.accountLoanStandingOrder
              )}
              {renderTableRow("FIXED OR FLOATING", data.fixedOrFloating)}
              {renderTableRow("EXISTING CLIENT", data.existingClient)}
              {renderTableRow(
                "ACCOUNT / CARD NO / NIC",
                data.accountOrCardnumberOrNic
              )}
              {renderTableRow("HAS ANY INFO CHANGED", data.hasAnyInfoChanged)}
              {renderTableRow("TYPE OF ACCOUNT", data.typeOfAccount)}
              {renderTableRow(
                "PRODUCT TO SUPPLEMENT LOAN",
                data.productToSupplementLoan
              )}
              {renderTableRow(
                "PRODUCT TO LOOK FOR CASA",
                data.productToLookForCasa
              )}
              {renderTableRow(
                "PRODUCT TO LOOK FOR CC",
                data.productToLookForCC
              )}
              {renderTableRow("TYPE OF PRODUCT", data.typeOfProduct)}
              {renderTableRow("WHERE TO DELIVER", data.whereToDeliver)}
              {renderTableRow(
                "USE STANDARD CHARTERED ACCOUNT TO PAY",
                data.useStandardChartedAccToPay
              )}
              {renderTableRow("PAYMENT ACCOUNT NO", data.paymentAccountNo)}
              {renderTableRow("PAYMENT STRUCTURE", data.paymentStructure)}
              {renderTableRow("FLY SMILES", data.flySmiles)}
              {renderTableRow("CURRENCY", data.currency)}
              {renderTableRow("CATEGORY", data.category)}
              {renderTableRow("EMPLOYEE BANKING", data.employeeBanking)}
              {renderTableRow(
                "PURPOSE OF ACCOUNT OPENING",
                data.purposeOfAccOpening
              )}
              {renderTableRow(
                "INITIAL DEPOSIT AMOUNT",
                data.initialDepositAmount
              )}
              {renderTableRow(
                "INITIAL SOURCE OF DEPOSIT",
                data.initialSourceOfDeposit
              )}
              {renderTableRow("FUNDS RECEIVED BY", data.fundsRecBy)}
              {renderTableRow(
                "ANTICIPATED CREDIT TRANSACTIONS PER MONTH",
                data.anticipatedCreditTransPerMonth
              )}
              {renderTableRow(
                "ANTICIPATED CREDIT AMOUNT PER MONTH",
                data.anticipatedCreditAmountPerMonth
              )}
              {renderTableRow(
                "ANTICIPATED DEBIT TRANSACTIONS PER MONTH",
                data.anticipatedDebitTransPerMonth
              )}
              {renderTableRow(
                "ANTICIPATED DEBIT AMOUNT PER MONTH",
                data.anticipatedDebitAmountPerMonth
              )}
              {renderTableRow("MONTHLY INCOME GROSS", data.monthlyIncomeGross)}
              {renderTableRow("MONTHLY DEDUCTIONS", data.monthlyDeductions)}
              {renderTableRow("SALUTATION TITLE", data.salutationTitle)}
              {renderTableRow("GENDER", data.gender)}
              {renderTableRow("FIRST NAME", data.firstName)}
              {renderTableRow("MIDDLE NAME", data.middleName)}
              {renderTableRow("LAST NAME", data.lastName)}
              {renderTableRow("NAME EMBOSSED ON CARD", data.nameEmbossedOnCard)}
              {renderTableRow("DATE OF BIRTH", data.dateOfBirth)}
              {renderTableRow("ID TYPE", data.idType)}
              {renderTableRow("ID NO", data.idNo)}
              {renderTableRow("ID EXPIRY DATE", data.idExpiryDate)}
              {renderTableRow("MOTHER'S MAIDEN NAME", data.motherMaidenName)}
              {renderTableRow("NATIONALITY", data.nationality)}
              {renderTableRow("VISA NO", data.visaNo)}
              {renderTableRow("VISA EXPIRY DATE", data.visaExpDate)}
              {renderTableRow("PLACE OF BIRTH", data.placeOfBirth)}
              {renderTableRow("DUAL CITIZEN", data.dualCitizen)}
              {renderTableRow("IS US RESIDENT", data.isUSResident)}
              {renderTableRow("IS US CITIZEN", data.isUSCitizen)}
              {renderTableRow("HAS US PR", data.hasUSPR)}
              {renderTableRow("MARITAL STATUS", data.martialStatus)}
              {renderTableRow("SPOUSE NAME", data.spouseName)}
              {renderTableRow("SPOUSE NO", data.spouseNo)}
              {renderTableRow("NO OF DEPENDANT", data.noOfDependant)}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default ExcelDataViewEForm;
