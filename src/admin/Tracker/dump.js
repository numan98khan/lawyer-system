import React from "react"
// AIzaSyDVtDW0vjeyc6t1NR5QYU4mkGKMeO-cxI8
import { Map, Marker, Overlay  } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers';

// import { MapConsumer } from "../../contexts/mapContext.js";
import { ProductConsumer } from "../../contexts/context";


const MAPTILER_ACCESS_TOKEN = 'ugx3SUzCbZi1T3jHFl6u'
const MAP_ID = 'basic'

function mapTiler (x, y, z, dpr) {
  return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
}


function Tracker() {
    

    return (
            <div style={{height:"100vh"}}
                className="d-flex"
            > 

                <div className="col-3 mapPanel"></div>
                <div 
                    className="col-9" 
                    style={{height:"100%", width:"100%", padding:"0"}}>
                    <Map 
                        provider={mapTiler}
                        defaultCenter={[33.6772175, 73.0209276]} 
                        defaultZoom={11}>
                        
                        
                        {/* <Marker width={40} anchor={[33.6772175, 73.0209276]} /> */}

                        <ProductConsumer>
                            {value => {
                            // console.log(value.workerCoords)
                            // <Marker width={40} anchor={[33.69656, 73.06279]} />
                            return value.workerCoords !== undefined && value.workerCoords.map((row, idx) => (
                                // <li>row</li>
                                // console.log(parseFloat(row['long']), parseFloat(row['lat']))
                                // <Marker key={idx} width={50} anchor={[parseFloat(row['long']), parseFloat(row['lat'])]} />
                                // <Marker key={idx} width={40} anchor={[33.6772175, 73.0209276]} />
                            
                                <div className="bg-primary"><Marker key={idx} width={40} anchor={[33.69656, 73.06279]} /></div>

                            ))}}                        
                        </ProductConsumer>

                        {/* <Marker width={40} anchor={[33.69656, 73.06279]} />
                        <Marker width={40} anchor={[33.6964, 73.0627]} /> */}

                    </Map>
                </div>
            </div>
        )
}

export default Tracker
