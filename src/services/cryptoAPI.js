const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-E7UCzbBhLTNRMDfxNLoCqY6N";
const getCointList = () => {
    return `${BASE_URL}/coins/markets`;
}

const searchCoin = () => {
    return `${BASE_URL}/search`;
}

const getApiKey = () => {
    return API_KEY;
}
export {getCointList, getApiKey, searchCoin}