import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const pdfColumns = [
  "#", 
  "FILE#", 
  "CASE#", 
  "COURT CASE#", 
  "CASE TITLE", 
  "NATURE OF CASE", 
  "CATEGORY", 
  "COURT",
  "DISTRICT",
  "JUDGE",
  "PREVIOUS PROCEEDINGS",
  "PREVIOUS DATE",
  "NEXT DATE",
  "NEXT PROCEEDINGS",
  "REMARKS",  
  "CASE OWNER",
  "CASE SUPERVISOR",
  "CASE WORKER",
  "CASE CLERK",
  "OTHER PARTY",
  "UPDATED BY"];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  panel: {
    marginBottom: theme.spacing(2)
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  primaryChip: {
    backgroundColor: '#18ab1b', // Your custom primary color
    color: '#ffffff', // Text color for primary Chip
  },
  secondaryChip: {
    backgroundColor: '#e754e4', // Your custom secondary color
    color: '#ffffff', // Text color for secondary Chip
  },
}));

const TagPanel = ({ selectedTags, handleTagClick, setSelectedTags}) => {
  const classes = useStyles();
  const [allTagsSelected, setAllTagsSelected] = useState(false);

  const handleSelectAllClick = () => {
    if (allTagsSelected) {
    //   handleTagClick([]);
      setSelectedTags([]);
    }
    setAllTagsSelected(!allTagsSelected);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          PDF Column Select
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.tags}>
            {/* <Chip
              label={allTagsSelected ? "Deselect All" : "Select All"}
              color={allTagsSelected ? "primary" : undefined}
              onClick={handleSelectAllClick}
            /> */}
            {pdfColumns.map(tag => (
              <Chip
                key={tag}
                label={tag}
                color={selectedTags.includes(tag) ? "secondary" : undefined}
                // TODO: Make magenta the selected chip color
                // className={
                //   selectedTags.includes(tag) ? undefined : classes.secondaryChip
                // }
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default TagPanel;
