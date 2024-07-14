import { TELEGRAM_DATA } from "../settings";

export const API_URL_COMMON =
  'https://elb.seeddao.org/api/v1/market?egg_type=&sort_by_price=ASC&sort_by_updated_at=&page=1';
export const API_URL_UNCOMMON =
  'https://elb.seeddao.org/api/v1/market?egg_type=uncommon&sort_by_price=ASC&sort_by_updated_at=&page=1';
export const API_URL_RARE =
  'https://elb.seeddao.org/api/v1/market?egg_type=rare&sort_by_price=ASC&sort_by_updated_at=&page=1';
export const API_URL_EPIC =
  'https://elb.seeddao.org/api/v1/market?egg_type=epic&sort_by_price=ASC&sort_by_updated_at=&page=1';
export const API_URL_LEGENDARY =
  'https://elb.seeddao.org/api/v1/market?egg_type=legendary&sort_by_price=ASC&sort_by_updated_at=&page=1';
export const BUY_URL = 'https://elb.seeddao.org/api/v1/market-item/buy';
export const SELL_URL = 'https://elb.seeddao.org/api/v1/market-item/add';

export const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Referer': 'https://cf.seeddao.org/',
  'telegram-data': TELEGRAM_DATA,
  'Origin': 'https://cf.seeddao.org',
  'Connection': 'keep-alive',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'TE': 'trailers',
};