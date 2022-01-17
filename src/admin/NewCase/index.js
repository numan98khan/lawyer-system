import React, { Component, useState, Fragment } from "react";
import { ProductConsumer } from "../../contexts/context.js";
import Button from "../../components/Button";
import {Link} from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ButtonContainer from '../../components/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Title from "../../components/Title";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import { loadClients } from "../../actions/clientActions";
import { connect } from 'react-redux';
import store from '../../store';

const styles = {

  searchContainer: {
    backgroundColor:'red'
  }
}


class NewCase extends Component {

    state = {
      searchTerm:''
    }

    componentDidMount()
    {
      // console.log("App.js mounting")
      store.dispatch(loadClients());
    }

    render() {
    

    return (
      <Fragment>
      
        <div className="py-5">
          <div className={"container"}>
          <div style={{marginBottom:"5%"}}>
              <Title title="Make new Case"/>
          </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'40%',paddingBottom:"2%"}}>
            <ProductConsumer>
              {value => {
                  return <TextField style={{width:"83%"}} 
                        color='primary'
                        id="outlined-basic" 
                        label="Search Clients" 
                        variant="outlined"
                        onChange={(query)=> {this.setState({searchTerm:query.target.value.toLowerCase()})}} />;          
              }}
            </ProductConsumer>
            
            <Link to="/addclient">
            <ButtonContainer style={{height:'55px', width:'55px', borderRadius:'3px'}}>
            <AddCircleOutlineIcon color="purple" fontSize="large"></AddCircleOutlineIcon>
            </ButtonContainer>
            </Link>
            </div>
            <div className="row">

              
            

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              {/* <ItemDetails review={value.reviewDetail} />   */}
                  
              {this.props.clients.filter((client) => {

                // console.log(el)


                return client.firstName.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.lastName.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.email.toLowerCase().indexOf(this.state.searchTerm) !== -1
                      || client.cnic.toLowerCase().replace('-','').indexOf(this.state.searchTerm) !== -1
                }).map((client) => {
                // const labelId = `checkbox-list-secondary-label-${productReview}`;
                // const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div>
                  {/*MyBackDrop*/}
                  <ListItem key={client.id}
                    // button
                    // // onClick={() => console.log('go to details')} 
                    
                    // onClick={()=>{this.props.history.push({pathname:'/clientdetails',state:{clientDetails: client}})}} 
                    
                    alignItems="flex-start">
                    {

                    // <ListItemAvatar>
                    //   <Avatar alt="Remy Sharp" src='{fetchedProduct.img}' />
                    // </ListItemAvatar>
                    
                    }
                    <ListItemText
                      primary={client.title + ' ' + client.firstName + ' ' + client.lastName}
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
                    
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={
                        ()=>{this.props.history.push({pathname:'/addcasedetails',state:{clientDetails: client}})}
                        }>
                        <CreateIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
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

// export default NewCase;


const mapStateToProps = (state) => ({
  // user: state.user,
  // type: state.type
  clients:state.client.clients
});
export default connect(mapStateToProps, { loadClients })(
  NewCase
);


