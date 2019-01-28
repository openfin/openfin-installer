# [![Build Status][travis-image]][travis-url]

> generate an OpenFin installer or link




## Install

```sh
$ npm install --save openfin-installer
```


## Usage

```js
var openfinInstaller = require('openfin-installer')({...your config obj...});

openfinInstaller.generateInstallUrl(<NAME HERE>,<YOUR CONFIG URL HERE>);

openfinInstaller.fetchInstaller({
	destination: 'dist',
	name: 'my-installer.zip'
})
.then(function(zip){
	// do something with the returned file if you want
},
function(reason){
	// handle error
});

```


## License
MIT

The code in this repository is covered by the included license.  If you run this code, it may call on the OpenFin RVM or OpenFin Runtime, which are subject to OpenFin’s [Developer License](https://openfin.co/developer-agreement/). If you have questions, please contact support@openfin.co”

## Support
Please enter an issue in the repo for any questions or problems. Alternatively, please contact us at support@openfin.co 

[travis-url]: https://travis-ci.org/openfin/openfin-installer.svg
[travis-image]: https://api.travis-ci.org/openfin/openfin-installer.svg?branch=master
