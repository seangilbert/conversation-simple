const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BAMAkZBQcH0m9EOAR6IOnqpOFwbrEapyIA9fpglA5YYIOdAouDYypvF5o43pRaBBNRJE4ZCLZCoYLJ61OZCZBh9dl79grlAYp0FJdZCz8tnZAkzFKzHEC62kgfJuedHd83qpUaQCaGksGGoP4sdvdfE75eFYKIuBZCSvhKZCoh82She7YXYlpjxhM1K7WrRR90YAZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const AdSet = adsSdk.AdSet;

const CAMPAIGNID = '6097935400819';


account
  .createCampaign(
    [],
    {
      name: 'Fridge Campaign Store Traffic',
      objective: 'LINK_CLICKS'
    }

  )
  .catch((error) => {
    console.error(error);
  });
