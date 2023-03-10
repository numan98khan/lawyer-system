import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../components/Title";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {useHistory,useLocation} from 'react-router-dom';


import { connect } from "react-redux";


import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";


// import {useHistory} from 'react-router-dom';
import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Rating from "@material-ui/lab/Rating";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

// import { loadCase } from "../../actions/caseActions";

import ItemDetails from "./DisplayItem";

const filterValues = [
  {
    name: "case title",
    value: "caseTitle",
  },
  {
    name: "additional information",
    value: "AdditionalInformation",
  },
  {
    name: "case supervisor",
    value: "caseSupervisor",
  },
  {
    name: "case worker",
    value: "caseWorker",
  },
  {
    value: "category",
    name: "category",
  },
  {
    name: "chances of success",
    value: "chancesOfSuccess",
  },
  {
    value: "clientId",
    name: "client ID",
  },
  {
    name: "criminal record",
    value: "criminalRecord",
  },
  {
    name: "case ID",
    value: "id",
  },
  {
    name: "sub category",
    value: "subCategory",
  },
];

class casesList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: 2,
    open: false,
    searchTerm: "",
    searchFilter: "category",
    cases: [],
    displayName: "",
    type: "",
  };

  componentDidMount() {
    // const type = this.context.user.type
    // const name = this.context.user.displayName
    // console.log(name)

    console.log("App.js mounting");
    console.log(this.props.userState.user.uid);

    // if type is worker
    // dispatch case filter with case worker uid

    // store.dispatch(loadCase());
  }
  componentDidUpdate() {
    // const filesList = this.context.filesList
    // const cases = []
    // if(filesList.length > 0){
    //   filesList.map((file, index)=>{
    //     for(var key in Object.keys(file.cases)){
    //       cases.push(file.cases[key])
    //     }
    //   })
    // if(cases.length !== this.state.cases.length){
    //   this.setState({
    //     cases:cases
    //   },()=>{console.log(this.state.cases)})
    // }
    // this.setState({
    //   filesList: filesList
    // },()=>console.log(this.state.filesList))
    // }
  }
  extractProduct(products, pid) {
    var newArray = products.filter(function(el) {
      // console.log(el)
      return el.id === pid;
    });

    return newArray[0];
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = () => {
    // setOpen(!open);
    this.setState({ open: !this.state.open });
  };

  handleFilter = (Case) => {
    return (
      Case[this.state.searchFilter]
        .toLowerCase()
        .indexOf(this.state.searchTerm) !== -1
    );
  };

  render() {
    // const classes = useStyles();

    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //   setOpen(false);
    // };
    // const handleToggle = () => {
    //   setOpen(!open);
    // };
    // const history = useHistory();
    const userId =
      this.props.userState &&
      this.props.userState.user &&
      this.props.userState.user.uid;
    const cases = this.props.casesState.cases;
    // Filter by Signed in Case worker or case supervisor
    const workerCases = cases.filter((item) => {
      if (this.props.userState.user.type === "admin") {
        return true;
      }
      return (
        (item.caseSupervisor === userId || item.caseWorker === userId) &&
        item[this.state.searchFilter]
          .toLowerCase()
          .indexOf(this.state.searchTerm) > -1
      );
    });

    const MyBackDrop = (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.state.open}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      </Dialog>
    );

    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <div style={{ marginBottom: "5%" }}>
              {console.log(this.props.userState.user)}
              <Title
                title={
                  this.props.userState.user.type === "worker"
                    ? "My Cases"
                    : "Our Cases"
                }
              />
            </div>
            <div
              style={{
                // backgroundColor:'blue',
                display: "flex",
                justifyContent: "space-between",
                width: "70%",
                alignItems: "center",
                paddingBottom: "2%",
              }}
            >
              <TextField
                style={{}}
                color="primary"
                id="outlined-basic"
                label="Search Cases"
                variant="outlined"
                onChange={(query) => {
                  this.setState({
                    searchTerm: query.target.value.toLowerCase(),
                  });
                }}
              />

              <FormControl style={{ minWidth: "30vw" }}>
                {/* <InputLabel id="demo-simple-select-label">search filter</InputLabel> */}
                <Select
                  variant="outlined"
                  value={this.state.searchFilter}
                  onChange={(e) => {
                    this.setState({ searchFilter: e.target.value });
                  }}
                >
                  {filterValues.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <h5>{workerCases.length} case(s)</h5>
            </div>
            <div className="row">
              <List style={{ width: "100%" }}>
                {workerCases.map((Case, index) => {
                  let clientOfCase = {};
                  this.props.clientState.clients.every((client) => {
                    if (client.id === Case.clientId ) {
                      clientOfCase = client;
                      return false;
                    }
                    return true;
                  });
                  return (
                    <ListItem
                      button
                      // onClick={() => console.log('go to details')}
                      onClick={() => {
                        this.props.history.push('/casedetails', { Case })
                      }}
                      alignItems="flex-start"
                    >
                      {
                        // <ListItemAvatar>
                        //   <Avatar alt="Remy Sharp" src='{fetchedProduct.img}' />
                        // </ListItemAvatar>
                      }
                      <ListItemText
                        // primary={Case.caseTitle}
                        primary={Case.litigationCaseTitle}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              // className={classes.inline}
                              color="textPrimary"
                            >
                              file: {Case.file_number} case: {Case.case_number}
                            </Typography>
                            {" — "}
                            {clientOfCase.title}
                            {clientOfCase.firstName}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default withRouter(casesList);

const mapStateToProps = (state) => ({
  casesState: state.cases,
  userState: state.user,
  clientState: state.client,
});
export default connect(mapStateToProps, {})(withRouter(casesList));

// <Paper elevation={3} >

//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>
