import React from "react";
import { render } from "react-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "jspdf-autotable";
import Hello from "./Hello";
import jsPDF from "jspdf";
import "@react-pdf-viewer/core/lib/styles/index.css";


// var url = arr;



const json = [
    {
        "caseTitle": "Litigation case",
        "case_n": "0",
        "case_number": "0",
        "category": "Civil Litigation",
        "clientDetails": {
            "clientAddress": "Client Address",
            "clientName": "Name of the clients ",
            "cnicNumber": "CNIC",
            "defendant": "dra",
            "email": "email",
            "name": "Nauman",
            "phoneNumber": "numebr",
            "plaintiff": "pccpas"
        },
        "clientId": "-NPoOnidu4OBYdUwnTSE",
        "contactPerson": {
            "cnic": "NIC",
            "email": "numan69khan@gmail.com",
            "fatherName": "father name",
            "homeAddress": "adress",
            "name": "name ",
            "phoneNumber1": "phine ",
            "whatsappNumber1": "whatspap"
        },
        "courtCaseNo": "98",
        "courtName": "(KPK) Peshawar High Court",
        "district": "Dir k",
        "dueDiligence": "duediligence",
        "file_n": "0",
        "file_number": "0",
        "interimDateNotFixed": "date fo not fixed yet/newcase",
        "interimDateOfFirstHearing": "date of first hearing",
        "interimDateOfHearing": "date of hearing",
        "interimDateOfLastHearing": "date of last reahfing",
        "judge": "Mukhtar",
        "legalAnalysis": "lebal analysis",
        "legalDrafting": "legal drafting",
        "legalOpinion": "legal opinion",
        "legalisationRegistration": "lgislation registration",
        "litigationCaseTitle": "Litigation case title",
        "next_proceedings": "",
        "next_proceedings_date": "3/6/2023",
        "otherPartyDetails": {
            "address": "sadess",
            "cnicNumber": "NCINC",
            "defendant": "dra",
            "email": "mail",
            "partyName": "Naume party",
            "phoneNumber": "pnhone",
            "plaintiff": "pccap"
        },
        "previous_proceedings": "new case",
        "previous_proceedings_date": "new case",
        "recommendation": "recommendation",
        "regulatoryWork": "reudlaorty work",
        "substantiveDateNotFixed": "date for not fixde",
        "substantiveDateOfHearing": "date of hearing",
        "substantiveDateOfLastHearing": "last heagn e",
        "substantiveDateOfNextHearing": "next hearing",
        "summaryOfFacts": "summary of facts",
        "updated_by": "mazharilahi@gmail.com",
        "key": "-NPr5MeKgynUP31DuZGh",
        "id": 1,
        "isLast": true
    },
    {
        "case_n": "1",
        "case_number": "1",
        "clerk": "numan98khan@gmail.com",
        "clientDetails": {
            "clientAddress": "House # 1029D, Street # 46",
            "clientName": "Muhammad Nauman",
            "cnicNumber": "12345-1234567-1",
            "defendant": "Defendant",
            "email": "numan98khan@gmail.com",
            "name": "Nauman",
            "phoneNumber": "+923315882990",
            "plaintiff": "Plaintiff"
        },
        "clientId": "-NPoOnidu4OBYdUwnTSE",
        "contactPerson": {
            "cnic": "Muhammad Nauman",
            "email": "numan98khan@gmail.com",
            "fatherName": "Muhammad Nauman",
            "homeAddress": "House # 1029D, Street # 46",
            "name": "Muhammad Nauman",
            "phoneNumber1": "+923315882990",
            "whatsappNumber1": "Muhammad Nauman"
        },
        "court": "Islamabad High Court",
        "courtCaseNo": "1",
        "district": "District",
        "dueDiligence": false,
        "file_n": "0",
        "file_number": "0",
        "interimDateNotFixed": true,
        "judge": "Judge",
        "legalAnalysis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "legalDrafting": false,
        "legalOpinion": true,
        "legalisationRegistration": false,
        "litigation": {
            "category": "Civil Litigation",
            "subCategory": "Specific Performance of Contract under Section 12"
        },
        "litigationCaseTitle": "My Case",
        "natureOfLitigation": "Supurdari",
        "next_proceedings": "",
        "next_proceedings_date": "3/11/2023",
        "otherPartyDetails": {
            "address": "House # 1029D, Street # 46",
            "cnicNumber": "12345-1234567-1",
            "defendant": "Accused",
            "email": "numan98khan@gmail.com",
            "partyName": "Muhammad Nauman",
            "phoneNumber": "+923315882990",
            "plaintiff": "Claimant"
        },
        "previous_proceedings": "new case",
        "previous_proceedings_date": "new case",
        "recommendation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "regulatoryWork": true,
        "summaryOfFacts": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "updated_by": "mazharilahi@gmail.com",
        "worker": "akashahmed@greystone.com",
        "key": "-NQEQ5ile9EayRf9q_p3",
        "id": 2,
        "isLast": true
    }
];
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const colstyle = {
  width: "30%"
};
const tableStyle = {
  width: "100%"
};

const print = () => {
  const pdf = new jsPDF("p", "pt", "a4");
  const columns = [
    "Id",
    "Start",
    "Duration",
    "Name",
    "Project",
    "Task",
    "Comment"
  ];
  var rows = [];

  for (let i = 0; i < json.length; i++) {
    /*for (var key in json[i]) {
      var temp = [key, json[i][key]];
      rows.push(temp);
    }*/
    var temp = [
      json[i].id,
      json[i].start.split("T")[0],
      json[i].duration,
      json[i].name,
      json[i].project,
      json[i].task,
      json[i].comment
    ];
    rows.push(temp);
  }
  pdf.text(235, 40, "Tabla de Prestamo");
  pdf.autoTable(columns, rows, {
    startY: 65,
    theme: "grid",
    styles: {
      font: "times",
      halign: "center",
      cellPadding: 3.5,
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0]
    },
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: "normal",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fillColor: [166, 204, 247]
    },
    alternateRowStyles: {
      fillColor: [212, 212, 212],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
    rowStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
    tableLineColor: [0, 0, 0]
  });
  console.log(pdf.output("datauristring"));
  pdf.save("pdf");
};

const preview = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = [
      "File Number",
      "Case Numebr",
      "Case Title",
      "Clerk",
      "Previous Proceeding Date",
      "Next Proceeding Date",
      "Court"
    ];
    var rows = [];
  
    for (let i = 0; i < json.length; i++) {
      var temp = [
        json[i].file_number,
        json[i].case_number,
        json[i].litigationCaseTitle,
        json[i].clerk,
        json[i].previous_proceedings_date,
        json[i].next_proceedings_date,
        json[i].court
      ];
      rows.push(temp);
    }
    pdf.text(235, 40, "Current View");
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0]
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247]
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      tableLineColor: [0, 0, 0]
    });
    const pdfDataUri = pdf.output('datauristring');
    const windowContent = '<!DOCTYPE html><html><head><title>Print Document</title></head><body><iframe src="' + pdfDataUri + '" frameborder="0" width="100%" height="820"></iframe></body></html>';
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(windowContent);
    printWindow.document.close();
  };
  

const viewer = () => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  return (
    <div>
      <Hello name="CodeSandbox" />
      <h2>Start editing to see some magic happen {"\u2728"}</h2>
      <button onClick={print}>print</button>
      <button onClick={preview}>preview</button>
      
    </div>
  );
};

export default viewer;

// render(<App />, document.getElementById("root"));
