import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import countryList from 'react-select-country-list';
import moment from 'moment';
import ButtonContainer from '../../components/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const countries = countryList().getData();
countries.unshift({value:"",label:""});
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '35vw',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Addclient() {
    const history = useHistory();
    const classes = useStyles();
    const [title, settitle] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [dob, setdob] = useState(moment.now())
    const [gender, setgender] = useState('')
    const [nationality, setnationality] = useState('')
    const [companyName, setcompanyName] = useState('')
    const [address, setaddress] = useState('')
    const [town, settown] = useState('')
    const [country, setcountry] = useState('')
    const [zipcode, setzipcode] = useState('')
    const [email, setemail] = useState('')
    const [contactNumber, setcontactNumber] = useState('')
    const [preferredCorr, setpreferredCorr] = useState('')
    const [howDidYou, sethowDidYou] = useState('')
    return (
        <div className="App-screen">
            <FormControl className={classes.formControl}>
                <InputLabel>title</InputLabel>
                <Select
                value={title}
                onChange={(e)=>{settitle(e.target.value)}}
                >
                <MenuItem value={'Mr'}>Mr.</MenuItem>
                <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                <MenuItem value={'Ms.'}>Ms.</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setfirstName(e.target.value)}} label="first name"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setlastName(e.target.value)}} label="last name"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>gender</InputLabel>
                <Select
                value={gender}
                onChange={(e)=>{setgender(e.target.value)}}
                >
                <MenuItem value={'male'}>male</MenuItem>
                <MenuItem value={'female'}>female</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of birth"
                    format="MM/dd/yyyy"
                    value={dob}
                    onChange={(e)=>{setdob(e.target.value)}}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>country</InputLabel>
                <Select
                value={country}
                onChange={(e)=>{setcountry(e.target.value)}}
                >
                {
                    countries.map((country,index) => {
                        return (<MenuItem key ={index} value={country.value}>{country.label}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>nationality</InputLabel>
                <Select
                value={country}
                onChange={(e)=>{setnationality(e.target.value)}}
                >
                {
                    countries.map((country,index) => {
                        return (<MenuItem key ={index} value={country.value}>{country.label}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setcompanyName(e.target.value)}} label="company name"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setaddress(e.target.value)}} label="address"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{settown(e.target.value)}} label="town"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setzipcode(e.target.value)}} label="zip code"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setemail(e.target.value)}} label="email"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                    <InputLabel>preferred correspondence</InputLabel>
                    <Select
                    value={preferredCorr}
                    onChange={(e)=>{setpreferredCorr(e.target.value)}}
                    >
                    <MenuItem value={'by post'}>by post</MenuItem>
                    <MenuItem value={'by email'}>by email</MenuItem>
                    <MenuItem value={'by hand'}>by hand</MenuItem>
                    <MenuItem value={'any'}>any</MenuItem>
                    <MenuItem value={'both email and post'}>both email and post</MenuItem>
                    </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{setcontactNumber(e.target.value)}} label="contact number"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField onChange={(e)=>{sethowDidYou(e.target.value)}} label="how did you hear about us?"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <ButtonContainer onClick={()=>{history.push('/casedetails')}}>Save client</ButtonContainer>
            </FormControl>

        </div>
    )
}

export default Addclient
