import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { CribPullPLCardInfo } from "../../@types/CribPullPLCardInfo";

interface ExcelDataViewPLLGProps {
  data: CribPullPLCardInfo | null;
}

const ExcelDataViewPLCD: React.FC<ExcelDataViewPLLGProps> = ({ data }) => {
  return (
    <div>
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">PL-Lead</h1>
      </div>
      <TableContainer>
        {data && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>FORM ID</TableCell>
                <TableCell>{data.formId || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>FORM NAME</TableCell>
                <TableCell>{data.formName || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  FORM VERSION
                </TableCell>
                <TableCell>{data.formVersion || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>FORM URL</TableCell>
                <TableCell>{data.formUrl || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>COUNTRY</TableCell>
                <TableCell>{data.country || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>TIME ZONE</TableCell>
                <TableCell>{data.timeZone || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  PRODUCT TYPE
                </TableCell>
                <TableCell>{data.productType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  XSD IDENTIFIER
                </TableCell>
                <TableCell>{data.xsdIdentifier || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>STATUS</TableCell>
                <TableCell>{data.status || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  DELIVERY MODE
                </TableCell>
                <TableCell>{data.deliveryMode || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  DATA FORMAT
                </TableCell>
                <TableCell>{data.dataFormat || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  EMAIL SUBJECT
                </TableCell>
                <TableCell>{data.emailSubject || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>EMAIL FROM</TableCell>
                <TableCell>{data.emailFrom || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>EMAIL TO</TableCell>
                <TableCell>{data.emailTo || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  SUBMISSION DETAILS
                </TableCell>
                <TableCell>{data.submissionDetails || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  SUBMISSION REFERENCE ID
                </TableCell>
                <TableCell>{data.submissionReferenceId || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  SUBMISSION TIMESTAMP
                </TableCell>
                <TableCell>{data.submissionTimeStamp || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  EMAIL DELIVERY TIMESTAMP
                </TableCell>
                <TableCell>{data.emailDeliveryTimeStamp || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  SUBMISSION STATUS
                </TableCell>
                <TableCell>{data.submissionStatus || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>SALUTATION</TableCell>
                <TableCell>{data.salutation || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>FULL NAME</TableCell>
                <TableCell>{data.fullName || ""}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID VALUE</TableCell>
              <TableCell>{data.idValue || ""}</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID TYPE</TableCell>
                <TableCell>{data.idType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID NO</TableCell>
                <TableCell>{data.idValue || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>PHONE</TableCell>
                <TableCell>{data.mobilePhone || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>EMAIL</TableCell>
                <TableCell>{data.email || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>CITY</TableCell>
                <TableCell>{data.city || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  NATIONALITY
                </TableCell>
                <TableCell>{data.nationality || ""}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                PREFERRED BRANCH
              </TableCell>
              <TableCell>{data. || ""}</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  MONTHLY INCOME
                </TableCell>
                <TableCell>{data.monthlyIncome || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  ARE YOU SALARIED?
                </TableCell>
                <TableCell>{data.salaried || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  EMPLOYER NAME
                </TableCell>
                <TableCell>{data.employerName || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  NATURE OF BUSINESS
                </TableCell>
                <TableCell>{data.natureOfBusiness || ""}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                EXPERIENCE IN YEARS
              </TableCell>
              <TableCell>{data || ""}</TableCell>
            </TableRow> */}
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                DESIRED LOAN AMOUNT
              </TableCell>
              <TableCell>{data.desired || ""}</TableCell>
            </TableRow> */}
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>LOAN TENOR</TableCell>
              <TableCell>{data.loanTenor || ""}</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>TYPE</TableCell>
                <TableCell>{data.type || ""}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                REQUESTOR COUNTRY
              </TableCell>
              <TableCell>{data.requestorCountry || ""}</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>PRODUCT ID</TableCell>
                <TableCell>{data.productId || ""}</TableCell>
              </TableRow>
              {/* <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>BROWSER</TableCell>
              <TableCell>{data.browser || ""}</TableCell>
            </TableRow> */}
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  SUB CHANNEL CODE
                </TableCell>
                <TableCell>{data.subChannelCode || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  DESIGNATION
                </TableCell>
                <TableCell>{data.designation || ""}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default ExcelDataViewPLCD;
