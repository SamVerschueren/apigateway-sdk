# apigateway-sdk [![Build Status](https://travis-ci.org/SamVerschueren/apigateway-sdk.svg?branch=master)](https://travis-ci.org/SamVerschueren/apigateway-sdk)

> Retrieve the JavaScript AWS API Gateway SDK.


## Install

```
$ npm install --save apigateway-sdk
```


## Usage

```js
const apiSdk = require('apigateway-sdk');

apiSdk.config.update({accessKeyId: 'akid', secretAccessKey: 'secret'});

apiSdk({id: '123', stage: 'v1'}).then(data => {
	fs.writeFileSync('apigateway.zip', data);
});
```


## API

### apiSdk(options)

Returns a promise for the `Buffer`.

#### options

##### id

Type: `string`

The API Gateway ID of which you want to download the SDK for.

##### stage

Type: `string`

The stage name of which you want to download the SDK for.

### apiSdk.config

Returns the `aws-sdk` config object in order to [configure](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html) the AWS SDK.

## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
