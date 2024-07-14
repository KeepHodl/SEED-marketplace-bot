import fetch from 'node-fetch';
import { BUY_PRICES, SELL_PRICES, TELEGRAM_DATA } from '../settings';
import type { DataStructure, EggType } from './interfaces';
import { API_URL_COMMON, BUY_URL, HEADERS, SELL_URL } from './api';

let errorCount = 0;

const checkMarketCommon = async () => {
  try {
    const response = await fetch(API_URL_COMMON, { headers: HEADERS });
    if (!response.ok) {
      errorCount++;
      if (response.status === 401) {
        console.error('Failed to fetch market data: Unauthorized');
        process.exit(1);
      }
      console.error('Failed to fetch market data:', response.statusText);
      return;
    }

    const data = (await response.json()) as DataStructure;

    if (data && data.data && data.data.items && data.data.items.length > 0) {
      const firstItem = data.data.items[0];
      const eggId = firstItem.egg_id;
      const price = firstItem.price_gross;
      const eggType = firstItem.egg_type;

      errorCount = 0;

      if (
        (eggType === 'common' && price <= BUY_PRICES.common * 1e9) ||
        (eggType === 'uncommon' && price <= BUY_PRICES.uncommon * 1e9) ||
        (eggType === 'rare' && price <= BUY_PRICES.rare * 1e9) ||
        (eggType === 'epic' && price <= BUY_PRICES.epic * 1e9) ||
        (eggType === 'legendary' && price <= BUY_PRICES.legendary * 1e9)
      ) {
        const buyResponse = await fetch(BUY_URL, {
          method: 'POST',
          headers: {
            ...HEADERS,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ market_id: firstItem.id }),
        });

				const time = timeString();

        if (buyResponse.ok) {
          sellMarket(eggType as EggType, eggId);
          console.log(
            `${time} Successfully bought ${eggType.toUpperCase()} for ${
              firstItem.price_gross / 1000000000
            }`,
          );
        } else {
          console.error(
            `${time} Failed to buy ${eggType.toUpperCase()} for ${
              firstItem.price_gross / 1000000000
            }`,
          );
        }
      }
    }
  } catch (error) {
    console.error('Error checking market:', error);
    errorCount++;
    if (errorCount >= 10) {
      console.error('Error limit reached, stopping the program.');
      process.exit(1);
    }
  }
};

const sellMarket = async (eggType: EggType, eggId: string) => {
  let body = '';
  if (eggType === 'common' && SELL_PRICES.common > 0) {
    body = `{"egg_id":"${eggId}","price":${SELL_PRICES.common * 1e9}}`;
  } else if (eggType === 'uncommon' && SELL_PRICES.uncommon > 0) {
    body = `{"egg_id":"${eggId}","price":${SELL_PRICES.uncommon * 1e9}}`;
  } else if (eggType === 'rare' && SELL_PRICES.rare > 0) {
    body = `{"egg_id":"${eggId}","price":${SELL_PRICES.rare * 1e9}}`;
  } else if (eggType === 'epic' && SELL_PRICES.epic > 0) {
    body = `{"egg_id":"${eggId}","price":${SELL_PRICES.epic * 1e9}}`;
  } else if (eggType === 'legendary' && SELL_PRICES.legendary > 0) {
    body = `{"egg_id":"${eggId}","price":${SELL_PRICES.legendary * 1e9}}`;
  }
  if (body === '') {
    return;
  }

	await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 5000) + 5000));

  try {
    const response = await fetch(SELL_URL, {
      method: 'POST',
      headers: {
        ...HEADERS,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body,
    });

		const time = timeString();

    if (response.ok) {
      console.log(`${time} Successfully listed ${eggType.toUpperCase()} for ${SELL_PRICES[eggType]} SEED`);
    } else {
      console.error(`${time} Failed to list ${eggType.toUpperCase()} for ${SELL_PRICES[eggType]} SEED`);
    }
  } catch (error) {
    console.error('Error selling market:', error);
  }
};

// Ну и чо ты тут ищешь?

const timeString = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
	return `${day}.${month} - ${hours}:${minutes}`;
};

export default checkMarketCommon;
