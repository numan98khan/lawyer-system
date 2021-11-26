import React from "react"
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8
import GoogleMapReact from 'google-map-react';

// import { MapConsumer } from "../../contexts/mapContext.js";
import { ProductConsumer } from "../../contexts/context";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function Tracker() {
    
    // {
    //     top:0,
    //     flexGrow: 1,
    //     backgroundColor: '#6600ff',
    //     color: '#6600ff'
    //   }
    return (
        <div style={{height:'100vh', width:'100vw',  display:'flex'}}>

        <div 
        style={{ minheight: '100%', width: '100%'}}
        // style={{ flexGrow: 1 }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8" }}
                    defaultCenter={{
                        lat: 59.95,
                        lng: 30.33
                    }}
                    defaultZoom={11}
            >
                {/* <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </div>
        </div>
        )
}

export default Tracker
