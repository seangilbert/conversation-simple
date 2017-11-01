/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson
var request = require('request');

var createAdSequence = require('./adcreation2');  // creates the FB ad


const Promise = require('bluebird');

const FacebookAdsSdk = require('facebook-nodejs-ads-sdk');

const AdAccount = FacebookAdsSdk.AdAccount;
const Campaign = FacebookAdsSdk.Campaign;
const AdCreative = FacebookAdsSdk.AdCreative;
const FacebookAdsApi = FacebookAdsSdk.FacebookAdsApi;

const ACCESS_TOKEN = 'EAACUHflG6q4BAFV4GgxA3W9YyKYVJkO1zUaq6OhbpH8Fz4dkIto6WwB6FD47ZCyNmId0gZCkKPvZAZAs1O5j7MKrnvjOc9P74i6UWzwCXTsDZBIqx999xee92hcfjOKHuxJ2Gm1WPOeQLSSJ55ynLgEjQasxrF2GqgZCmxqtzU1UU3Mp1eGkZAAIM2WnDgicCIgJWT4qXOTbgZDZD';

const ACCOUNT_ID = 'act_205076822892282';
const AD_SET_ID = '6097936212619';

const AD_STATUS = {
  PAUSED: 'PAUSED'
};

const AD_DATA = {
  creative: {
    name: 'Link Click Ad Creative', // CREATIVE NAME (NOT SURE WHERE THIS APPEARS?)
    title: 'Link Click Test Ad', // NAME THE END USER WILL SEE
    body: 'Here is some different text.', // AD COPY THE END USER WILL SEE
    image_url: 'https://cdn.shopify.com/s/files/1/2454/9167/products/IMG_1605.jpg?v=1508020436',
    object_url: 'https://sean-gilberts-store.myshopify.com'
  },
  ad: {
    name: 'Here is my ad!', // INTERNAL NAME
    adset_id: AD_SET_ID,
    status: AD_STATUS.PAUSED
  }
};

const DEBUG = true;

let _debug = false;

const delay = milliseconds => (pass) => Promise.delay(milliseconds).then(() => pass);



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


const SHOP_ID = 'c6076b79dacf1d75412e1ecc2728dde4';
const SHOP_TOKEN = 'c8be8f52ad633735d5ef934b1cd63ae8';
const SHOP_NAME = 'sean-gilberts-store';
const SHOP_API = '/admin/products.json';
const SHOP_URI = `https://${SHOP_ID}:${SHOP_TOKEN}@${SHOP_NAME}.myshopify.com${SHOP_API}`;


let productName;
let productDesc;
let productImg;
let productPrice;
let productHandle;
let returnedProduct;

let shopResponse;
function getShopResponse() {
  request(SHOP_URI, function (error, response, body) {
    shopResponse = JSON.parse(body);

    // console.log(shopResponse.products[0].variants[0].price);
    productName = shopResponse.products[0].title;
    productDesc = shopResponse.products[0].body_html;
    productImg = shopResponse.products[0].image.src;
    productPrice = shopResponse.products[0].variants[0].price;
    productHandle = shopResponse.products[0].handle;

    returnedProduct = `<div class="returned-content"><div class="returned-content-header">Sean's Store (Shopify)</div><div class="returned-content-body"><img src='${productImg}'><strong class="product-title">${productName}</strong>${productDesc}<strong>Price: $${productPrice}</strong></div></div>`;
    // console.log(productImg, PRODUCT_HANDLE);
    console.log(productDesc);
  });
}

getShopResponse()







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
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */






function updateMessage(input, response) {
  if (response.context.campaign_name)
  console.log(
    // '###############INPUT##############',
    // input,
    '############### CONTEXT CAMPAIGN_NAME ##############',
    response.context.campaign_name,
    '############### CONTEXT CAMPAIGN_NAME ##############'
  );


  var responseText = null;

  if (!response.output) {
    response.output = {text:''};
  } else {
    if (response.context.product_rank) {
      response.output.text.push(returnedProduct);
      response.output.text.push(`<br />What can I help with next?`);
    }


      if (response.context.publish_ad) {
        const adData = Object.assign({}, AD_DATA);
        adData.creative.name = response.context.campaign_name;
        adData.creative.title = productName;
        adData.creative.body = productDesc;
        adData.ad.name = response.context.campaign_name;
        // adData.ad.name = 'yadda';
        createAdSequence(ACCESS_TOKEN, ACCOUNT_ID, adData, DEBUG);
        // createAdSequence(ACCESS_TOKEN, ACCOUNT_ID, AD_DATA, DEBUG);

        response.output.text.push(`Publishing your ad to Facebook...`);
        response.output.text.push(`Success! Your ad is published. Visit: <a href="https://www.facebook.com/ads/manager/account/ads/" target="_blank">Facebook Ads Manager</a> to manage your ad.`);
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
