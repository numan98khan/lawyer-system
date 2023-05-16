// export const caseValueMap = {
//   file_n: "FILE#",
//   case_n: "CASE#",
//   court_case_n: "COURT CASE#",
//   subCategory: "SUB CATEGORY",
//   caseTitle: "CASE TITLE",
//   nature_of_case: "NATURE OF CASE",
//   category: "CATEGORY",
//   court: "COURT",
//   district: "DISTRICT",
//   judge: "JUDGE",
//   previous_proceedings: "PREVIOUS PROCEEDING",
//   prev_proceedings_date: "PREVIOUS PROCEEDING DATE",
//   next_proceedings_date: "NEXT PROCEEDING DATE",
//   next_proceedings: "NEXT PROCEEDING",
//   remarks: "REMARKS",
//   caseSrc: "CASE SOURCE",
//   caseSupervisor: "CASE SUPERVISOR",
//   caseWorker: "CASE WORKER",
//   case_clerk: "CASE CLERK",
//   other_party: "OTHER PARTY",
//   updated_by: "UPDATED BY",
// };

export const caseValueMap = {
  district: "DISTRICT",
  court: "COURT",
  courtName: "COURT NAME",
    legalOpinion: "LEGAL OPINION",
    legalDrafting: "LEGAL DRAFTING",
    dueDiligence: "DUE DILIGENCE",
    legalisationRegistration: "LEGALISATION REGISTRATION",
    regulatoryWork: "REGULATORY WORK",
    summaryOfFacts: "SUMMARY OF FACTS",
    legalAnalysis: "LEGAL ANALYSIS",
    recommendation: "RECOMMENDATION",
    litigationCaseTitle: "LITIGATION CASE TITLE",
    substantiveDateOfHearing: "SUBSTANTIVE DATE OF HEARING",
    substantiveDateOfLastHearing: "SUBSTANTIVE DATE OF LAST HEARING",
    substantiveDateOfNextHearing: "SUBSTANTIVE DATE OF NEXT HEARING",
    substantiveDateNotFixed: "SUBSTANTIVE DATE NOT FIXED",
    interimDateOfHearing: "INTERIM DATE OF HEARING",
    interimDateOfLastHearing: "INTERIM DATE OF LAST HEARING",
    interimDateOfFirstHearing: "INTERIM DATE OF FIRST HEARING",
    interimDateNotFixed: "INTERIM DATE NOT FIXED",
    courtCaseNo: "COURT CASE NO.",
  // clientDetails: {
  //   id: "ID",
  //   title: "TITLE",
  //   firstName: "FIRST NAME",
  //   lastName: "LAST NAME",
  //   dob: "DOB",
  //   gender: "GENDER",
  //   nationality: "NATIONALITY",
  //   cnic: "CNIC",
  //   companyName: "COMPANY NAME",
  //   contactNumber: "CONTACT NUMBER",
  //   email: "EMAIL",
  //   address: "ADDRESS",
  //   town: "TOWN",
  //   zipcode: "ZIPCODE",
  //   country: "COUNTRY",
  //   howDidYou: "HOW DID YOU",
  //   preferredCorr: "PREFERRED CORRESPONDENCE",
  //   registration_time: "REGISTRATION TIME"
  // },
  // caseInformation: {
  //   category: "CATEGORY",
  //   clientDetails: {
  //     name: "NAME",
  //     clientName: "CLIENT NAME",
  //     cnicNumber: "CNIC NUMBER",
  //     clientAddress: "CLIENT ADDRESS",
  //     plaintiff: "PLAINTIFF",
  //     defendant: "DEFENDANT",
  //     phoneNumber: "PHONE NUMBER",
  //     email: "EMAIL"
  //   },
  //   otherPartyDetails: {
  //     partyName: "PARTY NAME",
  //     cnicNumber: "CNIC NUMBER",
  //     address: "ADDRESS",
  //     plaintiff: "PLAINTIFF",
  //     defendant: "DEFENDANT",
  //     phoneNumber: "PHONE NUMBER",
  //     email: "EMAIL"
  //   },
  //   contactPerson: {
  //     name: "NAME",
  //     fatherName: "FATHER NAME",
  //     cnic: "CNIC",
  //     phoneNumber1: "PHONE NUMBER 1",
  //     whatsappNumber1: "WHATSAPP NUMBER 1",
  //     email: "EMAIL",
  //     homeAddress: "HOME ADDRESS"
  //   },
  //   courtName: "COURT NAME",
  //   legalOpinion: "LEGAL OPINION",
  //   legalDrafting: "LEGAL DRAFTING",
  //   dueDiligence: "DUE DILIGENCE",
  //   legalisationRegistration: "LEGALISATION REGISTRATION",
  //   regulatoryWork: "REGULATORY WORK",
  //   summaryOfFacts: "SUMMARY OF FACTS",
  //   legalAnalysis: "LEGAL ANALYSIS",
  //   recommendation: "RECOMMENDATION",
  //   litigationCaseTitle: "LITIGATION CASE TITLE",
  //   substantiveDateOfHearing: "SUBSTANTIVE DATE OF HEARING",
  //   substantiveDateOfLastHearing: "SUBSTANTIVE DATE OF LAST HEARING",
  //   substantiveDateOfNextHearing: "SUBSTANTIVE DATE OF NEXT HEARING",
  //   substantiveDateNotFixed: "SUBSTANTIVE DATE NOT FIXED",
  //   interimDateOfHearing: "INTERIM DATE OF HEARING",
  //   interimDateOfLastHearing: "INTERIM DATE OF LAST HEARING",
  //   interimDateOfFirstHearing: "INTERIM DATE OF FIRST HEARING",
  //   interimDateNotFixed: "INTERIM DATE NOT FIXED",
  //   courtCaseNo: "COURT CASE NO."
  // }
}


