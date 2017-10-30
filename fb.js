

const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BACjjIe2cDiJv4BnDk9OwRxdX6aGGKUbKqdwPmX26JFi1wWwZBFQxy1qFmIKQ0VtRMBTxP9tuG6CA1AU8zlZBQFA7SXBbfBZCXMNYy2HUpeodmF8qhajiE6eQmYW9cu7ucCEqomXZBj3g0nRzWzHUbycU2xIjfEIoVzInyQMmEdZC0q0bo9Cr9F2LDeVuWlwZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const AdSet = adsSdk.AdSet;
console.log(AdSet);

const CAMPAIGN_ID = '6097896039219';



account
  .createCampaign(
    [],
    {
      [Campaign.Fields.name]: 'Fridge Campaign Store Traffic',
      [Campaign.Fields.status]: Campaign.Status.paused,
      [Campaign.Fields.objective]: Campaign.Objective.page_likes
    }

  )
  .then((campaign) => {
    console.log(campaign);
  })
  .catch((error) => {
    console.error(error);
  });

// https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436


account
  .createAdSet(
    [], {
      name: 'Fridge AdSet',
      bid_amount: '50',
      daily_budget: '500',
      page_id: '358758881214334',
      billing_event: 'IMPRESSIONS',
      optimization_goal: 'IMPRESSIONS',
      promoted_object: {
        image_url: 'https://fb.me/1UEB1MtuiFFRzNJ',
        object_url: 'https://www.facebookmarketingpartners.com'
      },
      targeting: {
        geo_locations: {
          countries: ['US']
        }
      },
      status: 'PAUSED',
      campaign_id: CAMPAIGN_ID
    }
  )
  .catch((error) => {
    console.error(error);
  });


  account
    .createAdCreative(
      [], {
    name: 'Fridge Candy Ad',
    title: 'Fridge Candy Hat',
    body: 'Check out this hat!',
    image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
    object_url: 'https://sean-gilberts-store.myshopify.com'
  });

  account
    .createAd(
      [], {
  name: 'Fridge Candy Ad',
  adset_id: '6097904816019',
  status: 'PAUSED',
  creative: {
    creative_id: '6097906156419'
    }
  });
