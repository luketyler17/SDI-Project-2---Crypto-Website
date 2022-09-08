
import React from "react"
import { useState } from 'react';
import { Card, Box, Paper, Grid, TextField } from '@mui/material/';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import RestartAltIcon from '@mui/icons-material/RestartAlt';



const InputComponent = ({ stateChanger, data }) => {

    const [inputValue, setInputValue] = useState("")

    // const resetSelections = () => {
    //     stateChanger({filter: null, operator: null, input:'default value'})
    // }

    const resetInput = () => {
        setInputValue("")
    }

    const handleUserInput = (e) => {
        setInputValue(e.target.value);
      };

    return (
        <Grid>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel htmlFor="grouped-select">Please select an option...</InputLabel>
                <Select defaultValue={inputValue} id="grouped-select" label="Please select an option..."
                    onChange={(event) => stateChanger({...data, filter: event.target.value})}
                >
                    <MenuItem value={'price_usd'}>Price in USD</MenuItem>
                    <MenuItem value={'percent_change_24h'}>Percent change in last 24h</MenuItem>
                    <MenuItem value={'percent_change_1h'}>Percent change in last hour</MenuItem>
                    <MenuItem value={'percent_change_7d'}>Percent change in last 7d</MenuItem>
                    <MenuItem value={'volume24'}>Volume in last 24h</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="grouped-select">Operator</InputLabel>
                <Select defaultValue={inputValue} id="Operator" label="Operator"
                    onChange={(event) => stateChanger({...data, operator: event.target.value})}
                >
                    <MenuItem value={'>'}> {'>'} </MenuItem>
                    <MenuItem value={'<'}> {'<'} </MenuItem>
                    <MenuItem value={'>='}> {'>='} </MenuItem>
                    <MenuItem value={'<='}> {'<='} </MenuItem>
                </Select>
            </FormControl>
            <TextField sx={{ m: 1 }} id="filled-basic" label="Value" variant="filled" value={inputValue} onChange={handleUserInput}
                onKeyDown={(event) => { if(event.keyCode == 13) {stateChanger({...data, input: event.target.value})}}}
            />
            <Fab onClick={() => { resetInput()   }
                    } 
        size="small" color="secondary" aria-label="add"
                sx={{
                    m: 1,
                }}
            >
                <RestartAltIcon />
            </Fab>
        </Grid>
    )
}

export default InputComponent