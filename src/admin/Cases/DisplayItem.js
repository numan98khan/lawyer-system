import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";

// import { ButtonContainer } from "../../Button";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';


class Details extends Component {

  // static contextType = ProductContext

  constructor(props){
    super(props)
  
    // // console.log("skeet ", this.props)
  }

  state={
    reviews: [],
    isFetched: false
  }


  componentDidMount(){
    // // console.log(this.context)
    // this.getReviews(this.context.productReviews, this.context.detailProduct.id)
  }

  render() {
    // this.getReviews()
    const detailsObj = this.props.location.state.caseDetails
        
    console.log(detailsObj)

    return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>case details</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={detailsObj.id} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>client ID : {detailsObj.clientId}</h2>
                  <h4 className="tetx-title text-uppercase text-muted mt-3 mb-2">
                    case ID : <span className="text-uppercase">{detailsObj.id}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      {/* price : <span>$</span> {detailsObj.firstName} */}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Description
                  </p>
                  <p className="text-muted lead">{detailsObj.briefDescription}</p>
                  <div>
                
                    {/* <Link to="/sendoffer">
                      <ButtonContainer>Send Offer</ButtonContainer>
                    </Link> */}

                    {/* <ButtonContainer onClick={() => {
                      // console.log(value.productReviews)
                      this.getReviews(value.productReviews, value.detailProduct.id, value.userData)
                    }}>Check Reviews</ButtonContainer>
                 */}
                </div>
                </div>
              </div>
                {
                  // list.map((l, i) => (
                  // // console.log(this.state.reviews)
                  this.state.reviews.map((review, i) => (
                    <div>
                    {/*MyBackDrop*/}
                    {/*<ReviewDetails review={productReview} />*/}  
                    <ListItem 
                    //onClick={value.handleRDetailToggle} 
                    alignItems="flex-start">
                      {
                      <ListItemAvatar>
                        <Avatar alt={review.productName} />
                      </ListItemAvatar>
                      }
                      <ListItemText
                        primary={review.username}
                        secondary={
                          <React.Fragment>
                            {/*<Typography
                              component="span"
                              variant="body2"
                              // className={classes.inline}
                              color="textPrimary"
                            >
                              Ali Connors
                            </Typography>*/}
                            <Rating
                              readOnly
                              size="small"
                              name="simple-controlled"
                              value={review.rating}
                              // onChange={(event, newValue) => {
                              //   this.setState(newValue);
                              // }}
                            />
                            {" — "} {review.review}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </div>
                
                  ))
                }
              
            </div>
    );
  }
}
export default Details;
