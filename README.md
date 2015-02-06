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

MIT © [xaiver]()


[travis-url]: https://travis-ci.org/openfin/openfin-installer.svg
[travis-image]: https://api.travis-ci.org/openfin/openfin-installer.svg?branch=master
