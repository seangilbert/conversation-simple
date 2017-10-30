const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BAEwQGa7RXNZCZC2Vw05nR870J5X3jkz9p7CouTQSVTEkYd1ZBBpgplA8dZAuiN6t5mmNONZBpZAutcZBPEPeEvBSywrt7Lv7Hl9Bt4QJbkqQfhefcd6zvxtOCju66yF0KswrlWy24DGNQZAbzCpsmXcyYhK8ahPRMz6xIucWPSlDD5fNDHtN5SQSAm1LqdDK8gZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken);

const AdAccount = adsSdk.AdAccount;
const account = new AdAccount(accountId);

const Campaign = adsSdk.Campaign;

const AdCreative = adsSdk.AdCreative;

// adset 6097916823819


// account
//   .createAdCreative(
//     [], {
//       name: 'Fridge Candy Ad',
//       title: 'Fridge Candy Hat',
//       body: 'Check out this hat!',
//       image_url: 'https://fb.me/1UEB1MtuiFFRzNJ',
//       object_url: 'https://sean-gilberts-store.myshopify.com'
//     }
//   )
//   .catch((error) => {
//     console.error(error);
//   });


  // Marketing API
// Lesson 5 - Creating Ads

account
  .createAdCreative(
    [], {
      name: 'New Click Ad Creative',
      title: 'Link Click Ad',
      body: 'Here is some new text.',
      image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
      object_url: 'https://sean-gilberts-store.myshopify.com'
    }
  )
  .then((adcreative) => {
    console.log(adcreative._data.id);
  })
  .catch((error) => {
    console.error(error);
  });
