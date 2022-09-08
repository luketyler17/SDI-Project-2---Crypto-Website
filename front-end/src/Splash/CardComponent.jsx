import React from "react";
import Paper from '@mui/material/Paper';



const CardComponent = ({ coin }) => {
    const posOrNeg = (inputNumber) => {
        if (inputNumber > 0) {
            return (
                <img src='/images/Green_Arrow_Up.svg' alt='green arrow up' style={{maxWidth: "25px", maxHeight:"25px", float: "right"}}/>
            )
        } else {
            return (
            <img src='/images/Red_Arrow_Down.svg' alt='red arrow down' style={{maxWidth: "25px", maxHeight:"25px", direction: "rtl", margin: "0",float: "right"}}/>
            )
       }
    }
    return (
        <Paper id="paperCard" elevation={6} key={coin.name} style={{display: "inline-block" }}>
            <h1 style={{textAlign: "center"}}>
                {coin.name}
            </h1>
            <h3 style={{padding: "5px" }}>
                Ticker: {coin.symbol}
            </h3>
            <h3 style={{padding: "5px" }}>
                ${Number(coin.price_usd).toLocaleString()}
            </h3>
            <div style={{padding: "5px" }}>
                Percent change in last 24h: {coin.percent_change_24h}%
                {posOrNeg(coin.percent_change_24h)}
            </div>
            <div style={{padding: "5px" }}>
                Percent Change in last 7d: {coin.percent_change_7d}%
                {posOrNeg(coin.percent_change_7d)}
            </div>
            <div style={{padding: "5px" }}>
                Market Cap: ${Number(coin.market_cap_usd).toLocaleString()}
            </div>
            <div style={{padding: "5px" }}>
                Trade volume in last 24h: ${Number(coin.volume24).toLocaleString()}
            </div>
        </Paper>
    )
}

export default CardComponent