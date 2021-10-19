import React, {useState,useEffect} from 'react'
import {useHistory,useLocation} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import countryList from 'react-select-country-list';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ButtonContainer from '../../components/Button';
import Title from "../../components/Title"
import {nulllist,optionsCivilLitigation,optionsChances,optionsCaseWorker,optionsCaseSupervisor,optionsHousingLaw,optionsConsumerLaw,optionsCriminalLaw,optionsPersonalInjury,optionsImmigrationAssylum,optionsHumanRights,optionsEmploymentLaw,optionsFamilyLaw} from './lists'
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '35vw',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
function casedetails() {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [caseSrc, setCaseSrc] = useState('')
    // const [caseStatus, setCaseStatus] = useState('open')
    const [caseTitle, setcaseTitle] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [briefDescription, setBriefDescription] = useState('')
    const [caseSupervisor, setCaseSupervisor] = useState('')
    const [caseWorker, setCaseWorker] = useState('')
    const [clientInstructions, setClientInstructions] = useState('')
    const [adviceToClient, setAdviceToClient] = useState('')
    const [planOfAction, setPlanOfAction] = useState('')
    const [chancesOfSuccess, setChances] = useState('')
    const [conflictsofInterest, setConflictsofInterest] = useState('no')
    const [criminalRecord, setCriminalRecord] = useState('no')
    const [explanationOfCriminal, setexplanationOfCriminal] = useState('')
    const [court, setCourt] = useState('')
    const [judge, setJudge] = useState('')
    const [caseClerk, setCaseClerk] = useState('')
    const [otherParty, setOtherParty] = useState('')
    const payload = {
        // caseStatus,
        caseTitle,
        caseSrc,
        category,
        subCategory,
        briefDescription,
        caseSupervisor,
        caseWorker,
        clientInstructions,
        adviceToClient,
        planOfAction,
        chancesOfSuccess,
        conflictsofInterest,
        criminalRecord,
        explanationOfCriminal,
        court,
        judge,
        otherParty,
        caseClerk
    }
    useEffect(() => {
        
        return () => {
            // console.log("passed:",location.state)
        }
    })
    return (
        <div className="App-screen">
            <div style={{marginBottom:"5%"}}>
              <Title title="Enter case information"/>
            </div>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} onChange={(e)=>{setcaseTitle(e.target.value)}} label="case title"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>category</InputLabel>
                <Select
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                >
                <MenuItem value={'Civil Litigation'}>Civil Litigation</MenuItem>
                <MenuItem value={'Consumer Law'}>Consumer Law</MenuItem>
                <MenuItem value={'Criminal Law'}>Criminal Law</MenuItem>
                <MenuItem value={'Employment Law'}>Employment Law</MenuItem>
                <MenuItem value={'Family Law'}>Family Law</MenuItem>
                <MenuItem value={'Human Rights'}>Human Rights</MenuItem>
                <MenuItem value={'Immigration & Asylum'}>Immigration & Asylum</MenuItem>
                <MenuItem value={'Personal injury & clinical negligence'}>Personal injury & clinical negligence</MenuItem>
                <MenuItem value={'Housing Law (Property & Conveyancing)'}>Housing Law (Property & Conveyancing)</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>sub-category</InputLabel>
                <Select
                value={subCategory}
                onChange={(e)=>{setSubCategory(e.target.value)}}
                >
                    {
                        category === 'Civil Litigation'?
                        optionsCivilLitigation.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        
                        :

                        category === 'Consumer Law'?
                        
                            optionsConsumerLaw.map((options,index)=>{
                            
                                    return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                            })
                        

                        :

                        category === 'Housing Law (Property & Conveyancing)'?
                    
                            optionsHousingLaw.map((options,index)=>{
                            
                                    return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                            })

                        : 

                        category === 'Criminal Law'?
                            optionsCriminalLaw.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })

                        :

                        category === 'Employment Law'?
                        optionsEmploymentLaw.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        :

                        category === 'Family Law'?
                        optionsFamilyLaw.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        :

                        category === 'Human Rights'?
                        optionsHumanRights.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        :

                        category === 'Immigration & Asylum'?
                        optionsImmigrationAssylum.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        :

                        category === 'Personal injury & clinical negligence'?
                        optionsPersonalInjury.map((options,index)=>{
                            
                            return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                    })
                        :
                        null
                    }
                        
                    
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setBriefDescription(e.target.value)}} label="brief description about the case"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} onChange={(e)=>{setCaseSrc(e.target.value)}} label="case source"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>case supervisor</InputLabel>
                <Select
                value={caseSupervisor}
                onChange={(e)=>{setCaseSupervisor(e.target.value)}}
                >
                {
                    optionsCaseSupervisor.map((options,index)=>{
                            
                        return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>case worker</InputLabel>
                <Select
                value={caseWorker}
                onChange={(e)=>{setCaseWorker(e.target.value)}}
                >
                {
                    optionsCaseWorker.map((options,index)=>{
                            
                        return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                })
                }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setClientInstructions(e.target.value)}} label="client intrusctions"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setAdviceToClient(e.target.value)}} label="advice to client"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setPlanOfAction(e.target.value)}} label="plan of action"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>chances of success</InputLabel>
                <Select
                value={chancesOfSuccess}
                onChange={(e)=>{setChances(e.target.value)}}
                >
                {
                    optionsChances.map((options,index)=>{
                            
                        return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                })
                }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>conflicts of Interest</InputLabel>
                <Select
                value={conflictsofInterest}
                onChange={(e)=>{setConflictsofInterest(e.target.value)}}
                >
                <MenuItem value={'yes'}>yes</MenuItem>
                <MenuItem value={'no'}>no</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>case clerk</InputLabel>
                <Select
                value={caseClerk}
                onChange={(e)=>{setCaseClerk(e.target.value)}}
                >
                {
                    optionsCaseSupervisor.map((options,index)=>{
                            
                        return <MenuItem key={index} value={options.value}>{options.name}</MenuItem>
                })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>criminal record</InputLabel>
                <Select
                value={conflictsofInterest}
                onChange={(e)=>{setCriminalRecord(e.target.value)}}
                >
                <MenuItem value={'yes'}>yes</MenuItem>
                <MenuItem value={'no'}>no</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant = "outlined" multiline = {true} minRows={'5'} onChange={(e)=>{setexplanationOfCriminal(e.target.value)}} label="explanation of criminal record"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField variant = "outlined" minRows={'5'} onChange={(e)=>{setCourt(e.target.value)}} label="case court"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField variant = "outlined" minRows={'5'} onChange={(e)=>{setJudge(e.target.value)}} label="case judge"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField variant = "outlined" minRows={'5'} onChange={(e)=>{setOtherParty(e.target.value)}} label="other party"></TextField>
            </FormControl>
            <FormControl className={classes.formControl}>
                <ButtonContainer onClick={()=>{
                    location.state.caseDetails = payload;
                    history.push({
                        pathname:'/paymentoptions',
                        state: location.state
                    })
            }}>Save case details</ButtonContainer>
            </FormControl>
        </div>
    )
}

export default casedetails

//remarks
//next proceeding date



//previous date
//everything else
//updated by

