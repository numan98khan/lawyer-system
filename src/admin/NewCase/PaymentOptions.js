import React, { useState } from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import countryList from 'react-select-country-list';
import moment from 'moment';
import ButtonContainer from '../../components/Button';
import { ProductConsumer } from "../../context";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from 'bootstrap';

const optionsFeeType=[
    {
        name:'Fixed Fee',
        value:'Fixed Fee'
    },
    {
        name:"Hourly Fee",
        value:"Hourly Fee"
    },
    {
        name:"Contigency Billing",
        value:"Contigency Billing"
    },
    {
        name:"ProBono",
        value:"ProBono"
    },
    {
        name:"Legal Aid",
        value:"Legal Aid"
    },
]
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '35vw',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    installments:{
        display: 'flex',
        minWidth: '15vw',
        // backgroundColor:'green',
        margin: theme.spacing(1),
        justifyContent:'center',
    }
  }));
function PaymentOptions() {
    const [FeeType,setFeeType] = useState('Fixed Fee')
    const classes = useStyles();
    const [feeAgreement,setFeeAgreement]=useState('')
    const [agreedFee,setAgreedFee]=useState('0.00')
    const [VAT,VATapplicable]=useState('yes')
    const [advancePayment,setAdvancePayment]=useState('0.00')
    const [installmentDate,setDate]=useState(moment())
    const [amount,setAmount]=useState('0.00')
    const history = useHistory()
    const location = useLocation();
    const payload = {
        FeeType,
        feeAgreement,
        agreedFee,
        VAT,
        advancePayment,
        installmentDate,
        amount
    }
    const handleAdd = () => {

    }
    return (
        <div className="App-screen">
            <FormControl className={classes.formControl}>
                <InputLabel>fee type</InputLabel>
                <Select
                value={FeeType}
                onChange={(e)=>{setFeeType(e.target.value)}}
                >
                    {
                        optionsFeeType.map((item,index)=>{

                            return <MenuItem key = {index} value={item.value}>{item.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setFeeAgreement(e.target.value)}} label="What is covered by this fee agreement?"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField 
                InputProps={{
                    startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                  }}
                onChange={(e)=>{setAgreedFee(e.target.value)}} label="agreed fee"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>VAT applicable</InputLabel>
                <Select
                value={VAT}
                onChange={(e)=>{VATapplicable(e.target.value)}}
                >
                <MenuItem value={'yes'}>yes</MenuItem>
                <MenuItem value={'no'}>no</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField 
                InputProps={{
                    startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                  }}
                onChange={(e)=>{setAdvancePayment(e.target.value)}} label="advance payment"></TextField>
            </FormControl>
            <br></br>
            <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="installment date"
                    format="MM/dd/yyyy"
                    value={installmentDate}
                    onChange={(e)=>{setDate(e.target.value)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                  }}
                onChange={(e)=>{setAmount(e.target.value)}} label="installment amount"></TextField>
            </FormControl>
            <ButtonContainer>
            <AddCircleOutlineIcon color="action" fontSize="large"></AddCircleOutlineIcon>
            </ButtonContainer>
            <br></br>
            <FormControl className={classes.formControl}>
            <ProductConsumer>
                {value => {
                    location.state.PaymentOptions = payload;
                    return (<ButtonContainer onClick={()=>{
                        value.addClientAndCase(location.state);
                        // history.push('/')
                }}>Save payment options</ButtonContainer>)
            
                }}  
            </ProductConsumer>
          
            </FormControl>
        </div>
    )
}

export default PaymentOptions
