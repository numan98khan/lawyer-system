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
import FormControl from "@material-ui/core/FormControl";
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
import { useLocation } from "react-router-dom";
import { caseValueMap } from "../NewCase/lists";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { loadLogs } from "../../actions/logActions";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function LogSheet(props) {
  const [casePath, setCasePath] = React.useState("0/0");
  const [filterDate, setdate] = React.useState();
  const [keyvalue, setkeyvalue] = React.useState("ALL KEYS");
  const [quicksearch, setquicksearch] = React.useState("");
  const [timestampSearch, settimestampSearch] = React.useState(true);
  // const [keySearch, setkeySearch] = React.useState(true)
  // const [valueSearch, setvalueSearch] = React.useState(true)
  const location = useLocation();

  React.useEffect(() => {
    props.loadLogs(location.state);
  }, []);
  const useStyles = makeStyles({
    table: {
      minWidth: "900px",
    },
  });

  const classes = useStyles();

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  React.useEffect(() => {
    setCasePath(location.state);
  });

  const filterFunc = (row) => {
    console.log(keyvalue);
    if (filterDate instanceof Date) {
      if (keyvalue === "ALL KEYS") {
        return (
          row.date === filterDate.toLocaleDateString("en-US") &&
          (row.new_value.toLowerCase().includes(quicksearch.toLowerCase()) ||
            row.prev_value.toLowerCase().includes(quicksearch.toLowerCase()))
        );
      }
      return (
        row.date === filterDate.toLocaleDateString("en-US") &&
        row.key === getKeyByValue(caseValueMap, keyvalue) &&
        (row.new_value.toLowerCase().includes(quicksearch.toLowerCase()) ||
          row.prev_value.toLowerCase().includes(quicksearch.toLowerCase()))
      );
    } else {
      if (keyvalue === "ALL KEYS") {
        return (
          row.new_value.toLowerCase().includes(quicksearch.toLowerCase()) ||
          row.prev_value.toLowerCase().includes(quicksearch.toLowerCase())
        );
      }
      return (
        row.key === getKeyByValue(caseValueMap, keyvalue) &&
        (row.new_value.toLowerCase().includes(quicksearch.toLowerCase()) ||
          row.prev_value.toLowerCase().includes(quicksearch.toLowerCase()))
      );
    }
    // return row.date === filterDate.toLocaleDateString('en-US')
    // return (row.new_value.includes(quicksearch)|| row.prev_value.includes(quicksearch))
    // return (row.date === date && row.key===getKeyByValue(caseValueMap, keyvalue) && (row.new_value.includes(quicksearch)|| row.prev_value.includes(quicksearch)))
  };

  return (
    <div className="py-5 pl-4 pr-4">
      <div className="mb-5" style={{ minWidth: "1000px" }}>
        <div style={{ marginBottom: "5%" }}>
          <Title title={"LOG SHEET " + casePath} />
        </div>
        <div
          className="bg-light d-flex justify-content-between"
          style={{ height: "100px", padding: "30px" }}
        >
          <div className="d-flex align-items-center justify-content-between align-items-center">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={timestampSearch}
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
                settimestampSearch(!e.target.checked);
                if (!timestampSearch) {
                  setdate();
                } else {
                  let date = new Date();
                  setdate(date);
                }
              }}
              type="checkbox"
              style={{
                height: "50x",
                width: "50px",
                marginLeft: "10px",
                marginTop: "17px",
              }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <FormControl className={classes.formControl}>
              <InputLabel>key search</InputLabel>
              <Select
                // variant='outlined'
                style={{ width: "300px", marginRight: "10px" }}
                value={keyvalue}
                // disabled={keySearch}
                onChange={(e) => {
                  setkeyvalue(e.target.value);
                }}
              >
                <MenuItem className="text-primary" value={"ALL KEYS"}>
                  ALL KEYS
                </MenuItem>
                {Object.keys(caseValueMap).map((key, indx) => {
                  return (
                    <MenuItem value={caseValueMap[key]}>
                      {caseValueMap[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* <input onChange={(e)=>{setkeySearch(!e.target.checked)}} type="checkbox" style={{height:'30x', width:'30px'}}/> */}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <TextField
              style={{ width: "100%", marginRight: "10px" }}
              // disabled={valueSearch}
              color="primary"
              id="outlined-basic"
              label="quick search"
              variant="outlined"
              value={quicksearch}
              onChange={(e) => {
                setquicksearch(e.target.value);
              }}
            />
            {/* <input onChange={(e)=>{setvalueSearch(!e.target.checked)}} type="checkbox" style={{height:'30x', width:'30px'}}/> */}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                <TableCell align="center">#</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">TIME</TableCell>
                <TableCell align="center">KEY</TableCell>
                <TableCell align="center">PREVIOUS VALUE</TableCell>
                <TableCell align="center">NEW VALUE</TableCell>
                <TableCell align="center">UPDATED BY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* show hearings data here */}
              {props.log.hearingsLogs
                .slice(0)
                .reverse()
                .filter((row) => filterFunc(row))
                .map((row) => (
                  // return llist.map((row) => (

                  <TableRow>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>

                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">
                      {caseValueMap[row.key]}
                    </TableCell>

                    {/* <TableCell align="center">{row.court_case_n}</TableCell> */}

                    <TableCell align="center">{row.prev_value}</TableCell>
                    <TableCell align="center">{row.new_value}</TableCell>
                    <TableCell align="center">{row.updated_by}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* {openEntry && <Entry Details={entryDetails} closeEntry={()=>{setopenEntry(false)}}/>} */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  log: state.log,
});
export default connect(mapStateToProps, { loadLogs })(LogSheet);
