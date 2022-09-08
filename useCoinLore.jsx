import { useState, useEffect, useMemo } from 'react';
import { loadCoins } from './loadCoins';
import { uniqWith, isEqual } from 'lodash';

export const useCoinLore = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [coinInfo, setCoinInfo] = useState([]);
  let loadedCoins = loadCoins();
  let coinSelection = [];
  let page = props[0];
  let search = props[1];
  let url = `https://api.coinlore.net/api/tickers/?start=${page}&limit=100`;

  if (search !== '') {
    let coinsFiltered = loadedCoins.filter(
      coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    coinsFiltered = uniqWith(coinsFiltered, isEqual);
    let sortedResults = coinsFiltered.sort((a, b) => a.rank - b.rank);
    coinSelection = sortedResults.slice(0, 32);
  }

  useMemo(() => {
    setIsLoading(true);
    setServerError(null);
    console.log('fetching Coin info...');

    if (search === '') {
      fetch(url)
        .then(res => {
          if (res.ok === false) {
            setServerError(res.statusText);
            return;
          } else {
            return res;
          }
        })
        .then(res => res.json())
        .then(data => {
          setCoinInfo(data.data);
          setIsLoading(false);
          return data;
        })
        .catch(error => {
          setIsLoading(false);
          // console.log(error);
        });
    } else {
      if (search !== '') {
        console.log('after sort', coinSelection);
        let coinFetches = coinSelection.map(currentCoin => {
          return fetch(
            `https://api.coinlore.net/api/ticker/?id=${currentCoin.id}`
          )
            .then(res => {
              if (res.ok === false) {
                setServerError(res.statusText);
                return;
              } else {
                return res;
              }
            })
            .then(res => res.json())
            .then(data => data[0]);
        });

        Promise.all(coinFetches).then(values => {
          console.log(values);
          setCoinInfo(values);
          setIsLoading(false);
        });
      }
    }
  }, [url, search]);

  return [isLoading, setIsLoading, coinInfo, setCoinInfo, serverError];
};

export const useMarketFetch = props => {
  const [marketInfo, setMarketInfo] = useState([]);

  useMemo(() => {
    console.log('fetching market info...');
    fetch('https://api.coinlore.net/api/exchanges/')
      .then(res => res.json())
      .then(data => {
        let pushArr = [];
        for (const [key, value] of Object.entries(data)) {
          pushArr.push(value);
        }
        setMarketInfo(pushArr);
      });
  }, [setMarketInfo]);

  return [marketInfo, setMarketInfo];
};
