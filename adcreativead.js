const FacebookAdsSdk = require('facebook-nodejs-ads-sdk');
const AdAccount = FacebookAdsSdk.AdAccount;
const Campaign = FacebookAdsSdk.Campaign;
const AdCreative = FacebookAdsSdk.AdCreative;
const FacebookAdsApi = FacebookAdsSdk.FacebookAdsApi;
const Promise = require('bluebird');

const ACCESS_TOKEN = 'EAACUHflG6q4BAMXc8sZBP9irZBV5Kthmy4sZB6KRvG0SuiTFewnVlcDXyBPQJRFM6eGKUawKZA4R0ZCFMfpvCsg9EuRvtvZBJMhKRkiIWZAVt0MfA4BXZABrt0IIrJZA9XdhpBCEn12LgCjcZANFVirnA5jSuzisYm3IDh1G8V3rOMyX19h4vT8ZAjGHY8es0ZCV0BDk0NVZBGEVctwZDZD';

const ACCOUNT_ID = 'act_205076822892282';
const AD_SET_ID = '6097936212619';
const AD_STATUS = {
  PAUSED: 'PAUSED'
};

const AD_DATA = {
  creative: {
    name: 'Link Click Ad',
    title: 'Fridge Candy Hat',
    body: 'This is a badass hat!',
    image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
    object_url: 'https://sean-gilberts-store.myshopify.com'
  },
  ad: {
    name: 'New Fridge Ad 4',
    adset_id: AD_SET_ID,
    status: AD_STATUS.PAUSED
  }
};
const _accounts = {}; // caches AdAccount records by id for reuse

function getFacebookAdAccount(id) {
  return _accounts[id] || (_accounts[id] = new AdAccount(id));
}

function createAdCreative(account, adData) {
  return account.createAdCreative([], adData.creative);
}

function handleCreateAdCreativeResponse(response) {
  return response._data.id;
}

function createAd(account, adData, adCreativeId) {
  return account.createAd([], Object.assign({}, adData.ad, {
    creative: {
      creative_id: adCreativeId
    }
  }));
}

function createAdSequence(accountId, adData) {
  const account = getFacebookAdAccount(accountId);
  createAdCreative(account, adData)
    .then(handleCreateAdCreativeResponse)
    // Promise.delay(2000)
    .then(createAd.bind(null, account, adData))
    // .then(delay)
    .catch(error => console.error(error));
}
// main program flow
FacebookAdsApi.init(ACCESS_TOKEN);
createAdSequence(ACCOUNT_ID, AD_DATA);
