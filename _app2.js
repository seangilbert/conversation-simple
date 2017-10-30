'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson
var request = require('request');
var Promise = require('bluebird');

// var createAdSequence = require('./adcreation');  // creates the FB ad

const adsSdk = require('facebook-nodejs-ads-sdk');
const accessToken = 'EAACUHflG6q4BANFxHPf5lZBPPMHNZBol9IBYL7oobogQ7q3MVZAG3efjCGQFsQdGwrZBz8ZAPcebu9ITZCf0h66hEA6xDdNEDZAy1ZCcEBjPEgiA5RfCLPKMNnZCP4ECARW5IWlQQIEYPIOhtRSRZCoIznLMm99iVGNOmpDoVcC0a8EwUhAS3xqkZAvkMEwjYoezjIiuveq0WlZCpQZDZD';
const accountId = 'act_205076822892282';

const FacebookAdsApi = adsSdk.FacebookAdsApi.init(accessToken);

// Campaign ID 6097740866619
// Creatives ID 6097464405619
// adSet ID 6097764515219"



const AdAccount = adsSdk.AdAccount;
const account = new AdAccount('accountId');
account
  .read([AdAccount.Fields.name, AdAccount.Fields.age])
  .then((account) => {
    logPassedTest(test1 + ':Pass', account);
  })
  .catch((error) => {
  });




var app = express();


// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper
var conversation = new Conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  //'username': process.env.CONVERSATION_USERNAME,
  //'password': process.env.CONVERSATION_PASSWORD,
  'version_date': '2017-05-26'
});

// const AD_DATA = {
//   creative: {
//     name: 'Link Click Ad Creative',
//     title: 'Link Click Test Ad',
//     body: 'Here is some different text.',
//     image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
//     object_url: 'https://sean-gilberts-store.myshopify.com'
//   },
//   ad: {
//     name: 'The Big Fridge!',
//     adset_id: AD_SET_ID,
//     status: AD_STATUS.PAUSED
//   }
// };


const SHOP_ID = 'c6076b79dacf1d75412e1ecc2728dde4';
const SHOP_TOKEN = 'c8be8f52ad633735d5ef934b1cd63ae8';
const SHOP_NAME = 'sean-gilberts-store';
const SHOP_API = '/admin/products.json';
const SHOP_URI = `https://${SHOP_ID}:${SHOP_TOKEN}@${SHOP_NAME}.myshopify.com${SHOP_API}`;

function getShopResponse() {
  return(SHOP_URI, function (error, response, body) {
    return JSON.parse(body);
  });
}

// function postAd() {
//   console.log('posting shopResponse', shopResponse);
// }

// Endpoint to be call from the client side
app.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the conversation service
  return conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return Promise.resolve(updateMessage(payload, data))
      .then(response => res.json(response));
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */



function updateMessage(input, response) {
  console.log(
    '###############INPUT##############',
    input,
    '###############RESPONSE##############',
    response,
    '###############DONE##############'
  );


// createAdSequence(ACCESS_TOKEN, ACCOUNT_ID, AD_DATA, DEBUG);


  var responseText = null;
  if (!response.output) {
    response.output = {text:''};
  } else {
    if (response.context.product_rank) {
      return getShopResponse().then(shopResponse => {
        // console.log(shopResponse.products[0].variants[0].price);
        const productName = shopResponse.products[0].title;
        const productDesc = shopResponse.products[0].body_html;
        const productImg = shopResponse.products[0].image.src;
        const productPrice = shopResponse.products[0].variants[0].price;
        console.log(productImg);
        response.output.text.unshift(`<div class="returned-content"><img src='${productImg}'><strong class="product-title">${productName}</strong>${productDesc}<strong>Price: $${productPrice}</strong></div>`);
        return response;
      });
    }
    return response;
  }

  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text.push(responseText);
  return response;
}

module.exports = app;
