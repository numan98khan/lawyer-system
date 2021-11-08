import React, { Component } from "react";
import { ProductConsumer } from "../../context";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from "../../components/Title"
import { Fragment } from "react";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Field from '../../components/Field';
import DateFnsUtils from '@date-io/date-fns';
import ButtonContainer from '../../components/Button';
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context";
import { LogIcon } from "../../../src/icons"

import DescriptionIcon from '@material-ui/icons/Description';


import AddPeshiRow from "./AddPeshiRow";

import EditableCellComp from "../../components/EditableCellComp";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function Tasks() {
  const [searchterm, setsearchterm] = React.useState('');
  const [filterDate, setdate] = React.useState(new Date())
  const [file_n, setfile_n] = React.useState(-1);
  const [case_n, setcase_n] = React.useState(-1);
  const [firstName, setFirstName] = React.useState("Moiz");
  const [websiteName, setWebsiteName] = React.useState("Ciphertrick");
  const [firstNameInput, setFirstNameInput] = React.useState(false);
  const [websiteNameInput, setWebsiteNameInput] = React.useState(false);
  const [temp, settemp] = React.useState('')

  // const [openEntry, setopenEntry] = React.useState(false)
  // const [entryDetails, setentryDetails] = React.useState([])
  const contextValue = React.useContext(ProductContext);


    const useStyles = makeStyles({
      table: {
        minWidth: '900px',
      },
    });
    const classes = useStyles();
    React.useEffect(() => {
      var case_number='';
      var file_number='';
      [file_number, case_number] = searchterm.split('/')
      if(file_number !== '' && case_number !== undefined){

        setfile_n(parseInt(file_number,10));
        setcase_n(parseInt(case_number,10));
      }
      if(searchterm==="haaaaah"){

        setfile_n(-1)
        setcase_n(-1)
      }
      console.log(file_n,case_n);
    })

    function updateHearing(cell, value, key){
      contextValue.updateHearing(cell, value, key)
    }

    function getName(clientsList,file,key){
      for (var i = 0; i<clientsList.length; i++){
        if (clientsList[i.toString()]["id"] === file["cases"][key].clientId){
          return clientsList[i.toString()]["title"] + ' ' + clientsList[i.toString()]["firstName"]
        }
      }
    }
    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="py-5 pl-4 pr-4">
              <div className="mb-5" style={{minWidth:"1000px"}} >
              <div style={{marginBottom:"5%"}}>
              <Title title="PESHI LIST"/>
            </div>
            <div className="bg-light" style={{height:'100px', padding:'30px'}}>
            <MuiPickersUtilsProvider 
                utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date of birth"
                    format="MM/dd/yyyy"
                    value={filterDate}
                    onChange={(e)=>{setdate(e)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">FILE#</TableCell>
                      <TableCell align="center">CASE#</TableCell>
                      <TableCell align="center">COURT CASE#</TableCell>
                      <TableCell align="center">CASE TITLE</TableCell>
                      <TableCell align="center">NATURE OF CASE</TableCell>
                      <TableCell align="center">CATEGORY</TableCell>
                      <TableCell align="center">COURT</TableCell>
                      <TableCell align="center">DISTRICT</TableCell>
                      <TableCell align="center">JUDGE</TableCell>
                      <TableCell align="center">PREVIOUS PROCEEDINGS</TableCell>
                      <TableCell align="center">PREVIOUS DATE</TableCell>
                      <TableCell align="center">NEXT DATE</TableCell>
                      <TableCell align="center">NEXT PROCEEDINGS</TableCell>
                      <TableCell align="center">REMARKS</TableCell>
                      <TableCell align="center">CASE OWNER</TableCell>
                      <TableCell align="center">CASE SUPERVISOR</TableCell>
                      <TableCell align="center">CASE WORKER</TableCell>
                      <TableCell align="center">CASE CLERK</TableCell>
                      <TableCell align="center">OTHER PARTY</TableCell>
                      <TableCell align="center">UPDATED BY</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* show hearings data here */}
                    <ProductConsumer>
                    
                    {value => {
                    return value.peshiList.filter((row) => {
                      return (row.next_proceedings_date === filterDate.toLocaleDateString('en-US'))
                    }
                      ).map((row) => (
                      // return llist.map((row) => (
            
                        <TableRow>
                        
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.file_n}</TableCell>
                        <TableCell align="center">{row.case_n}</TableCell>

                        {/* <TableCell align="center">{row.court_case_n}</TableCell> */}
                      

                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"courtCaseNo"} value={row.courtCaseNo} > </EditableCellComp>
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"caseTitle"} value={row.caseTitle} > </EditableCellComp>
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"subCategory"} value={row.subCategory} > </EditableCellComp>

                        <TableCell align="center">{row.category}</TableCell>
                        
                        {/* <TableCell align="center">{row.court}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"court"} value={row.court} > </EditableCellComp>

                        {/* <TableCell align="center">{row.district}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"district"} value={row.district} > </EditableCellComp>

                        {/* <TableCell align="center">{row.judge}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"judge"} value={row.judge} > </EditableCellComp>

                        <TableCell align="center">{row.previous_proceedings}</TableCell>
                        {/* <EditableCellComp value={row.} > </EditableCellComp> */}
                        
                        <TableCell align="center">{row.previous_proceedings_date}</TableCell>
                        <TableCell align="center">{row.next_proceedings_date}</TableCell>
                        <TableCell align="center">{row.next_proceedings}</TableCell>
                        
                        {/* <TableCell align="center">{row.remarks}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"remarks"} value={row.remarks} > </EditableCellComp>

                        {/* <TableCell align="center">{row.caseSrc}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"caseSrc"} value={row.caseSrc} > </EditableCellComp>

                        {/* <TableCell align="center">{row.caseSupervisor}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"caseSupervisor"} value={row.caseSupervisor} > </EditableCellComp>

                        {/* <TableCell align="center">{row.caseWorker}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"caseWorker"} value={row.caseWorker} > </EditableCellComp>

                        {/* <TableCell align="center">{row.case_clerk}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"caseClerk"} value={row.caseClerk} > </EditableCellComp>

                        {/* <TableCell align="center">{row.other_party}</TableCell> */}
                        <EditableCellComp updateHearing={updateHearing} hearing_key={row.key} cell={"otherParty"} value={row.otherParty} > </EditableCellComp>

                        <TableCell align="center">{row.updated_by}</TableCell>
                        
                      </TableRow>
                    ))
                    }}
                    </ProductConsumer>


                    <AddPeshiRow/>


                  </TableBody>
                </Table>
              </TableContainer>
              </div>
              {/* {openEntry && <Entry Details={entryDetails} closeEntry={()=>{setopenEntry(false)}}/>} */}
              <TextField className="mb-4" style={{minWidth:"400px"}} 
                        color='primary'
                        id="outlined-basic" 
                        label="Quick search cases" 
                        placeholder="File number/case number"
                        variant="outlined"
                        value={searchterm}
                        onChange={(query)=> {
                          setsearchterm(query.target.value.toLowerCase())
                          if(query.target.value.length < 1){
                            setfile_n(-1)
                            setcase_n(-1)
                          }
                          }} />

              <div className="search-results">
                {
                  value.filesList
                  .filter((file)=> 
                  {
                    if(file_n > -1){

                      return file["id"]===file_n.toString()
                    }
                    else{
                      
                      return true
                    }
                  }
                  )
                  .map((file,idx)=>{
                    return(
                      <Fragment key={idx}>
                        <List style={{minWidth:'1000px'}}>
                        {
                          Object.keys(file["cases"])
                          .filter((key, index)=> 
                          {
                            if(case_n > -1){

                              return key===case_n.toString()
                            }
                            else{
                              return true
                            }
                          }
                          )
                          .map(function(key, index) {
                            // console.log(value.clientsList["-MjYcy-1vhwjXOXuXsP4"])
                            return (
                              <div key={index}>
                              <ListItem
                                // file["cases"][key].caseTitle
                                alignItems="flex-start">
                                <ListItemText
                                  primary={file["cases"][key].caseTitle}
                                  secondary={
                                    <React.Fragment>
                                       <Typography
                                        component="span"
                                        variant="body2"
                                        // className={classes.inline}
                                        color="textPrimary"
                                      >
                                      {getName(value.clientsList,file,key)}
                                      </Typography>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        // className={classes.inline}
                                        color="textPrimary"
                                      >
                                      {" — "} {file["id"]}
                                      {" — "} {key}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                />
                                
                                <ListItemSecondaryAction>
                                  <button style={{backgroundColor:'transparent', border:'none'}}>
                                    <LogIcon></LogIcon>
                                  
                                  {/* Improve button later */}
                                  {/* <DescriptionIcon  edge="end" aria-label="delete" ></DescriptionIcon> */}
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
                              component="li" />
                              </div>
                            )
                          })
                        }
                              </List>
                      </Fragment>
                      
                    )
                  })
                }
              </div>
            </div>
           
          );
        }}

      </ProductConsumer>
    );
}
export default Tasks;




// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>