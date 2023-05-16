import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SmallInput from "../../components/SmallInput";
import Title from "../../components/Title";
import ButtonContainer from "../../components/Button";


import Grid from "@material-ui/core/Grid";
import {
  Chip
} from "@material-ui/core";


import { useHistory } from 'react-router-dom';
import createPdf from "./createPDF";

import InternalType from "./InternalType";
import OutsideType from "./OutsideType";


import "./InvoiceForm.css"

const invoiceSubTypes = [
  "Retainership Fees", 
  "Professional Fees", 
  "Miscellaneous Fees", 
  // "Traveling Expenses"
];

const invoiceSubTypesInternal = [
  // "Certified Copy Of Order Sheet", 
  "Copy Of Order Sheet", 
  // "Certified Copy Of Judgement", 
  "Copy Of Judgement",
  // "Case Laws",
  "Copies Of Case Laws",
  "Filing Expense",
  "Other Photocopies",
  "Citations",
  "Binding Expense",
  "Other"
];

const optionsInvoiceType = [
  {
    name: "Internal",
    value: "Internal",
  },{
    name: "Outside",
    value: "Outside",
  },

];

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month} ${year}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}





  

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: '100%', // This ensures the accordion takes up the full width of its parent
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        minWidth: "100%", // you can adjust this to your preferred percentage
        maxWidth: "60%", // this is also adjustable based on your preference
        // height: '100%',
        // backgroundColor: '#fed',
      },
      formParticulars: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        // minWidth: "100%", // you can adjust this to your preferred percentage
        // maxWidth: "60%", // this is also adjustable based on your preference
        // height: '100%',
        // backgroundColor: '#1e4',
      },
      heading: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
      },
}));

