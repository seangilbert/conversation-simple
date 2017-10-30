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
    name: 'Here it is!',
    adset_id: AD_SET_ID,
    status: AD_STATUS.PAUSED
  }
};

const DEBUG = true;

let _debug = false;

const _apis = {}; // caches FacebookAdsApi instances by accessToken for reuse
function getApi(accessToken) {
  return _apis[accessToken] || (_apis[accessToken] = FacebookAdsApi.init(accessToken).setDebug(_debug));
}

const _accounts = {}; // caches AdAccount records by id for reuse
function getFacebookAdAccount(accessToken, id) {
  const account = _accounts[id] || (_accounts[id] = new AdAccount(id, getApi(accessToken)));
  account.setData({ id });
  return account;
}

function createAdCreative(accessToken, accountId, adData) {
  const account = getFacebookAdAccount(accessToken, accountId);
  return account.createAdCreative([], adData.creative);
}

function handleCreateAdCreativeResponse(response) {
  return response._data.id;
}

function createAd(accessToken, accountId, adData, adCreativeId) {
  const account = getFacebookAdAccount(accessToken, accountId);
  return account.createAd([], Object.assign({}, adData.ad, {
    creative: {
      creative_id: adCreativeId
    }
  }));
}

function createAdSequence(accessToken, accountId, adData, debug) {
  _debug = !!debug;
  createAdCreative(accessToken, accountId, adData)
    .then(handleCreateAdCreativeResponse)
    .then((adCreativeId) => createAd(accessToken, accountId, adData, adCreativeId))
    .catch(error => console.error(error));
}

// main program flow (comment this out to use this as a module)
// createAdSequence(ACCESS_TOKEN, ACCOUNT_ID, AD_DATA, DEBUG);

module.exports = createAdSequence;
