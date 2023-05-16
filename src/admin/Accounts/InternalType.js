

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
    Chip
  } from "@material-ui/core";
  
import SmallInput from "../../components/SmallInput";


import { makeStyles } from "@material-ui/core/styles";


import Paper from '@material-ui/core/Paper';


const invoiceSubTypes = [
    "Retainership Fees", 
    "Professional Fees", 
    "Miscellaneous Fees", 
    // "Traveling Expenses"
  ];

const useStyles = makeStyles((theme) => ({
    accordion: {
      width: '100%', // This ensures the accordion takes up the full width of its parent
    },
    paper: {
        // display: 'flex', // Use flexbox

        // alignItems: 'center', // Align items vertically in the center
        padding: '0.5em',
        marginBottom: '0.5em',
      },
      chip: {
        marginRight: '10px', // Add margin between the Chip and SmallInput
        marginLeft: '10px', // Add margin between the Chip and SmallInput
      },
      
      container: {
        display: 'flex',
        alignItems: 'center',
      },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
  }));

function InternalType({expanded, 
    setExpanded, 
    invoiceType, 
    selectInvoiceSubTypes, 
    invoiceSubTypes,
    invoiceSubTypesInternal, 
    selectInvoiceSubTypesInternal,
    handleSubTypeClick,
    handleSubTypeClickInternal,
    handleAmountChange
}) {
    const classes = useStyles();

    const travelExpenseTag = 'Traveling Expenses';

    return (

        <>



        {(invoiceType === "Outside" ? invoiceSubTypes: invoiceSubTypesInternal).map((particular, index) => (
           <Paper key={index} className={classes.paper}>
           <div className={classes.container}>
             <Chip
               key={particular}
               label={particular}
               className={classes.chip}
               color={(invoiceType === "Outside" ? selectInvoiceSubTypes : selectInvoiceSubTypesInternal).includes(particular) ? "secondary" : undefined}
               onClick={(event) => {
                 if ((invoiceType === "Outside" ? selectInvoiceSubTypes : selectInvoiceSubTypesInternal).includes(particular)) {
                   event.stopPropagation();
                 }
         
                 if (invoiceType === 'Outside') {
                   handleSubTypeClick(particular);
                 } else {
                   handleSubTypeClickInternal(particular);
                 }
               }}
             />
             {(invoiceType === "Outside" ? selectInvoiceSubTypes : selectInvoiceSubTypesInternal).includes(particular) && (
               <SmallInput
                 onChange={(e) => handleAmountChange(particular, null, e.target.value)}
                 label="Amount"

                //  style={{ width: '12vw' }}  // Add margin-bottom for gap
               />
             )}
           </div>
         </Paper>

          
          
          

          ))}

          {/* <Accordion
            //   key={index}
              className={classes.accordion}
              onChange={(event, isExpanded) => {
                setExpanded(isExpanded ? 1 : false);
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls={`other-party-content-${index}`}
                // id={`other-party-header-${index}`}
              >
                <Chip
                  key={travelExpenseTag}
                  label={travelExpenseTag}
                  color={(invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(travelExpenseTag) ? "secondary" : undefined}
                  onClick={(event) => {
                    if ((invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(travelExpenseTag)){
                      event.stopPropagation(); // This stops the click event from reaching the Accordion
                    }

                    if (invoiceType === 'Outside') {
                      handleSubTypeClick(travelExpenseTag);
                    } else {
                      handleSubTypeClickInternal(travelExpenseTag);
                    }
                  }}
                />

              </AccordionSummary>
              <AccordionDetails>
                {(invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(travelExpenseTag) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <SmallInput 
                        onChange={(e) => handleAmountChange(travelExpenseTag, "Travel Charges", e.target.value)}
                        label="Travel Charges"
                        style={{ marginBottom: '10px' }}  // Add margin-bottom for gap
                      />
                      <SmallInput 
                        onChange={(e) => handleAmountChange(travelExpenseTag, "Toll Tax", e.target.value)}
                        label="Toll Tax"
                        style={{ marginBottom: '10px' }}  // Add margin-bottom for gap
                      />
                      <SmallInput 
                        onChange={(e) => handleAmountChange(travelExpenseTag, "Daily Allowance", e.target.value)}
                        label="Daily Allowance"
                        style={{ marginBottom: '10px' }}  // Add margin-bottom for gap
                      />
                    </div>
                      ) : 
                (null)
                }
              </AccordionDetails>
            </Accordion> */}

          </>
    );
}

export default InternalType;