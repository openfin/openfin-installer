'use strict';

var fs = require('fs'),
		q = require('q'),
		path = require('path'),
		https = require('https');

var url = [
	'https://install.openfin.co/download?',
	'fileName=',
	'openfin-installer',
	'&config=',
	'https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/app.json',
	'&noExt=',
	'false',
	'&rvmConfig=',
	'asdfsadf', // GET THE DEFAULT!!!
	'&supportEmail=',
	'asdfasdf', // GET THE DEFAULT EMAIL!!!
	'&dnl=',
	'false'
	],
	FILE_NAME = 2,
	CONFIG = 4,
	NO_EXT = 6,
	RVM_CONFIG = 8,
	SUPPORT_EMAIL = 10,
	DNL = 12,
	appJSON = {
		startup_app: {
			name: 'openfin'
		},
		configUrl: ''
	};

/**
 * given an array, if the value is truthy, insert it at the index passed. If 
 * not clear out the label by setting the value to and label to ''
 * The shape is ['label=','value']. This gets joined to create a url	
 *
 * Mutates the array passed
 * 
 * @param {array} arr 
 * @param {string} val 
 * @param {int} idx 
 */
var addOrClear = function(arr, val, idx){
	if (val) {
		arr[idx] = val;
	}
	else {
		arr[idx] = '';
		arr[idx - 1] = '';
	}
};

/**
 * generateInstallUrl
 * 
 * @param  {object} configTarget Override the default config target from the app.json
 * @param  {string} fileName Override the default name from app.json
 * @return {string} A configured url pointing to a web service that will generate an installer 
 */
var generateInstallUrl = function(fileName, configTarget, noExt, rvmConfig, supportEmail, dnl ){
	var configuredUrl = url.slice(0);

	configuredUrl[FILE_NAME] = fileName || appJSON.startup_app.name || configuredUrl[FILE_NAME];
	configuredUrl[CONFIG] = configTarget || appJSON.configTarget || configuredUrl[CONFIG];

	addOrClear(configuredUrl, noExt, NO_EXT);
	addOrClear(configuredUrl, rvmConfig, RVM_CONFIG);
	addOrClear(configuredUrl, supportEmail, SUPPORT_EMAIL);
	addOrClear(configuredUrl, dnl, DNL);
	
	return configuredUrl.join('');
};


/**
 * fetchInstaller 
 *
 * Return a promise that resolves to a zip obtained via http(s) request
 * @param  {object} options Optional object that can define a name and write destination 
 * @return {object} A q promise
 */
var fetchInstaller = function(options){

	options = options || {
		name: appJSON.startup_app.name + '-installer'
	};
	
	var noExt = options.noExt || null,
	    rvmConfig = options.rvmConfig || null,
	    supportEmail = options.supportEmail || null,
	    dnl = options.dnl || null,
	    config = options.config || null;

	options.destination = options.destination || '.';
	
	var deferred = q.defer(),
			resolvedName = options.name || appJSON.startup_app.name + '-installer',
			target =  generateInstallUrl(resolvedName, config, noExt, rvmConfig, supportEmail, dnl),
			filePath = path.join(options.destination,  resolvedName + '.zip'),
			zipFileStream = fs.createWriteStream(filePath);

	zipFileStream.on('error', function  () {
		deferred.reject('failed to write to destination');
	});

	https.get(target, function(response) {
	    if (response.statusCode !== 200) {
	        deferred.reject('Download Failed. Status code:' + response.statusCode);
	    } else {
	    		if (options.destination) {
	    			response.pipe(zipFileStream);
	    			zipFileStream.on('end', function  () {
							deferred.resolve(response);
						});
	    		}
	    		else {
	    			deferred.resolve(response);
	    		}
	    }
	})
	.on('error', function(e) {
	    deferred.reject('Download Failed. ' + e.toString() + '\n\nRequested Target:\n' + target);
	});

	return deferred.promise;
};


module.exports = function(configJSON/*, options*/){
	appJSON = configJSON;

	return {
		generateInstallUrl : generateInstallUrl,
		fetchInstaller: fetchInstaller
	};
};

