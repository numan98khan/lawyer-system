import React, { Component, useState, Fragment } from "react";
import { ProductConsumer } from "../../context";
import Button from "../../components/Button";
import {Link} from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Title from "../../components/Title";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';



const styles = {

  searchContainer: {
    backgroundColor:'red'
  }
}


class NewCase extends Component {

    state = {
      searchTerm:''
    }

    render() {
    // const newClient = (
    //   <div style={styles.newClient}>
    //     <p>If you want to add a new client....</p>
    //   <Link to="/addclient"><Button variant="contained" color="primary">Add client</Button></Link>
    //   </div>
    // )
    // const newMatter = (
    //   <div style={styles.newMatter}>
    //       <p>Make case for existing client</p>
    //       <Link to="/casedetails"><Button variant="contained" color="primary">case details</Button></Link>
    //   </div>
    // )

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
                  return <TextField style={{width:"50%"}} 
                        color='primary'
                        id="outlined-basic" 
                        label="Search Clients" 
                        variant="outlined"
                        onChange={(query)=> {this.setState({searchTerm:query.target.value.toLowerCase()})}} />;          
              }}
            </ProductConsumer>
            <Link to="/addclient"><Button variant="contained" color="primary">Add new client</Button></Link>
            </div>
            <div className="row">

              
            

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              {/* <ItemDetails review={value.reviewDetail} />   */}
                  
              {value.clientsList.filter((client) => {

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
export default NewCase;




// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>