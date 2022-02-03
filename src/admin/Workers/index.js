import React, { useState, useEffect, Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ButtonContainer from "../../components/Button";
import { Link } from "react-router-dom";
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8

import styled from "styled-components";
// import GoogleMapReact from 'google-map-react';

// import { GoogleMap, Marker } from "react-google-maps"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

// import Marker from './Marker';

// import { loadCase } from "./actions/caseActions";

import { connect } from "react-redux";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const containerStyle = {
  position: "relative",
  // width: '90vw',
  height: "92.1vh",
};

const sidebar = {
  // backgroundColor:'green',
  padding: "12px",
  paddingRight: "0",
  height: "92vh",
  width: "400px",
  overflow: "scroll",
};

const workerList = {
  listStyleType: "none",
  paddingLeft: "0px",
  lineHeight: "3",
};

const parentContainer = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  width: "100%",
};

const sidebarContainer = {
  height: "100%",
  width: "100%",
  // backgroundColor:'magenta'
};

class Tracker extends Component {
  state = {
    searchTerm: "",
    places: [],
    center: {
      lat: "",
      long: "",
    },
  };

  componentDidMount() {
    const places = [];
    this.props.caseWorkers.map((worker) => {
      const place = worker.currLocation;
      place["scaleX"] = 50;
      place["scaleY"] = 50;
      place["id"] = worker.id;
      places.push(place);
    });
    this.setState(
      {
        places: places,
        center: {
          lat: 33.68939,
          long: 73.02054,
        },
      },
      () => console.log(this.state.places)
    );
  }

  componentDidUpdate() {
    var isChanged = false;
    this.props.caseWorkers.map((worker, index) => {
      if (this.state.places[index] != worker.currLocation) {
        isChanged = true;
        // break;
      }
      // places.push(worker.currLocation)
    });

    if (isChanged) {
      const places = [];
      this.props.caseWorkers.map((worker) => {
        const place = worker.currLocation;
        place["scaleX"] = 50;
        place["scaleY"] = 50;
        place["id"] = worker.id;
        places.push(worker.currLocation);
      });
      this.setState(
        {
          places: places,
        },
        () => console.log(this.state.places)
      );
    }
  }

  onMarkerClick = (lat, long) => {
    this.setState({
      center: { lat: lat, long: long },
    });
  };

  render() {
    return (
      <div style={parentContainer}>
        <div style={sidebar}>
          <div style={sidebarContainer}>
            <div
              style={{
                // backgroundColor:'blue',
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div style={{ width: "78%" }}>
                <TextField
                  className="w-100"
                  color="primary"
                  id="outlined-basic"
                  label="Search workers"
                  variant="outlined"
                  onChange={(query) => {
                    this.setState({
                      searchTerm: query.target.value.toLowerCase(),
                    });
                  }}
                />
              </div>
              <div>
                <Link to="/addWorker">
                  <ButtonContainer
                    style={{
                      height: "55px",
                      width: "55px",
                      borderRadius: "3px",
                    }}
                  >
                    <AddCircleOutlineIcon
                      color="purple"
                      fontSize="large"
                    ></AddCircleOutlineIcon>
                  </ButtonContainer>
                </Link>
              </div>
            </div>
            <ul style={workerList}>
              {this.props.caseWorkers
                .filter((worker) => {
                  return (
                    worker.firstName
                      .toLowerCase()
                      .indexOf(this.state.searchTerm) !== -1 ||
                    worker.lastName
                      .toLowerCase()
                      .indexOf(this.state.searchTerm) !== -1 ||
                    worker.displayName
                      .toLowerCase()
                      .indexOf(this.state.searchTerm) !== -1 ||
                    worker.email
                      .toLowerCase()
                      .indexOf(this.state.searchTerm) !== -1 ||
                    worker.cnic
                      .toLowerCase()
                      .replace("-", "")
                      .indexOf(this.state.searchTerm) !== -1
                  );
                })
                .map((worker) => {
                  console.log(worker);
                  return (
                    <div>
                      <ListItem
                        button
                        onMouseEnter={() => {
                          for (var i = 0; i < this.state.places.length; i++) {
                            if (this.state.places[i].id === worker.id) {
                              const newPlaces = this.state.places;
                              newPlaces[i]["scaleX"] = 70;
                              newPlaces[i]["scaleY"] = 70;
                              this.setState({
                                places: newPlaces,
                              });
                              break;
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          for (var i = 0; i < this.state.places.length; i++) {
                            if (this.state.places[i].id === worker.id) {
                              const newPlaces = this.state.places;
                              newPlaces[i]["scaleX"] = 50;
                              newPlaces[i]["scaleY"] = 50;
                              this.setState({
                                places: newPlaces,
                              });
                              break;
                            }
                          }
                        }}
                        onClick={() => {
                          this.setState({
                            center: {
                              lat: worker.currLocation.lat,
                              long: worker.currLocation.long,
                            },
                          });
                        }}
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar alt={""} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={worker.displayName}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                // className={classes.inline}
                                color="textPrimary"
                              >
                                {worker.email}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
        <Map
          google={this.props.google}
          containerStyle={containerStyle}
          center={{
            lat: this.state.center.lat,
            lng: this.state.center.long,
          }}
          zoom={12}
        >
          {this.state.places.length > 0 &&
            this.state.places.map((place) => {
              return (
                <Marker
                  onClick={() => this.onMarkerClick(place.lat, place.long)}
                  name={"Current location"}
                  position={{ lat: place.lat, lng: place.long }}
                  icon={{
                    url: require("../../images/person.png"),
                    scaledSize: new this.props.google.maps.Size(
                      place.scaleX,
                      place.scaleY
                    ),
                  }}
                />
              );
            })}
        </Map>
      </div>
      // <div style={parentContainer}>
      //   <div style={leftContainer}>
      //     <div className="display-4">Case Workers</div>
      //   </div>
      //   <div style={rightContainer}>

      //   </div>

      // </div>
    );
  }
}
const mapStateToProps = (state) => ({
  // user: state.user,
  // type: state.type
  caseWorkers: state.caseworker.caseWorkers,
});

const TrackerContainer = connect(mapStateToProps, {})(Tracker);

export default GoogleApiWrapper({
  apiKey: "AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8",
})(TrackerContainer);
