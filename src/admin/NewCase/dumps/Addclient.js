import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import Title from "../../components/Title"
import DateFnsUtils from '@date-io/date-fns';
import countryList from 'react-select-country-list';
import moment from 'moment';
import ButtonContainer from '../../components/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';


const countries = countryList().getData();
countries.unshift({value:"",label:""});
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '25vw',
        // width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: theme.spacing(2),
      },
  }));

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

function Addclient() {
    const history = useHistory();
    const classes = useStyles();
    const [title, settitle] = useState('')
    const [firstName, setfirstName] = useState('')
    const [cnic, setcnic] = useState('')
    const [lastName, setlastName] = useState('')
    const [dob, setdob] = useState(new Date())
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
    const payload = {title,firstName,lastName,dob,gender,nationality,companyName,address,town,country,zipcode,email,contactNumber,preferredCorr,howDidYou,cnic};
    
    return (
        <div className="App-screen">
            <div style={{marginBottom:"5%"}}>
              <Title title="Enter client information"/>
            </div>
            <div className={classes.formContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel>title</InputLabel>
                <Select
                value={title}
                onChange={(e)=>{settitle(e.target.value)}}
                >
                <MenuItem value={'Mr.'}>Mr.</MenuItem>
                <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                <MenuItem value={'Ms.'}>Ms.</MenuItem>
                <MenuItem value={'(Other)'}>Other</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField name = "firstname" onChange={(e)=>{setfirstName(e.target.value)}} label="first name"></TextField>
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
                <InputLabel>cnic</InputLabel>
                <Input
                value={cnic}
                onChange={(e)=>{setcnic(e.target.value)}}
                inputComponent={TextMaskCustom}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date of birth"
                    format="MM/dd/yyyy"
                    value={dob}
                    onChange={(e)=>{setdob(e)}}
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
                value={nationality}
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
            
            </div>
            <div className={classes.formContainer}>
            <FormControl className={classes.formControl}>
                <ButtonContainer onClick={()=>{history.push({pathname:'/addcasedetails',state:{clientDetails:payload}})}}>Save client</ButtonContainer>
            </FormControl>

            <FormControl className={classes.formControl}>
                <ButtonContainer onClick={()=>{history.push({pathname:'/addcasedetails',state:{clientDetails:payload}})}}>Save client</ButtonContainer>
            </FormControl>
            </div>
        </div>
    )
}

export default Addclient