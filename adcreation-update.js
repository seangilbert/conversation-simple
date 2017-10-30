const Promise = require('bluebird');
const FacebookAdsSdk = require('facebook-nodejs-ads-sdk');

const AdAccount = FacebookAdsSdk.AdAccount;
const Campaign = FacebookAdsSdk.Campaign;
const AdCreative = FacebookAdsSdk.AdCreative;
const Ad = FacebookAdsSdk.Ad;
const FacebookAdsApi = FacebookAdsSdk.FacebookAdsApi;


const ACCESS_TOKEN = 'EAACUHflG6q4BAKUVSRgbIe30si4QxRpUH12twhjofYgJplLG0XKG9XS43sM6yzutKjGn2v67KCBEUZBFuijF4WQofOu0nZAygQXwMPa5LRXd0zZAEbLqUdt67LNkM6mf54WlkUtz35NCbEi5Yhv9Yc9avH0XkT3myhie8xsYmjKIv8FP4RjXz4AbtsJt04evpX5KhZADiwZDZD';

const ACCOUNT_ID = 'act_205076822892282';
const AD_SET_ID = '6097936212619';

const AD_STATUS = {
  PAUSED: 'PAUSED'
};

const AD_DATA = {
  creative: {
    name: 'Link Click Ad Creative',
    title: 'Link Click Test Ad',
    body: 'Here is some different text.',
    image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
    object_url: 'https://sean-gilberts-store.myshopify.com'
  },
  ad: {
    name: 'New Fridge Ad New Ad',
    adset_id: AD_SET_ID,
    status: AD_STATUS.PAUSED
  }
};

// const delay = milliseconds => (pass) => Promise.delay(milliseconds).then(() => pass);

// const _accounts = {}; // caches AdAccount records by id for reuse
// function getFacebookAdAccount(id) {
//   return _accounts[id] || (_accounts[id] = new AdAccount(id));
// }


function getFacebookAdAccount(id) {
  return new AdAccount(id);
}

function createAdCreative(account, adData) {
  console.log(JSON.stringify(adData.creative, null, 2));
  return account.createAdCreative([], adData.creative);
}

function handleCreateAdCreativeResponse(response) {
  // console.log(response._data.id);
  return response._data.id;
}

function createAd(account, adData, adCreativeId) {
  // FacebookAdsApi.init(ACCESS_TOKEN);
  const reqData = Object.assign({}, adData.ad, {
    creative: {
      creative_id: adCreativeId
    }
  });
  console.log(JSON.stringify(reqData, null, 2));
  return account.createAd([], reqData);
}

function createAdSequence(accountId, adData) {
  const account = getFacebookAdAccount(accountId);
  createAdCreative(account, adData)
    .then(handleCreateAdCreativeResponse)
    // .then(delay(30000))
    .then(createAd.bind(null, account, adData))
    .catch(error => console.error(error));
}

// main program flow
FacebookAdsApi.init(ACCESS_TOKEN);
createAdSequence(ACCOUNT_ID, AD_DATA);
