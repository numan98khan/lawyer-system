import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";

// import { ButtonContainer } from "../../Button";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Rating from "@material-ui/lab/Rating";

class Details extends Component {
  // static contextType = ProductContext

  constructor(props) {
    super(props);

    // console.log("skeet ", this.props);
  }

  state = {
    Cases: [],
    isFetched: false,
    detailsObj: {},
  };
  getCases(Cases, id, userData) {
    // console.log("skeet ", id, this.state.isFetched)
    // if (this.state.isFetched === false){
    // console.log('ok we are here')
    var newArray = Cases.filter(function(el) {
      return el.productId === id;
    });

    var i;
    for (i = 0; i < newArray.length; ++i) {
      // console.log('userData', userData)
      newArray[i]["username"] = userData.filter(function(el) {
        return el.id === newArray[i].buyerId;
      })[0].FirstName;
      // console.log('username', newArray[i]['username'])
    }

    // console.log(Cases)

    this.setState({ Cases: newArray });
    this.setState({ isFetched: true });
    // console.log("dsgwif",this.state.Cases)
    // }
  }

  componentDidMount() {
    console.log(this.props.location.state.clientDetails);
    const files = this.props.cases.files;
    const detailsObj = this.props.location.state.clientDetails;
    const reg_time = detailsObj.registration_time.split("@");
    var date = reg_time[0].split("/");
    date = new Date(date[2], date[1] - 1, date[0]);
    detailsObj.reg_time = date.toDateString();
    //get the file number of client
    Object.keys(files).every((fileN) => {
      if (files[fileN].client_id === detailsObj.id) {
        detailsObj["file_number"] = fileN;
        return false;
      }
      return true;
    });

    console.log(detailsObj);
    this.setState({
      detailsObj: detailsObj,
    });
  }

  render() {
    // this.getCases()

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
            <h1 className="text-capitalize">
              {this.state.detailsObj.title} {this.state.detailsObj.firstName}{" "}
              {this.state.detailsObj.lastName}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <img
              src={
                "https://listverse.com/wp-content/uploads/2019/03/Javed-Iqbal-younger.jpg"
              }
              className="img-fluid"
              alt="product"
            />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <p className="text-capitalize font-weight-bold mb-0">File #</p>
            <p className="text-capitalize mb-0">
              {this.state.detailsObj.file_number}
            </p>
            <Divider className="mt-2" />

            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              Address
            </p>
            <p className="text-capitalize mb-0">
              {this.state.detailsObj.address}
            </p>
            <Divider className="mt-2" />

            <p className="text-capitalize font-weight-bold mt-3 mb-0">CNIC</p>
            <p className="text-capitalize mb-0">{this.state.detailsObj.cnic}</p>
            <Divider className="mt-2" />

            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              contact number
            </p>

            <p className="text-capitalize mb-0">
              {this.state.detailsObj.contactNumber}
            </p>
            <Divider className="mt-2" />

            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              registered on
            </p>

            <p className="text-capitalize mb-0">
              {this.state.detailsObj.reg_time}
            </p>
            <Divider className="mt-2" />

            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              works at
            </p>

            <p className="text-capitalize mb-0">
              {this.state.detailsObj.companyName}
            </p>
            {/* <p className="text-muted lead">{this.state.detailsObj.firstName}</p> */}
            <div>
              {/* <Link to="/sendoffer">
                      <ButtonContainer>Send Offer</ButtonContainer>
                    </Link> */}

              {/* <ButtonContainer onClick={() => {
                      // console.log(value.productCases)
                      this.getCases(value.productCases, value.detailProduct.id, value.userData)
                    }}>Check Cases</ButtonContainer>
                 */}
            </div>
          </div>
        </div>
        <div className="h2 mt-3 mb-2">CASES</div>

        <div
          style={{ maxHeight: "320px" }}
          className="overflow-auto border rounded"
        >
          {this.props.cases.cases
            .filter((Case) => {
              return this.state.detailsObj.id === Case.clientId;
            })
            .map((Case, i) => (
              <div>
                <ListItem 
                button
                onClick={() => {
                  this.props.history.push('/casedetails', { Case })
                }}
                alignItems="flex-start">

                  {/* {
                    <ListItemAvatar>
                      <Avatar alt={""} />
                    </ListItemAvatar>
                  } */}
                  <ListItemText
                    primary={Case.litigationCaseTitle}
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
                        {" — "} {Case.briefDescription}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider className="mt-2" />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cases: state.cases,
});
export default connect(mapStateToProps, {})(Details);
