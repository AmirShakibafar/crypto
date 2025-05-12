const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-E7UCzbBhLTNRMDfxNLoCqY6N";
const getCointList = () => {
    return `${BASE_URL}/coins/markets`;
}

const searchCoin = () => {
    return `${BASE_URL}/search`;
}

const marketChart = (coin) => {
    return `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`
}

const getApiKey = () => {
    return API_KEY;
}
export {getCointList, getApiKey, searchCoin, marketChart}