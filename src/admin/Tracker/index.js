import React, { useState, useEffect } from 'react';
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8

import styled from 'styled-components';
// import GoogleMapReact from 'google-map-react';


import { GoogleMap, Marker } from "react-google-maps"


// import Marker from './Marker';

// import { loadCase } from "./actions/caseActions";

import { connect } from 'react-redux';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;


function Tracker(props) {
    
    // {
    //     top:0,
    //     flexGrow: 1,
    //     backgroundColor: '#6600ff',
    //     color: '#6600ff'
    //   }
    // 33.6844, 73.0479

    // const [places, setPlaces] = useState([{currLocation: {lat:'33.6844', long:'73.0479'}}])
    const [places, setPlaces] = useState([])

    const fetchPlaces = async () => {
      fetch('places.json')
      .then((response) => response.json())
      .then((data) => setPlaces(data.results))
    }
  
    useEffect(() => {
      // fetchPlaces();

      // setPlaces(props.caseWorkers)
      

      // console.log(props.caseWorkers)

      // console.log(places)

      props.caseWorkers.map((place) => {
        setPlaces(places => [...places, place]);

      })


    }, [])
  
    if (!places || places.length === 0) {
      return null;
    }

    
    return (
        <div style={{height:'100vh', width:'100vw',  display:'flex'}}>

        <div 
        style={{ minheight: '100%', width: '100%'}}
        // style={{ flexGrow: 1 }}
        >

      <Wrapper>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={[33.6844, 73.0479]}
            >
                {places.length > 0 && places.map((place, index) => (
                  // console.log(place['currLocation']['lat'])
                  <Marker
                    // key={index}
                    // text={'place.name'}
                    // lat={place['currLocation']['lat']}
                    // lng={place['currLocation']['long']}

                    position={{ 
                              lat: place['currLocation']['lat'], 
                              lng: place['currLocation']['long'] 
                            }}

                    // lat={'33.6844'}
                    // lng={'73.0479'}

                />
                ))}
            </GoogleMap>
            </Wrapper>
        
         </div>
        </div>
        )
}

// export default Tracker


const mapStateToProps = (state) => ({
  // user: state.user,
  // type: state.type
  caseWorkers: state.caseworker.caseWorkers
});

export default connect(mapStateToProps, { })(
  Tracker
);
