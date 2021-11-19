import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Field from '../../components/Field';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ProductContext, ProductConsumer } from "../../contexts/context.js";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditableCell from '../../components/EditableNewCellComp'

import _ from "lodash";

function AddPeshiRow() {
    const [fileNum, setFileNum] = React.useState("0");
    const [courtCase, setCourtCase] = React.useState("0");
    const [retCase, setRetCase] = React.useState(null);

    const [initCase, setInitCase] = React.useState(null);

    const [nextProceedings, setNextProceedings] = React.useState("")
    const [dob, setdob] = React.useState(new Date())
    const [newCase, setnewCase] = React.useState(null)
    
    const contextValue = React.useContext(ProductContext);
        
    function getCaseData(fnum, cnum) {
        //check if case is new or hearing exists already
        //if hearing exists, get data from hearing

        //else get it from cases table
        if (contextValue.filesList.length === 0){
            return;
        }

        var cases = contextValue.filesList.find(x => x.id === fnum).cases;
        var retCase = null;
        var peshiData = null;

        
        // console.log(cases);
        
        if (cases[cnum] !== undefined) {
            peshiData = contextValue.peshiList.filter(x => x.case_id === cases[cnum].case_id)

            if(peshiData.length > 0){
                setnewCase(false)
                retCase = peshiData.pop();
                
                // let trueDeep = jQ.extend(true, retCase, {});

                var trueDeep = _.cloneDeep(retCase);

                // console.log('trueDeep', trueDeep)

                setInitCase(trueDeep);
            }
            else {
                setnewCase(true)
                retCase = cases[cnum];
                retCase['previous_proceedings'] = 'new case';
                retCase['previous_proceedings_date'] = 'new case';
                retCase['file_n'] = fnum;
                retCase['case_n'] = cnum;
                // retCase['updated_by'] = 'noman';
            }
            retCase['updated_by'] = contextValue.user.email;
            
            setRetCase(retCase)
            console.log(retCase);
            // console.log(peshiData)

        }

        
    }



    const handleChangeFileNum = e => {
        console.log('huee')
        console.log(courtCase.length);

        var tempVal = e.target.value.replace(/\D/,'')

        setFileNum(tempVal);
        
        // e.target.value.replace(/\D/,'')  
        console.log(fileNum.length);

        // getCaseData(0, 0)

        if (tempVal.length !== 0 && courtCase.length !== 0) {
            getCaseData(tempVal, courtCase)
        } else {
            setRetCase(null);   
        }
    };

    const handleChangeCourtCase = e => {
        // console.log('huee')
        // console.log(e.target.value);
        
        
        var tempVal = e.target.value.replace(/\D/,'')

        setCourtCase(tempVal); 
        
        
        if (fileNum.length !== 0 && tempVal.length !== 0) {
            getCaseData(fileNum, tempVal)
        } else {
            setRetCase(null);   
        }
    };

    React.useEffect(() => {
        console.log('mount it!');
        getCaseData('0', '0')

      }, []);
    function ChangeCellValue(cell, value){
        retCase[cell] = value
        console.log(cell, value)
        setRetCase(retCase)
    }

    return (
        <TableRow>
            <TableCell align="center">
            <ProductConsumer>
            {value => {
            return (<IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={
                        () => {
                            // pushPeshi();

                            var payload = retCase;
                            //check if case has previous peshi row

                            //if case is new, get details from case, else from peshi row
                            if (!newCase){

                                retCase['previous_proceedings_date'] = retCase['next_proceedings_date']
                                retCase['previous_proceedings'] = retCase['next_proceedings'];
                            }

                            retCase['next_proceedings_date'] = dob.toLocaleDateString('en-US');
                            retCase['next_proceedings'] = nextProceedings;
                            retCase['updated_by'] = value.user.email;
                                
                            value.addHearingEntry(payload, initCase).then(() => {
                                //clear everything
                                setFileNum("")
                                setCourtCase("")
                                setRetCase(null)
                                setNextProceedings("")
                                setdob(new Date())
                                setnewCase(null)

                            }).catch((error) => {
                                console.log(error)
                            })
                            // file["cases"][key]["file_n"] = file["id"]
                            // file["cases"][key]["case_n"] = key
                            // setentryDetails(file["cases"][key])
                            // setopenEntry(true)
                        }
                    }>
                    <AddCircleOutlineIcon />
                </IconButton>)}}
            </ProductConsumer>
            </TableCell>
            
            <TableCell align="center">
                <input value = {fileNum} 
                        onChange = {handleChangeFileNum} 
                        onBlur = {(e)=>{}} autoFocus
                        // pattern="[0-9]*"
                        /> 
            </TableCell>
            <TableCell align="center">
                <input value = {courtCase} 
                        onChange = {handleChangeCourtCase} 
                        onBlur = {(e)=>{}} autoFocus
                        // pattern="[0-9]*"
                        /> 
            </TableCell>


            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.courtCaseNo } cell={"courtCaseNo"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.caseTitle } cell={"caseTitle"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            <TableCell align="center">{retCase == null ? '' : retCase.subCategory}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.category}</TableCell>
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.court } cell={"court"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.district } cell={"district"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.judge } cell={"judge"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {/* <TableCell align="center">{retCase == null ? '' : retCase.judge}</TableCell> */}
            {/* <TableCell align="center">ccnum</TableCell> */}
           

            <TableCell align="center">{retCase == null ? '' : (newCase?retCase.previous_proceedings:retCase.next_proceedings)}</TableCell>
            <TableCell align="center">{retCase == null ? '' : (newCase?retCase.previous_proceedings_date:retCase.next_proceedings_date)}</TableCell>
            
            <TableCell align="center" 
                style={{
                    minWidth: '200px',
                    paddingBottom:'30px'
                }}
            >
                <MuiPickersUtilsProvider 
                utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date of birth"
                    format="MM/dd/yyyy"
                    value={dob}
                    onChange={(e)=>{
                        console.log(e)
                        setdob(e)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </TableCell>
            
            {/* <TableCell align="center">{dob.toString()}</TableCell> */}
            
            <TableCell align="center">
                <input value = {nextProceedings} 
                        // onChange = {handleChangeCourtCase} 
                        onChange = {(e) => {
                            setNextProceedings(e.target.value)
                        }}
                        onBlur = {(e)=>{}} autoFocus
                        // pattern="[0-9]*"
                        /> 
            </TableCell>

            {/* <TableCell align="center">{retCase == null ? '' : retCase.remarks}</TableCell> */}
            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.remarks } cell={"remarks"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            <TableCell align="center">{retCase == null ? '' : retCase.caseSrc}</TableCell>
            {/* <TableCell align="center">{retCase == null ? '' : retCase.caseSupervisor}</TableCell> */}
            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.caseSupervisor } cell={"caseSupervisor"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {/* <TableCell align="center">{retCase == null ? '' : retCase.caseWorker}</TableCell> */}
            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.caseWorker } cell={"caseWorker"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            {/* <TableCell align="center">{retCase == null ? '' : retCase.caseClerk}</TableCell> */}
            {/* <TableCell align="center">ccnum</TableCell> */}
            {
                retCase == null ? null :
                (
                    <EditableCell value={retCase == null ? '' : retCase.caseClerk } cell={"caseClerk"} changeCellValue={ChangeCellValue}></EditableCell>
                    
                ) 
            }
            <TableCell align="center">{retCase == null ? '' : retCase.otherParty}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.updated_by}</TableCell>
                        
        </TableRow>
    )
}

export default AddPeshiRow
