import React,{Fragment} from "react"
import Title from "../../components/Title";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ButtonContainer from '../../components/Button';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {loadCaseWorkers} from "../../actions/caseWorkersActions";
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

import {useHistory} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


function Workers(props) {
  const history = useHistory()
  const [searchTerm, setsearchTerm] = React.useState('')

  React.useEffect(() => {
    props.loadCaseWorkers();
  }, [])
    return (
        <Fragment>
      
        <div className="py-5">
          <div className="container">
          <div style={{marginBottom:"5%"}}>
              <Title title="Manage Workers"/>
          </div>
          <div style={{
              // backgroundColor:'blue',
            display:'flex',justifyContent:'space-between',width:'40%',alignItems:'center',paddingBottom:"2%"}}>
            <div style={{width:"83%"}}>
                    <TextField
                className="w-100"
                color='primary'
                id="outlined-basic" 
                label="Search workers" 
                variant="outlined"
                onChange={(query)=> {setsearchTerm(query.target.value.toLowerCase())}} />
                    </div>
            <div>

            <ButtonContainer style={{height:'55px', width:'55px', borderRadius:'3px'}} onClick={()=>{
               history.push({pathname:'/addWorker',
              //  state:{clientDetails:payload}
              })
                }}>
            <AddCircleOutlineIcon color="purple" fontSize="large"></AddCircleOutlineIcon>
            </ButtonContainer>
            </div>
            </div>
            <List style={{width:'100%'}}>
            {                  
              props.worker.caseWorkers.filter((worker) => {
                
                return worker.firstName.toLowerCase().indexOf(searchTerm) !== -1
                      || worker.lastName.toLowerCase().indexOf(searchTerm) !== -1
                      || worker.displayName.toLowerCase().indexOf(searchTerm) !== -1
                      || worker.email.toLowerCase().indexOf(searchTerm) !== -1
                      || worker.cnic.toLowerCase().replace('-','').indexOf(searchTerm) !== -1
                }).map((worker) => {
                // const labelId = `checkbox-list-secondary-label-${productReview}`;
                // const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div key = {worker.displayName}>
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
                      primary={worker.title + ' ' + worker.lastName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                          >
                            {worker.displayName}
                          </Typography>
                          
                          {" — "} {worker.email}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider 
                  // variant="inset" 
                  component="li" />
                  </div>
              );
              })}

              
                
            
              </List>
            

          </div>
        </div>
      </Fragment>
    )
}

const mapStateToProps = (state) => ({
  worker: state.caseworker
});
export default connect(mapStateToProps, { loadCaseWorkers })(
  Workers
);

