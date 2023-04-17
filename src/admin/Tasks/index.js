import React, { Component, useState } from "react";
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

import Grid from "@material-ui/core/Grid";


import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { jsPDF } from 'jspdf';

import AddPeshiRow from "./AddPeshiRow";

import EditableCellComp from "../../components/EditableCellComp";
import EditableCellSelect from "../../components/EditableCellSelect";

import CustomTableRow from "./CustomTableRow";

import "jspdf-autotable";


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createTheme } from "@material-ui/core";

import ColumnSelect from "./ColumnSelect"

// var jsPDF = require('jspdf');
// require('jspdf-autotable');


const filterValues = [
  {
    name: "CASE WORKER",
    value: "worker",
  },
  {
    name: "CASE CLERK",
    value: "clerk",
  },
  {
    name: "Case Supervisor",
    value: "caseSupervisor",
  }
];

const columnKeyMapping = {
  "#": "id",
  "FILE#": "file_number",
  "CASE#": "case_number",
  "COURT CASE#": "courtCaseNo",
  "CASE TITLE": "litigationCaseTitle",
  "NATURE OF CASE": "natureOfLitigation",
  "CATEGORY": "litigation.category",
  "COURT": "court",
  "DISTRICT": "district",
  "JUDGE": "judge",
  "PREVIOUS PROCEEDINGS": "previous_proceedings",
  "PREVIOUS DATE": "previous_proceedings_date",
  "NEXT DATE": "next_proceedings_date",
  "NEXT PROCEEDINGS": "next_proceedings",
  "REMARKS": "legalAnalysis",
  "CASE OWNER": "clientId",
  "CASE SUPERVISOR": "contactPerson.name",
  "CASE WORKER": "worker",
  "CASE CLERK": "clerk",
  "OTHER PARTY": "otherPartyDetails.partyName",
  "UPDATED BY": "updated_by"
};

const hearingTableHeaders = [
  "#", 
  "FILE#", 
  "CASE#", 
  "COURT CASE#", 
  "CASE TITLE", 
  "NATURE OF CASE", 
  "CATEGORY", 
  "COURT",
  "DISTRICT",
  "JUDGE",
  "PREVIOUS PROCEEDINGS",
  "PREVIOUS DATE",
  "NEXT DATE",
  "NEXT PROCEEDINGS",
  "REMARKS",  
  "CASE OWNER",
  "CASE SUPERVISOR",
  "CASE WORKER",
  "CASE CLERK",
  "OTHER PARTY",
  "UPDATED BY"];

