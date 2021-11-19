import React, { Component } from "react";
import { ProductConsumer } from "../../contexts/context.js";

class Home extends Component {
  
    state={
        expanded: false
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{"ConsultationsE"}</h1>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export default Home;




// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>