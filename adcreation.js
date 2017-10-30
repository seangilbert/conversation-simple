const Promise = require('bluebird');
const FacebookAdsSdk = require('facebook-nodejs-ads-sdk');

const AdAccount = FacebookAdsSdk.AdAccount;
const Campaign = FacebookAdsSdk.Campaign;
const AdCreative = FacebookAdsSdk.AdCreative;
const FacebookAdsApi = FacebookAdsSdk.FacebookAdsApi;

const ACCESS_TOKEN = 'EAACUHflG6q4BACl2qL1W5QIKvAchvBh2aaZB2VQ70ydsHZAqfBeCEwOFzegE42PZAF8AdlXhLVuCmbZBmFd0xoUl2XNgJ9IRpjPB52BPu8nn25Sskx5BFmhdvZCqZBpZAMJPfpp8XTBjjeIHR6DJXOfYGQESAEZBWoquKZBjlIoEZB9bOdZAj9EJQy24aGiveJftPQVIX7HLuXYBAZDZD';

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
    name: 'The Big Fridge!',
    adset_id: AD_SET_ID,
    status: AD_STATUS.PAUSED
  }
};

const delay = milliseconds => (pass) => Promise.delay(milliseconds).then(() => pass);

const _accounts = {}; // caches AdAccount records by id for reuse
function getFacebookAdAccount(id) {
  const account = _accounts[id] || (_accounts[id] = new AdAccount(id, api));
  account.setData({ id });
  return account;
}

function createAdCreative(accountId, adData) {
  const account = getFacebookAdAccount(accountId);
  return account.createAdCreative([], adData.creative);
}

function handleCreateAdCreativeResponse(response) {
  return response._data.id;
}

function createAd(accountId, adData, adCreativeId) {
  const account = getFacebookAdAccount(accountId);
  return account.createAd([], Object.assign({}, adData.ad, {
    creative: {
      creative_id: adCreativeId
    }
  }));
}

function createAdSequence(accountId, adData) {
  createAdCreative(accountId, adData)
    .then(handleCreateAdCreativeResponse)
    // .then(delay(3000))
    .then(createAd.bind(null, accountId, adData))
    .catch(error => console.error(error));
}

// main program flow
const api = FacebookAdsApi.init(ACCESS_TOKEN).setDebug(true);
createAdSequence(ACCOUNT_ID, AD_DATA);
