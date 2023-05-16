import {base64dataLogo, base64data} from './baseImages';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function numberToWords(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    if (number === 0) {
      return 'zero';
    }
  
    function convertToWords(n) {
      let words = '';
  
      if (n < 10) {
        words += units[n];
      } else if (n < 20) {
        words += teens[n - 10];
      } else if (n < 100) {
        words += tens[Math.floor(n / 10)];
        if (n % 10 !== 0) {
          words += '-' + units[n % 10];
        }
      } else if (n < 1000) {
        words += units[Math.floor(n / 100)] + ' hundred';
        if (n % 100 !== 0) {
          words += ' ' + convertToWords(n % 100);
        }
      } else if (n < 1000000) {
        words += convertToWords(Math.floor(n / 1000)) + ' thousand';
        if (n % 1000 !== 0) {
          words += ' ' + convertToWords(n % 1000);
        }
      } else if (n < 1000000000) {
        words += convertToWords(Math.floor(n / 1000000)) + ' million';
        if (n % 1000000 !== 0) {
          words += ' ' + convertToWords(n % 1000000);
        }
      } else {
        words += 'number out of range';
      }
  
      return words;
    }
  
    return convertToWords(number);
  }
  

export default function createPdf (invoiceData, particulars, amounts, setPDFSource, isLetterHead, traderType) {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set up some variables for your specific layout
    let margin = 15;
    const lineHeight = 6;
    const contentWidth = doc.internal.pageSize.getWidth(); //- margin * 2;
    const footerHeight = 30;
    

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    const footerParagraphs = [
        'LAHORE OFFICE\n38-B Mason Road, Lahore\nPh: +92 432 636 4646',
        'KARACHI OFFICE\n408 - Paradise Chamber\nNew Passport Office Saddar Karachi',
        'QUETTA OFFICE\nSirko Apartment\nOpp. GOR Colony Quetta',
    ];

    let addY = 0
    if (isLetterHead){
      // Load the image
      const imageZoomLogo = 0.12;
      // Load the image
      const headerLogoWidth = 100*imageZoomLogo;
      const headerLogoHeight = 130*imageZoomLogo;
        
      doc.addImage(base64dataLogo, 'JPEG', (pageWidth/2)-55, 3, headerLogoWidth, headerLogoHeight);
    
      const imageZoom = 1;
      const headerImageWidth = 90*imageZoom;
      const headerImageHeight = 10*imageZoom;
      
      doc.addImage(base64data, 'JPEG', (pageWidth/2)-40, 6, headerImageWidth, headerImageHeight);
      
      // Set the draw color to orange
      doc.setDrawColor(197, 168, 66); // RGB values for orange
      // Set the line width
      doc.setLineWidth(2); // Adjust the line width as needed
      // Draw a horizontal line across the page
      const lineY = margin + lineHeight ; // Adjust the line position as needed
      doc.line(margin, lineY, doc.internal.pageSize.width - margin, lineY);

      doc.setFontSize(9);
      const textWidth = doc.getTextWidth('www.greystone.com'); // Get the width of the text
      // const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
      const startSiteX = pageWidth - margin - textWidth; // Calculate the x coordinate to align the text to the right
      doc.text('www.greystone.com', startSiteX, margin + lineHeight * 2);
      addY = lineHeight * 1
      
    }

    // let 
    

    // Add the title and file number
    doc.setFontSize(11);
    doc.text('Our Reference: ' + 'GSC/' + invoiceData.fileNumber + '/MI/'+ invoiceData.clientName, margin, margin + addY + lineHeight * 2);
    doc.text('Invoice No: ' + invoiceData.invoiceNumber, margin, margin + addY + lineHeight * 3);
    doc.text('Date: ' + invoiceData.date, margin, margin + addY + lineHeight * 4);

    // Add the client information
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(invoiceData.clientName, margin, margin + addY + lineHeight * 6);
    doc.text(invoiceData.clientAddress, margin, margin + addY + lineHeight * 7);
    doc.text(invoiceData.clientPhoneNumber, margin, margin + addY + lineHeight * 8);


    
    doc.setFont(undefined, 'normal');
    doc.text('Dear Client,', margin, margin + addY + lineHeight * 10);


    addY = addY + lineHeight*2;

    // Add the invoice details
    // doc.text('INVOICE FOR PAYMENT OF PROFESSIONAL FEE', margin, margin + lineHeight * 8);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');

    // doc.text('INVOICE FOR PAYMENT OF PROFESSIONAL FEE', margin, margin + lineHeight * 8, { align: 'center' })

    // const margin = 20;  // set your margin
    const maxLineWidth = pageWidth - 2 * margin;

    let lines = doc.splitTextToSize(invoiceData.invoiceTitle, maxLineWidth);

    // Add the lines of text
    for(let i = 0; i < lines.length; i++) {
        // Calculate text's x coordinate to make each line centered
        let txtWidth1 = doc.getStringUnitWidth(lines[i]) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        let x1 = (pageWidth - txtWidth1) / 2;

        doc.text(lines[i], x1, margin + addY + lineHeight * (10 + i));
    }

    addY = addY + lineHeight*2;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text('RE: ' + invoiceData.caseTitle + ' COURT CASE NO. ' + invoiceData.caseNumber + ' COURT NAME ' + invoiceData.courtName, margin, margin  + addY + lineHeight * 11);


    
  
    // Calculate the table width based on the content width
    const tableWidth = contentWidth;

    // Prepare the table data
    let body = [];
    let total = 0;
    for (let i = 0; i < particulars.length; i++) {
      const amount = parseInt(amounts[i]); // Convert amount to integer
      body.push([i + 1, particulars[i], amount]);
      total += amount;
    }

    let tableTheme = 'grid';
    let styles = {
      font: "times",
      // halign: "center",
      // cellPadding: 3.5,
      tableWidth: tableWidth,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0]
    };
    let headStyles = {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      // fillColor: [166, 204, 247],
      fillColor: [255, 255, 255],
       
    };
    let footStyles = {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      // fillColor: [166, 204, 247],
      fillColor: [255, 255, 255],
    };
    let alternateRowStyles= {
      fillColor: [255, 255, 255],
      // fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    };
    let rowStyles= {
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    };
    let tableLineColor = [0, 0, 0];


    let totalAmount = 0;
    let subTotalAmount = 0;
    

    // Calculate total amount
    for (let key in amounts) {
      if (amounts[key] instanceof Object) {
        for (let subKey in amounts[key]) {
          totalAmount += amounts[key][subKey];
          subTotalAmount += amounts[key][subKey]
        }
      } else {
        totalAmount += amounts[key];
      }
    }

    // Convert total amount to words
    let totalInWords = "Rupees " + numberToWords(totalAmount) + " Only";

    // Initialize bodies
    let firstTableBody = [];
    let secondTableBody = [];
    let i = 1;  // counter for "Sr. No."
    let subi = 1;

    for (let key in amounts) {
      if (amounts[key] instanceof Object) {
        for (let subKey in amounts[key]) {
          console.log(amounts[key][subKey], i)
          // Check if subKey value is not null
          if (amounts[key][subKey] !== null && amounts[key][subKey] !== 0 ) {
            if (subi === 1) {
              secondTableBody.push([i.toString(), key, subKey, amounts[key][subKey].toString(), subTotalAmount]);
            } else {
              secondTableBody.push(['', '', subKey, amounts[key][subKey].toString(), '']);
            }
            i++;
            subi++;
          }
        }
      } else {
        // Check if key value is not null
        if (amounts[key] !== null && amounts[key] !== 0 ) {
          firstTableBody.push([i.toString(), key, amounts[key].toString()]);
          i++;
        }
      }
    }

    const serialWidth = 15;
    const amountWidth = 30;
    
    
    

     // first table
     doc.autoTable({
      startY: margin + addY + lineHeight * 12,
      body: [['Sr. No.', 'PARTICULARS', 'Amount (Rs.)']],
      theme: 'grid',
      styles: styles,
      headStyles: headStyles,
      footStyles: footStyles,
      alternateRowStyles: alternateRowStyles,
      rowStyles: rowStyles,
      tableLineColor: tableLineColor,
      // headStyles:{
      //   0: {cellWidth: 10}, // Set width for the first column
        
      // },
      columnStyles: {
        0: {cellWidth: serialWidth, fontStyle: 'bold'}, // Set width for the first column
        1: {fontStyle: 'bold'}, // Set width for the first column
        2: {cellWidth: amountWidth, fontStyle: 'bold'}  // Set the same width for the last column
      }
    });

    // first table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,
      // head: [['Sr. No.', 'PARTICULARS', 'Amount']],
      body: firstTableBody,
      theme: 'grid',
      styles: styles,
      headStyles: headStyles,
      footStyles: footStyles,
      alternateRowStyles: alternateRowStyles,
      rowStyles: rowStyles,
      tableLineColor: tableLineColor,
      // headStyles:{
      //   0: {cellWidth: 10}, // Set width for the first column
        
      // },
      columnStyles: {
        0: {cellWidth: serialWidth}, // Set width for the first column
        2: {cellWidth: amountWidth}  // Set the same width for the last column
      }
    });

    // second table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,  // start at the end of the first table
      // head: [['One', 'Two', 'Three', 'Four']],
      body: secondTableBody,
      theme: 'grid',
      styles: styles,
      headStyles: headStyles,
      footStyles: footStyles,
      alternateRowStyles: alternateRowStyles,
      rowStyles: rowStyles,
      tableLineColor: tableLineColor,
      columnStyles: {
        0: {cellWidth: serialWidth}, // Set width for the first column

        1: {cellWidth: 50},  // Set the same width for the last column
        2: {cellWidth: 50},  // Set the same width for the last column
        4: {cellWidth: amountWidth}  // Set the same width for the last column
      }
    });

    // second table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,  // start at the end of the first table
      // head: [['One', 'Two', 'Three', 'Four']],
      body: [['Total', totalAmount.toString()]],
      theme: 'grid',
      styles: styles,
      headStyles: headStyles,
      footStyles: footStyles,
      alternateRowStyles: alternateRowStyles,
      rowStyles: rowStyles,
      tableLineColor: tableLineColor,
      columnStyles: {
        0: {halign: 'center' },
        1: {cellWidth: amountWidth},  // Set the same width for the last column
      }
    });

    // second table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY,  // start at the end of the first table
      // head: [['One', 'Two', 'Three', 'Four']],
      body: [[totalInWords]],
      theme: 'grid',
      styles: styles,
      headStyles: headStyles,
      footStyles: footStyles,
      alternateRowStyles: alternateRowStyles,
      rowStyles: rowStyles,
      tableLineColor: tableLineColor,
      columnStyles: {
        0: {halign: 'center' },
        // 1: {cellWidth: 30},  // Set the same width for the last column
      }
    });

    let subBody = [];
    let subTotal = 0;

    let subTableRowIndex = 0
    let subTableColumnIndex = 1

    // Fill this with the appropriate data for travel expenses
    let travelExpenses = [
      { allowance: 100, travellingCost: 200, tollTax: 50 },
      { allowance: 200, travellingCost: 300, tollTax: 75 },
      // ... other travel expenses
  ];
  for (let i = 0; i < travelExpenses.length; i++) {
      const { allowance, travellingCost, tollTax } = travelExpenses[i];
      subBody.push([i + 1, allowance, travellingCost, tollTax]);
      subTotal += allowance + travellingCost + tollTax;
  }


    
    let currentY = doc.lastAutoTable.finalY + lineHeight * 2;  // add some space between the 

    // console.log(currentY);

    // Set the text size
    doc.setFontSize(12);  // adjust the size as needed

    // Calculate the center position
    let txtWidth = doc.getStringUnitWidth('IMPORTANT') * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let x = (pageWidth - txtWidth) / 2;
    
    // Add the text
    doc.text('IMPORTANT', x, currentY);

    // Increment currentY to add more vertical spacing
    currentY += lineHeight;

    if (traderType === 'Sole Trader') {
      doc.setFontSize(9);
      // Add the payment details
      doc.text('  • Payment by cheque in the name of Mazhar Ilahi', margin, currentY + lineHeight);
      doc.text('  • Online payment in Habib Bank Ltd. Stock Exchange Branch, Lahore A/C Number 0866-7900265703', margin, currentY + lineHeight * 2);
      doc.text('     IBAN: PK24HABB0008667900221003', margin, currentY + lineHeight * 3);
      doc.text('  • Please confirm all online payments by email to dr.ilahi@greystonechambers.com', margin, currentY + lineHeight * 4);
      doc.text('  • NTN: ' + invoiceData.ntn, margin, currentY + lineHeight * 5);
    } else {
      doc.setFontSize(9);
      // Add the payment details
      doc.text('  • Payment by cheque in the name of GREYSTONE CHAMBERS', margin, currentY + lineHeight);
      doc.text('  • Online payment in Habib Bank Ltd. Stock Exchange Branch, Lahore A/C Number 0866-7900265703', margin, currentY + lineHeight * 2);
      doc.text('     IBAN: PK24HABB0008667900221003', margin, currentY + lineHeight * 3);
      doc.text('  • Please confirm all online payments by email to dr.ilahi@greystonechambers.com', margin, currentY + lineHeight * 4);
      doc.text('  • NTN: ' + invoiceData.ntn, margin, currentY + lineHeight * 5);
      
    }

    // Update currentY for the closing
    currentY += lineHeight * 8;  // adjust as needed based on your layout

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    // Add the closing
    doc.text('Regards,', margin, currentY);
    doc.text('Dr. Mazhar Ilahi', margin, currentY + lineHeight);
    doc.text('LLB, LLM, PhD (London)', margin, currentY + lineHeight * 2);
    doc.text('Barrister at Law', margin, currentY + lineHeight * 3);
    doc.setFont(undefined, 'normal');


    let footerMargin = 20//*1.7;
    // Add the footer
    doc.setFontSize(8);
    // doc.setDrawColor(0);
    doc.setFillColor(200);


    // Calculate the paragraph width and spacing
    const paragraphWidth = contentWidth / 3;
    const paragraphSpacing = (contentWidth - paragraphWidth * 3) / 2;
    // const paragraphSpacing = (contentWidth - paragraphWidth * 3) ;

    // Add the footer paragraphs
    doc.setFontSize(8);
    // doc.setTextColor(255);
    const rectWidth = 0.2; // Change this to make the rectangle thinner, thus appearing as a vertical line or bar
    const rectHeight = lineHeight+1; // The height of the rectangle
    
    const gapper = 2;
      
    if (isLetterHead){
      // Add the rectangle (vertical bar) and the text for the first footer paragraph
      doc.rect(footerMargin-2, doc.internal.pageSize.getHeight() + gapper - footerHeight / 2, rectWidth, rectHeight);
      doc.text(
          footerParagraphs[0],
          footerMargin + paragraphSpacing + rectWidth,
          doc.internal.pageSize.getHeight() - footerHeight / 2 + lineHeight / 2,
          { maxWidth: paragraphWidth - rectWidth }
      );

      // Add the rectangle (vertical bar) and the text for the second footer paragraph
      doc.rect(footerMargin - 2 + paragraphSpacing + paragraphWidth, doc.internal.pageSize.getHeight() + gapper - footerHeight / 2, rectWidth, rectHeight);
      doc.text(
          footerParagraphs[1],
          footerMargin + paragraphSpacing * 2 + paragraphWidth + rectWidth,
          doc.internal.pageSize.getHeight() - footerHeight / 2 + lineHeight / 2,
          { maxWidth: paragraphWidth - rectWidth }
      );

      // Add the rectangle (vertical bar) and the text for the third footer paragraph
      doc.rect(footerMargin - 2 + paragraphSpacing * 2 + paragraphWidth * 2, doc.internal.pageSize.getHeight() + gapper - footerHeight / 2, rectWidth, rectHeight);
      doc.text(
          footerParagraphs[2],
          footerMargin + paragraphSpacing * 3 + paragraphWidth * 2 + rectWidth,
          doc.internal.pageSize.getHeight() - footerHeight / 2 + lineHeight / 2,
          { maxWidth: paragraphWidth - rectWidth }
      );
    }

  

  
    // Preview PDF
    const pdfDataUri = doc.output('datauristring');
    // const windowContent = '<!DOCTYPE html><html><head><title>Print Document</title></head><body><iframe src="' + pdfDataUri + '" frameborder="0" width="100%" height="820"></iframe></body></html>';
    // const printWindow = window.open('', '', 'width=800,height=600');
    // printWindow.document.open();
    // printWindow.document.write(windowContent);
    // printWindow.document.close();

    const url = doc.output("bloburi");

    console.log(url)
    setPDFSource(url);
    

    // Save the PDF
    // doc.save('invoice.pdf');

  }