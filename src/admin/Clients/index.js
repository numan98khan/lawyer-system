import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../components/Title";
import { ProductConsumer } from "../../contexts/context.js";
import { ProductContext } from "../../contexts/context.js";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


class clientList extends Component {

  state = {
    searchTerm:'',
    value:2,
    open: false,
    ids:[]
  }
  static contextType = ProductContext;

  componentDidMount(){
    if(this.context.user.type === 'worker'){
      //get all cases of this worker
      
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
          <ProductConsumer>
              {value => {
                return (<Title title={value.user.type === 'worker'?"My Clients":"Our Clients"}/>);
              }}
            </ProductConsumer>
          </div>
          <div style={{
              // backgroundColor:'blue',
            display:'flex',justifyContent:'space-between',width:'40%',alignItems:'center',paddingBottom:"2%"}}>

            <ProductConsumer>
              {value => {
                return <TextField style={{width:"100%"}}
                color='primary'
                id="outlined-basic" 
                label="Search Clients" 
                variant="outlined"
                onChange={(query)=> {this.setState({searchTerm:query.target.value.toLowerCase()})}} />;          
              }}
            </ProductConsumer>
            </div>
            <div className="row">

              
            

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              {/* <ItemDetails review={value.reviewDetail} />   */}
                  
              {value.clientsList
              // .filter((client)=>{
              //   // console.log(client.id.toString())
              //   // console.log(this.state.ids)
              //   // if(this.state.ids.includes(client.id)){
              //   //   console.log("here")
              //   // }
                
              //   return client.firstName.toLowerCase().indexOf(this.state.searchTerm) !== -1
              //         || client.lastName.toLowerCase().indexOf(this.state.searchTerm) !== -1
              //         || client.email.toLowerCase().indexOf(this.state.searchTerm) !== -1
              //         || client.cnic.toLowerCase().replace('-','').indexOf(this.state.searchTerm) !== -1
                
              // })
              .filter((client) => {

                // console.log(el)


                return client.firstName.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.lastName.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.email.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.cnic.toLowerCase().replace('-','').indexOf(this.state.searchTerm) !== -1
                })
                .map((client) => {
                // const labelId = `checkbox-list-secondary-label-${productReview}`;
                // const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div key = {client.id}>
                  <ListItem 
                    button
                    // onClick={() => console.log('go to details')} 
                    onClick={()=>{this.props.history.push({pathname:'/clientdetails',state:{clientDetails: client}})}} 
                    
                    alignItems="flex-start">
                    {

                    // <ListItemAvatar>
                    //   <Avatar alt="Remy Sharp" src='{fetchedProduct.img}' />
                    // </ListItemAvatar>
                    
                    }
                    <ListItemText
                      primary={client.firstName + ' ' + client.lastName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                          >
                            {client.companyName}
                          </Typography>
                          
                          {" — "} {client.email}
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
            }}
            </ProductConsumer>

            

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(clientList);





// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>