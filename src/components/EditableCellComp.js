import React from 'react';
// import classes from './componentCSS/field.module.css';

import Field from '../components/Field';
import TableCell from '@material-ui/core/TableCell';

const RowCell = (props) => {
    const [cellValue, setCellValue] = React.useState(props.value);
    const [cellValueInput, setCellValueInput] = React.useState(false);
    const [temp, settemp] = React.useState('')

    function updateChange() {

        setCellValueInput(false)
        if(cellValue.length < 1){
            setCellValue(temp)
        }
        else if (temp !== cellValue) {

        props.updateHearing(props.cell, cellValue, props.hearing_key, temp)
        }
    }

    return (
        <TableCell align="center">
            <div className={`${cellValueInput===false? 'editablecell' :''} `}>
                <Field value = {cellValue} 

                    onEnter = {(event) => {

                        // console.log('event')
                        // console.log(event.key)

                        if (event.key === 'Enter'){

                            updateChange();
                        }
                    }}

                    inputChange = {(e) => {
                        setCellValue(e.target.value);
                    }}
                    doubleClick = {() => 
                        {

                        settemp(cellValue)
                        setCellValueInput(true)
                        }
                    }
                    blur = {() => 
                        {
                            
                            updateChange();
                        }
                    }
                    active = {cellValueInput}>
                </Field>
            </div>
        </TableCell>
    )
  }


export default RowCell;