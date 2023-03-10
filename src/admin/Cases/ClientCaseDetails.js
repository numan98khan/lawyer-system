import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  Grid,
  Paper,
  Box,
} from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';

const CaseDetailPage = () => {
  const history = useHistory();

  const caseData = history.location.state?.Case;

  if (!caseData) {
    return <div>No case data found.</div>;
  }

  const { clientDetails, contactPerson, otherPartyDetails } = caseData;

  const tempCaseData = cloneDeep(caseData);

  // console.log('caseData', caseData)

  // 
  delete tempCaseData.clientDetails;
  delete tempCaseData.contactPerson;
  delete tempCaseData.otherPartyDetails;

  

 
  function generateDetailsSection(title, details) {

    // console.log(details);
    if (details === undefined) {
      return <div>Data not loaded yet.</div>
    }
    const keys = Object.keys(details);
  
    return (
      <Box mt={4}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Grid container spacing={2}>
          {keys.map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <Paper>
                <Box p={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    {key[0].toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="body1">{details[key]}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  
  
  

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1">
          Case Details
        </Typography>
        <Divider />
      </Box>

      {generateDetailsSection('Client Details', clientDetails)}
      {generateDetailsSection('Other Party Details', otherPartyDetails)}
      {generateDetailsSection('Contact Person', contactPerson)}
      {generateDetailsSection('Case Information', tempCaseData)}




    </Container>
    );
}

export default CaseDetailPage;