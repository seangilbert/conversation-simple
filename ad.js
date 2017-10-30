const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BABI3JyZC5Y9BzQaIRikQZCTOOs1qwdLvZBXB8zHtkYGmPRZAImBOt6BSDAPwsWIiezzSq2Ufvs6ECftZCjciTGbHRzloOpBtlT4hnGQ8AA7eIuXDQZAT0mdDS85vOTm6rOGMGIdE4nPNkROT7PXLNZCMCZByl0QgA40cpc4OaWTup1KfZC18lCdy23Gk8mpXZAWQZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken).setDebug(true);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const Ad = adsSdk.Ad;

const ADSETID = '6097936212619';
const ADCREATIVE = '6097936212619';


// !! create adCreative, log the id, then create ad !!


// account
//   .createAd(
//     [], {
//       name: 'Fridge Candy Ad',
//       adset_id: ADSETID,
//       status: 'PAUSED',
//       creative: {
//         creative_id: ADCREATIVE
//       }
//     }
//   )
//   .catch((error) => {
//     console.error(error);
//   });



  // Marketing API
  // Lesson 5 - Creating Ads

const reqData = {
  // name: 'New Fridge Ad 5',
  // adset_id: ADSETID,
  // status: 'PAUSED',
  // creative: {
  //   creative_id: ADCREATIVE
  // }
  // "name": "New Fridge Ad 1508958261695",
  // "adset_id": "6097936212619",
  // "status": "PAUSED",
  // "creative": {
  //   "creative_id": "6097985588019"
  // }
  "name": "New Fridge Ad",
 "adset_id": "6097936212619",
 "status": "PAUSED",
 "creative": {
   "creative_id": "6097985588019"
 }
};

console.log(JSON.stringify(reqData, null, 2));

  account
    .createAd(
      [], reqData
    )
    .catch((error) => {
      console.error(error);
    });
