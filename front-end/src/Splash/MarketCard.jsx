import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const MarketCard = (props) => {
    const variableOne = []
    if (props.data != undefined) {
        let values = Object.values(props.data)
        for (const [key, value] of Object.entries(values)) {
            if (value.volume_usd > 1000000000) {
                variableOne.push(value)
            }
        }
    }
    const upateInfo = (input) => {
        for (let i = 0; i < input.length; i++) {
            if ((i + 1) === input.length) {
                i = 0
            }

        }
    }
    const entriesList = []


    return (
        <>
            {entriesList != undefined ? (<Paper>{entriesList.name}</Paper>) : (<Paper>Hello World</Paper>)}
        </>)
}

export default MarketCard