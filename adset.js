const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BAMAkZBQcH0m9EOAR6IOnqpOFwbrEapyIA9fpglA5YYIOdAouDYypvF5o43pRaBBNRJE4ZCLZCoYLJ61OZCZBh9dl79grlAYp0FJdZCz8tnZAkzFKzHEC62kgfJuedHd83qpUaQCaGksGGoP4sdvdfE75eFYKIuBZCSvhKZCoh82She7YXYlpjxhM1K7WrRR90YAZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const AdSet = adsSdk.AdSet;

const CAMPAIGN_ID = '6097917891419';

// adset 6097916823819

// account
//   .createAdSet(
//     [], {
//       name: 'Fridge AdSet',
//       bid_amount: '50',
//       daily_budget: '500',
//       page_id: '358758881214334',
//       billing_event: 'IMPRESSIONS',
//       optimization_goal: 'IMPRESSIONS',
//       promoted_object: {
//         page_id:'358758881214334'
//       },
//       targeting: {
//         geo_locations: {
//           countries: ['US']
//         }
//       },
//       status: 'PAUSED',
//       campaign_id: CAMPAIGN_ID
//     }
//   )
//   .catch((error) => {
//     console.error(error);
//   });



  // Marketing API
// Lesson 4 - Creating Ad Sets

// var account_id = 'act_205076822892282'; // Replace with your account ID.
// var campaign_id = '6097935400819'; // Replace with your campaign ID.

account
  .createAdSet(
    [], {
    name: 'Link Click Ad Set',

    bid_amount: '50',
    daily_budget: '500',
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'LINK_CLICKS',

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
