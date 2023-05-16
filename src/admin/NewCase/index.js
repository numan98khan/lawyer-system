
import React, { useState, useEffect, Fragment } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ButtonContainer from "../../components/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Title from "../../components/Title";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';


import { connect } from "react-redux";
import store from "../../store";

import fire, { firebaseConfig } from "../../fire";


const styles = {
  searchContainer: {
    backgroundColor: "red",
  },
};

const NewCase = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // console.log("App.js mounting")
  }, []);

  const getLatestFileAndCase = (clientId, isAppeal, file_input) => {
    return new Promise((resolve, reject) => {
      // Getting latest file and case number: Reference to the collection
      const collectionRef = fire.db.collection('cases');

      // Query to retrieve documents ordered by the number field in descending order
      const queryFile = collectionRef.orderBy('file_number', 'desc').limit(1);

      let highestFileNumber = 0;
      let highestCaseNumber = 0;

      // Execute the query
      queryFile.get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            // Get the highest number from the first document in the query result
            highestFileNumber = querySnapshot.docs[0].data().number;
            console.log('The highest number:', highestFileNumber);
          } else {
            console.log('No documents found in the collection. Thus highest number is 0');
          }

          // Query to retrieve documents ordered by the number field in descending order
          const queryCase = collectionRef.orderBy('case_number', 'desc').limit(1);
          // Execute the query
          queryCase.get()
            .then(querySnapshot => {
              if (!querySnapshot.empty) {
                // Get the highest number from the first document in the query result
                highestCaseNumber = querySnapshot.docs[0].data().number;
                console.log('The highest number:', highestCaseNumber);
              } else {
                console.log('No documents found in the collection. Thus highest number is 0');
              }

              resolve({
                file_n: highestFileNumber,
                case_n: highestCaseNumber
              });


            })
            .catch(error => {
              console.error('Error getting documents:', error);
              reject(error);
            });

        })
        .catch(error => {
          console.error('Error getting documents:', error);
          reject(error);
        });

        

          
      });
    // console.log('clientId', clientId);
    // return new Promise((resolve, reject) => {
    //   fire
    //     .getFire()
    //     .database()
    //     .ref("files")
    //     .orderByChild("client_id")
    //     .equalTo(clientId)
    //     .once("value", (snapshot) => {
    //       if (snapshot.exists()) {
    //         const fileData = snapshot.toJSON();

    //         // var fileKeys = Object.keys(fileData);

    //         const tempKeys = Object.keys(fileData);
    //         var fileKeys = tempKeys.map(key => decodeURIComponent(key));


    //         console.log('fileKeys', fileKeys)
    //         // const latestFileKey = fileKeys[fileKeys.length - 1];

            

    //         var latestFileKey = null;
    //         if (isAppeal) {
    //           // latestFileKey = latestNumericKey !== null ? latestNumericKey.toString() : null;
    //           // const searchWord = "example";
    //           const searchWord = "example";
    //           const searchRegex = new RegExp(`^${file_input}/`);

    //           const matchingKeys = fileKeys.filter(key => searchRegex.test(key));
    //           const secondParts = matchingKeys.map(key => key.split('/')[1]);

    //           const numericKeys = secondParts.filter(key => !isNaN(parseInt(key)) && !key.includes('/'));
    //           const latestNumericKey = numericKeys.length > 0 ? Math.max(...numericKeys) : null;


    //           latestFileKey = file_input.split('/')[0] + '/' + (latestNumericKey + 1);

    //           console.log(fileKeys, matchingKeys, secondParts, latestNumericKey, latestFileKey);
    //         } else {
    //           const numericKeys = fileKeys.filter(key => !isNaN(parseInt(key)) && !key.includes('/'));
    //           const latestNumericKey = numericKeys.length > 0 ? Math.max(...numericKeys) : null;
    //           // fileKeys = Object.keys(fileData);
    //           // const numericKeys = fileKeys.filter(key => !isNaN(parseInt(key)));
    //           // const latestNumericKey = numericKeys.length > 0 ? Math.max(...numericKeys) : null;
            
    //           latestFileKey = latestNumericKey !== null ? latestNumericKey.toString() : null;
            
    //         }
    //         // const latestFileKey = '0/1';

    //         console.log('fileKeys', fileKeys, latestFileKey);
  
    //         fire
    //           .getFire()
    //           .database()
    //           .ref("files/" + latestFileKey + "/cases/")
    //           .once("value")
    //           .then((caseSnapshot) => {
    //             const caseData = caseSnapshot.toJSON();
    //             const caseKeys = caseData ? Object.keys(caseData) : [];
    //             const latestCaseKey = caseKeys.length > 0 ? caseKeys[caseKeys.length - 1] : null;
  
    //             resolve({
    //               file_n: latestFileKey,
    //               case_n: latestCaseKey === null ? 0 : (parseInt(latestCaseKey) + 1).toString()
    //             });
    //           })
    //           .catch((err) => {
    //             reject(err);
    //           });
    //       } else {
    //         reject(new Error("No file found for the given client ID"));
    //       }
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
  };

  

    return (
      <Fragment>
      <div className="py-5">
        <div className={"container"}>
          <div style={{ marginBottom: "5%" }}>
            <Title title="Make new Case" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
              paddingBottom: "2%",
            }}
          >
            <TextField
              style={{ width: "83%" }}
              color="primary"
              id="outlined-basic"
              label="Search Clients"
              variant="outlined"
              onChange={(query) => {
                setSearchTerm(query.target.value.toLowerCase());
              }}
            />

            <Link to="/addclient">
              <ButtonContainer
                style={{ height: "55px", width: "55px", borderRadius: "3px" }}
              >
                <AddCircleOutlineIcon
                  color="purple"
                  fontSize="large"
                ></AddCircleOutlineIcon>
              </ButtonContainer>
            </Link>
          </div>
          <div className="row">
            <List style={{ width: "100%" }}>
              {props.clients
                .filter((client) => {
                  return (
                    client.firstName
                      .toLowerCase()
                      .indexOf(searchTerm) !== -1 ||
                    client.lastName.toLowerCase().indexOf(searchTerm) !== -1 ||
                    client.email.toLowerCase().indexOf(searchTerm) !== -1 ||
                    client.cnic
                      .toLowerCase()
                      .replace("-", "")
                      .indexOf(searchTerm) !== -1
                  );
                })
                .map((client) => {
                  return (
                    <div>
                      <ListItem
                        key={client.id}
                        alignItems="flex-start"
                      >
                        <ListItemText
                          primary={
                            client.title +
                            " " +
                            client.firstName +
                            " " +
                            client.lastName
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {client.companyName}
                              </Typography>
                              {" — "} {client.email}
                            </React.Fragment>
                          }
                        />

                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              // const latestFileAndCase = getLatestFileAndCase(location.state.clientDetails.id);
                              getLatestFileAndCase(client.id, false).then((obj)=>{
                                console.log('OBJ', obj, client.id);
                                props.history.push({
                                    pathname: "/addcasedetails",
                                    // state: { clientDetails: client, file_n: obj.file_n, case_n: obj.case_n },
                                    state: { clientId: client.id, clientDetails: client, file_n: obj.file_n, case_n: obj.case_n },
                                  });
                              });

                              // props.history.push({
                              //   pathname: "/addcasedetails",
                              //   state: { clientDetails: client },
                              // });
                            }}
                          >
                            <CreateIcon />
                            
                          </IconButton> 

                          {/* <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              // Handle the delete action here
                              getLatestFileAndCase(client.id, true, '3').then((obj)=>{
                                console.log('OBJ', obj);
                                props.history.push({
                                    pathname: "/addcasedetails",
                                    state: { clientDetails: client, file_n: obj.file_n, case_n: obj.case_n },
                                  });
                              });

                            }}
                          >
                            <OpenInNewIcon />
                          </IconButton> */}

                        </ListItemSecondaryAction>

                        
                      </ListItem>
                        <Divider
                          // variant="inset"
                          component="li"
                        />
                      </div>
                    );
                  })}
              </List>
            </div>
          </div>
        </div>
      </Fragment>
    );
}


// export default NewCase;

const mapStateToProps = (state) => ({
  // user: state.user,
  // type: state.type
  clients: state.client.clients,
});
export default connect(mapStateToProps, {})(NewCase);
