import React from 'react'
import { ProductConsumer } from "../../contexts/context.js";

function index() {
    return(
    <ProductConsumer>
        {value => {
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{"Client Home"}</h1>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>);
}

export default index
