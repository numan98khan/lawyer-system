import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { connect } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Title from "../../components/Title";
import { Fragment } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Field from "../../components/Field";
import DateFnsUtils from "@date-io/date-fns";
import ButtonContainer from "../../components/Button";
import { useHistory } from "react-router-dom";
import { LogIcon } from "../../../src/icons";
import { loadHearings, updateHearing } from "../../actions/hearingActions";
import { loadLogs } from "../../actions/logActions";

import AddPeshiRow from "./AddPeshiRow";

import EditableCellComp from "../../components/EditableCellComp";
import EditableCellSelect from "../../components/EditableCellSelect";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createTheme } from "@material-ui/core";

function Tasks(props) {
  const [searchterm, setsearchterm] = React.useState("");
  const [NoHearings, setNoHearings] = React.useState(true);
  const [timestampSearch, settimestampSearch] = React.useState(true);
  const [filterDate, setdate] = React.useState(new Date());
  const [file_n, setfile_n] = React.useState(-1);
  const [case_n, setcase_n] = React.useState(-1);
  const [workers, setworkers] = React.useState({});

  // const [openEntry, setopenEntry] = React.useState(false)
  // const [entryDetails, setentryDetails] = React.useState([])

  // React.useEffect(() => {});

  const history = useHistory();

  const useStyles = makeStyles({
    table: {
      minWidth: "900px",
    },
  });
  const classes = useStyles();

  React.useEffect(() => {
    let workers = {};
    props.caseworkers.map((worker) => {
      workers[worker.id] = worker.firstName + " " + worker.lastName;
    });
    setworkers(workers);
  }, []);

  React.useEffect(() => {
    var case_number = "";
    var file_number = "";
    [file_number, case_number] = searchterm.split("/");
    if (file_number !== "" && case_number !== undefined) {
      setfile_n(parseInt(file_number, 10));
      setcase_n(parseInt(case_number, 10));
    }
    if (searchterm === "haaaaah") {
      setfile_n(-1);
      setcase_n(-1);
    }
    // console.log(file_n, case_n);
  });

  React.useEffect(() => {
    props.loadHearings();
  }, []);

  React.useEffect(() => {
    let hearings =
      props.hearings &&
      props.hearings.hearings.filter((hearing) => filterHearing(hearing));
    if (hearings.length > 0) {
      setNoHearings(false);
    } else {
      setNoHearings(true);
    }
  });

  function updateHearing(cell, value, key, old_value, case_path) {
    props.updateHearing(cell, value, key, old_value, case_path);
  }

  function openLogSheet(case_path) {
    props.loadLogs(case_path).then(() => {
      history.push({
        pathname: "/logsheet",
        state: { case_path: case_path, keys: workers },
      });
    });
  }

  function getName(clientsList, file) {
    for (var i = 0; i < clientsList.length; i++) {
      if (clientsList[i]["id"] === file.client_id) {
        return (
          clientsList[i.toString()]["title"] +
          " " +
          clientsList[i.toString()]["firstName"]
        );
      }
    }
  }
  function filterHearing(row) {
    {
      if (props.user.user.type === "worker") {
        if (!timestampSearch) {
          console.log(row.caseSupervisor, props.user.user.uid);
          return (
            row.caseSupervisor === props.user.user.uid ||
            row.caseWorker === props.user.user.uid
          );
        }
        return (
          (row.caseSupervisor === props.user.user.uid ||
            row.caseWorker === props.user.user.uid) &&
          row.next_proceedings_date === filterDate.toLocaleDateString("en-US")
        );
      }
      if (!timestampSearch) {
        return true;
      }
      return (
        row.next_proceedings_date === filterDate.toLocaleDateString("en-US")
      );
    }
  }

  return (
    <div className="py-5 pl-4 pr-4">
      <div className="mb-5" style={{ minWidth: "1000px" }}>
        <div style={{ marginBottom: "5%" }}>
          <Title title="HEARINGS" />
        </div>
        <div
          className="bg-light d-flex"
          style={{ height: "100px", padding: "30px" }}
        >
          <div className="d-flex align-items-center justify-content-between align-items-center">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={!timestampSearch}
                margin="normal"
                id="date-picker-dialog"
                // label="Date of birth"
                format="MM/dd/yyyy"
                value={filterDate}
                onChange={(e) => {
                  setdate(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <input
              onChange={(e) => {
                console.log(e.target.checked);
                settimestampSearch(e.target.checked);
              }}
              type="checkbox"
              checked={timestampSearch}
              style={{
                height: "50x",
                width: "50px",
                marginLeft: "10px",
                marginTop: "17px",
              }}
            />
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  FILE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  COURT CASE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE TITLE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  NATURE OF CASE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CATEGORY
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  COURT
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  DISTRICT
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  JUDGE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  PREVIOUS PROCEEDINGS
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  PREVIOUS DATE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  NEXT DATE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  NEXT PROCEEDINGS
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  REMARKS
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE OWNER
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE SUPERVISOR
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE WORKER
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE CLERK
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  OTHER PARTY
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  UPDATED BY
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* show hearings data here
                      Error in code not showing
                    */}
              {!NoHearings &&
                props.hearings &&
                props.hearings.hearings
                  .slice(0)
                  .reverse()
                  .filter((row) => filterHearing(row))
                  .map((row, idx) => {
                    return (
                      <TableRow
                        className={`${row.isLast ? "highlightedRow" : ""} `}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.file_n}</TableCell>
                        <TableCell align="center">{row.case_n}</TableCell>

                        {/* <TableCell align="center">{row.court_case_n}</TableCell> */}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"courtCaseNo"}
                            value={row.courtCaseNo}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">
                            {row.courtCaseNo}
                          </TableCell>
                        )}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseTitle"}
                            value={row.caseTitle}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseTitle}</TableCell>
                        )}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"subCategory"}
                            value={row.subCategory}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">
                            {row.subCategory}
                          </TableCell>
                        )}

                        <TableCell align="center">{row.category}</TableCell>

                        {/* <TableCell align="center">{row.court}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.district}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.judge}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        <TableCell align="center">
                          {row.previous_proceedings}
                        </TableCell>
                        {/* <EditableCellComp value={row.} > </EditableCellComp> */}

                        <TableCell align="center">
                          {row.previous_proceedings_date}
                        </TableCell>
                        <TableCell align="center">
                          {row.next_proceedings_date}
                        </TableCell>
                        <TableCell align="center">
                          {row.next_proceedings}
                        </TableCell>

                        {/* <TableCell align="center">{row.remarks}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.caseSrc}</TableCell> */}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseSrc"}
                            value={row.caseSrc}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseSrc}</TableCell>
                        )}

                        {/* <TableCell align="center">{row.caseSupervisor}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellSelect
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseSupervisor"}
                            options={workers}
                            value={row.caseSupervisor}
                          ></EditableCellSelect>
                        ) : (
                          <TableCell align="center">
                            {workers[row.caseSupervisor]}
                          </TableCell>
                        )}

                        {/* <TableCell align="center">{row.caseWorker}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellSelect
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseWorker"}
                            options={workers}
                            value={row.caseWorker}
                          ></EditableCellSelect>
                        ) : (
                          <TableCell align="center">
                            {workers[row.caseWorker]}
                          </TableCell>
                        )}

                        {/* <TableCell align="center">{row.case_clerk}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseClerk"}
                            value={row.caseClerk}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseClerk}</TableCell>
                        )}

                        {/* <TableCell align="center">{row.other_party}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        <TableCell align="center">{row.updated_by}</TableCell>
                      </TableRow>
                    );
                    // }
                  })}
              <AddPeshiRow />
            </TableBody>
          </Table>
        </TableContainer>
        {!props.hearings.isLoading && NoHearings && (
          <div className="display-4 text-center bg-light">
            NO HEARINGS TO SHOW
          </div>
        )}

        {/* <TableContainer
          style={{ marginTop: "20px" }}
          className="bg-light shadow rounded"
        >
          <Table>
            <TableBody>
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
      <TextField
        className="mb-4"
        style={{ minWidth: "400px" }}
        color="primary"
        id="outlined-basic"
        label="Quick search cases"
        placeholder="File number/case number"
        variant="outlined"
        value={searchterm}
        onChange={(query) => {
          setsearchterm(query.target.value.toLowerCase());
          if (query.target.value.length < 1) {
            setfile_n(-1);
            setcase_n(-1);
          }
        }}
      />

      <div className="search-results">
        {Object.keys(props.cases.files)
          .filter((file_key) => {
            if (file_n > -1) {
              return file_key === file_n.toString();
            } else {
              return true;
            }
          })
          .map((file_key, idx) => {
            console.log(props.cases.files[file_key]);
            return (
              <Fragment key={idx}>
                <List style={{ minWidth: "1000px" }}>
                  {Object.keys(props.cases.files[file_key]["cases"])
                    .filter((key, index) => {
                      if (case_n > -1) {
                        return key === case_n.toString();
                      } else {
                        return true;
                      }
                    })
                    .map(function(key, index) {
                      return (
                        <div key={index}>
                          <ListItem
                            // file["cases"][key].caseTitle
                            alignItems="flex-start"
                          >
                            <ListItemText
                              primary={
                                props.cases.files[file_key]["cases"][key]
                                  .caseTitle
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    // className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {getName(
                                      props.client.clients,
                                      props.cases.files[file_key]
                                    )}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    // className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {" — "} {file_key}
                                    {" — "} {key}
                                  </Typography>
                                </React.Fragment>
                              }
                            />

                            <ListItemSecondaryAction>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                }}
                                onClick={() =>
                                  // alert("Hello!")

                                  openLogSheet(idx + "/" + key)
                                }
                              >
                                <LogIcon></LogIcon>
                              </button>
                              {/* <IconButton edge="end" aria-label="delete" onClick={
                                    ()=>{
                                      // file["cases"][key]["file_n"] = file["id"]
                                      // file["cases"][key]["case_n"] = key
                                      // setentryDetails(file["cases"][key])
                                      // setopenEntry(true)
                                    }
                                    }>
                                    <CreateIcon />
                                  </IconButton> */}
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider
                            // variant="inset"
                            component="li"
                          />
                        </div>
                      );
                    })}
                </List>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  hearings: state.hearing,
  cases: state.cases,
  client: state.client,
  caseworkers: state.caseworker.caseWorkers,
});
export default connect(mapStateToProps, {
  loadHearings,
  loadLogs,
  updateHearing,
})(Tasks);

