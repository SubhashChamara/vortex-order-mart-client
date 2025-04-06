import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { RelationshipRecommendationInfo } from "../../../../../../workflow/bundle/@types/RelationshipRecommendationInfo";

interface EyeballingPreCheckRecommendationProps {
  relationshipRecommendation: RelationshipRecommendationInfo[];
}

const EyeballingPreCheckRecommendation: React.FC<
  EyeballingPreCheckRecommendationProps
> = ({ relationshipRecommendation }) => {
  return (
    <div className="h-full">
      <Paper className="px-12 pb-10 col-span-2 h-full">
        <Ve3FormHeader
          icon="material-outline:credit_card"
          title="Eyeballing pre-check Recommendation"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                  Customer Category
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                  Match Report
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                  Decision
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                  Recommendation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(relationshipRecommendation &&
                relationshipRecommendation.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.customerCategory || ""}</TableCell>
                    <TableCell>{item.matchName || ""}</TableCell>
                    <TableCell>{item.decision || ""}</TableCell>
                    <TableCell>{item.description || ""}</TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <span>No data available</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default EyeballingPreCheckRecommendation;