function Tasks(props) {
  const [searchterm, setsearchterm] = React.useState("");
  const [NoHearings, setNoHearings] = React.useState(true);
  const [timestampSearch, settimestampSearch] = React.useState(false);
  
  const [filterDate, setdate] = React.useState(new Date());
  const [filterDateTo, setdateTo] = React.useState(new Date());
  
  const [file_n, setfile_n] = React.useState(-1);
  const [case_n, setcase_n] = React.useState(-1);
  const [workers, setworkers] = React.useState({});

  const [searchTerm, setSearchTerm] = React.useState(null);
  const [searchFilter, setSearchFilter] = React.useState(null);

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
    // props.caseworkers.map((worker) => {
    //   workers[worker.id] = worker.firstName + " " + worker.lastName;
    // });
    // setworkers(workers);
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
        state: { 
          case_path: case_path, 
          // keys: workers 
        },
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

  // TODO: Develop download pdf function here
  const getValueFromMapping = (mapping, obj) => {
    console.log('mapping', mapping, obj)
    if (mapping === "litigation.category") {
      console.log(obj);
      return obj.litigation.category;
    }
    const keys = mapping.split('.');
    let value = obj;
    for (let key of keys) {
      
        value = value[key];
      
    }
    return value;
  };

  function orderSelectedTags(selectedTags) {
    const orderedTags = [];
    for (const column of hearingTableHeaders) {
      if (selectedTags.includes(column)) {
        orderedTags.push(column);
      }
    }
    return orderedTags;
  }
  const preview = () => {
    // const json = props.hearings.hearings;
    const json = props.hearings.hearings
                  .slice(0)
                  .reverse()
                  .filter((row) => filterHearing(row));
  
    const pdf = new jsPDF("p", "pt", "a4");
  
    const columns = orderSelectedTags(selectedTags);
  
    var rows = [];
  
    for (let i = 0; i < json.length; i++) {
      var temp = columns.map(column => {
        const key = columnKeyMapping[column];
        return getValueFromMapping(key, json[i]);
      });
      rows.push(temp);
    }
  
    pdf.text(235, 40, "Current View");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    });
  
    const pdfDataUri = pdf.output('datauristring');
    const windowContent = '<!DOCTYPE html><html><head><title>Print Document</title></head><body><iframe src="' + pdfDataUri + '" frameborder="0" width="100%" height="820"></iframe></body></html>';
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(windowContent);
    printWindow.document.close();
  };
  
  
  // function filterHearing(row) {
  //   const isWorker = props.user.user.type === "worker";
  //   const isSupervisorOrWorker =
  //     row.caseSupervisor === props.user.user.uid || row.caseWorker === props.user.user.uid;
  //   const isDateMatch = row.next_proceedings_date === filterDate.toLocaleDateString("en-US");
  
  //   const isSearchTermMatch =
  //     !searchFilter ||
  //     !searchTerm ||
  //     row[searchFilter]?.toLowerCase().includes(searchTerm.toLowerCase());
  
  //   if (isWorker) {
  //     return (
  //       (timestampSearch ? isSupervisorOrWorker && isDateMatch : isSupervisorOrWorker) &&
  //       isSearchTermMatch
  //     );
  //   } else {
  //     return (timestampSearch ? isDateMatch : true) && isSearchTermMatch;
  //   }
  // }

  function filterHearing(row) {
    const isWorker = props.user.user.type === "worker";
    const isSupervisorOrWorker =
      row.caseSupervisor === props.user.user.uid || row.caseWorker === props.user.user.uid;
    
    const rowDate = new Date(row.next_proceedings_date);
    const isDateMatch = rowDate >= filterDate && rowDate <= filterDateTo;
  
    const isSearchTermMatch =
      !searchFilter ||
      !searchTerm ||
      row[searchFilter]?.toLowerCase().includes(searchTerm.toLowerCase());
  
    if (isWorker) {
      return (
        (timestampSearch ? isSupervisorOrWorker && isDateMatch : isSupervisorOrWorker) &&
        isSearchTermMatch
      );
    } else {
      return (timestampSearch ? isDateMatch : true) && isSearchTermMatch;
    }
  }
  
  

  // These are tags for column select
  const [selectedTags, setSelectedTags] = useState(["#", 
  "FILE#", 
  "CASE#", 
  "COURT CASE#", 
  "CASE TITLE",
  "NATURE OF CASE", 
  "CATEGORY", 
  "COURT",
  "DISTRICT",
  "JUDGE",
  "UPDATED BY"]);

  const handleTagClick = tag => {

    
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }

    console.log(selectedTags);
    
  };

  return (
    <div className="py-5 pl-4 pr-4">
      <div className="mb-5" style={{ minWidth: "1000px" }}>
        {/* <div style={{ marginBottom: "5%" }}>
          <Title title="HEARINGS" />
        </div> */}

        <Title title="HEARINGS" />
   

          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled={!timestampSearch}
                  margin="normal"
                  id="date-picker-dialog-from"
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
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">---></Typography>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled={!timestampSearch}
                  margin="normal"
                  id="date-picker-dialog-to"
                  format="MM/dd/yyyy"
                  value={filterDateTo}
                  onChange={(e) => {
                    setdateTo(e);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item>
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
                color: 'primary'
              }}
            />
            </Grid>

            <Grid item>
              <FormControl 
              // style={{ minWidth: "10vw" }}
              style={{ minWidth: "10vw" }}
              >
                {/* <InputLabel id="demo-simple-select-label">search filter</InputLabel> */}
                <Select
                  variant="outlined"
                  // value={this.state.searchFilter}

                  onChange={(e) => {
                    // setSearchTerm(query.target.value.toLowerCase());
                    setSearchFilter(e.target.value)

                    // this.setState({ searchFilter: e.target.value });
                  }}
                >
                  {filterValues.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
            <TextField
                style={{}}
                color="primary"
                id="outlined-basic"
                label="Search Hearings"
                variant="outlined"
                onChange={(query) => {
                  setSearchTerm(query.target.value.toLowerCase());

                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.hearings.hearings.length} hearing(s)</Typography>
            </Grid>

                        
            <Grid item>
              <ButtonContainer
                onClick={preview}
                style={{ flexGrow: 1, marginLeft: "auto" }}
              >
                Preview PDF
              </ButtonContainer>
            </Grid>

          </Grid>


       
        

 

        <ColumnSelect selectedTags={selectedTags} handleTagClick={handleTagClick} setSelectedTags={setSelectedTags}/>


        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
            {hearingTableHeaders.map((header) => (
              selectedTags.includes(header) && (
                <TableCell
                  align="center"
                  style={{ color: "white", backgroundColor: "var(--mainPurple)" }}
                >
                  {header}
                </TableCell>
              )
            ))}

              {/* <TableCell
                  align="center"
                  style={{ color: "white", backgroundColor: "var(--mainPurple)" }}
                >
                  {'UPDATED BY'}
                </TableCell> */}
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
                    console.log("ROWED", row)
                    return (
                      <CustomTableRow
                        selectedTags={selectedTags}
                        key={row.id}
                        row={row}
                        workers={workers}
                        updateHearing={updateHearing}
                      />
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
                                  .litigationCaseTitle
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
