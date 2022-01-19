import React, { useState, useEffect } from 'react';
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8

import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';


import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;


function Tracker() {
    
    // {
    //     top:0,
    //     flexGrow: 1,
    //     backgroundColor: '#6600ff',
    //     color: '#6600ff'
    //   }

    const [places, setPlaces] = useState([])

    const fetchPlaces = async () => {
      fetch('places.json')
      .then((response) => response.json())
      .then((data) => setPlaces(data.results))
    }
  
    useEffect(() => {
      fetchPlaces();
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
            <GoogleMapReact
                defaultZoom={10}
                defaultCenter={[34.0522, -118.2437]}
            >
                {places.map((place) => (
                <Marker
                    key={place.id}
                    text={place.name}
                    lat={place.geometry.location.lat}
                    lng={place.geometry.location.lng}
                />
                ))}
            </GoogleMapReact>
            </Wrapper>
        </div>
        </div>
        )
}

export default Tracker
