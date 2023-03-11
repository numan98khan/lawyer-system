import React from 'react';
import './Navigation.css';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

// import ButtonContainer from '../../components/Button';
import {MiniButtonContainer as ButtonContainer} from '../../components/Button';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: '35vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Navigation = ({ step, setStep }) => {
  const handleClick = (newStep) => {
    setStep(newStep);
  };

  const classes = useStyles();
    

  return (
    <div 
    className="navigation-container"
    >
      <div 
      className="navigation-steps"
      >

        <FormControl 
        // className={step === 1 ? 'active' : ''}
        className={classes.formControl}
        >
            <ButtonContainer 
            className={step === 1 ? 'active' : ''}
        
            onClick={()=>handleClick(1)}>Case Instructions</ButtonContainer>
        </FormControl>

        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 2 ? 'active' : ''}
                  onClick={()=>handleClick(2)}
                  >Legal Opinion</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 3 ? 'active' : ''}
        onClick={()=>handleClick(3)}>Litigation Case Details</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer    className={step === 4 ? 'active' : ''}
         onClick={()=>handleClick(4)}>Court Details</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 5 ? 'active' : ''}
        onClick={()=>handleClick(5)}>Client Information</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 6 ? 'active' : ''}
        onClick={()=>handleClick(6)}>Other Party Information</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 7 ? 'active' : ''}
        onClick={()=>handleClick(7)}>Contact Information</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 8 ? 'active' : ''}
        onClick={()=>handleClick(8)}>Nature of Litigation</ButtonContainer>
        </FormControl>
        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 9 ? 'active' : ''}
        onClick={()=>handleClick(9)}>Litigation Information</ButtonContainer>
        </FormControl>

        <FormControl className={classes.formControl}>
            <ButtonContainer     className={step === 10 ? 'active' : ''}
        onClick={()=>handleClick(10)}>Worker Assignment</ButtonContainer>
        </FormControl>
        
        {/* <button
          className={step === 1 ? 'active' : ''}
          onClick={() => handleClick(1)}
        >
          Step 1
        </button> */}
      </div>
    </div>
  );
};

export default Navigation;
