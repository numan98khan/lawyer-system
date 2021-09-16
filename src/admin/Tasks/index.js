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
import DateFnsUtils from '@date-io/date-fns';
import ButtonContainer from '../../components/Button';
import { useHistory } from "react-router-dom";


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Entry({Details, closeEntry}){

  const [state, setstate] = React.useState({})
  const history = useHistory();
  React.useEffect(() => {
    if(state.file_n !== Details.file_n || state.case_n !== Details.case_n){
      console.log("hey")
      const {
      AdditionalInformation,
      adviceToClient,
      briefDescription,
      chancesOfSuccess,
      clientId,
      clientInstructions,
      conflictsofInterest,
      criminalRecord,
      explanationOfCriminal,
      planOfAction,
      ...therest} = Details;
      //add dates
      therest["prev_proceedings_date"] = new Date().toString()
      therest["next_proceedings_date"] = new Date().toString()
      // console.log(therest)
      setstate(therest)

    }
  })
  

  return (
    <ProductConsumer>
    {
      value => {
        return(
          <div className="pl-4 pr-4">
          <div className="mb-5" style={{minWidth:"1000px"}}>
            <Title title="ADD ENTRY"/>
            <div className="d-flex mt-4 flex-wrap justify-content-evenly">
            <TextField className="mb-4 mr-1" style={{minWidth:"10px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="file number" 
            variant="outlined"
            value={Details.file_n}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"10px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case number" 
            variant="outlined"
            value={Details.case_n}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case category" 
            variant="outlined"
            value={Details.category}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case title" 
            variant="outlined"
            value={Details.caseTitle}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case supervisor" 
            variant="outlined"
            value={Details.caseSupervisor}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case worker" 
            variant="outlined"
            value={Details.caseWorker}
            />
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            disabled
            color='primary'
            id="outlined-basic" 
            label="case source" 
            variant="outlined"
            value={Details.caseSrc}
            />     
            </div>
            {/* ------------------------------------------------- */}
            <Divider style={{marginBottom:'40px',marginTop:'20px'}}/>
            {/* ------------------------------------------------- */}
            <div className="d-flex mt-4 flex-wrap justify-content-between">
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="court" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"court":value}));
            }}
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="district" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"district":value}));
            }}
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="judge" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"judge":value}));
            }}
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="other party" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"other_party":value}));
            }}
            // value={}
            /> 
            </div>
            <div className="d-flex mt-4 flex-wrap justify-content-between">
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="previous proceedings" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"previous_proceedings":value}));
            }}
            // value={}
            />
            <div className="d-flex align-items-center" style={{height:'50px'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              style={{minWidth:"300px"}}
              margin="normal"
              id="date-picker-dialog"
              label="previous proceedings date"
              variant="outlined"
              format="MM/dd/yyyy"
              value={state["prev_proceedings_date"]}
              onChange = {(e)=>{
                setstate(oldstate => ({...oldstate,"prev_proceedings_date":e.toString()}));
              }}
              KeyboardButtonProps={{
                  'aria-label': 'change date',
              }}
              />
          </MuiPickersUtilsProvider>

            </div>
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="next proceedings" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"next_proceedings":value}));
            }}
            // value={}
            />
            <div className="d-flex align-items-center" style={{height:'50px'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            style={{minWidth:"300px"}}
            margin="normal"
            id="date-picker-dialog"
            label="next proceedings date"
            variant="outlined"
            format="MM/dd/yyyy"
            value={state["next_proceedings_date"]}
            onChange = {(e)=>{
              setstate(oldstate => ({...oldstate,"next_proceedings_date":e.toString()}));
            }}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
            />
        </MuiPickersUtilsProvider>

            </div>

            </div>
            <div className="d-flex mt-4 flex-wrap justify-content-between">
            <TextField className="mb-4 mr-2" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="case clerk" 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"case_clerk":value}));
            }}
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="updated by"
            // multiline = {true} minRows={'5'} 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"updated_by":value}));
            }}
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="nature of case"
            // multiline = {true} minRows={'5'} 
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"nature_of_case":value}));
            }}
            variant="outlined"
            // value={}
            /> 
            <TextField className="mb-4 mr-1" style={{minWidth:"300px"}} 
            color='primary'
            id="outlined-basic" 
            label="remarks"
            multiline = {true} minRows={'5'} 
            variant="outlined"
            onChange = {(e)=>{
              const value = e.target.value;
              setstate(oldstate => ({...oldstate,"remarks":value}));
            }}
            // value={}
            /> 
            </div>
            
            <ButtonContainer onClick={()=>{
                    // value.addClientAndCase(location.state);
                    value.addHearingEntry(state).then((res)=>{
                      alert("hearing date added")
                      setstate({})
                      closeEntry()
                    })
                    .catch((err)=>{
                      alert("something went wrong, date not added")
                    })
                    setstate({});
            }}>Submit Entry</ButtonContainer>

          </div>
          {/* ------------------------------------------------- */}
          <Divider style={{marginBottom:'40px',marginTop:'20px'}}/>
            {/* ------------------------------------------------- */}
          </div>
        )
      }
      
    }
  </ProductConsumer>

    
  )
}


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function Tasks() {
  const [searchterm, setsearchterm] = React.useState('');
  const [file_n, setfile_n] = React.useState(-1);
  const [case_n, setcase_n] = React.useState(-1);
  const [openEntry, setopenEntry] = React.useState(false)
  const [entryDetails, setentryDetails] = React.useState([])

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
      if(searchterm===""){

        setfile_n(-1)
        setcase_n(-1)
      }
      console.log(file_n,case_n);
    })

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
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center">Dessert (100g serving)</TableCell> */}
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">FILE#</TableCell>
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
              
                    return value.peshiList.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.file_n}</TableCell>
                        <TableCell align="center">{row.case_n}</TableCell>
                        <TableCell align="center">{row.caseTitle}</TableCell>
                        <TableCell align="center">{row.nature_of_case}</TableCell>
                        <TableCell align="center">{row.category}</TableCell>
                        <TableCell align="center">{row.court}</TableCell>
                        <TableCell align="center">{row.district}</TableCell>
                        <TableCell align="center">{row.judge}</TableCell>
                        <TableCell align="center">{row.previous_proceedings}</TableCell>
                        <TableCell align="center">{row.prev_proceedings_date}</TableCell>
                        <TableCell align="center">{row.next_proceedings_date}</TableCell>
                        <TableCell align="center">{row.next_proceedings}</TableCell>
                        <TableCell align="center">{row.remarks}</TableCell>
                        <TableCell align="center">{row.caseSrc}</TableCell>
                        <TableCell align="center">{row.caseSupervisor}</TableCell>
                        <TableCell align="center">{row.caseWorker}</TableCell>
                        <TableCell align="center">{row.case_clerk}</TableCell>
                        <TableCell align="center">{row.other_party}</TableCell>
                        <TableCell align="center">{row.updated_by}</TableCell>
                        
                      </TableRow>
                    ))
                    }}
                    </ProductConsumer>
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
              {openEntry && <Entry Details={entryDetails} closeEntry={()=>{setopenEntry(false)}}/>}
              <TextField className="mb-4" style={{minWidth:"400px"}} 
                        color='primary'
                        id="outlined-basic" 
                        label="Search case" 
                        placeholder="File number/case number"
                        variant="outlined"
                        value={searchterm}
                        onChange={(query)=> setsearchterm(query.target.value.toLowerCase())} />

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
                                  <IconButton edge="end" aria-label="delete" onClick={
                                    ()=>{
                                      file["cases"][key]["file_n"] = file["id"]
                                      file["cases"][key]["case_n"] = key
                                      setentryDetails(file["cases"][key])
                                      setopenEntry(true)
                                    }
                                    }>
                                    <CreateIcon />
                                  </IconButton>
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