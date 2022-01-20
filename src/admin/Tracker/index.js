import React, { useState, useEffect, Component } from 'react';
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8

import styled from 'styled-components';
// import GoogleMapReact from 'google-map-react';


// import { GoogleMap, Marker } from "react-google-maps"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


// import Marker from './Marker';

// import { loadCase } from "./actions/caseActions";

import { connect } from 'react-redux';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;


class Tracker extends Component {

  state={
    places:[]
  }
  componentDidMount(){
    const places = []
    this.props.caseWorkers.map((worker) => {
      places.push(worker.currLocation)
    })
    this.setState({
      places: places
    },()=>console.log(this.state.places))
  }

  componentDidUpdate(){
    var isChanged = false;
    this.props.caseWorkers.map((worker, index) => {
      if (this.state.places[index] != worker.currLocation){
        isChanged = true;
        // break;
      }
      // places.push(worker.currLocation)
    })

    if (isChanged) {
      const places = []
      this.props.caseWorkers.map((worker) => {
        places.push(worker.currLocation)
      })
      this.setState({
        places: places
      },()=>console.log(this.state.places))
    
    }
  }


  render() {
    return (
      <Map google={this.props.google} 
        initialCenter={{
          lat: 33.68939,
          lng: 73.02054
        }}
       zoom={12}>
        {
          this.state.places.length > 0 &&
          this.state.places.map((place)=>{
            return(
              <Marker onClick={this.onMarkerClick}
                      name={'Current location'}
                      position={{lat: place.lat, lng: place.long}} 
                      />
            )
          })
        }
      </Map>
    );
  }
}
const mapStateToProps = (state) => ({
  // user: state.user,
  // type: state.type
  caseWorkers: state.caseworker.caseWorkers
});

const TrackerContainer = connect(mapStateToProps, { })(
  Tracker
);

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8")
})(TrackerContainer)


