import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { BundleCribScoreInfo } from "../../../../workflow/bundle/@types/BundleCribScore";

interface CribScoreProps {
  cribScore: BundleCribScoreInfo | null;
}

const CribScore: React.FC<CribScoreProps> = ({ cribScore }) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader icon="feather:alert-triangle" title="Crib Score" />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Score</TableCell>
                <TableCell>Crib Score</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cribScore && (
                <TableRow>
                  <TableCell>{cribScore.cribScoreGrade || ""}</TableCell>
                  <TableCell>{cribScore.cribScoreValue || ""}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CribScore;
