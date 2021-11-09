import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../components/Title";
import { ProductConsumer } from "../../context";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ProductContext } from "../../context";

import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// // import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

// import {useHistory} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import ItemDetails from './DisplayItem';

const filterValues = [
  {
    name:"additional information",
    value:"AdditionalInformation",
  },
  {
    name:"case supervisor",
    value:"caseSupervisor",
  },
  {
    name:"case worker",
    value:"caseWorker",
  },
  {
    value:"category",
    name:"category"
  },
  {
    name:"chances of success",
    value:"chancesOfSuccess"
  },
  {
    value:"clientId",
    name:"client ID"
  },
  {
    name:"criminal record",
    value:"criminalRecord"
  },
  {
    name:"case ID",
    value:"id",
  },
  {
    name:"sub category",
    value:"subCategory"
  }


]


class casesList extends Component {
  constructor(props){
    super(props)
  }
  state = {
    value:2,
    open: false,
    searchTerm:'',
    searchFilter:'category',
    cases:[]
  }
  
  static contextType = ProductContext;

  componentDidUpdate(){
    const filesList = this.context.filesList
    const cases = []
    if(filesList.length > 0){
      filesList.map((file, index)=>{
        for(var key in Object.keys(file.cases)){
          cases.push(file.cases[key])
        }
      })
    if(cases.length !== this.state.cases.length){
      this.setState({
        cases:cases
      },()=>{console.log(this.state.cases)})
    }
      // this.setState({
      //   filesList: filesList
      // },()=>console.log(this.state.filesList))
    }
  }
  extractProduct(products, pid){
    var newArray = products.filter(function (el) {
      // console.log(el)
      return el.id === pid
    });
    
    return newArray[0];
  } 
  
  handleClose = () => {
    this.setState({open: false});
  }
  
  handleToggle = () => {
    // setOpen(!open);
    this.setState({open: !this.state.open});
  }
  
  handleFilter = (Case) => {

      // console.log(el)
      return Case[this.state.searchFilter].toLowerCase().indexOf(this.state.searchTerm) !== -1
      
  }
  
  render() {
    // const classes = useStyles();
    
    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
      //   setOpen(false);
      // };
      // const handleToggle = () => {
        //   setOpen(!open);
        // };
        // const history = useHistory();


    const MyBackDrop = <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>

              </Dialog>

    return (
      <Fragment>
      
        <div className="py-5">
          <div className="container">
            <div style={{marginBottom:"5%"}}>
              <Title title="Our Cases"/>
            </div>
            <div style={{
              // backgroundColor:'blue',
            display:'flex',justifyContent:'space-between',width:'70%',alignItems:'center',paddingBottom:"2%"}}>

            <ProductConsumer>
              {value => {
                return <TextField style={{}} 
                color='primary'
                id="outlined-basic" 
                label="Search Cases" 
                variant="outlined"
                onChange={(query)=> {this.setState({searchTerm:query.target.value.toLowerCase()})}} />;          
              }}
            </ProductConsumer>
            
            <FormControl style={{minWidth:"30vw"}}>
              {/* <InputLabel id="demo-simple-select-label">search filter</InputLabel> */}
                <Select
                variant = "outlined"
                value={this.state.searchFilter}
                onChange={(e)=>{
                  this.setState({searchFilter:e.target.value})
                }}
                >
                  {
                    filterValues.map((item,index)=>{
                      return <MenuItem key = {index} value={item.value}>{item.name}</MenuItem>
                    })
                  }
                </Select>
            </FormControl>
            <ProductConsumer>
              {value => {

                return <h5>{this.state.cases
                  .filter((Case)=> this.handleFilter(Case))
                  .length} case(s)</h5>
              }

              }
            </ProductConsumer>
              </div>
            <div className="row">

              
            

            {/* <ProductConsumer> */}
              <List style={{width:'100%'}}>
            {
              this.state.cases.filter((Case)=> {return this.handleFilter(Case)}).map((Case, index)=>{
                return(
                  <ListItem 
                    button
                    // onClick={() => console.log('go to details')} 
                    onClick={()=>{}} 
                    
                    alignItems="flex-start">
                    {

                    // <ListItemAvatar>
                    //   <Avatar alt="Remy Sharp" src='{fetchedProduct.img}' />
                    // </ListItemAvatar>
                    
                    }
                    <ListItemText
                      primary={Case.caseTitle}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                          >
                            {Case.caseSupervisor}
                          </Typography>
                          
                          {" — "} {Case.category}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )      
              })
            }
            </List>
            {/* </ProductConsumer> */}

            

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(casesList);





// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>