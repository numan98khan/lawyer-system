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
import FormControl from '@material-ui/core/FormControl';
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
import { useLocation } from 'react-router-dom';
import { caseValueMap} from '../NewCase/lists'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


function LogSheet() {
    const [casePath, setCasePath] = React.useState('0/0');
    const [filterDate, setdate] = React.useState(new Date())
    const [timestampSearch, settimestampSearch] = React.useState(true)
    const [keySearch, setkeySearch] = React.useState(true)
    const [valueSearch, setvalueSearch] = React.useState(true)
    const location = useLocation()

    const contextValue = React.useContext(ProductContext);
    const useStyles = makeStyles({
      table: {
        minWidth: '900px',
      },
    });

    const classes = useStyles();

    React.useEffect(() => {
      setCasePath(location.state)
        // contextValue.setLogSheet(casePath);

        // var case_number='';
        // var file_number='';
        // [file_number, case_number] = searchterm.split('/')
        // if(file_number !== '' && case_number !== undefined){
  
        //   setfile_n(parseInt(file_number,10));
        //   setcase_n(parseInt(case_number,10));
        // }
        // if(searchterm==="haaaaah"){
  
        //   setfile_n(-1)
        //   setcase_n(-1)
        // }
        // console.log(file_n,case_n);
      })

    return (
        <ProductConsumer>
          {value => {
            return (
              <div className="py-5 pl-4 pr-4">
                <div className="mb-5" style={{minWidth:"1000px"}} >
                <div style={{marginBottom:"5%"}}>
                <Title title={"LOG SHEET " + casePath}/>
              </div>
              <div className="bg-light d-flex justify-content-between" style={{height:'100px', padding:'30px'}}>
              <div className="d-flex align-items-center justify-content-between">
                <MuiPickersUtilsProvider 
                    utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disabled = {timestampSearch}
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
                <input onChange={(e)=>{settimestampSearch(!e.target.checked)}} type="checkbox" style={{height:'30x', width:'30px', marginLeft:'10px'}}/>
                </div>
                <div className="d-flex align-items-center justify-content-between">

                <Select 
                variant='outlined'
                style={{width:"300px", marginRight:'10px'}}
                value={'Housing Law (Property & Conveyancing)'}
                disabled={keySearch}
                onChange={(e)=>{}}
                >
                  {
                    Object.keys(caseValueMap).map((key,indx)=>{
                      return(

                        <MenuItem value={caseValueMap[key]}>{caseValueMap[key]}</MenuItem>
                      )
                    })
                  }
                </Select>
                
                <input onChange={(e)=>{setkeySearch(!e.target.checked)}} type="checkbox" style={{height:'30x', width:'30px'}}/>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                <TextField style={{width:"100%", marginRight:'10px'}} 
                        disabled={valueSearch}
                        color='primary'
                        id="outlined-basic" 
                        label="quick search" 
                        variant="outlined"
                        onChange={()=> {}} />
                <input onChange={(e)=>{setvalueSearch(!e.target.checked)}} type="checkbox" style={{height:'30x', width:'30px'}}/>
                </div>
              </div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">TIMESTAMP</TableCell>
                        <TableCell align="center">KEY</TableCell>
                        <TableCell align="center">PREVIOUS VALUE</TableCell>
                        <TableCell align="center">NEW VALUE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* show hearings data here */}
                        <ProductConsumer>
                        
                        {value => {
                        // return value.peshiList.filter((row) => {
                        //     return (row.next_proceedings_date === filterDate.toLocaleDateString('en-US'))
                        // })
                        console.log(value.logSheetList);
                        return value.logSheetList.map((row) => (
                            // return llist.map((row) => (
              
                            <TableRow>
                          
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.time_stamp}</TableCell>
                                <TableCell align="center">{caseValueMap[row.key]}</TableCell>
    
                                {/* <TableCell align="center">{row.court_case_n}</TableCell> */}
                            
                                <TableCell align="center">{row.prev_value}</TableCell>
                                <TableCell align="center">{row.new_value}</TableCell>
                            
                            </TableRow>
                      ))
                      }}
                      </ProductConsumer>

                    </TableBody>
                  </Table>
                </TableContainer>
                </div>
                
                {/* {openEntry && <Entry Details={entryDetails} closeEntry={()=>{setopenEntry(false)}}/>} */}
                
              </div>
             
            );
          }}
  
        </ProductConsumer>
      );
}

export default LogSheet;