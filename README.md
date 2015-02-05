#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> generate an OpenFin installer or link




## Install

```sh
$ npm install --save openfin-installer
```


## Usage

```js
var openfinInstaller = require('openfin-installer')({...your config obj...});

openfinInstaller.generateInstallUrl('YOUR CONFIG URL HERE');

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

```sh
$ npm install --global openfin-installer
$ openfin-installer --help
```


## License

MIT © [xaiver]()


[npm-url]: https://npmjs.org/package/openfin-installer
[npm-image]: https://badge.fury.io/js/openfin-installer.svg
[travis-url]: https://travis-ci.org/datamadic/openfin-installer
[travis-image]: https://travis-ci.org/datamadic/openfin-installer.svg?branch=master
[daviddm-url]: https://david-dm.org/datamadic/openfin-installer.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/datamadic/openfin-installer
