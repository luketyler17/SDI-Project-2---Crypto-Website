import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { Card, Paper, Grid } from '@mui/material/';

import InputComponent from './InputComponent';

const columns = [
  {
    id: 'image',
    minWidth: 4,
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 4,
  },
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 5,
    align: 'left',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'price_usd',
    label: 'Price (USD)',
    minWidth: 50,
    format: value => '$' + value.toLocaleString(),
  },

  {
    id: 'percent_change_1h',
    label: 'Change 1 Hour (%)',
    minWidth: 25,
    align: 'left',
    format: value => value.toFixed(2),
  },
  {
    id: 'percent_change_24h',
    label: 'Change 24 Hour (%)',
    minWidth: 50,
    align: 'left',
    format: value => value.toFixed(2),
  },
  {
    id: 'percent_change_7d',
    label: 'Change 7 Days (%)',
    minWidth: 50,
    align: 'left',
    format: value => value.toFixed(2),
  },
  {
    id: 'volume24',
    label: 'Volume last 24 hours',
    minWidth: 50,
    align: 'left',
    format: value => value.toLocaleString(),
  },
];

const AdvancedSearch = () => {
  const [stateOne, setStateOne] = useState({
    filter: '',
    operator: '',
    input: 'default value',
  });
  const [stateTwo, setStateTwo] = useState({
    filter: '',
    operator: '',
    input: 'default value',
  });
  const [stateThree, setStateThree] = useState({
    filter: '',
    operator: '',
    input: 'default value',
  });

  //table information
  //Promise.all() on line 110
  const [marketInfo, setMarketInfo] = useState([]);
  var coinArr = [];

  useEffect(() => {
    async function coinFetch() {
      for (let i = 0; i < 5000; i += 100) {
        const fetchRaw = await fetch(
          `https://api.coinlore.net/api/tickers/?start=${i}&limit=100`
        )
          .then(res => res.json())
          .then(data => {
            coinArr.push(data.data);
          });
      }
      //setMarketInfo(coinArr)
      coinArr = coinArr.flat(1);
      setMarketInfo(coinArr);
    }
    coinFetch();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //price_usd
  //percent_change_1h
  //percent_change_24h
  //percent_change_7d
  //volume24

  //price in USD
  //Change in Last 24h
  //Change in Last Hour
  //Change in 7 days
  //Volume in last 24 hours
  let countVar = false;
  const stockFilterOne = inputData => {
    if (stateOne.input != 'default value') {
      let newArr = inputData;
      let returnArr = [];
      if (stateOne.operator == '>') {
        if (stateOne.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.price_usd > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_1h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_24h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_7d > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.volume24 > intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateOne.operator == '<') {
        if (stateOne.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.price_usd < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_1h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_24h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_7d < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.volume24 < intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateOne.operator == '<=') {
        if (stateOne.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.price_usd <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_1h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_24h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_7d <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.volume24 <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateOne.operator == '>=') {
        if (stateOne.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.price_usd >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_1h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_24h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.percent_change_7d >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateOne.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.volume24 >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      }
      return returnArr;
    }
  };
  const stockFilterTwo = inputData => {
    if (stateTwo.input != 'default value') {
      let newArr = inputData;
      let returnArr = [];
      if (stateTwo.operator == '>') {
        if (stateTwo.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.price_usd > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_1h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_24h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_7d > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.volume24 > intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateTwo.operator == '<') {
        if (stateTwo.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.price_usd < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_1h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_24h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_7d < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.volume24 < intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateTwo.operator == '<=') {
        if (stateTwo.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.price_usd <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_1h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_24h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_7d <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.volume24 <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateTwo.operator == '>=') {
        if (stateTwo.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.price_usd >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_1h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_24h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.percent_change_7d >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateTwo.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateTwo.input);
            if (currentObj.volume24 >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      }
      return returnArr;
    }
  };
  const stockFilterThree = inputData => {
    if (stateThree.input != 'default value') {
      let newArr = inputData;
      let returnArr = [];
      if (stateThree.operator == '>') {
        if (stateThree.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.price_usd > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_1h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_24h > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_7d > intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.volume24 > intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateThree.operator == '<') {
        if (stateThree.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.price_usd < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_1h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_24h < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_7d < intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.volume24 < intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateThree.operator == '<=') {
        if (stateThree.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.price_usd <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_1h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_24h <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_7d <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.volume24 <= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      } else if (stateThree.operator == '>=') {
        if (stateThree.filter === 'price_usd') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.price_usd >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_1h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_1h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_24h') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_24h >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'percent_change_7d') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateThree.input);
            if (currentObj.percent_change_7d >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        } else if (stateThree.filter === 'volume24') {
          for (let i = 0; i < newArr.length; i++) {
            let currentObj = newArr[i];
            let intFunc = parseFloat(stateOne.input);
            if (currentObj.volume24 >= intFunc) {
              returnArr.push(currentObj);
            }
          }
        }
      }
      return returnArr;
    }
  };

  var filteredInfo = [];

  if (stateOne.input != 'default value') {
    if (filteredInfo.length > 0) {
      filteredInfo = stockFilterOne(filteredInfo);
    } else {
      filteredInfo = stockFilterOne(marketInfo);
    }
  }
  if (stateTwo.input != 'default value') {
    if (filteredInfo.length > 0) {
      filteredInfo = stockFilterTwo(filteredInfo);
    } else {
      filteredInfo = stockFilterTwo(marketInfo);
    }
  }
  if (stateThree.input != 'default value') {
    if (filteredInfo.length > 0) {
      filteredInfo = stockFilterThree(filteredInfo);
    } else {
      filteredInfo = stockFilterThree(marketInfo);
    }
  }

  return (
    <>
      <Grid
        sx={{
          height: '100%',
          width: '100%',
          margin: '0',
          marginBottom: '50px',
        }}
        style={{
          marginTop: '100px',
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          direction='row'
        >
          <Card
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0px 0px 7px black',
            }}
          >
            <InputComponent stateChanger={setStateOne} data={stateOne} />
            <InputComponent stateChanger={setStateTwo} data={stateTwo} />
            <InputComponent stateChanger={setStateThree} data={stateThree} />
          </Card>
        </Grid>
      </Grid>

      {marketInfo.length < 1 ? (
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            height: '100%',
            marginTop: '50px',
            marginBottom: '50px',
            boxShadow: '0px 0px 7px black',
          }}
        >
          <TableContainer sx={{ maxHeight: '50rem' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            </Table>
            <TableBody>
              <TableCell>Loading...</TableCell>
            </TableBody>
          </TableContainer>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            height: '100%',
            marginTop: '50px',
            marginBottom: '50px',
            boxShadow: '0px 0px 7px black',
          }}
        >
          <TableContainer sx={{ maxHeight: '50rem' }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {stateOne.input != 'default value' ||
              stateTwo.input != 'default value' ||
              stateThree.input != 'default value' ? (
                <TableBody>
                  {filteredInfo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map(column => {
                            const value = row[column.id];
                            if (value == undefined) {
                              return (
                                <TableCell>
                                  <img
                                    onError={e => {
                                      e.onerror = null;
                                      e.target.src = `/images/coins/color/generic.svg`;
                                    }}
                                    src={`/images/coins/color/${row.symbol.toLowerCase()}.svg`}
                                    alt={value}
                                    style={{ height: '2rem', margin: '15px' }}
                                  />
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              ) : (
                <TableBody>
                  {marketInfo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map(column => {
                            const value = row[column.id];
                            if (value == undefined) {
                              return (
                                <TableCell>
                                  <img
                                    onError={e => {
                                      e.onerror = null;
                                      e.target.src = `/images/coins/color/generic.svg`;
                                    }}
                                    src={`/images/coins/color/${row.symbol.toLowerCase()}.svg`}
                                    alt={row.symbol}
                                    style={{ height: '2rem', margin: '15px' }}
                                  />
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {stateOne.input != 'default value' ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={filteredInfo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={marketInfo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
    </>
  );
};

export default AdvancedSearch;
