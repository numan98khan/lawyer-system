<Accordion
key={index}
className={classes.accordion}
//   expanded={false}
//   disabled={true}
onChange={(event, isExpanded) => {
  // setExpanded(isExpanded ? index : false);
  event.stopPropagation(); // This stops the click event from reaching the Accordion
      
}}

TransitionProps={{
  timeout: 0
}}
>
<AccordionSummary
  // expandIcon={<ExpandMoreIcon />}
  aria-controls={`other-party-content-${index}`}
  id={`other-party-header-${index}`}
>
  <Chip
    key={particular}
    label={particular}
    color={(invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(particular) ? "secondary" : undefined}
    onClick={(event) => {
      if ((invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(particular)){
        event.stopPropagation(); // This stops the click event from reaching the Accordion
      }

      if (invoiceType === 'Outside') {
        handleSubTypeClick(particular);
      } else {
        handleSubTypeClickInternal(particular);
      }
    }}
  />

  {/* <br></br> */}
  
  {(invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(particular) ? (<SmallInput 
      // value={value}
      // onChange={handleChange}
      // value={newAmount}
      onChange={(e) => handleAmountChange(particular, null, e.target.value)}

      style={{ marginLeft: '10px' }}  // Add margin-bottom for gap

      label="Amount"
    />): (null)
  }
</AccordionSummary>
{/* <AccordionDetails>
  {(invoiceType === "Outside" ? selectInvoiceSubTypes: selectInvoiceSubTypesInternal).includes(particular) ?
    particular === 'Retainership Fees' ? (
    <SmallInput 
      // value={value}
      // onChange={handleChange}
      // value={newAmount}
      onChange={(e) => handleAmountChange("Retainership Fees", null, e.target.value)}

      label="Amount"
    />

  ) : 
  particular === 'Professional Fees' ? (
    <SmallInput 
      type="number" 
      min="0"
      onChange={(e) => handleAmountChange("Professional Fees", null, e.target.value)}

      label="Amount"
    />) :
    particular === 'Miscellaneous Fees' ? (
      <SmallInput 
        type="number" 
        min="0"
      
        onChange={(e) => handleAmountChange("Miscellaneous Fees", null, e.target.value)}

        label="Amount"
      />) :
      particular === 'Traveling Expenses' ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <SmallInput 
            onChange={(e) => handleAmountChange("Traveling Expenses", "Travel Charges", e.target.value)}
            // type="number" 
            // min="0"

            label="Travel Charges"
          />
          <SmallInput 
            onChange={(e) => handleAmountChange("Traveling Expenses", "Toll Tax", e.target.value)}
  
            
            label="Toll Tax"
          />
          <SmallInput 
            onChange={(e) => handleAmountChange("Traveling Expenses", "Daily Allowance", e.target.value)}
       
            
            label="Daily Allowance"
          />
        </div>
        ) : 
    (<></>) : 
  (<></>)
  }
</AccordionDetails> */}
</Accordion>