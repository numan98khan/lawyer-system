import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import EditableCellComp from "../../components/EditableCellComp";
import EditableCellSelect from "../../components/EditableCellSelect";

const CustomTableRow = ({
  row,
  workers,
  updateHearing,
  selectedTags
}) => {
    console.log('ROW out', row);
  return (
    <TableRow
        className={`${row.isLast ? "highlightedRow" : ""} `}
        >
        {/* <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.file_n}</TableCell>
        <TableCell align="center">{row.case_n}</TableCell> */}

        {selectedTags.includes("#") && <TableCell align="center">{row.id}</TableCell>}
        {selectedTags.includes("FILE#") && <TableCell align="center">{row.file_n}</TableCell>}
        {selectedTags.includes("CASE#") && <TableCell align="center">{row.case_n}</TableCell>}
        

        {/* <TableCell align="center">{row.court_case_n}</TableCell> */}

        {selectedTags.includes("COURT CASE#") && (row.isLast ? (
            <EditableCellComp
              updateHearing={updateHearing}
              file_n={row.file_n}
              case_n={row.case_n}
              hearing_key={row.key}
              cell={"courtCaseNo"}
              value={row.courtCaseNo || "row.courtCaseNo"}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">
              {row.courtCaseNo}
            </TableCell>
        ))}

        {selectedTags.includes("CASE TITLE") && (row.isLast ? (
            <EditableCellComp
              updateHearing={updateHearing}
              file_n={row.file_n}
              case_n={row.case_n}
              hearing_key={row.key}
              cell={"caseTitle"}
              value={row.litigationCaseTitle || "row.litigationCaseTitle"}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.litigationCaseTitle || "row.litigationCaseTitle"}</TableCell>
        ))}

        {selectedTags.includes("NATURE OF CASE") && (row.isLast ? (
            <EditableCellComp
              updateHearing={updateHearing}
              file_n={row.file_n}
              case_n={row.case_n}
              hearing_key={row.key}
              cell={"subCategory"}
              value={row.natureOfLitigation}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">
              {row.natureOfLitigation}
            </TableCell>
        ))}

        {selectedTags.includes("CATEGORY") && <TableCell align="center">{row?.litigation?.category || 'row.litigation.category'}</TableCell>}

        {selectedTags.includes("COURT") && (row.isLast ? (
            <EditableCellComp
              updateHearing={updateHearing}
              file_n={row.file_n}
              case_n={row.case_n}
              hearing_key={row.key}
              cell={"court"}
              value={row.court}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.court}</TableCell>
        ))}

        {selectedTags.includes("DISTRICT") && (row.isLast ? (
            <EditableCellComp
              updateHearing={updateHearing}
              file_n={row.file_n}
              case_n={row.case_n}
              hearing_key={row.key}
              cell={"district"}
              value={row.district}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.district}</TableCell>
        ))}

        {/* <TableCell align="center">{row.judge}</TableCell> */}
        {selectedTags.includes("JUDGE") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"judge"}
            value={row.judge}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.judge}</TableCell>
        ))}

        {selectedTags.includes("PREVIOUS PROCEEDINGS") && (<TableCell align="center">
            {row.previous_proceedings}
        </TableCell>)}
        {/* <EditableCellComp value={row.} > </EditableCellComp> */}

        {selectedTags.includes("PREVIOUS DATE") && (<TableCell align="center">
            {row.substantiveDateOfLastHearing || 'row.substantiveDateOfLastHearing'}

            {/* {row.previous_proceedings_date} */}
        </TableCell>)}

        {selectedTags.includes("NEXT DATE") && (<TableCell align="center">
            {row.substantiveDateOfNextHearing || 'row.substantiveDateOfNextHearing'}

            {/* {row.next_proceedings_date} */}
        </TableCell>)}

        {selectedTags.includes("NEXT PROCEEDINGS") && (<TableCell align="center">
            {row.next_proceedings}
        </TableCell>)}

        {/* <TableCell align="center">{row.remarks}</TableCell> */}
        {selectedTags.includes("REMARKS") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"remarks"}
            value={row.remarks}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.remarks}</TableCell>
        ))}

        {/* <TableCell align="center">{row.caseSrc}</TableCell> */}

        {selectedTags.includes("CASE OWNER") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"caseowner"}
            value={row.caseowner}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.caseowner}</TableCell>
        ))}

        {/* <TableCell align="center">{row.caseSupervisor}</TableCell> */}
        {selectedTags.includes("CASE SUPERVISOR") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"casesupervisor"}
            // options={workers}
            value={row.casesupervisor}
            ></EditableCellComp>
        ) : (
            <TableCell align="center">
            {workers[row.casesupervisor]}
            </TableCell>
        ))}

        {/* <TableCell align="center">{row.caseWorker}</TableCell> */}
        {selectedTags.includes("CASE WORKER") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"caseWorker"}
            options={workers}
            value={row.worker}
            ></EditableCellComp>
        ) : (
            <TableCell align="center">
            {workers[row.worker]}
            </TableCell>
        ))}

        {/* <TableCell align="center">{row.case_clerk}</TableCell> */}
        {selectedTags.includes("CASE CLERK") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n}
            hearing_key={row.key}
            cell={"caseClerk"}
            value={row.clerk}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.clerk}</TableCell>
        ))}

        {/* <TableCell align="center">{row.other_party}</TableCell> */}
        {selectedTags.includes("OTHER PARTY") && (row.isLast ? (
            <EditableCellComp
            updateHearing={updateHearing}
            file_n={row.file_n}
            case_n={row.case_n} 
            hearing_key={row.key}
            cell={"otherParty"}
            value={row.otherParty}
            >
            {" "}
            </EditableCellComp>
        ) : (
            <TableCell align="center">{row.otherParty}</TableCell>
        ))}

        {selectedTags.includes("UPDATED BY") && (<TableCell align="center">{row.updated_by}</TableCell>)}
    </TableRow>
  );
};

export default CustomTableRow;
