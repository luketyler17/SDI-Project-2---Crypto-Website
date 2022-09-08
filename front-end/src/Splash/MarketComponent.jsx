import React from 'react';
import { Box, Grid, Paper, Typography, Card } from '@mui/material/';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
//props passed in are:
const MarketComponent = ({ data }) => {
  let arrOfMarkets = [];
  const filterMarkets = inputObj => {
    for (const [key, value] of Object.entries(inputObj)) {
      if (value.volume_usd > 2000000000) {
        arrOfMarkets.push(value);
      }
    }
  };
  let index = 0;

  const [arrIndex, setArrIndex] = useState(0);

  filterMarkets(data);
  return (
    <>
      <Card
        style={{
          borderRadius: 5,
          margin: '0px 25px',
          width: '500px',
          height: '100%',
          boxShadow: '0px 1px 5px black',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            verticalAlign: 'center',
            paddingTop: '10%',
            textAlign: 'center'
          }}
        >
          <FaChevronLeft
            onClick={() => {
              setArrIndex(arrIndex - 1);
              if (arrIndex < 1) {
                setArrIndex(arrOfMarkets.length - 1);
              }
            }}
            style={{
              alignContent: 'flex-start',
              cursor: 'pointer',
              verticalAlign: 'center',
              userSelect: 'none'
            }}
          />
        </div>
        {arrOfMarkets.length > 0 ? (
          <div
            style={{
              display: 'inline-block',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <h4
              style={{
                margin: '0',
                padding: '0',
              }}
              >Current Market Volume</h4>
            Exchange name: {arrOfMarkets[arrIndex].name}
            <br />
            Exchange volume: $
            {Number(arrOfMarkets[arrIndex].volume_usd).toLocaleString()}
            <div>
              <a
                href={arrOfMarkets[arrIndex].url}
                style={{
                  '&:visited': {
                    textDecoration: 'none',
                  },
                  '&:link': {
                    textDecoration: 'none',
                  },
                }}
              >
                Exchange Site: {arrOfMarkets[arrIndex].url}
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            display: 'flex',
            verticalAlign: 'center',
            paddingTop: '10%',
          }}
        >
          <FaChevronRight
            onClick={() => {
              setArrIndex(arrIndex + 1);
              if (arrIndex > arrOfMarkets.length - 2) {
                setArrIndex(0);
              }
            }}
            style={{
              alignContent: 'flex-start',
              cursor: 'pointer',
              verticalAlign: 'center',
              userSelect: 'none'

            }}
          />
        </div>
      </Card>
    </>
  );
};

export default MarketComponent;
