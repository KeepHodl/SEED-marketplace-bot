import checkMarketCommon from './market_common';
import checkMarketLegendary from './market_epic copy';
import checkMarketEpic from './market_legendary';
import checkMarketRare from './market_rare';
import checkMarketUncommon from './market_uncommon';

console.log('Start checking market')

setInterval(checkMarketCommon, 200);
setInterval(checkMarketUncommon, 200);
setInterval(checkMarketRare, 200);
setInterval(checkMarketEpic, 200);
setInterval(checkMarketLegendary, 500);