// <Paper elevation={3} >

//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>





<TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  FILE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  COURT CASE#
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CASE TITLE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  NATURE OF CASE
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    backgroundColor: "var(--mainPurple)",
                  }}
                >
                  CATEGORY
                </TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {/* show hearings data here
                      Error in code not showing
                    */}
              {!NoHearings &&
                props.hearings &&
                props.hearings.hearings
                  .slice(0)
                  .reverse()
                  .filter((row) => filterHearing(row))
                  .map((row, idx) => {
                    return (
                      <TableRow
                        className={`${row.isLast ? "highlightedRow" : ""} `}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.file_n}</TableCell>
                        <TableCell align="center">{row.case_n}</TableCell>

                        {/* <TableCell align="center">{row.court_case_n}</TableCell> */}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"courtCaseNo"}
                            value={row.courtCaseNo}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">
                            {row.courtCaseNo}
                          </TableCell>
                        )}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseTitle"}
                            value={row.caseTitle}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseTitle}</TableCell>
                        )}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"subCategory"}
                            value={row.subCategory}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">
                            {row.subCategory}
                          </TableCell>
                        )}

                        <TableCell align="center">{row.category}</TableCell>

                        {/* <TableCell align="center">{row.court}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.district}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.judge}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        <TableCell align="center">
                          {row.previous_proceedings}
                        </TableCell>
                        {/* <EditableCellComp value={row.} > </EditableCellComp> */}

                        <TableCell align="center">
                          {row.previous_proceedings_date}
                        </TableCell>
                        <TableCell align="center">
                          {row.next_proceedings_date}
                        </TableCell>
                        <TableCell align="center">
                          {row.next_proceedings}
                        </TableCell>

                        {/* <TableCell align="center">{row.remarks}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        {/* <TableCell align="center">{row.caseSrc}</TableCell> */}

                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseSrc"}
                            value={row.caseSrc}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseSrc}</TableCell>
                        )}

                        {/* <TableCell align="center">{row.caseSupervisor}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellSelect
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseSupervisor"}
                            options={workers}
                            value={row.caseSupervisor}
                          ></EditableCellSelect>
                        ) : (
                          <TableCell align="center">
                            {workers[row.caseSupervisor]}
                          </TableCell>
                        )}

                        {/* <TableCell align="center">{row.caseWorker}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellSelect
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseWorker"}
                            options={workers}
                            value={row.caseWorker}
                          ></EditableCellSelect>
                        ) : (
                          <TableCell align="center">
                            {workers[row.caseWorker]}
                          </TableCell>
                        )}

                        {/* <TableCell align="center">{row.case_clerk}</TableCell> */}
                        {row.isLast ? (
                          <EditableCellComp
                            updateHearing={updateHearing}
                            file_n={row.file_n}
                            case_n={row.case_n}
                            hearing_key={row.key}
                            cell={"caseClerk"}
                            value={row.caseClerk}
                          >
                            {" "}
                          </EditableCellComp>
                        ) : (
                          <TableCell align="center">{row.caseClerk}</TableCell>
                        )}

                        {/* <TableCell align="center">{row.other_party}</TableCell> */}
                        {row.isLast ? (
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
                        )}

                        <TableCell align="center">{row.updated_by}</TableCell>
                      </TableRow>
                    );
                    // }
                  })}
              <AddPeshiRow />
            </TableBody>
          </Table>
        </TableContainer>