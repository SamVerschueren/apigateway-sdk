'use strict';
var AWS = require('aws-sdk');
var Promise = require('pinkie-promise');
module.exports = function (opts) {
	if (!opts.id) {
		return Promise.reject(new Error('Please provide the API id.'));
	}

	if (!opts.stage) {
		return Promise.reject(new Error('Please provide the stage name.'));
	}

	var apigateway = new AWS.APIGateway();

	var params = {
		restApiId: opts.id,
		stageName: opts.stage,
		sdkType: 'javascript'
	};

	return new Promise(function (resolve, reject) {
		var request = apigateway.getSdk(params, function (err) {
			if (err) {
				reject(err);
				return;
			}

			resolve(request.response.httpResponse.body);
		});
	});
};

module.exports.config = AWS.config;