export const navbarTitleKeyValueMap = {
  "/": "HOME",
  "/newcase": "NEW CASE",
  "/calender": "CALENDAR",
  "/tasks": "TASKS",
  "/consultations": "CONSULTATIONS",
  "/accounts": "ACCOUNTS",
  "/addclient": "ADD CLIENT",
  "/addworker": "ADD WORKER",
  "/addcasedetails": "ADD CASE DETAILS",
  "/paymentoptions": "PAYMENT OPTIONS",
  "/casedetails": "CASE DETAILS",
  "/clientdetails": "CLIENT DETAILS",
  "/clients": "CLIENTS",
  "/cases": "CASES",
  "/logsheet": "LOGSHEET",
  "/tracker": "TRACKER",
  "/workers": "WORKERS",
  "/addWorker": "ADD NEW WORKER",
  "/hearings": "HEARINGS",
};

export const optionsCivilLitigation = [
  // const optionsCivilDispute = [
    {
    name: "",
    value: "",
    },
    {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
    },
    {
    name: "Recovery of Immovable Property under Section 8",
    value: "Recovery of Immovable Property under Section 8",
    },
    {
    name: "Suit Against Dispossession under Section 9",
    value: "Suit Against Dispossession under Section 9",
    },
    {
    name: "Recovery of Specific Moveable Property/Money Claims under Section 10",
    value: "Recovery of Specific Moveable Property/Money Claims under Section 10",
    },
    {
    name: "Specific Performance of Contract under Section 12",
    value: "Specific Performance of Contract under Section 12",
    },
    {
    name: "Damages for Breach of Contract",
    value: "Damages for Breach of Contract",
    },
    {
    name: "Rectification of Instruments",
    value: "Rectification of Instruments",
    },
    {
    name: "Rescission of Instruments",
    value: "Rescission of Instruments",
    },
    {
    name: "Cancellation of Instruments",
    value: "Cancellation of Instruments",
    },
    {
    name: "Suit for Declaration",
    value: "Suit for Declaration",
    },
    {
    name: "Appointment of Receivers",
    value: "Appointment of Receivers",
    },
    {
    name: "Injunctions",
    value: "Injunctions",
    },
    {
    name: "Defamation",
    value: "Defamation",
    },
    {
    name: "Rendition of Accounts",
    value: "Rendition of Accounts",
    },
    {
    name: "Other Contractual Dispute",
    value: "Other Contractual Dispute",
    },
    {
    name: "Partnership Dispute",
    value: "Partnership Dispute",
    },
    {
    name: "Partition of Property",
    value: "Partition of Property",
    },
    {
    name: "Arbitration",
    value: "Arbitration",
    },
    {
    name: "Execution/Enforcement",
    value: "Execution/Enforcement",
    },
    {
    name: "Pre-emption",
    value: "Pre-emption",
    },
    {
    name: "Writ Petition",
    value: "Writ Petition",
    },
    {
    name: "Application under Section 12(2) CPC",
    value: "Application under Section 12(2) CPC",
    },
    {
      name: "Leave Blank",
      value: "Leave Blank",
      },
    ].sort((a, b) => a.name.localeCompare(b.name));

const optionsServiceLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Inquiry",
    value: "Inquiry",
  },
  {
    name: "Termination/Dismissal etc.",
    value: "Termination/Dismissal etc.",
  },
  {
    name: "Minor Penalty",
    value: "Minor Penalty",
  },
  {
    name: "ACR Remarks",
    value: "ACR Remarks",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsCompetitionLaw = [
  {
    name: "Specify",
    value: "Specify",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsOtherLaw = [
  {
    name: "Specify",
    value: "Specify",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsPublicInterestLaw = [
  {
    name: "Specify",
    value: "Specify",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsConsumerLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Claims for a mis-sold service",
    value: "Claims for a mis-sold service",
  },
  {
    name: "Defective product claims",
    value: "Defective product claims",
  },
  {
    name: "Distance selling issues",
    value: "Distance selling issues",
  },
  {
    name: "Fraud claims",
    value: "Fraud claims",
  },
  {
    name: "On-line consumer rights",
    value: "On-line consumer rights",
  },
  {
    name: "Ownership issues",
    value: "Ownership issues",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsCriminalLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Pakistan Penal Code",
    value: "Pakistan Penal Code",
  },
  {
    name: "Anti-Corruption Laws",
    value: "Anti-Corruption Laws",
  },
  {
    name: "NAB Laws",
    value: "NAB Laws",
  },
  {
    name: "Illegal dispossession Act",
    value: "Illegal dispossession Act",
  },
  {
    name: "Control of Narcotics Substance Act",
    value: "Control of Narcotics Substance Act",
  },
  {
    name: "Telegraph Act",
    value: "Telegraph Act",
  },
  {
    name: "Illegal Arms",
    value: "Illegal Arms",
  },
  {
    name: "Passport Act",
    value: "Passport Act",
  },
  {
    name: "Banking Laws",
    value: "Banking Laws",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsCriminalLaw_2 = [ 
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "420/468/471",
    value: "420/468/471",
  },
  {
    name: "409",
    value: "409",
  },
  {
    name: "13/20/65",
    value: "13/20/65",
  },
  {
    name: "302",
    value: "302",
  },
  {
    name: "324",
    value: "324",
  },
  {
    name: "337",
    value: "337",
  },
  {
    name: "427",
    value: "427",
  },
  {
    name: "506",
    value: "506",
  },
  {
    name: "9CNSA",
    value: "9CNSA",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsCriminalLaw_3 = [
    {
      name: "",
      value: "",
    },
    {
      name: "- - - Other / Not in the list - - -",
      value: "- - - Other / Not in the list - - -",
    },
    {
      name: "FIR No./Case Reference number",
      value: "FIR No./Case Reference number",
    },
    {
      name: "Date of FIR",
      value: "Date of FIR",
    },
    {
      name: "Police Station",
      value: "Police Station",
    },
    {
      name: "Offence U/S",
      value: "Offence U/S",
    },
    {
      name: "Other (Please specify)",
      value: "Other (Please specify)",
    },
    {
      name: "Or leave blank",
      value: "Or leave blank",
    },
  ].sort((a, b) => a.name.localeCompare(b.name));




const optionsHousingLaw = [
    {
      name: "",
      value: "",
    },
    {
      name: "- - - Other / Not in the list - - -",
      value: "- - - Other / Not in the list - - -",
    },
    {
      name: "Ejectment petition",
      value: "Ejectment petition",
    },
    {
      name: "Fair rent determination",
      value: "Fair rent determination",
    },
    {
      name: "Tenancy registration",
      value: "Tenancy registration",
    },
    {
      name: "Other (Please specify)",
      value: "Other (Please specify)",
    },
    {
      name: "Or leave blank",
      value: "Or leave blank",
    },
  ].sort((a, b) => a.name.localeCompare(b.name));
  
  const optionsCompanyLaw = [
    {
      name: "",
      value: "",
    },
    {
      name: "- - - Other / Not in the list - - -",
      value: "- - - Other / Not in the list - - -",
    },
    {
      name: "Winding up",
      value: "Winding up",
    },
    {
      name: "Other (Please specify)",
      value: "Other (Please specify)",
    },
    {
      name: "Or leave blank",
      value: "Or leave blank",
    },
  ].sort((a, b) => a.name.localeCompare(b.name));
  


  
const optionsFamilyLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Jactitation of marriage",
    value: "Jactitation of marriage",
  },
  {
    name: "Dissolution of marriage/Khula",
    value: "Dissolution of marriage/Khula",
  },
  {
    name: "Restitution of conjugal rights",
    value: "Restitution of conjugal rights",
  },
  {
    name: "Maintenance",
    value: "Maintenance",
  },
  {
    name: "Dower",
    value: "Dower",
  },
  {
    name: "Dowry article/gifts",
    value: "Dowry article/gifts",
  },
  {
    name: "Child custody/Guardianship",
    value: "Child custody/Guardianship",
  },
  {
    name: "Child visitation rights",
    value: "Child visitation rights",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank option",
    value: "Or leave blank option",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsBankingLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Suit for recovery by the Bank",
    value: "Suit for recovery by the Bank",
  },
  {
    name: "Suit for recovery against the bank",
    value: "Suit for recovery against the bank",
  },
  {
    name: "Suit for damages",
    value: "Suit for damages",
  },
  {
    name: "Suit for declaration/injunction",
    value: "Suit for declaration/injunction",
  },
  {
    name: "Suit for rendition of accounts",
    value: "Suit for rendition of accounts",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsTaxLaw = [
  {
    name: "",
    value: "",
  },
  {
    name: "- - - Other / Not in the list - - -",
    value: "- - - Other / Not in the list - - -",
  },
  {
    name: "Income tax",
    value: "Income tax",
  },
  {
    name: "Sales tax",
    value: "Sales tax",
  },
  {
    name: "Federal excise law",
    value: "Federal excise law",
  },
  {
    name: "Customs",
    value: "Customs",
  },
  {
    name: "Property tax",
    value: "Property tax",
  },
  {
    name: "Provincial sales tax",
    value: "Provincial sales tax",
  },
  {
    name: "Employees old age benefit",
    value: "Employees old age benefit",
  },
  {
    name: "Worker’s participation fund",
    value: "Worker’s participation fund",
  },
  {
    name: "Other (Please specify)",
    value: "Other (Please specify)",
  },
  {
    name: "Or leave blank",
    value: "Or leave blank",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const nulllist = [null];


const optionsCaseSupervisor = [
  {
    name: "",
    value: "",
  },
  {
    name: "Asim Tauqeer",
    value: "Asim Tauqeer",
  },
  {
    name: "John Smith",
    value: "John Smith",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsChances = [
  {
    name: "",
    value: "",
  },
  {
    name: "Poor (Less than 40%)",
    value: "Poor (Less than 40%)",
  },
  {
    name: "Moderate (40% - 60%)",
    value: "Moderate (40% - 60%)",
  },
  {
    name: "Good (60% - 80%)",
    value: "Good (60% - 80%)",
  },
  {
    name: "Very Good (80% - 100%)",
    value: "Very Good (80% - 100%)",
  },
  {
    name: "Not Applicable",
    value: "Not Applicable",
  },
].sort((a, b) => a.name.localeCompare(b.name));


const optionsLitigationTypes = [
  {
    name: "New Case start (no previous date in diary register)",
    value: "New Case start (no previous date in diary register)",
  },
  {
    name: "Pending adjudication case",
    value: "Pending adjudication case",
  },{
    name: "Litigation consultation only",
    value: "Litigation consultation only",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const optionsCourts = [
  {
    name: "Supreme Court of Pakistan",
    value: "Supreme Court of Pakistan",
  },
  {
    name: "Lahore High Court",
    value: "Lahore High Court",
  },
  {
    name: "Sindh High Court",
    value: "Sindh High Court",
  },
  {
    name: "(KPK) Peshawar High Court",
    value: "(KPK) Peshawar High Court",
  },
  {
    name: "Balochistan High Court",
    value: "Balochistan High Court",
  },
  {
    name: "Gilgit Baltistan High Court",
    value: "Gilgit Baltistan High Court",
  },
  {
    name: "Islamabad High Court",
    value: "Islamabad High Court",
  },
  {
    name: "Federal Shariat Court",
    value: "Federal Shariat Court",
  },
  {
    name: "District & Sessions Judge",
    value: "District & Sessions Judge",
  },
  {
    name: "Additional District & Sessions Judge",
    value: "Additional District & Sessions Judge",
  },
  {
    name: "Senior Civil Judge",
    value: "Senior Civil Judge",
  },
  {
    name: "Civil Judge Class",
    value: "Civil Judge Class",
  },
  {
    name: "Judicial Magistrate",
    value: "Judicial Magistrate",
  },
  {
    name: "Special Judicial Magistrate",
    value: "Special Judicial Magistrate",
  },
  {
    name: "Family Court",
    value: "Family Court",
  },
  {
    name: "Guardian and Ward Court",
    value: "Guardian and Ward Court",
  },
  {
    name: "Anti-Terrorism Court",
    value: "Anti-Terrorism Court",
  },
  {
    name: "Anti-Corruption Court",
    value: "Anti-Corruption Court",
  },
  {
    name: "Special Judge Central",
    value: "Special Judge Central",
  },
  {
    name: "Special Court for offence in Banks",
    value: "Special Court for offence in Banks",
  },
  {
    name: "National Accountability Court",
    value: "National Accountability Court",
  },
  {
    name: "Banking Court",
    value: "Banking Court",
  },
  {
    name: "Collector of Customs",
    value: "Collector of Customs",
  },
  {
    name: "Collector of Customs (Appeals)",
    value: "Collector of Customs (Appeals)",
  },
  {
    name: "Customs Tribunal",
    value: "Customs Tribunal",
  },
  {
    name: "Drug Courts",
    value: "Drug Courts",
  },
  {
    name: "Labour Courts",
    value: "Labour Courts",
  },
  {
    name: "National Industrial Relation Commission",
    value: "National Industrial Relation Commission",
  },
  {
    name: "Board of Revenue",
    value: "Board of Revenue",
  },
  {
    name: "Consumer Court",
    value: "Consumer Court",
  },
  {
    name: "Secretary Cooperative Societies",
    value: "Secretary Cooperative Societies",
  },
  {
    name: "Labour Appellate Tribunal",
    value: "Labour Appellate Tribunal",
  },
  {
    name: "Intellectual Property Tribunal",
    value: "Intellectual Property Tribunal",
  },
  {
    name: "Anti-Dumping Appellate Tribunal",
    value: "Anti-Dumping Appellate Tribunal"
  },
  {
    name: "Federal Services Tribunal",
    value: "Federal Services Tribunal",
  },
  {
    name: "Provincial Services Tribunal",
    value: "Provincial Services Tribunal",
  },
  {
    name: "Subordinate Judiciary Services Tribunal",
    value: "Subordinate Judiciary Services Tribunal",
  },
  {
    name: "Environmental Law Tribunal",
    value: "Environmental Law Tribunal",
  },
  {
    name: "Modarba Tribunal",
    value: "Modarba Tribunal",
  },
  {
    name: "Appellate Tribunal Inland Revenue",
    value: "Appellate Tribunal Inland Revenue",
  },
  {
    name: "Commissioner Appeals, Punjab Revenue Authority",
    value: "Commissioner Appeals, Punjab Revenue Authority",
  },
  {
    name: "Appellate Tribunal Sindh Revenue Board",
    value: "Appellate Tribunal Sindh Revenue Board",
  },
  {
    name: "Commissioner Inland Revenue (Appeals)",
    value: "Commissioner Inland Revenue (Appeals)",
  },
  {
    name: "Zonal Commissioner of Income Tax",
    value: "Zonal Commissioner of Income Tax",
  },
  {
    name: "Federal Tax Ombudsman",
    value: "Federal Tax Ombudsman",
  },
  {
    name: "Federal Ombudsman/Wafaqi Mohtasib",
    value: "Federal Ombudsman/Wafaqi Mohtasib",
  },
  {
    name: "Provincial Ombudsman/Subai Mohtasib",
    value: "Provincial Ombudsman/Subai Mohtasib",
  },
  {
    name: "Banking Ombudsman/Banking Mohtasib",
    value: "Banking Ombudsman/Banking Mohtasib",
  },
  {
    name: "Federal Insurance Ombudsman",
    value: "Federal Insurance Ombudsman",
  },
  {
    name: "Federal Ombudsperson for protection against Harassment of Women at Workplace",
    value: "Federal Ombudsperson for protection against Harassment of Women at Workplace",
  },
  {
    name: "Pakistan Electronic Media Regulatory Authority",
    value: "Pakistan Electronic Media Regulatory Authority",
  },
  {
    name: "Securities and Exchange Commission of Pakistan",
    value: "Securities and Exchange Commission of Pakistan",
  },
  {
    name: "Competition Commission of Pakistan",
    value: "Competition Commission of Pakistan",
  },
  {
    name: "Competition Appellate Tribunal",
    value: "Competition Appellate Tribunal",
  },
  {
    name: "Election Commission of Pakistan",
    value: "Election Commission of Pakistan",
  },
  {
    name: "Pakistan Telecommunication Authority",
    value: "Pakistan Telecommunication Authority",
  },
  {
    name: "Other (Please specify option)",
    value: "Other (Please specify option)",
  },
  {
    name: "Or leave blank option",
    value: "Or leave blank option",
  },
  {name: "Not Applicable",
  value: "N/A",}
].sort((a, b) => a.name.localeCompare(b.name))

// const optionsLitigationTypes = [

  const optionsNatureLitigation = [
    {
      name: "Bail before arrest",
      value: "Bail before arrest",
    },
    {
      name: "Bail after arrest",
      value: "Bail after arrest",
    },
    {
      name: "Supurdari",
      value: "Supurdari",
    },
    {
      name: "Application under Section 22/A, 22/B Cr.P.C.",
      value: "Application under Section 22/A, 22/B Cr.P.C.",
    },
    {
      name: "Quashment",
      value: "Quashment",
    },
    {
      name: "Trial",
      value: "Trial",
    },
    {
      name: "Complaint U/S 202",
      value: "Complaint U/S 202",
    },
    {
      name: "Petition",
      value: "Petition",
    },
    {
      name: "Application",
      value: "Application",
    },
    {
      name: "Appeal",
      value: "Appeal",
    },
    {
      name: "Intra Court Appeal",
      value: "Intra Court Appeal",
    },
    {
      name: "Review",
      value: "Review",
    },
    {
      name: "Revision",
      value: "Revision",
    },
    {
      name: "Constitutional petition U/A 199 etc.",
      value: "Constitutional petition U/A 199 etc.",
    },
    {
      name: "Constitutional Petitioner U/A 184 etc.",
      value: "Constitutional Petitioner U/A 184 etc.",
    },
    {
      name: "Rectification of mistake in a Court decision",
      value: "Rectification of mistake in a Court decision",
    },
    {
      name: "Miscellaneous Application",
      value: "Miscellaneous Application",
    },
    {
      name: "Assessment Proceedings",
      value: "Assessment Proceedings",
    },
    {
      name: "Others (Please specify option)",
      value: "Others (Please specify option)",
    },
    {
      name: "Or leave blank option",
      value: "Or leave blank option",
    },{name: "Not Applicable",
    value: "N/A",}
  ].sort((a, b) => a.name.localeCompare(b.name));
  
const dummyFormData = {
  "isOrganization": false,
  "legalOpinion": true,
  "legalDrafting": false,
  "dueDiligence": false,
  "legalisationRegistration": false,
  "regulatoryWork": false,
  "litigationWork": false,
  "clientDetails": {
      "name": "Nauman",
      "clientName": "Muhammad Nauman",
      "clientAddress": "House # 1029D, Street # 46",
      "phoneNumber": "+923315882990",
      "email": "numan98khan@gmail.com",
      "cnicNumber": "12345-1234567-1",
      "ntn": "123654789",
      "plaintiff": "Defendant"
  },
  "otherParties" : [{"otherPartyDetails": {
          "partyName": "Muhammad Nauman",
          "address": "House # 1029D, Street # 46",
          "phoneNumber": "+923315882990",
          "email": "numan98khan@gmail.com",
          "cnicNumber": "9876598765439"
      }},],
  "otherPartyDetails": {
      "partyName": "Muhammad Nauman",
      "address": "House # 1029D, Street # 46",
      "phoneNumber": "+923315882990",
      "whatsappNumber": "",
      "email": "numan98khan@gmail.com",
      "cnicNumber": "9876598765439"
  },
  "contactPerson": {
      "name": "Muhammad Nauman",
      "fatherName": "Muhammad Nauman",
      "cnic": "Muhammad Nauman",
      "phoneNumber1": "+923315882990",
      "whatsappNumber1": "+923315882990",
      "email": "numan98khan@gmail.com",
      "homeAddress": "House # 1029D, Street # 46"
  },
  "litigation": {
      "category": "Civil Litigation",
      "subCategory": "Specific Performance of Contract under Section 12"
  },
  "litigationCaseTitle": "My Unlawful Land Deal",
  "courtCaseNo": "365/12",
  "isDateNewCase": false,
  "substantiveDateOfLastHearing": "2023-04-01T14:31:00.000Z",
  "substantiveDateOfNextHearing": "2023-04-08T14:31:00.000Z",
  "judge": "Judge Rukhsar",
  "court": "District & Sessions Judge",
  "district": "Lower Dir",
  "bench": "High",
  "tehsil": "Jandool",
  "natureOfLitigation": "Trial",
  "worker": "akashahmed@greystone.com",
  "clerk": "numan98khan@gmail.com"
};

const dummyFormData1 = {
    "clientDetails": {
        "address": "House # 1029D, Street # 46",
        "cnic": "17301-0830477-1",
        "companyName": "N/A",
        "contactNumber": "+923315882990",
        "country": "AM",
        "dob": "06/03/2023, 05:48:18",
        "email": "numan98khan@gmail.com",
        "firstName": "Muhammad",
        "gender": "male",
        "howDidYou": "Myself",
        "lastName": "Nauman",
        "nationality": "AT",
        "preferredCorr": "by email",
        "registration_time": "6/3/2023 @ 5:51:48",
        "title": "Mr.",
        "town": "Islamabad",
        "zipcode": "44000",
        "id": "-NPoOnidu4OBYdUwnTSE"
    },
    "caseDetails": {
        "isOrganization": false,
        "legalOpinion": true,
        "legalDrafting": false,
        "dueDiligence": true,
        "legalisationRegistration": false,
        "regulatoryWork": false,
        "litigationWork": false,
        "clientDetails": {
            "name": "Nauman",
            "clientName": "Muhammad Nauman",
            "clientAddress": "House # 1029D, Street # 46",
            "phoneNumber": "+923315882990",
            "email": "numan98khan@gmail.com",
            "cnicNumber": "12345-1234567-1",
            "ntn": "123654789",
            "plaintiff": "Defendant",
            "whatsappNumber": "+923315882990"
        },
        "otherParties": [
            {
                "otherPartyDetails": {
                    "partyName": "Muhammad Nauman",
                    "address": "House # 1029D, Street # 46",
                    "phoneNumber": "+923315882990",
                    "email": "numan98khan@gmail.com",
                    "cnicNumber": "9876598765439",
                    "clientName": "Muhammad Nauman",
                    "clientAddress": "House # 1029D, Street # 46",
                    "advocateName": "Malik Riaz",
                    "ntn": "213465",
                    "whatsappNumber": "+923335241011"
                }
            }
        ],
        "otherPartyDetails": {
            "partyName": "Muhammad Nauman",
            "address": "House # 1029D, Street # 46",
            "phoneNumber": "+923315882990",
            "email": "numan98khan@gmail.com",
            "cnicNumber": "9876598765439"
        },
        "contactPerson": {
            "name": "Nauman",
            "clientName": "Muhammad Nauman",
            "clientAddress": "House # 1029D, Street # 46",
            "phoneNumber": "+923315882990",
            "email": "numan98khan@gmail.com",
            "cnicNumber": "12345-1234567-1",
            "ntn": "123654789",
            "plaintiff": "Defendant",
            "whatsappNumber": "+923315882990"
        },
        "litigation": {
            "category": "Civil Litigation",
            "subCategory": "Specific Performance of Contract under Section 12"
        },
        "litigationCaseTitle": "My Unlawful Land Deal",
        "courtCaseNo": "365/12",
        "isDateNewCase": false,
        "substantiveDateOfLastHearing": "2023-04-01T14:31:00.000Z",
        "substantiveDateOfNextHearing": "2023-04-08T14:31:00.000Z",
        "judge": "Judge Rukhsar",
        "court": "District & Sessions Judge",
        "district": "Lower Dir",
        "bench": "N/A",
        "tehsil": "Jandool",
        "natureOfLitigation": "Trial",
        "worker": "akashahmed@greystone.com",
        "clerk": "numan98khan@gmail.com"
    },
    "paymentOptions": {}
}

export {
  nulllist,
  dummyFormData,
  dummyFormData1,
  optionsChances,
  optionsCaseSupervisor,
  optionsHousingLaw,
  optionsConsumerLaw,
  optionsCriminalLaw,
  optionsServiceLaw,
  optionsCompanyLaw,
  optionsBankingLaw,
  optionsFamilyLaw,
  optionsTaxLaw,
  optionsCriminalLaw_2,
  optionsCriminalLaw_3,
  optionsCompetitionLaw,
  optionsPublicInterestLaw,
  optionsOtherLaw,
  optionsLitigationTypes,
  optionsCourts,
  optionsNatureLitigation
};