function CourtForm() {
  const classes = useStyles();
  const [courtName, setCourtName] = useState("");
  const [invoiceType, setInvoiceType] = useState("Outside");

  const history = useHistory();
  const caseData = history.location.state?.Case;

  const handleInvoiceInputChange = (event) => {
    setInvoiceType(event.target.value);
    console.log(event.target.value);
    if (event.target.value === 'Outside') {
      setAmounts({
        "Retainership Fees": null, 
        "Professional Fees": null, 
        "Miscellaneous Fees": null, 
        "Traveling Expenses": {
          "Travel Charges": null,
          "Toll Tax": null,
          "Daily Allowance": null
        }
      });
    } else if (event.target.value === 'Internal') {
      setAmounts({
        "Copy Of Order Sheet": {
          "Certified": null,
          "Amount": null
        },
        "Copy Of Judgement": {
          "Certified": null,
          "Amount": null
        },
        "Copies Of Case Laws": null,
        "Filing Expense": null,
        "Other Photocopies": null,

      });
    }
  };

  const handleCourtChange = (event) => {
    setCourtName(event.target.value);
  };

  const [naBenchChecked, setNaBenchChecked] = useState(false);
  const [naTehsilChecked, setNaTehsilChecked] = useState(false);
  const [naCourtChecked, setNaCourtChecked] = useState(false);

  

  const [pdfSource, setPDFSource] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('My Invoice Submit');
  };

  // const [particulars, setParticulars] = useState([]);
  const [particulars, setParticulars] = useState(['Item # 1', "Item # 2"]);
  const [newParticular, setNewParticular] = useState('');

  // const [amounts, setAmounts] = useState([]);
  // const [amounts, setAmounts] = useState(['80000', '9342']);
  const [amounts, setAmounts] = useState({
    "Retainership Fees": null, 
    "Professional Fees": null, 
    "Miscellaneous Fees": null, 
    "Traveling Expenses": {
      "Travel Charges": null,
      "Toll Tax": null,
      "Daily Allowance": null
    }
  });

  const handleAmountChange = (category, subcategory, value) => {
    const numberValue = Number(value);
    setAmounts(prevState => {
        if(subcategory) {
            return {
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [subcategory]: numberValue
                }
            }
        } else {
            return {
                ...prevState,
                [category]: numberValue
            }
        }
    });
};


  const [newAmount, setNewAmount] = useState('');

  const handleNewParticularChange = (event) => {
    setNewParticular(event.target.value);
  };

  const addParticular = () => {
    setParticulars([...particulars, newParticular]);
    setAmounts([...amounts, newAmount]);
    setNewParticular('');
    setNewAmount('');
  };

  const handleNewAmountChange = (event) => {
    setNewAmount(event.target.value);
  };

  const deleteParticular = (indexToDelete) => {
    setParticulars(particulars.filter((_, index) => index !== indexToDelete));
    setAmounts(amounts.filter((_, index) => index !== indexToDelete));
  };

  const [selectInvoiceSubTypes, setSelectInvoiceSubTypes] = useState([]);
  const [selectInvoiceSubTypesInternal, setSelectInvoiceSubTypesInternal] = useState([]);

  const handleSubTypeClick = (tag) => {
    // Check if the tag is already selected
    if (selectInvoiceSubTypes.includes(tag)) {
      // If selected, remove it from the selected list
      setSelectInvoiceSubTypes(selectInvoiceSubTypes.filter((selectedTag) => selectedTag !== tag));
    } else {
      // If not selected, add it to the selected list
      setSelectInvoiceSubTypes([...selectInvoiceSubTypes, tag]);
    }
  };

  
  const handleSubTypeClickInternal = (tag) => {
    // Check if the tag is already selected
    if (selectInvoiceSubTypesInternal.includes(tag)) {
      // If selected, remove it from the selected list
      setSelectInvoiceSubTypesInternal(selectInvoiceSubTypesInternal.filter((selectedTag) => selectedTag !== tag));
    } else {
      // If not selected, add it to the selected list
      setSelectInvoiceSubTypesInternal([...selectInvoiceSubTypesInternal, tag]);
    }
  };

  const [expanded, setExpanded] = React.useState(null);

  const [nameOverride, setNameOverride] = React.useState(null);
  const [addressOverride, setAddressOverride] = React.useState(null);
  const [phoneOverride, setPhoneOverride] = React.useState(null);
  const handleNameOverrideChange = (event) => {
    setNameOverride(event.target.value);
  };
  
  const handleAddressOverrideChange = (event) => {
    setAddressOverride(event.target.value);
  };
  
  const handlePhoneOverrideChange = (event) => {
    setPhoneOverride(event.target.value);
  };

  const [traderType, setTraderType] = React.useState('Sole Trader');
  const [letterheadVisibility, setLetterheadVisibility] = React.useState(false);


  return (

<div>
    {/* <Title title={breadCrumbs} extraSpace leftSpace /> */}
    <div 
        className="form-container"
        >
      
      {/* <Navigation step={step} setStep={setStep} /> */}
        
      <div 
        className="form"
      >
        
        {/* <Title title="CRUMBS" extraSpace leftSpace /> */}
        <form 
            className="sub-form" 
            onSubmit={handleSubmit}
        >
{/* <h2 className={classes.heading}>Court Details</h2> */}
<Title title="Invoice Request" extraSpace/>
      

    <div className={classes.formParticulars}>
      


        <Grid container spacing={3}>

          <Grid item xs={5}>
            {/* <h3>Particulars</h3> */}
            <FormControl className={classes.formControl}>
      
        
              <InputLabel >Invoice Type</InputLabel>
              <Select


                value={invoiceType}
                onChange={handleInvoiceInputChange}


              >
                {optionsInvoiceType.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>

            </FormControl>

            <div style={{ 
              // overflow: 'auto', 
              display: 'flex', 
              gap: '1rem',
              // width: '100%' 
              // flexWrap: 'wrap'  // Add this line
              marginBottom: '0.4em' // Add margin-bottom to create a gap

              }}>
              <SmallInput 
                value={nameOverride}
                onChange={handleNameOverrideChange}
                label="Name" />
              <SmallInput 
                value={phoneOverride}
                onChange={handlePhoneOverrideChange}
                label="Phone Number" />
            </div>
            <SmallInput 
              value={addressOverride}
              onChange={handleAddressOverrideChange}
              label="Address"
            />

            <div style={{ 
              // overflow: 'auto', 
              display: 'flex', 
              // gap: '1rem',
              // width: '100%' 
              // flexWrap: 'wrap'  // Add this line
              marginBottom: '0.4em' // Add margin-bottom to create a gap

              }}>
            <Chip
              //  key={particular}
               label={traderType}
               className={classes.chip}
               color={(traderType === 'Sole Trader') ? "secondary" : 'primary'}
               onClick={(event) => {
                
                if (traderType === 'Sole Trader') {
                  setTraderType('Partnership')
                } else {
                  setTraderType('Sole Trader')
                }
         
               
               }}

               style={{ marginLeft: '8px', marginTop: '8px'  }}  // Add margin-bottom for gap
             />

            <Chip
              //  key={particular}
               label={letterheadVisibility ? "Letterhead: Enabled" : "Letterhead: Disabled"}
               className={classes.chip}
               color={letterheadVisibility ? "primary" : undefined}
               onClick={(event) => {
                
                if (letterheadVisibility) {
                  setLetterheadVisibility(false)
                } else {
                  setLetterheadVisibility(true)
                }
         
               
               }}

               style={{ marginLeft: '8px', marginTop: '8px' }}  // Add margin-bottom for gap
             />
             </div>

            <Title title="Particulars" subHeading />

            <div style={{ 
                height: '54vh', 
                overflow: 'auto', 
                paddingTop: 10, 
                width: '100%',
                padding: 10,
                borderRadius: '10px', // This gives the div rounded edges
                backgroundColor: '#f2f2f2' // This gives it a light grey background color
              
                }}>

                {invoiceType === 'Internal' ? (<InternalType  
                  expanded={expanded}
                  setExpanded={setExpanded}
                  invoiceType={invoiceType}
                  selectInvoiceSubTypes={selectInvoiceSubTypes}
                  invoiceSubTypes={invoiceSubTypes}
                  invoiceSubTypesInternal={invoiceSubTypesInternal}
                  selectInvoiceSubTypesInternal={selectInvoiceSubTypesInternal}
                  handleSubTypeClick={handleSubTypeClick}
                  handleSubTypeClickInternal={handleSubTypeClickInternal}
                  handleAmountChange={handleAmountChange} />) : (
                  <OutsideType  
                    expanded={expanded}
                    setExpanded={setExpanded}
                    invoiceType={invoiceType}
                    selectInvoiceSubTypes={selectInvoiceSubTypes}
                    invoiceSubTypes={invoiceSubTypes}
                    invoiceSubTypesInternal={invoiceSubTypesInternal}
                    selectInvoiceSubTypesInternal={selectInvoiceSubTypesInternal}
                    handleSubTypeClick={handleSubTypeClick}
                    handleSubTypeClickInternal={handleSubTypeClickInternal}
                    handleAmountChange={handleAmountChange}
                  />
                  )
                }
                  
           

            </div>
          </Grid>
          <Grid item xs={7}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title title="PDF Preview" subHeading/>
            <ButtonContainer
            onClick={() => {

                let itemList;
                if (invoiceType === 'Internal'){
                  itemList = selectInvoiceSubTypesInternal;
                  console.log(selectInvoiceSubTypesInternal)
                  
                } else {
                  itemList = selectInvoiceSubTypes;
                  console.log(selectInvoiceSubTypes)
                }

                let itemListString = '';


                if (itemList.length === 1) {
                  itemListString = itemList[0];
                } else if (itemList.length > 1) {
                  itemListString = itemList.slice(0, -1).join(', ') + ' and ' + itemList[itemList.length - 1];
                }

                const resultTitle = `INVOICE FOR PAYMENT OF ${itemListString}`.toUpperCase();

                createPdf(
                  {
                    fileNumber: caseData.file_number,
                    invoiceNumber: 'auto',
                    date: formatDate(new Date()),
                    clientName: nameOverride ? nameOverride : caseData.clientDetails.clientName,
                    clientAddress: addressOverride ? addressOverride : caseData.clientDetails.clientAddress,
                    clientPhoneNumber: phoneOverride ? phoneOverride : caseData.clientDetails.phoneNumber,
                    caseTitle: caseData.litigationCaseTitle,
                    caseNumber: caseData.case_number,
                    courtName: caseData.courtName,
                    invoiceTitle: resultTitle,
                    ntn: '810026',
                  }, particulars, amounts, setPDFSource, letterheadVisibility, traderType
                  ); 

                  console.log(amounts);
                  console.log(caseData);
                  

                
            }}
            // style={{ flexGrow: 1, marginLeft: "auto" }}
        >
            Generate
        </ButtonContainer>

          </div>
          
            <iframe 
              src={pdfSource}
              style={{width: '100%', height: '602px'}}
              frameBorder='0'
            />

            
          </Grid>
          
        </Grid>
        
      </div>



</form>
    
</div>
    </div>
    </div>



  );
}

export default CourtForm;
