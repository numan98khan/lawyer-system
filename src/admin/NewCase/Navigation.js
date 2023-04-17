import React from 'react';
import './Navigation.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tocItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 16px',

    textTransform: 'capitalize',
    fontSize: '1.0rem',
    background: 'transparent',
    border: '0.05rem solid var(--mainPurple)',
    borderColor: 'var(--mainPurple)',
    color: 'var(--mainPurple)',
    // borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      background: 'var(--mainPurple)',
      color: 'white',
    },

    '&:focus': {
      outline: 'none',
    },

    '&.active': {
      background: 'var(--mainPurple)',
      color: 'white',
    },
  },
}));

const Navigation = ({ step, setStep }) => {
  const handleClick = (newStep) => {
    setStep(newStep);
  };

  const classes = useStyles();

  return (
    <div className="navigation-container sticky">
      <div className="navigation-steps">
        <div
          className={`${classes.tocItem} ${step === 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
        >
          {'Case Instructions'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 3 ? 'active' : ''}`}
          onClick={() => handleClick(3)}
        >
          {'Case Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 4 ? 'active' : ''}`}
          onClick={() => handleClick(4)}
        >
          {'Court Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 5 ? 'active' : ''}`}
          onClick={() => handleClick(5)}
        >
          {/* {'Other Party Information'} */}
          {'Client Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 6 ? 'active' : ''}`}
          onClick={() => handleClick(6)}
        >
          {/* {'Client Information'} */}
          {/* {'Other Party Information'} */}
          {'Contact Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 7 ? 'active' : ''}`}
          onClick={() => handleClick(7)}
        >
          {'Other Party Details'}
          {/* {'Contact Information'} */}
        </div>
        <div
          className={`${classes.tocItem} ${step === 8 ? 'active' : ''}`}
          onClick={() => handleClick(8)}
        >
          {/* {'Nature of Litigation'} */}
          {'Category Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 9 ? 'active' : ''}`}
          onClick={() => handleClick(9)}
        >
          {'Litigation Details'}
        </div>
        <div
          className={`${classes.tocItem} ${step === 10 ? 'active' : ''}`}
          onClick={() => handleClick(10)}
        >
          {'Allocation Details'}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
