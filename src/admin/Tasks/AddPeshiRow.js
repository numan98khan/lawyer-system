import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Field from '../../components/Field';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ProductContext, ProductConsumer } from "../../context";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function AddPeshiRow() {
    const [fileNum, setFileNum] = React.useState("0");
    const [courtCase, setCourtCase] = React.useState("0");
    const [retCase, setRetCase] = React.useState(null);
    const [nextProceedings, setNextProceedings] = React.useState("")
    const [dob, setdob] = React.useState(new Date())
    
    const contextValue = React.useContext(ProductContext);
        
    function getCaseData(fnum, cnum) {
        // console.log(contextValue.filesList.find(x => x.id === '0'));

        if (contextValue.filesList.length === 0){
            return;
        }

        var cases = contextValue.filesList.find(x => x.id === fnum).cases;
        var retCase = null;

        // console.log(cases);

        if (cases[cnum] !== undefined) {
            retCase = cases[cnum];

            setRetCase(retCase)
            console.log(retCase);

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
            console.log('fuck me')
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
                            retCase['previous_proceedings'] = 'null';
                            retCase['prev_proceedings_date'] = 'null';
                            retCase['next_proceedings_date'] = dob;
                            retCase['next_proceedings'] = nextProceedings;
                            retCase['updated_by'] = value.uid;
                                
                            value.addHearingEntry(payload).then(() => {

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


            <TableCell align="center">ccnum</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.caseTitle }</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.subCategory}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.category}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.court}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.district}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.judge}</TableCell>

            <TableCell align="center">{retCase == null ? '' : 'pp'}</TableCell>
            <TableCell align="center">{retCase == null ? '' : 'ppd'}</TableCell>
            
            <TableCell align="center" 
                
            >
                <MuiPickersUtilsProvider 
                style={{
                    minWidth: '200px'
                }}
                utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    // label="Date of birth"
                    format="MM/dd/yyyy"
                    value={dob}
                    onChange={(e)=>{setdob(e)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </TableCell>
            
            <TableCell align="center">{dob.toString()}</TableCell>
            
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

            <TableCell align="center">{retCase == null ? '' : retCase.remarks}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.caseSrc}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.caseSupervisor}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.caseWorker}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.caseClerk}</TableCell>
            <TableCell align="center">{retCase == null ? '' : retCase.otherParty}</TableCell>
            <TableCell align="center">{retCase == null ? '' : 'updated auto'}</TableCell>
                        
        </TableRow>
    )
}

export default AddPeshiRow
