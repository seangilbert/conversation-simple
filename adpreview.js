const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BACl2qL1W5QIKvAchvBh2aaZB2VQ70ydsHZAqfBeCEwOFzegE42PZAF8AdlXhLVuCmbZBmFd0xoUl2XNgJ9IRpjPB52BPu8nn25Sskx5BFmhdvZCqZBpZAMJPfpp8XTBjjeIHR6DJXOfYGQESAEZBWoquKZBjlIoEZB9bOdZAj9EJQy24aGiveJftPQVIX7HLuXYBAZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken).setDebug(true);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const AdPreview = adsSdk.AdPreview;




const reqData = {
  AdFormat: {
    desktop_feed_standard: 'DESKTOP_FEED_STANDARD',
  }
};

console.log(JSON.stringify(reqData, null, 2));

  account
    .AdPreview(
      [], reqData
    )
    .catch((error) => {
      console.error(error);
    });
